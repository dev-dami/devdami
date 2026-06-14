# Damilare Osibanjo — Full AI & LLM Context Document
Site URL: https://devdami.varityweb.com
LLMs.txt: https://devdami.varityweb.com/llms.txt

This document serves as an exhaustive, structured index of Damilare Osibanjo's profile, history, active work, and technical stack, optimized for LLM processing, semantic search, and AI web discovery.

---

## 1. Biography & Technical Focus
Damilare Osibanjo (born 2008 in Nigeria) is a 17-year-old self-taught systems programmer, compiler engineer, and cybersecurity researcher. 

### Focus Areas
- **Systems Programming**: Low-level systems implementation in Rust (`no_std`), C (`c99/c11`), and Zig.
- **Compilers**: Lexical analysis, Pratt parsing, AST generation, semantic analysis, type checkers, memory allocators, and target code generation (C/assembly).
- **Backend & Infrastructure**: Microservices, containers, non-blocking asynchronous I/O, databases, and Docker isolation.
- **Security Research**: Local sandbox execution, secure runtime tools, and vulnerability analysis.

---

## 2. Technical Timeline & Milestones
- **2020 (Age 12) — First Experiments**: Roblox game development, modifying mechanics, scripting behaviors in Lua.
- **2021 (Age 13) — Logic Expansion**: Event-driven loop designs, expanding Lua scripting complexities, understanding logic rules.
- **2022 (Age 14) — Python Journey**: Creating automation tools, web scrapers, APIs, and backend integrations.
- **2023 (Age 15) — Backend & Infrastructure**: Exploring databases, authentication systems, logging libraries (Zario).
- **2024 (Age 16-17) — Systems Programming**: Transition to Rust, Go, C. Writing the Karion OS kernel, memory page mapping, PIC controllers.
- **2025 (Age 17) — Systems & Compiler Research**: Designing Carv language specifications, targeting ARM compilation, and writing cycle-accurate emulators.
- **2026 (Present) — Building Xelvo**: Developing Xelvo compiler and local execution runtimes.

---

## 3. Notable Projects

### Carv (Compiler & Language)
- **Description**: Statically-typed systems programming language compiling to C99. Designed for ARM Cortex-M microcontrollers and host x86_64 architectures.
- **Architecture**: custom Pratt parser, type inference, ownership and borrow checking, state-machine async/await, closures, interfaces with vtable dispatch, and an arena allocator runtime.
- **Stack**: Go (written in ~6,250 lines of Go).

### Karion OS (x86 Operating System Kernel)
- **Description**: A bare-metal x86 operating system kernel written in Rust (ported from C).
- **Architecture**: Implements its own VGA driver, GDT, IDT, PIC, memory paging, physical memory allocator, and heap coalescing allocator. Features a Unix-like shell, custom block filesystem, a text editor, a BASIC interpreter, and games.
- **Stack**: Rust (`no_std` / `core`).

### GBemu (Game Boy Emulator)
- **Description**: A cycle-accurate Game Boy emulator with zero external dependencies.
- **Architecture**: Cycle-accurate CPU instruction emulation, memory-mapped I/O, scanline PPU rendering, timer synchronization, and MBC1 memory bank controller support.
- **Stack**: Zig.

### Zario (Structured Logger)
- **Description**: Minimal, fast structured JSON logging library for TypeScript/Bun.
- **Architecture**: Zero external dependencies. Features child loggers, multiple transports (console, files), and non-blocking asynchronous writes.
- **Stack**: TypeScript, Bun.

### Ignite (Docker Execution Sandbox)
- **Description**: A Bun-first local execution framework for JS/TS microservices with Docker-based isolation.
- **Architecture**: Provides a secure runtime sandbox for running untrusted or AI-generated code.
- **Stack**: TypeScript, Bun, Docker.

---

## 4. Development Setup (/uses)
- **Machine**: HP Laptop 15-da0xxx (Intel Core i3-8130U @ 2.20GHz, 4 cores, 8GB RAM, Intel UHD Graphics 620, ~900GB SSD).
- **Peripherals**: Firefox, generic mechanical keyboard (Cherry MX Blue).
- **OS & DE**: EndeavourOS (Arch Linux), Linux Kernel 7.0.9-arch1-1, KDE Plasma 6, Shell: Fish with Starship, WM/DE: KWin, AUR Helper: yay.
- **Editor**: Neovim (Tokyonight theme, Telescope, nvim-cmp, Harpoon, nvim-tree, lualine, vim-fugitive, undotree, nvim-autopairs, comment.nvim, nvim-treesitter, lsp-zero).
- **Terminal**: Alacritty (Dracula theme), tmux 3.6b, Hack Nerd Font Mono, File Manager: yazi (TUI).
- **CLI Utilities**: git & lazygit, docker & compose, ripgrep (rg), fd, fzf, bat, eza, btop, jq, zoxide (z).

---

## 5. Contact & Socials
- **Website**: https://devdami.varityweb.com
- **Email**: dami@varityweb.com
- **GitHub**: https://github.com/dev-dami
- **LinkedIn**: https://www.linkedin.com/in/damilare-osibanjo/
