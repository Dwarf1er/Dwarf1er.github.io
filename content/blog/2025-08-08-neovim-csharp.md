---
title: "How to Setup Neovim 0.12+ for C# Development with vim.pack"
date: 2025-08-08
draft: false
categories: ["Open Source", "C#", "Neovim"]
tags: ["neovim", "opensource", "csharp"]
---

### Introduction

Neovim 0.12 introduced `vim.pack`, a built-in package manager that eliminates the need for tools like `Packer` or `Lazy`. This guide will help you set up a fast, minimal, and modular C# development environment with full Razor support, using just `vim.pack` and a few key plugins.

### What You'll Get

- Syntax highlighting for C# and Razor
- IntelliSense, diagnostics, and navigation
- Formatting with csharpier
- Fuzzy finding via Telescope
- .NET debugging with breakpoints
- Modular, future-proof config

### Prerequisites
Before you begin, make sure you have:
- Neovim 0.12+ (Download nightly builds [here](https://github.com/neovim/neovim/releases/nightly))
- .NET SDK 8.0+ (Download [here](https://dotnet.microsoft.com/en-us/download))
- `git` installed (for cloning plugins)

### Configuration Structure

Here’s the structure of my `~/.config/nvim` directory:
```text
├── init.lua
├── lsp
│   └── roslyn.lua
└── lua
    ├── config
    │   ├── filetypes.lua
    │   └── lsp.lua
    └── plugins
        ├── conform-nvim.lua
        ├── mason-nvim.lua
        ├── nvim-dap.lua
        ├── nvim-treesitter.lua
        ├── roslyn-nvim.lua
        ├── rzls-nvim.lua
        └── telescope-nvim.lua
```

### Step 1 - Core Init File

**Purpose:**
Load configuration in the correct order. `filetypes.lua` must be loaded before `rzls.nvim` so Razor files are detected correctly.

**Configuration:**
```lua
-- ./init.lua
-- Core
require("config.filetypes")

-- Plugins
require("plugins.mason-nvim")
require("plugins.rzls-nvim")
require("plugins.roslyn-nvim")
require("plugins.nvim-treesitter")
require("plugins.telescope-nvim")
require("plugins.nvim-dap")
require("plugins.conform-nvim")

-- LSP configuration
require("config.lsp")
```

### Step 2 - Filetypes for Razor

**Purpose:**
Tell Neovim that `.razor` and `.cshtml` files are `razor` type, so that Razor LSP can handle them. That's why we load this before any LSPs or Razor plugin.

**Configuration:**
```lua
-- ./lua/config/filetypes.lua
vim.filetype.add({
        extension = {
                razor = "razor",
                cshtml = "razor",
        },
})
```

### Step 3 - LSPs, Formatters, Debuggers (Mason)

**Purpose:**
Manage LSPs, formatters, and debuggers without manual installs.

**Plugins Used:**
- [mason.nvim](https://github.com/mason-org/mason.nvim) for managing LSPs, formatters, and debuggers
- [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) for basic automatic configuration of our LSPs
- [mason-lspconfig.nvim](https://github.com/mason-org/mason-lspconfig) for bridging `mason.nvim` and `nvim-lspconfig`
- [mason-tool-installer.nvim](https://github.com/WhoIsSethDaniel/mason-tool-installer.nvim) for auto-installing LSPs, formatters, and debuggers

We'll also add 2 custom registries to `mason.nvim` to be able to install [roslyn](https://github.com/dotnet/roslyn) and [rzls](https://github.com/dotnet/roslyn):
- [mason-org/mason-registry](https://github.com/mason-org/mason-registry)
- [Crashdummyy/mason-registry](https://github.com/Crashdummyy/mason-registry)

**Configuration:**
```lua
-- ./lua/plugins/mason-nvim.lua
vim.pack.add({
        { src = "https://github.com/neovim/nvim-lspconfig" },
        { src = "https://github.com/mason-org/mason.nvim.git" },
        { src = "https://github.com/mason-org/mason-lspconfig.nvim" },
        { src = "https://github.com/WhoIsSethDaniel/mason-tool-installer.nvim" },
})

require("mason").setup({
        registries = {
                "github:mason-org/mason-registry",
                "github:Crashdummyy/mason-registry",
        },
})

require("mason-lspconfig").setup()
require("mason-tool-installer").setup({
        ensure_installed = {
                "html-lsp", -- Needed by rzls for completion and formatting
                "roslyn", -- C# LSP
                "rzls", -- Raozr LSP
                "netcoredbg", -- .NET debugger
                "csharpier", -- C# formatter
        },
})
```

### Step 4 - Razor LSP Integration

**Purpose:**
Connect `rzls` with `roslyn` so Razor files get completions, navigation, and diagnostics.

**Plugin Used:**
- [rzls.nvim](https://github.com/tris203/rzls.nvim)

**Configuration:**
```lua
-- ./lua/plugins/rzls-nvim.lua
vim.pack.add({ "https://github.com/tris203/rzls.nvim.git" })

require("rzls").setup({
        path = "rzls" or nil,
})
```

### Step 5 - C# LSP Integration

**Purpose:**
Provide Roslyn LSP support in neovim.

**Plugin Used:**
- [roslyn.nvim](https://github.com/seblyng/roslyn.nvim)

**Configuration:**
```lua
-- ./lua/plugins/roslyn-nvim.lua
vim.pack.add({ "https://github.com/seblyng/roslyn.nvim.git" })

require("roslyn").setup({
        ft = { "cs", "razor" },
})
```

### Step 6 - Syntax Highlighting

**Purpose:**
Improve syntax accuracy for C#, Razor, and HTML.

**Plugin Used:**
- [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)

**Configuration:**
```lua
-- ./lua/plugins/nvim-treesitter.lua
vim.pack.add({ "https://github.com/nvim-treesitter/nvim-treesitter" })

require("nvim-treesitter.configs").setup({
        build = ":TSUpdate",
        ensure_installed = {
                "c_sharp",
                "razor",
                "html",
        },
        auto_install = false,
        highlight = {
                enable = true,
                additional_vim_regex_highlighting = false,
        },
        indent = {
                enable = true,
        },
})

vim.api.nvim_create_autocmd("PackChanged", {
        desc = "Handle nvim-treesitter updates",
        group = vim.api.nvim_create_augroup("nvim-treesitter-pack-changed-update-handler", { clear = true }),
        callback = function(event)
                if event.data.kind == "update" then
                        vim.notify("nvim-treesitter updated, running TSUpdate...", vim.log.levels.INFO)
                        ---@diagnostic disable-next-line: param-type-mismatch
                        local ok = pcall(vim.cmd, "TSUpdate")
                        if ok then
                                vim.notify("TSUpdate completed successfully!", vim.log.levels.INFO)
                        else
                                vim.notify("TSUpdate command not available yet, skipping", vim.log.levels.WARN)
                        end
                end
        end,
})
```

### Step 7 - Fuzzy Finding

**Purpose:**
Quickly search files, text, help tags, etc.

**Plugins Used:**
- [plenary.nvim](https://github.com/nvim-lua/plenary.nvim.git)
- [telescope-fzf-native.nvim](https://github.com/nvim-telescope/telescope-fzf-native.nvim)
- [telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)

**Configuration:**
```lua
-- ./lua/plugins/telescope-nvim.lua
vim.pack.add({ "https://github.com/nvim-lua/plenary.nvim.git" })
vim.pack.add({ "https://github.com/nvim-telescope/telescope-fzf-native.nvim.git" }, {
        build = "make",
        cond = function()
                return vim.fn.executable("make") == 1
        end,
})
vim.pack.add({ "https://github.com/nvim-telescope/telescope.nvim.git" })

require("telescope").setup({
        defaults = {
                -- Ignoring rzls virtual c# files
                file_ignore_patterns = { "%__virtual.cs$" },
        },
})

-- Enable telescope fzf native, if installed
pcall(require("telescope").load_extension, "fzf")

local builtin = require("telescope.builtin")
vim.keymap.set("n", "<leader>sh", builtin.help_tags, { desc = "[S]earch [H]elp" })
vim.keymap.set("n", "<leader>sk", builtin.keymaps, { desc = "[S]earch [K]eymaps" })
vim.keymap.set("n", "<leader>sf", builtin.find_files, { desc = "[S]earch [F]iles" })
vim.keymap.set("n", "<leader>ss", builtin.builtin, { desc = "[S]earch [S]elect Telescope" })
vim.keymap.set("n", "<leader>sw", builtin.grep_string, { desc = "[S]earch current [W]ord" })
vim.keymap.set("n", "<leader>sg", builtin.live_grep, { desc = "[S]earch by [G]rep" })
vim.keymap.set("n", "<leader>sd", builtin.diagnostics, { desc = "[S]earch [D]iagnostics" })
vim.keymap.set("n", "<leader>sr", builtin.resume, { desc = "[S]earch [R]esume" })
vim.keymap.set("n", "<leader>s.", builtin.oldfiles, { desc = '[S]earch Recent Files ("." for repeat)' })
vim.keymap.set("n", "<leader><leader>", builtin.buffers, { desc = "[ ] Find existing buffers" })
```

### Step 8 - Debugging

**Purpose:**
Debug C# code with breakpoints, stepping, and UI. While configuring `nvim-dap` to use `netcoredbg` manually is possible, C# projects are tricky and `nvim-dap-cs` makes auto-finding DLLs and attaching way easier without having to do the configuration ourselves.

**Plugins Used:**
- [nvim-dap](https://github.com/mfussenegger/nvim-dap) for neovim dap integration
- [nvim-nio](https://github.com/nvim-neotest/nvim-nio) required for `nvim-dap-ui`
- [nvim-dap-ui](https://github.com/rcarriga/nvim-dap-ui) for providing a debugging UI
- [nvim-dap-cs](https://github.com/NicholasMata/nvim-dap-cs) for configuring `netcoredbg` for us

**Configuration:**
```lua
-- ./lua/plugins/nvim-dap.lua
vim.pack.add({
        { src = "https://github.com/mfussenegger/nvim-dap" },
        { src = "https://github.com/nvim-neotest/nvim-nio" },
        { src = "https://github.com/rcarriga/nvim-dap-ui" },
        { src = "https://github.com/NicholasMata/nvim-dap-cs" },
})

local dap = require("dap")
local dapui = require("dapui")

require("dapui").setup()
require("dap-cs").setup()

dap.listeners.before.attach.dapui_config = function()
        dapui.open()
end
dap.listeners.before.launch.dapui_config = function()
        dapui.open()
end
dap.listeners.before.event_terminated.dapui_config = function()
        dapui.close()
end
dap.listeners.before.event_exited.dapui_config = function()
        dapui.close()
end

vim.keymap.set("n", "<F9>", dap.toggle_breakpoint, {})
vim.keymap.set("n", "<F5>", dap.continue, {})
vim.keymap.set("n", "<S-F5>", dap.stop, {})
vim.keymap.set("n", "<C-S-F5>", dap.restart, {})
vim.keymap.set("n", "<F11>", dap.step_into, {})
vim.keymap.set("n", "<F10>", dap.step_over, {})
vim.keymap.set("n", "<S-F11>", dap.step_out, {})
```

### Step 9 - Formatting

**Purpose:**
User `csharpier` to format C# code. We need to point to the binary installed by `mason` to avoid confusion with .NET binaries.

**Plugin Used**:
- [conform.nvim](https://github.com/stevearc/conform.nvim)

**Configuration:**
```lua
-- ./lua/plugins/conform-nvim.lua
vim.pack.add({ "https://github.com/stevearc/conform.nvim" })

local conform = require("conform")
local mason_bin = vim.fn.expand("$MASON/bin")

conform.setup({
        formatters_by_ft = {
                lua = { "stylua" },
                cs = { "csharpier" },
        },
        formatters = {
                csharpier = {
                        command = mason_bin .. "/" .. "csharpier",
                        args = {
                                "format",
                                "--write-stdout",
                        },
                        to_stdin = true,
                },
        },
        format_on_save = {
                lsp_fallback = true,
                async = false,
                timeout_ms = 1000,
        },
})

vim.keymap.set({ "n", "v" }, "<leader>mp", function()
        conform.format({
                lsp_fallback = true,
                async = false,
                timeout_ms = 1000,
        })
end)
```

### Step 10 - LSP configuration

**Purpose:**
Configure our basic LSP features and keymaps.

**Configuration:**
```lua
-- ./lua/config/lsp.lua
vim.api.nvim_create_autocmd("LspAttach", {
        callback = function(ev)
                local client = vim.lsp.get_client_by_id(ev.data.client_id)
                if client and client:supports_method(vim.lsp.protocol.Methods.textDocument_completion) then
                        vim.opt.completeopt = { "menu", "menuone", "noinsert", "fuzzy", "popup" }
                        vim.lsp.completion.enable(true, client.id, ev.buf, { autotrigger = true })
                        vim.keymap.set("i", "<C-Space>", function()
                                vim.keymap.set("n", "K", vim.lsp.buf.hover, {})
                                vim.keymap.set("n", "<leader>gd", vim.lsp.buf.definition, {})
                                vim.keymap.set("n", "<leader>gr", vim.lsp.buf.references, {})
                                vim.keymap.set("n", "<leader>ca", vim.lsp.buf.code_action, {})
                                vim.lsp.completion.get()
                        end)
                end
        end,
})

-- Diagnostics
vim.diagnostic.config({
        virtual_lines = {
                current_line = true,
        },
})
```

### Step 11 - Additional Roslyn Configuration

**Purpose:**
For the `roslyn` and `rzls` LSPs to work with `roslyn.nvim` and `rzls.nvim` we need to pass additional configurations to the `roslyn` LSP that weren't included in the basic configuration provided by `nvim-lspconfig`.

**Configuration:**
```lua
-- ./lsp/roslyn.lua
require("mason-registry")
local rzls_path = vim.fn.expand("$MASON/packages/rzls/libexec")

local cmd = {
        "roslyn",
        "--stdio",
        "--logLevel=Information",
        "--extensionLogDirectory=" .. vim.fs.dirname(vim.lsp.get_log_path()),
        "--razorSourceGenerator=" .. vim.fs.joinpath(rzls_path, "Microsoft.CodeAnalysis.Razor.Compiler.dll"),
        "--razorDesignTimePath=" .. vim.fs.joinpath(rzls_path, "Targets", "Microsoft.NET.Sdk.Razor.DesignTime.targets"),
        "--extension",
        vim.fs.joinpath(rzls_path, "RazorExtension", "Microsoft.VisualStudioCode.RazorExtension.dll"),
}

vim.lsp.config("roslyn", {
        cmd = cmd,
        handlers = require("rzls.roslyn_handlers"),
        filetypes = { "cs" },
        root_markers = { { ".sln", ".csproj", "project.json" }, ".git" },
        settings = {
                ["csharp|inlay_hints"] = {
                        csharp_enable_inlay_hints_for_implicit_object_creation = true,
                        csharp_enable_inlay_hints_for_implicit_variable_types = true,

                        csharp_enable_inlay_hints_for_lambda_parameter_types = true,
                        csharp_enable_inlay_hints_for_types = true,
                        dotnet_enable_inlay_hints_for_indexer_parameters = true,
                        dotnet_enable_inlay_hints_for_literal_parameters = true,
                        dotnet_enable_inlay_hints_for_object_creation_parameters = true,
                        dotnet_enable_inlay_hints_for_other_parameters = true,
                        dotnet_enable_inlay_hints_for_parameters = true,
                        dotnet_suppress_inlay_hints_for_parameters_that_differ_only_by_suffix = true,
                        dotnet_suppress_inlay_hints_for_parameters_that_match_argument_name = true,
                        dotnet_suppress_inlay_hints_for_parameters_that_match_method_intent = true,
                },
                ["csharp|code_lens"] = {
                        dotnet_enable_references_code_lens = true,
                },
                ["csharp|completion"] = {
                        dotnet_show_name_completion_suggestions = true,
                        dotnet_show_completion_items_from_unimported_namespaces = true,
                },
                ["csharp|background_analysis"] = {
                        background_analysis = {
                                dotnet_analyzer_diagnostics_scope = "fullSolution",
                                dotnet_compiler_diagnostics_scope = "fullSolution",
                        },
                },
        },
})
```

### Conclusion

You now have:
- C# + Razor syntax highlighting
- LSP completions, hover, diagnostics
- Formatting with `csharpier`
- Fuzzy file & text search
- Debugging via `nvim-dap`

If you want to see a fully working example of this configuration and more, check out my [dotfiles repository on GitHub](https://github.com/Dwarf1er/dotfiles). It includes everything from this guide plus additional utilities and personal tweaks.
