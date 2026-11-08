# Profile design

The profile uses a compact Swiss Grid masthead with a paper/ink/red palette. Project descriptions, academic background, and technical details are native Markdown so text follows GitHub's font size, color theme, browser zoom, and narrow-screen wrapping.

Only the masthead is a text-bearing SVG. A mobile version is selected through `<picture>` at viewport widths up to 600 px. The larger Sleek panels from the previous iteration are preserved in the repository history/assets but are no longer embedded.

## Regenerate the headers

With Node.js 18 or newer, run:

```sh
node scripts/build-profile.mjs
```

No packages, API calls, scheduled workflows, or tokens are required. Edit the README directly to update the content.

## Sources

- [Awesome GitHub Profile — Swiss Grid](https://github.com/beydemirfurkan/awesome-github-profile/tree/main/templates/11-swiss-brutalist/swiss-grid). The original SVG and MIT notice are preserved in `vendor/awesome-github-profile/`. Adapted into a shorter masthead with larger typography and a mobile layout.
- [Skill Icons](https://github.com/tandpfun/skill-icons). The original icons and MIT notice are included under `assets/icons/`.
- Multi-agent roles and orchestration are based on the public implementation in `woonki94/grant-matching-agent/services/agent_v2/`. No resume attachment, private contact details, or unverified performance figures are stored in this repository.

The earlier `vendor/ryme/` files and legacy contribution SVGs are preserved with their license notices.
