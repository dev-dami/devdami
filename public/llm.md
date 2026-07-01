# Damilare Osibanjo — Full AI & LLM Context Document
Site URL: https://devdami.varityweb.com
LLM.txt: https://devdami.varityweb.com/llm.txt

This document serves as an exhaustive, structured index of Damilare Osibanjo's profile, history, active work, and technical stack, optimized for LLM processing, semantic search, and AI web discovery.

---

## 1. Biography & Technical Focus
Damilare Osibanjo (born 2008 in Nigeria) is a 17-year-old self-taught full stack systems developer and web programmer. He designs and implements low-level operating system kernels, programming language compilers, virtualization runtimes, and high-concurrency web architectures.

### Focus Areas
- **Systems & Kernel Engineering**: Low-level operating system implementation in Rust (`no_std`), memory paging, scheduling, and assembly setups (x86/ARM).
- **Compilers & Virtualization**: Lexical analysis, Pratt parsing, AST structures, LLVM compiler frontends, type checkers, and microVM sandboxing (KVM/Firecracker/Virtualization.framework).
- **Web Programming & Distributed Systems**: Low-latency web client architectures (React, Astro), non-blocking asynchronous APIs (Node.js, Bun), custom communication protocols, and high-concurrency WebSocket runtimes.

---

## 2. Technical Timeline & Milestones
- **2020 (Age 12) — First Experiments**: Roblox game development, Lua scripting, client-server replication, high-frequency physics ticks, and state synchronization.
- **2021 (Age 13) — Logic Expansion**: Event-driven loop designs, expanding Lua scripting complexities, understanding execution states.
- **2022 (Age 14) — Python Journey**: Creating automation tools, web scrapers, APIs, and backend integrations; analyzing GIL limits and memory footprints.
- **2023 (Age 15) — Distributed APIs & Systems**: High-concurrency web APIs, WebSocket servers, and zero-dependency logging architectures (Zario).
- **2024 (Age 16-17) — Kernel Engineering**: Writing the Karion OS kernel in Rust: pre-emptive scheduler, custom VFS, physical memory allocators, GDT/IDT/PIC assembly setups.
- **2025 (Age 17) — Compiler Engineering & microVMs**: Designing Carv language specifications, targeting ARM Cortex-M target compilations, and upgrading Ignite to KVM-backed Firecracker / Virtualization.framework runtimes.
- **2026 (Present) — Building Xelvo & Track**: Developing a high-performance WebAssembly compiler (xelvo) and an LLVM-backed linear type systems compiler (track).

---

## 3. Notable Projects

### Track (Compiler & Language)
- **Description**: Statically-typed systems programming language compiler targeting LLVM 22.
- **Architecture**: Implements linear ownership, compile-time borrow checking, and zero-cost abstractions designed to eliminate resource bugs without garbage collection.
- **Stack**: Rust.

### Carv (Compiler & Language)
- **Description**: Statically-typed systems programming language compiling to C99. Designed for ARM Cortex-M microcontrollers and host x86_64 architectures.
- **Architecture**: Custom Pratt parser, type inference, ownership and borrow checking, state-machine async/await, closures, interfaces with vtable dispatch, and an arena allocator runtime.
- **Stack**: Go (written in ~6,250 lines of Go).

### Ignite (microVM Execution Sandbox)
- **Description**: Hardware-isolated microVM sandboxing runtime for executing untrusted JS/TS code.
- **Architecture**: Leverages KVM-backed Firecracker on Linux and native Virtualization.framework on macOS. Attaches Guest runtimes (Bun, Node, Deno, QuickJS) as read-only virtual block devices with VSOCK multiplexing for communication.
- **Stack**: Rust.

### Karion OS (x86 Operating System Kernel)
- **Description**: A bare-metal x86 operating system kernel written in Rust (ported from C).
- **Architecture**: Implements its own VGA driver, GDT, IDT, PIC, memory paging, physical memory allocator, and heap coalescing allocator. Features a Unix-like shell, custom block filesystem, a text editor, a BASIC interpreter, and games.
- **Stack**: Rust (`no_std` / `core`).

### GBemu (Game Boy Emulator)
- **Description**: A cycle-accurate Game Boy emulator with zero external dependencies.
- **Architecture**: Cycle-accurate CPU instruction emulation, memory-mapped I/O, scanline PPU rendering, timer synchronization, and MBC1 memory bank controller support.
- **Stack**: Zig.

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
