import * as React from "react";
import { FolderCode, BookOpen, Library, Terminal, User, FileText, Mail, ArrowUpRight } from "lucide-react";

const quotes = [
  '"simplicity is the ultimate sophistication."',
  '"first, solve the problem. then, write the code."',
  '"i use arch, by the way."',
  '"memory safety is nice, memory discipline is nicer"',
  '"code is like humor. when you have to explain it, it\'s bad."',
  '"talk is cheap. show me the code."',
  '"programs must be written for people to read, and only incidentally for machines to execute."'
];

export default function HomeDashboard() {
  const [quoteText, setQuoteText] = React.useState("");

  React.useEffect(() => {
    let quoteIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: any;

    const type = () => {
      const currentQuote = quotes[quoteIndex];

      if (isDeleting) {
        setQuoteText(currentQuote.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setQuoteText(currentQuote.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 30 : 60;

      if (!isDeleting && charIndex === currentQuote.length) {
        isDeleting = true;
        typeSpeed = 3000; // Pause at end of quote
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        quoteIndex = (quoteIndex + 1) % quotes.length;
        typeSpeed = 500; // Pause before typing next quote
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full py-4 text-center max-w-xl mx-auto font-mono">
      {/* Header with Avatar at the side */}
      <header className="mb-8 flex items-center gap-4 text-left w-full">
        <div className="relative group flex-shrink-0">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-accent/40 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <img
            src="/icon.png"
            alt="damilare osibanjo"
            className="relative w-16 h-16 rounded-full object-cover border border-border/80"
          />
        </div>

        <div className="flex flex-col justify-center min-h-[64px]">
          <h1 className="text-base font-semibold tracking-wider text-white lowercase">
            damilare
          </h1>
          {/* Typewriter quote subtitle with live status dot */}
          <div className="flex items-start gap-2 mt-1 min-h-[32px] sm:min-h-[24px]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0 mt-1"></span>
            <p className="text-[10px] text-text-muted lowercase leading-relaxed cursor-block max-w-md">
              {quoteText}
            </p>
          </div>
        </div>
      </header>

      {/* Main Navigation Bento Grid */}
      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-10 text-xs">
        {/* Projects (Double width on desktop) */}
        <a
          href="/projects"
          className="sm:col-span-2 group relative overflow-hidden bg-surface/40 backdrop-blur-sm border border-border/60 hover:border-accent/40 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between min-h-[90px] text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <FolderCode className="w-4 h-4 text-accent" />
              <span className="font-semibold text-white lowercase">dami.projects</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors duration-200" />
          </div>
          <p className="text-[10px] text-text-muted mt-2 lowercase leading-relaxed group-hover:text-text transition-colors duration-200">
            systems-level open-source work — kernels, compilers, emulators, runtimes, and tools.
          </p>
          <span className="absolute bottom-2 right-3 text-[9px] text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            [execute]
          </span>
        </a>

        {/* Blog */}
        <a
          href="/blog"
          className="group relative overflow-hidden bg-surface/40 backdrop-blur-sm border border-border/60 hover:border-accent/40 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between min-h-[90px] text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="font-semibold text-white lowercase">dami.code</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors duration-200" />
          </div>
          <p className="text-[10px] text-text-muted mt-2 lowercase leading-relaxed group-hover:text-text transition-colors duration-200">
            technical articles and low-level research notes.
          </p>
          <span className="absolute bottom-2 right-3 text-[9px] text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            [read]
          </span>
        </a>

        {/* Wiki */}
        <a
          href="/wiki"
          className="group relative overflow-hidden bg-surface/40 backdrop-blur-sm border border-border/60 hover:border-accent/40 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between min-h-[90px] text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <Library className="w-4 h-4 text-accent" />
              <span className="font-semibold text-white lowercase">dami.wiki</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors duration-200" />
          </div>
          <p className="text-[10px] text-text-muted mt-2 lowercase leading-relaxed group-hover:text-text transition-colors duration-200">
            personal encyclopedia, biography, and achievements.
          </p>
          <span className="absolute bottom-2 right-3 text-[9px] text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            [explore]
          </span>
        </a>

        {/* Uses */}
        <a
          href="/uses"
          className="group relative overflow-hidden bg-surface/40 backdrop-blur-sm border border-border/60 hover:border-accent/40 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between min-h-[90px] text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-accent" />
              <span className="font-semibold text-white lowercase">dami.uses</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors duration-200" />
          </div>
          <p className="text-[10px] text-text-muted mt-2 lowercase leading-relaxed group-hover:text-text transition-colors duration-200">
            my dev setup, hardware, software, and configurations.
          </p>
          <span className="absolute bottom-2 right-3 text-[9px] text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            [inspect]
          </span>
        </a>

        {/* About */}
        <a
          href="/about"
          className="group relative overflow-hidden bg-surface/40 backdrop-blur-sm border border-border/60 hover:border-accent/40 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between min-h-[90px] text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-accent" />
              <span className="font-semibold text-white lowercase">dami.about</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors duration-200" />
          </div>
          <p className="text-[10px] text-text-muted mt-2 lowercase leading-relaxed group-hover:text-text transition-colors duration-200">
            journey, background, and programming philosophy.
          </p>
          <span className="absolute bottom-2 right-3 text-[9px] text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            [query]
          </span>
        </a>

        {/* Resume */}
        <a
          href="/resume"
          className="group relative overflow-hidden bg-surface/40 backdrop-blur-sm border border-border/60 hover:border-accent/40 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between min-h-[90px] text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-accent" />
              <span className="font-semibold text-white lowercase">dami.resume</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors duration-200" />
          </div>
          <p className="text-[10px] text-text-muted mt-2 lowercase leading-relaxed group-hover:text-text transition-colors duration-200">
            work experience, credentials, and qualifications.
          </p>
          <span className="absolute bottom-2 right-3 text-[9px] text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            [retrieve]
          </span>
        </a>

        {/* Contact */}
        <a
          href="/contact"
          className="group relative overflow-hidden bg-surface/40 backdrop-blur-sm border border-border/60 hover:border-accent/40 rounded-lg p-4 transition-all duration-300 flex flex-col justify-between min-h-[90px] text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-accent" />
              <span className="font-semibold text-white lowercase">dami.contact</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors duration-200" />
          </div>
          <p className="text-[10px] text-text-muted mt-2 lowercase leading-relaxed group-hover:text-text transition-colors duration-200">
            send a message or get in touch directly.
          </p>
          <span className="absolute bottom-2 right-3 text-[9px] text-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            [connect]
          </span>
        </a>
      </nav>

      {/* Footer links */}
      <footer className="w-full pt-4 border-t border-border/40 flex flex-col items-center gap-2 text-[10px] text-text-muted font-mono">
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/dev-dami"
            target="_blank"
            className="hover:text-white transition-colors duration-200 lowercase"
          >
            gh
          </a>
          <a
            href="https://www.linkedin.com/in/damilare-osibanjo/"
            target="_blank"
            className="hover:text-white transition-colors duration-200 lowercase"
          >
            linkedin
          </a>
          <a
            href="mailto:dami@varityweb.com"
            className="hover:text-white transition-colors duration-200 lowercase"
          >
            email
          </a>
        </div>
        <div className="lowercase text-[9px] opacity-80 mt-1">
          &copy; {new Date().getFullYear()} damilare osibanjo · built with astro
        </div>
        <div className="text-[8px] opacity-60">
          press <kbd className="px-1 py-0.5 bg-surface border border-border/40 rounded">ctrl</kbd> + <kbd className="px-1 py-0.5 bg-surface border border-border/40 rounded">k</kbd> to search
        </div>
      </footer>
    </div>
  );
}
