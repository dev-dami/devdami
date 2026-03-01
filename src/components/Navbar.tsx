import * as React from "react";
import { Github, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isShrunk, setIsShrunk] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const scrollY = window.scrollY;
      const isScrollingDown = scrollY > lastScrollY;

      if (isScrollingDown && scrollY > 100) {
        setIsShrunk(true);
      } else if (!isScrollingDown && scrollY < 100) {
        setIsShrunk(false);
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "/#projects" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="sticky top-4 z-50 flex justify-center px-4 w-full">
      <div
        className={`flex items-center gap-3 md:gap-6 px-4 md:px-5 py-2.5 rounded-full border border-border/80 bg-bg/80 backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 hover:border-accent/50 hover:bg-bg/95 ${
          isShrunk ? "nav-shrunk" : ""
        }`}
      >
        <a href="/" className="flex items-center gap-3 group">
          <img
            src="https://avatars.githubusercontent.com/u/141376183"
            alt="Damilare Osibanjo"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-border/50 group-hover:ring-accent/50 transition-all duration-300"
          />
          <span
            className={`font-medium tracking-tight text-sm text-primary group-hover:text-accent transition-all duration-300 overflow-hidden whitespace-nowrap hidden sm:block ${
              isShrunk ? "nav-title-hidden" : ""
            }`}
          >
            Damilare Osibanjo
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <div
            className={`nav-divider h-4 w-px bg-border/50 transition-all duration-300 ${
              isShrunk ? "nav-divider-hidden" : ""
            }`}
          ></div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link px-3 py-1.5 text-sm text-secondary hover:text-primary hover:bg-surface/50 rounded-full transition-all ${
                isShrunk ? "nav-link-hidden" : ""
              }`}
            >
              {link.name}
            </a>
          ))}
          <div
            className={`nav-divider h-4 w-px bg-border/50 transition-all duration-300 ${
              isShrunk ? "nav-divider-hidden" : ""
            }`}
          ></div>
          <a
            href="https://github.com/dev-dami"
            target="_blank"
            className="nav-icon p-2 text-secondary hover:text-primary hover:bg-surface/50 rounded-full transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
           <a
            href="https://github.com/dev-dami"
            target="_blank"
            className="p-2 text-secondary hover:text-primary hover:bg-surface/50 rounded-full transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-secondary hover:text-primary hover:bg-surface/50 rounded-full transition-all"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute top-16 left-4 right-4 p-4 rounded-2xl border border-border bg-bg shadow-2xl flex flex-col gap-2 z-[60]"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-primary hover:bg-surface/50 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
