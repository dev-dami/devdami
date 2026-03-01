import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Github, Linkedin, Mail, ExternalLink, Code, User } from "lucide-react";

const searchItems = [
  {
    category: "Pages",
    items: [
      { title: "Home", url: "/", icon: FileText, description: "Overview and projects" },
      { title: "About", url: "/about", icon: User, description: "Learn about Damilare" },
      { title: "Blog", url: "/blog", icon: FileText, description: "Articles and thoughts" },
    ]
  },
  {
    category: "Projects",
    items: [
      { title: "Carv", url: "https://github.com/dev-dami/carv", icon: Code, description: "Systems programming language that compiles to C", external: true },
      { title: "Ignite", url: "https://github.com/dev-dami/ignite", icon: Code, description: "Bun-first local execution framework", external: true },
      { title: "Qirrel", url: "https://github.com/dev-dami/Qirrel", icon: Code, description: "NLP framework for text analysis", external: true },
      { title: "gim", url: "https://github.com/dev-dami/gim", icon: Code, description: "System metrics CLI tool in Rust", external: true },
      { title: "Zario", url: "https://github.com/dev-dami/zario", icon: Code, description: "Fast logging solution for TypeScript", external: true },
    ]
  },
  {
    category: "Connect",
    items: [
      { title: "GitHub", url: "https://github.com/dev-dami", icon: Github, description: "@dev-dami", external: true },
      { title: "LinkedIn", url: "https://www.linkedin.com/in/damilare-osibanjo/", icon: Linkedin, description: "Professional profile", external: true },
      { title: "Email", url: "mailto:damiosi5banjo@gmail.com", icon: Mail, description: "damiosi5banjo@gmail.com", external: true },
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
            className="fixed inset-0 z-50 bg-bg/60 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false);
              setQuery("");
            }}
          />
          
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-2xl pointer-events-auto rounded-xl border border-border/80 bg-surface/98 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
                <Search className="w-5 h-5 text-text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, projects, or links..."
                  className="flex-1 bg-transparent text-text-dark placeholder:text-text-muted outline-none text-base"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-text-muted bg-border/30 rounded">
                  <span>ESC</span>
                </kbd>
              </div>

              <div className="max-h-96 overflow-y-auto py-2">
                {filteredItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-text-muted">
                    <p>No results found for "{query}"</p>
                  </div>
                ) : (
                  filteredItems.map((category, categoryIndex) => (
                    <div key={category.category} className="mb-2">
                      <div className="px-4 py-2 text-xs font-medium text-text-muted uppercase tracking-wider">
                        {category.category}
                      </div>
                      {category.items.map((item, itemIndex) => {
                        const flatIndex = flatItems.indexOf(item);
                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={item.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: itemIndex * 0.03 }}
                            onClick={() => handleSelect(item.url, item.external)}
                            className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                              flatIndex === selectedIndex 
                                ? "bg-accent/20 text-text-dark" 
                                : "text-text hover:bg-surface/50"
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${flatIndex === selectedIndex ? "text-accent" : "text-text-muted"}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-text-dark">{item.title}</span>
                                {item.external && <ExternalLink className="w-3 h-3 text-text-muted" />}
                              </div>
                              <p className="text-sm text-text-muted truncate">{item.description}</p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-2 border-t border-border/50 bg-surface/50">
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-border/30 rounded text-text">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-border/30 rounded text-text">↓</kbd>
                    <span>to navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-border/30 rounded text-text">↵</kbd>
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
