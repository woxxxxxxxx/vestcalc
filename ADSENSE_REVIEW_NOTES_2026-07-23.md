# VestCalc AdSense remediation - 2026-07-23

## Approval surface

- 30 indexable URLs: 12 reviewed calculators, 5 category/trust hubs, 5 source-backed financial guides, and supporting policy pages.
- 5 indexable articles with a 663-word median after the release gate audit.
- 89 broad calculator pages and 22 generic blog drafts remain `noindex` and outside the sitemap.
- The homepage now exposes only the 12 reviewed calculators and 5 released guides. Links to excluded template pages were removed from the approval surface.

## Released guides

1. Credit card payoff mistakes
2. Mortgage affordability
3. Retirement calculator assumptions
4. Emergency fund planning
5. Rent versus buy

Each guide has a distinct decision workflow, an Article schema record, a related calculator, an editorial scope statement, and links to CFPB or SSA primary sources.

## Verification

- `node C:\Users\Administrator\pm-worker\adsense-release-gate.js vestcalc`: passed.
- Indexable pages: 30.
- Indexable articles: 5.
- Median article length: 663 words.
- Pairwise article token similarity: 0.237-0.302.
- Sitemap: valid XML with 30 URLs.
- Automatic preflight remediation preserves exactly the five released article URLs.

## Observation window

Freeze major structural changes through 2026-08-06. During this period, only correct factual, accessibility, broken-link, or rendering defects. Do not bulk-index the remaining draft pages.
