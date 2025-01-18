export default function page() {
  return (
    <div className="p-6 flex flex-col space-y-6 text-left container mx-auto max-w-3xl font-wotfard">
      <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
        Privacy Policy
      </h1>
      <p className="text-sm italic mb-6">Last updated: Jan 18, 2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Privacy Policy for Notes Buddy
        </h2>
        <p>
          Welcome to Notes Buddy. If you have any questions or concerns about
          our policy or our practices regarding your personal information,
          please contact us.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">
          Information We Collect and How We Use It
        </h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Names</li>
          <li>Email addresses</li>
          <li>Phone Number</li>
          <li>University</li>
          <li>Degree</li>
        </ul>
        <p>
          We collect personal information through forms and analytics tools to
          provide services, enhance user experience, and improve our marketing
          efforts.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">Use of Your Information</h3>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6">
          <li>Provide and maintain our services</li>
          <li>Improve and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Enhance our marketing and promotional efforts</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">
          Disclosure of Your Information
        </h3>
        <p>
          We do <strong>not</strong> share your personal information with third
          parties. All personal information is kept confidential within our
          organization.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">
          Security of Your Information
        </h3>
        <p>
          We use encryption to secure your personal information against
          unauthorized access, use, or disclosure.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-medium mb-2">Contact Us</h3>
        <p>
          If you have questions or concerns about this privacy policy, please
          feel free to contact us.
        </p>
      </section>
    </div>
  );
}
