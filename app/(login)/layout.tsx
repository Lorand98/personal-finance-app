import Logo from "@/components/logo";
import authIllustrationSrc from "@/public/illustration-authentication.svg";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:p-5 gap-5 justify-center">
      {/* Header for Mobile and Tablet */}
      <div className="lg:hidden bg-black w-full py-4 flex justify-center">
        <Logo size="large" />
      </div>

      {/* Left Side - Image and Content (Visible on lg and above) */}
      <div className="hidden lg:block lg:basis-1/3 relative">
        <Image
          src={authIllustrationSrc}
          alt="Authentication Illustration"
          className="rounded-xl object-cover object-left"
          priority
          fill
        />
        <div className="absolute top-10 left-12 right-10">
          <Logo size="large" />
        </div>
        <div className="absolute bottom-10 left-12 right-12 text-left text-white flex flex-col gap-6">
          <h1>Keep track of your money and save for your future</h1>
          <p>
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center flex-1">
        <div
          className="
            bg-white p-8 rounded-xl w-full
            max-w-[90%]           /* On mobile screens */
            md:max-w-[75%]        /* On tablet screens */
            lg:max-w-140      /* On desktop screens */
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
