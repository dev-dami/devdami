import * as React from "react";
import { Github } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isShrunk, setIsShrunk] = React.useState(false);

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

  return (
    <nav className="sticky top-4 z-50 flex justify-center px-4">
      <div
        className={`flex items-center gap-6 px-5 py-2.5 rounded-full border border-border/80 bg-bg/80 backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 hover:border-accent/50 hover:bg-bg/95 ${
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
            className={`font-medium tracking-tight text-sm text-primary group-hover:text-accent transition-all duration-300 overflow-hidden whitespace-nowrap sm:block ${
              isShrunk ? "nav-title-hidden" : ""
            }`}
          >
            Damilare Osibanjo
          </span>
        </a>

        <div className="flex items-center gap-1">
          <div
            className={`nav-divider h-4 w-px bg-border/50 transition-all duration-300 ${
              isShrunk ? "nav-divider-hidden" : ""
            }`}
          ></div>
          <a
            href="/#projects"
            className={`nav-link px-3 py-1.5 text-sm text-secondary hover:text-primary hover:bg-surface/50 rounded-full transition-all ${
              isShrunk ? "nav-link-hidden" : ""
            }`}
          >
            Projects
          </a>
          <a
            href="/about"
            className={`nav-link px-3 py-1.5 text-sm text-secondary hover:text-primary hover:bg-surface/50 rounded-full transition-all ${
              isShrunk ? "nav-link-hidden" : ""
            }`}
          >
            About
          </a>
          <a
            href="/blog"
            className={`nav-link px-3 py-1.5 text-sm text-secondary hover:text-primary hover:bg-surface/50 rounded-full transition-all ${
              isShrunk ? "nav-link-hidden" : ""
            }`}
          >
            Blog
          </a>
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
      </div>
    </nav>
  );
}
