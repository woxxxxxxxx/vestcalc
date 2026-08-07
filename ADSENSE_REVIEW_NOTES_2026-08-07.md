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

## 2026-08-08 follow-up gate hardening

- The combined 15-site value gate exposed a narrow VestCalc regression that the original article-only gate did not: the six-page editorial surface had a 687-word median because the guide index and three guides sat near the 700-word threshold.
- Rebuilt the guide index as a decision library with document requirements, source-selection rules, correction routing, and a reproducible decision-log workflow.
- Added topic-specific research records to all five guides and expanded the four remaining thin category hubs with distinct reconciliation, stop-condition, walk-away, and payroll-diagnostic workflows.
- Final combined metrics: 30 indexable URLs, 0 reachable `noindex` URLs, 0 content pages under 350 words, 0 editorial pages under 700 words, 0 retained tools under 450 words, 0 duplicate pairs, 0 mojibake flags, and 0 hard release-gate failures.
- Editorial median is now 807 words; article median is 874 words; first-person reproducible research records are present on 6 / 6 editorial pages. The focused structural pass checked 30 pages, 369 internal links, 58 local resources, 30 executable scripts, and 27 JSON-LD blocks with 0 errors.
- The 120 historical `noindex` files remain isolated, absent from the sitemap, and unreachable from the public link graph. They are a maintenance warning, not a release-gate failure.
- Keep the existing stability window. Do not manually resubmit before 2026-08-21 unless Google has already started an earlier review.
