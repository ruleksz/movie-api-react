import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/30 text-yellow-400 py-4 px-6 flex items-center justify-between z-50 shadow-lg">
            <Link
                to="/"
                className="text-2xl font-bold tracking-wide hover:text-yellow-400 transition"
            >
                Movie<span className="text-white">App</span>
            </Link>

            <ul className="flex space-x-6">
                <li>
                    <Link to="/" className="hover:text-yellow-600 transition">
                        Home
                    </Link>
                </li>
                <li>
                    <a
                        href="https://www.omdbapi.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-600 transition"
                    >
                        OMDb API
                    </a>
                </li>
            </ul>
        </nav>
    );
}
