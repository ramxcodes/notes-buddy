import Link from "next/link";

export default function NotLanding() {
  return (
    <div className="flex items-center justify-center gap-2 w-full py-5">
      <Link
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out hidden lg:block"
        href="/contact-us"
      >
        Contact Us
      </Link>
      <span className="opacity-40 hidden lg:block">|</span>

      <Link
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out hidden lg:block"
        href="/shipping-and-delievery"
      >
        Shipping and Delivery
      </Link>
      <span className="opacity-40 hidden lg:block">|</span>
      <Link
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out hidden lg:block"
        href="/privacy-policy"
      >
        Privacy policy
      </Link>
      <span className="opacity-40 hidden lg:block">|</span>
      <Link
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out hidden lg:block"
        href="/return-and-refund"
      >
        Cancellation/Refund Policy
      </Link>
      <span className="opacity-40 hidden lg:block">|</span>
      <Link
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out hidden lg:block"
        href="/terms-and-conditions"
      >
        Terms and conditions
      </Link>
    </div>
  );
}
