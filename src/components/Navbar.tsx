import * as React from "react";

export default function Navbar() {
  return (
    <nav className="w-full max-w-md mx-auto pt-8 pb-4 px-4 font-mono text-xs text-center lowercase">
      <div className="flex flex-col items-center gap-3">
        <a href="/" className="font-semibold text-white tracking-tight hover:text-accent transition-colors">
          damilare
        </a>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-text-muted">
          <a href="/projects" className="hover:text-white transition-colors">
            projects
          </a>
          <a href="/about" className="hover:text-white transition-colors">
            about
          </a>
          <a href="/blog" className="hover:text-white transition-colors">
            blog
          </a>
          <a href="/wiki" className="hover:text-white transition-colors">
            wiki
          </a>
          <a href="/uses" className="hover:text-white transition-colors">
            uses
          </a>
          <a href="/resume" className="hover:text-white transition-colors">
            resume
          </a>
        </div>
      </div>
    </nav>
  );
}
