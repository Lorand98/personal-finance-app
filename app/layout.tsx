import localFont from "next/font/local";
import "./globals.css";

const publicSans = localFont({
  src: "./fonts/PublicSans-VariableFont_wght.ttf",
});

export const metadata = {
  title: {
    template: "%s / Personal Finance App",
    default: "Welcome / Personal Finance App",
  },
  description:
    "A personal finance app to help you manage your money, budget, and track your spending.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${publicSans.className} antialiased h-full flex flex-col bg-beige-100`}
      >
        {children}
      </body>
    </html>
  );
}
