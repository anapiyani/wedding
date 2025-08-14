import localFont from "next/font/local";
import "./globals.css";

const lavanderiaC = localFont({
  src: "../../public/fonts/LavanderiaC.woff2",
  variable: "--font-lavanderia",
  weight: "400",
  style: "normal",
});

const ttModernoir = localFont({
  src: "../../public/fonts/TT-Modernoir-Trial.ttf",
  variable: "--font-tt-modernoir",
  weight: "400",
  style: "normal",
});

const ttRamillas = localFont({
  src: "../../public/fonts/TT-Ramillas-Trl.ttf",
  variable: "--font-tt-ramillas",
  weight: "400",
  style: "normal",
});

const gilroy = localFont({
  src: "../../public/fonts/Gilroy.woff2",
  variable: "--font-gilroy",
  weight: "400",
  style: "normal",
});

export const metadata = {
  title: "My App",
  description: "Next.js with custom fonts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lavanderiaC.variable} ${ttModernoir.variable} ${ttRamillas.variable} ${gilroy.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
