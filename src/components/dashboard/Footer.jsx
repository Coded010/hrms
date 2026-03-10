// -- Footer component
export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="h-12 min-h-12 bg-white border-t border-[#e8ede9] flex items-center px-6 gap-4"
            role="contentinfo"
        >
            <span className="text-[11.5px] text-gray-400">
                &copy; {year} Department Management System
            </span>

            <div className="flex-1" aria-hidden="true" />

            <nav className="flex items-center gap-5" aria-label="Footer links">
                <a
                    href="/privacy-policy"
                    className="text-[11.5px] text-gray-400 no-underline transition-colors duration-150 hover:text-[#5bb98b]"
                    id="footer-privacy-link"
                >
                    Privacy Policy
                </a>
                <a
                    href="/support"
                    className="text-[11.5px] text-gray-400 no-underline transition-colors duration-150 hover:text-[#5bb98b]"
                    id="footer-support-link"
                >
                    Support Center
                </a>
                <span
                    className="text-[11.5px] text-[#c4ccc6] font-medium"
                    aria-label="Application version"
                >
                    v0.1.0&#8209;unstable
                </span>
            </nav>
        </footer>
    );
}
