import { Poppins } from "next/font/google";
import "./globals.css";

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
        <html lang="en" data-theme="light">
            <body className={`${poppins.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
