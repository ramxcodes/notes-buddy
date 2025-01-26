package ind.pali.nb_v3;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

public class MainActivity extends AppCompatActivity {
    private static final String WEBSITE_URL = "https://notesbuddy.in";
    private WebView webView;
    private SwipeRefreshLayout swipeContainer;
    private LinearLayout splashLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize views
        webView = findViewById(R.id.webView);
        swipeContainer = findViewById(R.id.swipeContainer);
        splashLayout = findViewById(R.id.splashLayout);

        // Check internet connection
        if (!isInternetAvailable()) {
            showNoInternetDialog();
        } else {
            initializeWebView();
        }

        // Configure swipe-to-refresh
        swipeContainer.setOnRefreshListener(() -> webView.reload());
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
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebViewClient(new CustomWebViewClient());
        webView.loadUrl(WEBSITE_URL);
    }

    private class CustomWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            // Handle WhatsApp links
            if (url.startsWith("https://api.whatsapp.com/") ||
                    url.startsWith("http://api.whatsapp.com/")) {
                openExternalApp(url);
                return true;
            }
            view.loadUrl(url);
            return true;
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            // Hide splash screen when page loads
            swipeContainer.setRefreshing(false);
            splashLayout.setVisibility(View.GONE);
        }
    }

    private void openExternalApp(String url) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            startActivity(intent);
        } catch (Exception e) {
            // Fallback to WebView if app not installed
            webView.loadUrl(url);
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
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