package ind.pali.nb_v3;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

public class MainActivity extends AppCompatActivity {
    private static final String WEBSITE_URL = "https://notesbuddy.in";
    private static final String WHATSAPP_PACKAGE = "com.whatsapp";
    private WebView webView;
    private SwipeRefreshLayout swipeContainer;
    private LinearLayout splashLayout;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        swipeContainer = findViewById(R.id.swipeContainer);
        splashLayout = findViewById(R.id.splashLayout);
        progressBar = findViewById(R.id.progressBar);

        configureWebViewSettings();
        handleInitialNetworkCheck();
        setupSwipeRefresh();
        handleIntent(getIntent());
    }

    private void configureWebViewSettings() {
        // Enable cookies and storage
        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
    }

    private void handleInitialNetworkCheck() {
        if (!isInternetAvailable()) {
            showNoInternetDialog();
        } else {
            initializeWebView();
        }
    }

    private void setupSwipeRefresh() {
        swipeContainer.setOnRefreshListener(() -> {
            webView.reload();
            CookieManager.getInstance().flush();
        });
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleIntent(intent);
    }

    private void handleIntent(Intent intent) {
        Uri data = intent.getData();
        if (data != null && isAppDeepLink(data.toString())) {
            handlePostLoginRedirect(data.toString());
        }
    }

    private boolean isAppDeepLink(String url) {
        return url.startsWith(WEBSITE_URL);
    }

    private void handlePostLoginRedirect(String url) {
        webView.loadUrl(url);
        checkLoginStatus();
    }

    private boolean isInternetAvailable() {
        NetworkInfo info = ((ConnectivityManager)
                getSystemService(Context.CONNECTIVITY_SERVICE)).getActiveNetworkInfo();
        return info != null && info.isConnected();
    }

    private void showNoInternetDialog() {
        new AlertDialog.Builder(this)
                .setTitle("No Internet Connection")
                .setMessage("Please check your mobile data or Wi-Fi network.")
                .setPositiveButton("Exit", (dialog, which) -> finish())
                .setCancelable(false)
                .show();
    }

    private void initializeWebView() {
        webView.setWebViewClient(new CustomWebViewClient());
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
                progressBar.setVisibility(newProgress == 100 ? View.GONE : View.VISIBLE);
            }
        });
        webView.loadUrl(WEBSITE_URL);
    }

    private class CustomWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            if (url.contains("accounts.google.com")) {
                launchCustomTabWithCallback(url);
                return true;
            }

            if (isWhatsAppLink(url)) {
                handleWhatsAppLink(url);
                return true;
            }

            if (url.startsWith(WEBSITE_URL)) {
                view.loadUrl(url);
                return true;
            }

            return false;
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            swipeContainer.setRefreshing(false);
            splashLayout.setVisibility(View.GONE);
            CookieManager.getInstance().flush();

            if (url.equals(WEBSITE_URL + "/sign-in")) {
                checkLoginStatus();
            }
        }
    }

    private void launchCustomTabWithCallback(String url) {
        CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
        builder.setShowTitle(true);
        CustomTabsIntent customTabsIntent = builder.build();
        customTabsIntent.intent.setPackage("com.android.chrome");
        customTabsIntent.launchUrl(this, Uri.parse(url));
    }

    private boolean isWhatsAppLink(String url) {
        return url.startsWith("https://chat.whatsapp.com/") ||
                url.startsWith("https://api.whatsapp.com/") ||
                url.startsWith("http://api.whatsapp.com/");
    }

    private void handleWhatsAppLink(String url) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            intent.setPackage(WHATSAPP_PACKAGE);

            if (isAppInstalled(WHATSAPP_PACKAGE)) {
                startActivity(intent);
            } else {
                webView.loadUrl(url);
            }
        } catch (Exception e) {
            webView.loadUrl(url);
        }
    }

    private void checkLoginStatus() {
        webView.evaluateJavascript(
                "(function() { return document.cookie.includes('session_token'); })();",
                value -> {
                    if (value.equals("true")) {
                        webView.post(() -> webView.loadUrl(WEBSITE_URL));
                    }
                }
        );
    }

    private boolean isAppInstalled(String packageName) {
        try {
            getPackageManager().getPackageInfo(packageName, 0);
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            new AlertDialog.Builder(this)
                    .setTitle("Exit App")
                    .setMessage("Are you sure you want to exit?")
                    .setPositiveButton("Yes", (dialog, which) -> finish())
                    .setNegativeButton("No", null)
                    .show();
        }
    }
}