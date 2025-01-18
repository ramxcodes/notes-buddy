export default function page() {
  return (
    <div className="p-6 flex flex-col space-y-6 text-left container mx-auto max-w-3xl font-wotfard">
      <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
        Return and Refund Policy
      </h1>
      <p className="text-sm italic">Last updated: Jan 18, 2025</p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Introduction</h2>
        <p>
          At Notes Buddy, we are committed to your satisfaction with our
          educational resources. This policy outlines our stance on returns and
          refunds.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">No Return or Refund Policy</h3>
        <p>
          Due to the digital nature of our products,{" "}
          <strong>Notes Buddy does not offer returns or refunds.</strong>
        </p>
        <p>
          We ensure that all resources meet your expectations and provide
          support for any issues encountered during use.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Contact Us</h3>
        <p>
          If you have any questions or concerns, feel free to contact us via:
        </p>
        <address className="pl-4">
          <p>Notes Buddy</p>
          <p>39, Ram Nivas Vijay Nagar Main Road, Indore 452010</p>
          <p>+91 6263219134</p>
          <p>Email: support@notesbuddy.com</p>
        </address>
      </section>
    </div>
  );
}
