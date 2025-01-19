export default function page() {
  return (
    <div className="p-6 flex flex-col space-y-6 text-left container mx-auto max-w-3xl font-wotfard">
      <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
        Shipping and Delivery Policy
      </h1>
      <p className="text-sm italic mb-6">Last updated: Jan 18, 2025</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Shipping and Delivery Policy for Notes Buddy
        </h2>
        <p>
          At Notes Buddy, we specialize in providing premium educational
          resources tailored for students. Our goal is to deliver high-quality
          notes and resources efficiently and effectively.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">Service Availability</h3>
        <p>
          Our notes and educational materials are available to students
          globally, ensuring that no matter where you are, you can benefit from
          our resources.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">Delivery Timeline</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Instant Access:</strong> Digital notes and flashcards are
            available immediately after purchase.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">Cost and Payment</h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Free Tier:</strong> Access to a limited selection of notes
            and flashcards.
          </li>
          <li>
            <strong>Pro Tier:</strong> Premium notes, one-shots, and flashcards
            at an affordable rate.
          </li>
          <li>
            <strong>Ultimate Tier:</strong> Comprehensive resources including
            past-year questions (PYQs), advanced flashcards, and exclusive
            notes.
          </li>
        </ul>
        <p>
          Payment options will be available during checkout and vary by region.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">Tracking and Updates</h3>
        <p>
          We provide continuous updates on your order status via email. Digital
          materials can be accessed immediately after purchase through your
          Notes Buddy account.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">No Return Policy</h3>
        <p>
          Due to the digital nature of our products, we do not offer returns.
          However, we strive to ensure that all resources meet your expectations
          and offer support for any issues.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-medium mb-2">Contact Us</h3>
        <p>
          If you have any questions or concerns about your purchase or delivery,
          please contact us via:
        </p>
        <address className="pl-4">
          <p>Notes Buddy</p>
          <p>39, Ram Nivas Vijay Nagar Main Road, Indore 452010</p>
          <p>+91 6263219134</p>
          <p>Email: notesbuddymu@gmail.com</p>
        </address>
      </section>
    </div>
  );
}
