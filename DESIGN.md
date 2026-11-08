# Profile design

The README uses RyMe.md Sleek header/about renderers, Skill Icons, and matching project cards. All SVGs are committed locally; loading the profile does not call a stats API or an image-generation service.

## Update

Edit the profile copy and theme in `scripts/build-profile.mjs`. With Node.js 22.18 or newer:

```sh
node scripts/build-profile.mjs
```

The script uses Node's built-in TypeScript stripping, requires no package installation, and regenerates five files under `assets/`. README project descriptions and methods remain editable as Markdown. No scheduled workflow or token is required.

## Sources and adaptations

- [RyMe.md](https://github.com/ryanpolasky/ryme.md), MIT, copyright 2026 Ryan Polasky. Original renderers and their shared text utilities are preserved under `vendor/ryme/`. Adaptations: blue palette, stable visible text, a research-focus rail, geometric background accents, a shorter about panel, and its section title.
- [Skill Icons](https://github.com/tandpfun/skill-icons), MIT. Seven original SVG icons and the license are included under `assets/icons/`.
- Project card layouts and footer are custom SVGs. The small illustrations are decorative, not architectural diagrams or performance claims.

Names, degree status, university affiliation, and project descriptions are based on the existing public GitHub profile and linked repositories. No private projects or unverified performance statistics are included.

The existing `profile-3d-contrib/` assets are preserved but not embedded in this design.
