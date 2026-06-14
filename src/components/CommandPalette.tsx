import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Github, Linkedin, Mail, ExternalLink, Code, User } from "lucide-react";

const searchItems = [
  {
    category: "pages",
    items: [
      { title: "home", url: "/", icon: FileText, description: "overview and projects" },
      { title: "about", url: "/about", icon: User, description: "learn about damilare" },
      { title: "blog", url: "/blog", icon: FileText, description: "articles and thoughts" },
      { title: "wiki", url: "/wiki", icon: FileText, description: "personal wiki" },
      { title: "uses", url: "/uses", icon: Code, description: "development setup" },
      { title: "resume", url: "/resume", icon: User, description: "work experience and projects" },
      { title: "contact", url: "/contact", icon: Mail, description: "get in touch" },
    ]
  },
  {
    category: "projects",
    items: [
      { title: "carv", url: "https://github.com/dev-dami/carv", icon: Code, description: "systems programming language that compiles to c", external: true },
      { title: "ignite", url: "https://github.com/dev-dami/ignite", icon: Code, description: "bun-first local execution framework", external: true },
      { title: "qirrel", url: "https://github.com/dev-dami/Qirrel", icon: Code, description: "nlp framework for text analysis", external: true },
      { title: "gim", url: "https://github.com/dev-dami/gim", icon: Code, description: "system metrics cli tool in rust", external: true },
      { title: "zario", url: "https://github.com/dev-dami/zario", icon: Code, description: "fast logging solution for typescript", external: true },
    ]
  },
  {
    category: "connect",
    items: [
      { title: "github", url: "https://github.com/dev-dami", icon: Github, description: "@dev-dami", external: true },
      { title: "linkedin", url: "https://www.linkedin.com/in/damilare-osibanjo/", icon: Linkedin, description: "professional profile", external: true },
      { title: "email", url: "mailto:dami@varityweb.com", icon: Mail, description: "dami@varityweb.com", external: true },
    ]
  }
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredItems = React.useMemo(() => {
    if (!query) return searchItems;
    return searchItems.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(category => category.items.length > 0);
  }, [query]);

  const flatItems = React.useMemo(() => {
    return filteredItems.flatMap(category => category.items);
  }, [filteredItems]);

  const handleSelect = (url: string, external?: boolean) => {
    if (external) {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
    setIsOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, flatItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + Math.max(1, flatItems.length)) % Math.max(1, flatItems.length));
    } else if (e.key === "Enter" && flatItems[selectedIndex]) {
      e.preventDefault();
      const item = flatItems[selectedIndex];
      handleSelect(item.url, item.external);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg/70 backdrop-blur-xs"
            onClick={() => {
              setIsOpen(false);
              setQuery("");
            }}
          />
          
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="relative w-full max-w-md pointer-events-auto border border-border/60 bg-surface/98 backdrop-blur-md shadow-2xl overflow-hidden font-mono"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40">
                <Search className="w-4 h-4 text-text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="search..."
                  className="flex-1 bg-transparent text-white placeholder:text-text-muted outline-none text-xs lowercase"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] text-text-muted bg-border/20 rounded">
                  <span>esc</span>
                </kbd>
              </div>

              <div className="max-h-80 overflow-y-auto py-2">
                {filteredItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-text-muted text-xs">
                    <p>no results found for "{query}"</p>
                  </div>
                ) : (
                  filteredItems.map((category, categoryIndex) => (
                    <div key={category.category} className="mb-2">
                      <div className="px-4 py-1.5 text-[9px] font-semibold text-text-muted uppercase tracking-wider">
                        // {category.category}
                      </div>
                      {category.items.map((item, itemIndex) => {
                        const flatIndex = flatItems.indexOf(item);
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.title}
                            onClick={() => handleSelect(item.url, item.external)}
                            className={`w-full px-4 py-2 flex items-center gap-3 text-left transition-colors lowercase text-xs ${
                              flatIndex === selectedIndex 
                                ? "bg-border/40 text-white" 
                                : "text-text-muted hover:bg-surface/50"
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${flatIndex === selectedIndex ? "text-accent" : "text-text-muted"}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-white">{item.title}</span>
                                {item.external && <ExternalLink className="w-3 h-3 text-text-muted/60" />}
                              </div>
                              <p className="text-[10px] text-text-muted truncate mt-0.5">{item.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-2 border-t border-border/40 bg-surface/30">
                <div className="flex items-center gap-4 text-[9px] text-text-muted">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-border/20 rounded text-text-muted">↑</kbd>
                    <kbd className="px-1 py-0.5 bg-border/20 rounded text-text-muted">↓</kbd>
                    <span>to navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-border/20 rounded text-text-muted">enter</kbd>
                    <span>to select</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
