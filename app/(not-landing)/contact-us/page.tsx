export default function page() {
  return (
    <div className="p-6 flex flex-col space-y-6 text-left container mx-auto max-w-3xl font-wotfard">
      <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
        Contact Us
      </h1>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Contact Us</h3>
        <p>
          We&apos;re here to help! If you have any questions about our services
          or need assistance, please don&apos;t hesitate to reach out. Contact
          us now to get quick and friendly support from our team. We&apos;re
          committed to providing you with the best experience possible.
        </p>
        <address className="pl-4">
          <p>Notes Buddy</p>
          <p>+91 6263219134</p>
          <p>Email: notesbuddymu@gmail.com</p>
          <p>Scheme 39, Vijay Nagar, Indore</p>
        </address>
      </section>
    </div>
  );
}
