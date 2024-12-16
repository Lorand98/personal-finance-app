import Logo from "@/components/logo";
import authIllustrationSrc from "@/public/illustration-authentication.svg";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen p-5 gap-5">
      <div className="basis-2/5 relative">
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

      <div className="basis-3/5 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl max-w-[35rem] w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
