import "@radix-ui/themes/styles.css";
import "./theme-config.css" ;
import "./globals.css";
import type { Metadata } from "next";
import { Inter} from "next/font/google";
import { Container, Theme, ThemePanel } from "@radix-ui/themes"
import Navbar from "./Navbar";


const inter = Inter({
  subsets:['latin'], 
  display: "swap",
variable: "--font-inter"
});


export const metadata: Metadata = {
  title: "Issue-Tracker App",
  description: "A better way to monitor our Expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.variable}
      >
        <Theme appearance="light" accentColor="violet">
        <Navbar/>
        <main className="p-5">
        <Container>
        {children}
        </Container>
        </main>
        {/* <ThemePanel/> */}
        </Theme>
      </body>
    </html>
  );
}
