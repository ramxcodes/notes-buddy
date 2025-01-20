export default function NotLanding() {
  return (
    <div className="flex items-center justify-center gap-2 w-full py-5">
      <a
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out hidden lg:block"
        href="/contact-us"
      >
        Contact Us
      </a>
      <span className="opacity-40 hidden lg:block">|</span>

      <a
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out hidden lg:block"
        href="/shipping-and-delievery"
      >
        Shipping and Delivery
      </a>
      <span className="opacity-40 hidden lg:block">|</span>
      <a
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out hidden lg:block"
        href="/privacy-policy"
      >
        Privacy policy
      </a>
      <span className="opacity-40 hidden lg:block">|</span>
      <a
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out hidden lg:block"
        href="/return-and-refund"
      >
        Cancellation/Refund Policy
      </a>
      <span className="opacity-40 hidden lg:block">|</span>
      <a
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out hidden lg:block"
        href="/terms-and-conditions"
      >
        Terms and conditions
      </a>
    </div>
  );
}
