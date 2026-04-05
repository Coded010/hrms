import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    title: "Sign in",
    description: "Enter your credentials to access your dashboard",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="light" className={cn("font-sans", geist.variable)}>
            <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
