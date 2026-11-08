# Profile activity data

The Neural Pulse Lattice is decorative artwork. Its nodes and moving signals do not represent agent counts, inference speed, uptime, or production performance.

Analytics Grid and Snake Eat Graph use actual GitHub activity. The `Refresh profile visuals` workflow runs daily at 21:23 UTC (06:23 Asia/Seoul), can be started manually, and runs when its source files change. Generated assets are committed to the separate `profile-assets` branch. A failed run leaves the last successful snapshot in place.

## Analytics definitions

- Contributions, 30 days: the sum of GitHub contribution-calendar counts from today minus 29 UTC calendar dates through today. It is not labeled as a commit count.
- Previous 30 days: the immediately preceding 30 UTC dates, used only for the comparison label.
- Active streak: consecutive calendar dates with contributions ending today, or yesterday while today has no contribution. The longest streak is measured over the returned calendar window.
- Merged PRs, 30 days: publicly visible pull requests authored by `woonki94` and merged within the same 30-date window. It does not include private PR details.
- Active days, 7 days: dates with a nonzero contribution-calendar count in the last seven dates.
- Trend: actual daily contribution counts over the last 90 dates, scaled to that window's peak.

The UTC snapshot date is rendered on the dashboard. It is a daily snapshot, not a live second-by-second metric. `activity-summary.json` contains only the aggregate counts displayed by the card; it contains no raw activity, private repository names, or credentials.

## Workflow

`.github/workflows/profile-visuals.yml` uses the repository's temporary `GITHUB_TOKEN`. It does not require a personal access token. The job uses `contents: write` to publish generated SVGs to `profile-assets`; third-party actions are pinned to verified commit SHAs.

`node scripts/profile-visuals.mjs --neural-only --output assets` regenerates the committed neural banners without network access. The full command requires `GITHUB_TOKEN`, fetches public GitHub activity through GraphQL, and fails rather than publishing missing data as zeros.

The analytics design adapts the four-card and sparkline layout of Awesome GitHub Profile's Analytics Grid. All sample numbers and illustrative trend lines are replaced with data from the current snapshot. The mobile variant uses a two-by-two card layout.
