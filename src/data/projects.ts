export interface Project {
  slug: string;
  name: string;
  number: string;
  description: string;
  tags: string[];
  githubUrl: string;
  npm?: boolean;
  language?: string;
  license?: string;
}

export const projects: Project[] = [
  {
    slug: "karion-os",
    name: "karion_os",
    number: "01",
    description:
      "A bare-metal x86 OS kernel written in Rust. Unix-like shell, block filesystem, text editor, BASIC interpreter, and built-in games. Ported from C — the borrow checker caught data races the original never would.",
    tags: ["Rust", "x86", "OS", "Systems"],
    githubUrl: "https://github.com/dev-dami/Karion-OS",
    language: "Rust",
    license: "MIT",
  },
  {
    slug: "carv",
    name: "carv",
    number: "02",
    description:
      "Statically-typed systems language that compiles to C. Ownership-based memory, pipe operators, async/await, and a module system. Built in Go.",
    tags: ["Go", "Compiler", "Language Design", "Systems"],
    githubUrl: "https://github.com/dev-dami/carv",
    language: "Go",
    license: "MIT",
  },
  {
    slug: "zario",
    name: "zario",
    number: "03",
    description:
      "Minimal fast logging library for TypeScript. Zero external dependencies — multiple transports, child loggers, async non-blocking writes, structured JSON.",
    tags: ["TypeScript", "Bun", "Logging", "Zero-dep"],
    githubUrl: "https://github.com/dev-dami/zario",
    npm: true,
    language: "TypeScript",
    license: "MIT",
  },
  {
    slug: "ignite",
    name: "ignite",
    number: "04",
    description:
      "Bun-first local execution framework for JS/TS microservices with Docker-based isolation. Secure sandbox for AI-generated and untrusted code.",
    tags: ["TypeScript", "Bun", "Docker", "Sandbox"],
    githubUrl: "https://github.com/dev-dami/ignite",
    language: "TypeScript",
    license: "MIT",
  },
  {
    slug: "qirrel",
    name: "qirrel",
    number: "05",
    description:
      "Extensible NLP framework in TypeScript for fast, structured text analysis. Tokenization, entity extraction, LLM enrichment, caching, and MCP agent integration.",
    tags: ["TypeScript", "NLP", "LLM", "Bun"],
    githubUrl: "https://github.com/dev-dami/Qirrel",
    language: "TypeScript",
    license: "MIT",
  },
  {
    slug: "gim",
    name: "gim",
    number: "06",
    description:
      "High-performance system metrics CLI in Rust. Monitors CPU, memory, disk, and network with modular design and multiple output formats.",
    tags: ["Rust", "CLI", "Monitoring", "Performance"],
    githubUrl: "https://github.com/dev-dami/gim",
    language: "Rust",
    license: "MIT",
  },
  {
    slug: "gbemu",
    name: "gbemu",
    number: "07",
    description:
      "A Game Boy emulator written in Zig. Cycle-accurate CPU emulation, PPU scanline rendering, timer synchronization, and MBC1 cartridge support. Built from scratch — no dependencies.",
    tags: ["Zig", "Emulator", "Game Boy", "Systems"],
    githubUrl: "https://github.com/dev-dami/gbemu",
    license: "MIT",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectByGithubUrl(url: string): Project | undefined {
  return projects.find((p) => p.githubUrl === url);
}
