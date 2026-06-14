import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";

interface Project {
  slug: string;
  name: string;
  number: string;
  description: string;
  tags: string[];
}

interface BlogPost {
  slug: string;
  data: {
    title: string;
    description: string;
    date: Date;
    tags: string[];
  };
}

interface Props {
  projects: Project[];
  posts: BlogPost[];
}

const slidesList = ["home", "projects", "blog", "uses", "about", "wiki", "resume", "contact"];

export default function LandingPage({ projects, posts }: Props) {
  const [currentSlide, setCurrentSlide] = React.useState("home");
  const [direction, setDirection] = React.useState(1); // 1 = right, -1 = left

  const slideIndex = slidesList.indexOf(currentSlide);

  const setSlideWithDirection = (targetSlide: string) => {
    const targetIndex = slidesList.indexOf(targetSlide);
    const currentIndex = slidesList.indexOf(currentSlide);
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setCurrentSlide(targetSlide);
  };

  const nextSlide = () => {
    const nextIndex = (slideIndex + 1) % slidesList.length;
    setDirection(1);
    setCurrentSlide(slidesList[nextIndex]);
  };

  const prevSlide = () => {
    const prevIndex = (slideIndex - 1 + slidesList.length) % slidesList.length;
    setDirection(-1);
    setCurrentSlide(slidesList[prevIndex]);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  // Framer Motion variants for slide transitions
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeInOut" },
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[72vh] text-center max-w-md mx-auto font-mono relative overflow-hidden px-2 select-none">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full py-8 flex flex-col items-center justify-center min-h-[50vh]"
        >
          {currentSlide === "home" && (
            <div className="w-full flex flex-col items-center">
              <header className="mb-8">
                <h1 className="text-xl font-medium text-white tracking-tight lowercase">
                  damilare
                </h1>
                <p className="text-xs text-text-muted mt-1 lowercase">
                  builds things
                </p>
              </header>

              <nav className="flex flex-col items-center gap-4 w-full mb-8 text-xs">
                <button
                  onClick={() => setSlideWithDirection("projects")}
                  className="text-text hover:text-white transition-colors duration-200 lowercase cursor-pointer"
                >
                  dami.projects
                </button>
                <button
                  onClick={() => setSlideWithDirection("blog")}
                  className="text-text hover:text-white transition-colors duration-200 lowercase cursor-pointer"
                >
                  dami.code (blog)
                </button>
                <button
                  onClick={() => setSlideWithDirection("uses")}
                  className="text-text hover:text-white transition-colors duration-200 lowercase cursor-pointer"
                >
                  dami.uses
                </button>
                <button
                  onClick={() => setSlideWithDirection("about")}
                  className="text-text hover:text-white transition-colors duration-200 lowercase cursor-pointer"
                >
                  dami.about
                </button>
                <button
                  onClick={() => setSlideWithDirection("wiki")}
                  className="text-text hover:text-white transition-colors duration-200 lowercase cursor-pointer"
                >
                  dami.wiki
                </button>
                <button
                  onClick={() => setSlideWithDirection("resume")}
                  className="text-text hover:text-white transition-colors duration-200 lowercase cursor-pointer"
                >
                  dami.resume
                </button>
                <button
                  onClick={() => setSlideWithDirection("contact")}
                  className="text-text hover:text-white transition-colors duration-200 lowercase cursor-pointer"
                >
                  dami.contact
                </button>
              </nav>

              <footer className="w-full pt-6 border-t border-border/40 flex justify-center gap-6 text-[10px] text-text-muted">
                <a href="https://github.com/dev-dami" target="_blank" className="hover:text-white transition-colors duration-200 lowercase">
                  gh
                </a>
                <a href="https://www.linkedin.com/in/damilare-osibanjo/" target="_blank" className="hover:text-white transition-colors duration-200 lowercase">
                  linkedin
                </a>
                <a href="mailto:dami@varityweb.com" className="hover:text-white transition-colors duration-200 lowercase">
                  email
                </a>
              </footer>
            </div>
          )}

          {currentSlide === "projects" && (
            <div className="w-full text-left">
              <header className="mb-6 text-center">
                <button onClick={() => setSlideWithDirection("home")} className="text-text-muted hover:text-white transition-colors text-[10px] mb-2 cursor-pointer">
                  &lt;- back
                </button>
                <h2 className="text-sm font-semibold tracking-widest text-white uppercase">// projects</h2>
              </header>
              <div className="space-y-6 max-h-[38vh] overflow-y-auto pr-1 scrollbar-thin">
                {projects.map(p => (
                  <article key={p.slug} className="group">
                    <div className="flex items-baseline justify-between mb-1 lowercase">
                      <h3 className="text-xs font-semibold text-white group-hover:text-accent transition-colors">
                        <a href={`/projects/${p.slug}`} className="hover:underline">{p.name}</a>
                      </h3>
                      <span className="text-[9px] text-text-muted">{p.number}</span>
                    </div>
                    <p className="text-[10px] text-text-muted leading-relaxed mb-1 lowercase font-mono">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[9px] text-text-muted/60 lowercase">
                      {p.tags.slice(0, 3).map(t => <span key={t}>#{t}</span>)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {currentSlide === "blog" && (
            <div className="w-full text-left">
              <header className="mb-6 text-center">
                <button onClick={() => setSlideWithDirection("home")} className="text-text-muted hover:text-white transition-colors text-[10px] mb-2 cursor-pointer">
                  &lt;- back
                </button>
                <h2 className="text-sm font-semibold tracking-widest text-white uppercase">// blog</h2>
              </header>
              <div className="space-y-6 max-h-[38vh] overflow-y-auto pr-1 scrollbar-thin">
                {posts.map(post => {
                  const date = new Date(post.data.date);
                  return (
                    <article key={post.slug} className="group">
                      <h3 className="text-xs font-semibold text-white group-hover:text-accent transition-colors mb-1 lowercase">
                        <a href={`/blog/${post.slug}`} className="hover:underline">{post.data.title}</a>
                      </h3>
                      <p className="text-[10px] text-text-muted leading-relaxed mb-1 lowercase">
                        {post.data.description}
                      </p>
                      <div className="text-[9px] text-text-muted/50 lowercase">
                        {date.toDateString().toLowerCase()}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {currentSlide === "uses" && (
            <div className="w-full text-left font-mono">
              <header className="mb-6 text-center">
                <button onClick={() => setSlideWithDirection("home")} className="text-text-muted hover:text-white transition-colors text-[10px] mb-2 cursor-pointer">
                  &lt;- back
                </button>
                <h2 className="text-sm font-semibold tracking-widest text-white uppercase">// uses</h2>
              </header>
              <div className="space-y-4 max-h-[38vh] overflow-y-auto pr-1 scrollbar-thin text-[10px] text-text-muted lowercase">
                <div>
                  <span className="text-white">machine:</span> hp laptop (i3-8130u, 8gb ram, 900gb ssd)
                </div>
                <div>
                  <span className="text-white">os & shell:</span> endeavouros (arch linux) & fish
                </div>
                <div>
                  <span className="text-white">editor:</span> neovim (tokyonight.nvim)
                </div>
                <div>
                  <span className="text-white">languages:</span> rust, go, zig, typescript, python, c
                </div>
                <div>
                  <span className="text-white">cli:</span> lazygit, ripgrep, fzf, docker, eza
                </div>
              </div>
            </div>
          )}

          {currentSlide === "about" && (
            <div className="w-full text-left font-mono">
              <header className="mb-6 text-center">
                <button onClick={() => setSlideWithDirection("home")} className="text-text-muted hover:text-white transition-colors text-[10px] mb-2 cursor-pointer">
                  &lt;- back
                </button>
                <h2 className="text-sm font-semibold tracking-widest text-white uppercase">// about</h2>
              </header>
              <div className="space-y-3 max-h-[38vh] overflow-y-auto pr-1 scrollbar-thin text-[10px] text-text-muted lowercase leading-relaxed">
                <p>
                  17-year-old systems and backend programmer focusing on compilers, cybersecurity, and high-performance infrastructure.
                </p>
                <p>
                  started coding around age 12 with roblox lua scripting. transitioned into python backend work, and later moved deeper into rust, go, c, and zig for bare-metal kernels and low-level runtime designs.
                </p>
              </div>
            </div>
          )}

          {currentSlide === "wiki" && (
            <div className="w-full text-left font-mono">
              <header className="mb-6 text-center">
                <button onClick={() => setSlideWithDirection("home")} className="text-text-muted hover:text-white transition-colors text-[10px] mb-2 cursor-pointer">
                  &lt;- back
                </button>
                <h2 className="text-sm font-semibold tracking-widest text-white uppercase">// wiki</h2>
              </header>
              <div className="space-y-4 max-h-[38vh] overflow-y-auto pr-1 scrollbar-thin text-[10px] text-text-muted lowercase leading-relaxed">
                <div>
                  <span className="text-white">born:</span> 2008 (age 17) · nigeria
                </div>
                <div>
                  <span className="text-white">occupation:</span> systems programmer, compiler engineer
                </div>
                <div>
                  <span className="text-white">notables:</span> carv systems language, game boy emulator in zig, kiattp http client
                </div>
                <p className="border-t border-border/40 pt-3">
                  advocates for explicit, abstraction-light software engineering. building from scratch teaches execution trade-offs that application-level developers rarely see.
                </p>
              </div>
            </div>
          )}

          {currentSlide === "resume" && (
            <div className="w-full text-left font-mono">
              <header className="mb-6 text-center">
                <button onClick={() => setSlideWithDirection("home")} className="text-text-muted hover:text-white transition-colors text-[10px] mb-2 cursor-pointer">
                  &lt;- back
                </button>
                <h2 className="text-sm font-semibold tracking-widest text-white uppercase">// resume</h2>
              </header>
              <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-1 scrollbar-thin text-[10px] text-text-muted lowercase leading-relaxed mb-4">
                <div>
                  <span className="text-white">summary:</span> 5+ years building low-level compilers, kernels, and JS sandbox environments.
                </div>
                <div>
                  <span className="text-white">selected work:</span>
                  <ul className="list-none pl-2 space-y-2 mt-1">
                    <li>- karion_os: x86 kernel in rust</li>
                    <li>- carv: statically-typed language in go</li>
                    <li>- zario: zero-dependency logger for typescript</li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <a href="/resume" className="text-accent hover:text-white underline text-[10px]">
                  [view print version]
                </a>
              </div>
            </div>
          )}

          {currentSlide === "contact" && (
            <div className="w-full">
              <header className="mb-6 text-center">
                <button onClick={() => setSlideWithDirection("home")} className="text-text-muted hover:text-white transition-colors text-[10px] mb-2 cursor-pointer">
                  &lt;- back
                </button>
                <h2 className="text-sm font-semibold tracking-widest text-white uppercase">// contact</h2>
              </header>
              <div className="max-h-[38vh] overflow-y-auto px-1 scrollbar-thin">
                <ContactForm />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Horizontal Nav Controls */}
      <div className="flex items-center gap-6 text-[10px] text-text-muted font-mono mt-4 lowercase">
        <button onClick={prevSlide} className="hover:text-white transition-colors cursor-pointer">
          &lt;- prev
        </button>
        <span className="select-none">{slideIndex + 1} / {slidesList.length}</span>
        <button onClick={nextSlide} className="hover:text-white transition-colors cursor-pointer">
          next -&gt;
        </button>
      </div>
    </div>
  );
}
