---
title: "I got annoyed by expensive proprietary ZPL tools, so I built my own"
date: 2025-03-11
draft: false
tags: ["zpl", "opensource", "csharp"]
description: "Why I built OpenLabel, an open-source C# library for ZPL label printers with network printing, DPI scaling, and conditional templates."
---

### Labeling Shouldn’t Be a Hassle

Ah, printers. Arguably the world’s most universally despised peripheral. But among all printers, there’s one that truly reigns supreme: the label printer. These infernal contraptions, often emerging straight from the depths of IT hell, are not only untamable beasts but also come with a problem even bigger than their price tag: they rarely have good software options. Instead, they’re paired with proprietary, costly solutions that make managing label printing a tedious and expensive ordeal.

### The Birth of OpenLabel

At a previous job, I was one of the unfortunate developers tasked with subduing the label-spewing demons. The solution we used was draining the company to the tune of $25,000 annually in licensing fees, for software that really only had a few core features:

- Network printing
- ZPL templating with conditional rendering
- ZPL DPI scaling

Of course, we were paying such a premium for the GUI editor that let you create labels using drag-and-drop components. However, mastering the arcane magic of ZPL isn't that difficult, especially with the excellent web-based editor [Labelary](https://labelary.com/).

At work, we replaced it with an in-house solution. Separately, on my own time, I set out to create **OpenLabel**, an open-source C# library designed to give any developer the features necessary to build ZPL printing applications easily.

### How OpenLabel Works: A Quick Example

Here’s a brief glimpse into how simple it is to get started with OpenLabel. Let’s say you need to print a label over the network:
```csharp
NetworkPrinter printer = new NetworkPrinter();
await printer.PrintLabelAsync(@"\\server\printer", 5, "^XA^FO50,50^A0N,50,50^FDHello, World!^FS^XZ");
```

With just a few lines, you can print your ZPL labels. Now, if you need to scale a label to fit a printer’s DPI, OpenLabel makes it even easier:
```csharp
string scaledZPL = LabelScaler.ScaleZPL("^XA^FO50,50^FS^XZ", 203, 300);
```

And for dynamic templates, where you want the label to change based on a condition, OpenLabel’s templating system makes it seamless:
```csharp
TemplateHandler templateHandler = new TemplateHandler();
string template = "{{IF CONDITION}}^FO50,50^FDText^FS{{ENDIF}}";
Dictionary<string, string> placeholders = new Dictionary<string, string> { { "CONDITION", "1" } };
string renderedLabel = templateHandler.RenderTemplate(template, placeholders);
```

### Why OpenLabel Matters

At its core, OpenLabel is about freedom. It frees you from expensive, restrictive proprietary software. It gives you control over your ZPL labels and empowers you to create efficient label printing applications with minimal fuss. Whether you’re working on a small e-commerce store or a large warehouse system, OpenLabel streamlines the process so you can focus on what really matters.

### Get Involved

OpenLabel is open source on [GitHub](https://github.com/Dwarf1er/openlabel) and available on [NuGet](https://www.nuget.org/packages/OpenLabel). Bug reports, feature ideas, and pull requests are all welcome.
