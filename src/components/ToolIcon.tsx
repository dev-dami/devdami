import * as React from "react";
import {
  Code2,
  FileCode,
  Terminal,
  GitBranch,
  Monitor,
  HardDrive,
  Zap,
  Globe2,
  Search,
  FolderOpen,
  Box,
  Keyboard,
  Cpu,
  Laptop,
  Layers,
  Settings,
  Paintbrush,
  Anchor,
  AlignLeft,
  History,
  MessageSquare,
  Type,
  Activity,
  Braces,
  Compass,
  ChevronRight,
  FolderTree,
  Shell
} from "lucide-react";

const deviconMap: Record<string, string> = {
  rust: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  zig: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zig/zig-original.svg",
  ts: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  bun: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  c: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  arch: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/archlinux/archlinux-original.svg",
  linux: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  kde: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kde/kde-original.svg",
  nvim: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neovim/neovim-original.svg",
  neovim: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neovim/neovim-original.svg",
  firefox: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firefox/firefox-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  bash: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  tmux: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tmux/tmux-original.svg",
};

const lucideMap: Record<string, any> = {
  machine: Laptop,
  cpu: Cpu,
  ram: Layers,
  gpu: Monitor,
  ssd: HardDrive,
  keyboard: Keyboard,
  firefox: Globe2,
  endeavouros: Monitor,
  kernel: Settings,
  kwin: Layers,
  fish: Shell,
  starship: Zap,
  yay: Box,
  tokyonight: Paintbrush,
  telescope: Search,
  cmp: Code2,
  harpoon: Anchor,
  tree: FolderOpen,
  lualine: AlignLeft,
  fugitive: GitBranch,
  undotree: History,
  autopairs: Braces,
  comment: MessageSquare,
  treesitter: FolderTree,
  lsp: Settings,
  discord: MessageSquare,
  alacritty: Terminal,
  font: Type,
  yazi: FolderOpen,
  lazygit: GitBranch,
  ripgrep: Search,
  fd: FolderOpen,
  fzf: Search,
  bat: FileCode,
  eza: FolderOpen,
  btop: Activity,
  jq: Braces,
  zoxide: Compass,
};

export default function ToolIcon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const cleanName = name.toLowerCase().trim();
  
  if (deviconMap[cleanName]) {
    return (
      <img
        src={deviconMap[cleanName]}
        alt={name}
        className={`${className} inline-block select-none align-middle filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300`}
        loading="lazy"
      />
    );
  }

  const IconComponent = lucideMap[cleanName];
  if (IconComponent) {
    return (
      <IconComponent 
        className={`${className} text-text-muted group-hover:text-accent transition-colors duration-300`} 
      />
    );
  }

  // Default fallback
  return <ChevronRight className={`${className} text-text-muted/40`} />;
}
