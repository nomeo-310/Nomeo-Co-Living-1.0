import type { Metadata } from "next";
import localFont from 'next/font/local'
import NavBar from "./components/shared/NavBar";
import "./globals.css";
import SignUp from "./components/forms/SignUp";
import ToasterProvider from "./providers/ToasterProvider";
import SignIn from "./components/forms/SignIn";
import { getCurrentUser } from "./libs/actions/auth.actions";
import { User } from "@prisma/client";

const nunitoRegular = localFont({ src: '../public/fonts/Nunito-Regular.ttf' })

export const metadata: Metadata = {
  title: "Nomeo Coliving 1.0",
  description: "Generated by create next app and typed with love.",
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const currentUser:any = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunitoRegular.className}>
        <ToasterProvider/>
        <SignIn/>
        <SignUp/>
        <NavBar currentUser={currentUser}/>
        {children}
      </body>
    </html>
  );
}
