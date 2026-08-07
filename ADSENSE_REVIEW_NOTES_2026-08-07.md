# VestCalc AdSense review rebuild - 2026-08-07

## Scope

- Rebuilt the approval surface around 30 indexable pages.
- Kept 120 historical pages on disk with `noindex`; none are reachable from the indexable link graph.
- Rebuilt five category hubs so they describe only the 12 retained calculators.
- Added calculator-specific methodology, limitations, verification steps, and primary sources to all 12 retained tools.
- Expanded the five reviewed guides with a decision-verification section and visible editorial review metadata.
- Removed empty visible ad placeholders while retaining the AdSense ownership loader.
- Rebuilt `sitemap.xml` from the current indexable files.
- Added repeatable cleanup to `.github/scripts/release-financial-guides.js` so later releases do not restore held links.

## Final local gates

| Gate | Result |
|---|---:|
| Indexable HTML pages | 30 |
| Sitemap URLs | 30 |
| Historical `noindex` pages | 120 |
| Reachable `noindex` pages | 0 |
| Retained calculators with unique evidence and sources | 12 / 12 |
| Reviewed guides / median visible words | 5 / 764 |
| Rebuilt hubs / median visible words | 5 / 386 |
| Sitewide median visible words | 665 |
| Broken internal links | 0 |
| Missing local assets | 0 |
| Inline JS / JSON-LD parse errors | 0 |
| Empty visible ad placeholders | 0 |
| Known mojibake markers | 0 |
| High-similarity page pairs | 0 |

## Review timing

Do not treat these checks as a guarantee of AdSense approval. Keep the deployed surface stable and monitor Search Console crawling and indexing before resubmission. Earliest recommended manual review date: 2026-08-21, provided production checks remain clean and no broad template changes are made during the stability window.
