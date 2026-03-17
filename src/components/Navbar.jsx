import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo.png'
import { Home, User, Briefcase, Laptop, Mail } from "lucide-react";

const navLinks = [
  { id: "home", text: "Home", path: "/", Icon: Home },
  { id: "about", text: "About", path: "/about", Icon: User },
  { id: "experience", text: "Experience", path: "/experience", Icon: Briefcase },
  { id: "projects", text: "Projects", path: "/projects", Icon: Laptop },
  { id: "contact", text: "Contact", path: "/contact", Icon: Mail },
];

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Derive active id from current pathname
  const activeId = (() => {
    const seg = location.pathname.split("/").filter(Boolean)[0] || "home";
    return seg;
  })();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
      <div className="md:fixed md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto">
        <div className="p-[2px] md:rounded-full nav-gradient-border">
          <nav className="bg-gray-900/100 backdrop-blur-md md:rounded-full px-4 md:px-6 py-2.5">
            {/* Mobile top bar */}
            <div className="flex justify-between items-center md:hidden px-2">
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="logo" className="w-7 h-7 rounded-xl" />
                <span className="text-white font-bold text-sm">Cem Sarp</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center gap-1 py-3 md:py-0">
                {/* Brand (desktop only) */}
                <Link
                  to="/"
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full mr-1"
                >
                  <img src={logo} alt="logo" className="w-6 h-6 rounded-lg" />
                </Link>

                {navLinks.map(({ id, text, path, Icon }) => (
                  <Link
                    key={id}
                    to={path}
                    className={`px-4 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium
                      transition-all duration-200 flex items-center gap-2
                      hover:bg-white/10 hover:text-white
                      ${activeId === id
                        ? "bg-white/15 text-white"
                        : "text-gray-300"
                      }
                    `}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <style>{`
        .nav-gradient-border {
          background: linear-gradient(90deg, #34d399, #06b6d4, #6366f1);
          background-size: 200% 200%;
          animation: nav-grad 3s linear infinite;
        }
        @keyframes nav-grad {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
      `}</style>
    </header>
  );
}
