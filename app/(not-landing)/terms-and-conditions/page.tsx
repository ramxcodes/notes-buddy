export default function Page() {
    return (
        <div className="p-6 flex flex-col space-y-6 text-left container mx-auto max-w-3xl font-wotfard">
            <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
                Terms and Conditions
            </h1>
            <p className="text-sm italic mb-6">Last updated: Jan 18, 2025</p>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Welcome to Notes Buddy</h2>
                <p>
                    These terms and conditions outline the rules and regulations for the use of Notes Buddy’s website and services. By accessing or using our website, you agree to these terms in full. If you do not accept all the terms and conditions, please refrain from using our services.
                </p>
            </section>

            <section className="mb-6">
                <h3 className="text-lg font-medium mb-2">User Accounts</h3>
                <p>
                    To access certain features, you may need to create an account. You agree to provide accurate and complete information and are responsible for safeguarding your account credentials. Notes Buddy is not liable for unauthorized account usage.
                </p>
            </section>

            <section className="mb-6">
                <h3 className="text-lg font-medium mb-2">Content Ownership</h3>
                <p>
                    The notes and resources shared on Notes Buddy are either user-contributed or owned by Notes Buddy. By uploading materials, you grant us a non-exclusive, royalty-free license to use, display, and share your content with other users.
                </p>
            </section>

            <section className="mb-6">
                <h3 className="text-lg font-medium mb-2">Prohibited Activities</h3>
                <ul className="list-disc pl-6">
                    <li>Sharing copyrighted materials without authorization.</li>
                    <li>Uploading malicious software or content.</li>
                    <li>Using the platform for illegal or unethical purposes.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h3 className="text-lg font-medium mb-2">Payments and Subscriptions</h3>
                <p>
                    Notes Buddy offers free and paid subscription tiers. By subscribing to a paid plan, you agree to pay all associated fees. Subscription charges are non-refundable, except as required by applicable law.
                </p>
            </section>

            <section className="mb-6">
                <h3 className="text-lg font-medium mb-2">Limitation of Liability</h3>
                <p>
                    Notes Buddy is not responsible for inaccuracies in user-contributed content or disruptions in service. Use the platform at your own risk.
                </p>
            </section>

            <section className="mb-6">
                <h3 className="text-lg font-medium mb-2">Termination of Use</h3>
                <p>
                    We reserve the right to suspend or terminate your access if you violate these terms. Upon termination, your right to use the platform ceases immediately.
                </p>
            </section>

            <section className="mb-6">
                <h3 className="text-lg font-medium mb-2">Governing Law</h3>
                <p>
                    These terms are governed by the laws of India. Any disputes will be resolved in the courts of Indore, Madhya Pradesh.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-medium mb-2">Contact Us</h3>
                <p>
                    For any questions about these Terms and Conditions, you can contact us at:
                </p>
                <address className="pl-4">
                    <p>Notes Buddy</p>
                    <p>39, Ram Nivas Vijay Nagar Main Road, Indore 452010</p>
                    <p>+91 6263219134</p>
                    <p>Email: notesbuddy@gmail.com</p>
                </address>
            </section>
        </div>
    );
}
