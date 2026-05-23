# AuraMarket Case Study

## Project Overview

AuraMarket is a premium wellness ecommerce concept with a public storefront and a realistic website administration system. The project focuses on the kind of work expected from a Web Administrator / Junior Front-End Developer: maintaining product content, campaign launches, banners, translations, audits, and publishing readiness.

## Problem

Many junior portfolio projects show attractive landing pages but do not prove practical website administration ability. They often skip content management, accessibility checks, publishing workflows, and operational admin screens.

AuraMarket solves this by pairing a polished customer-facing storefront with an admin area that reflects real maintenance tasks.

## Goal

The goal was to build an interview-ready project that demonstrates:

- Front-end implementation skill
- Responsive design judgment
- Admin workflow thinking
- Accessibility and content quality awareness
- Ability to structure a maintainable React and Next.js codebase

## My Role

I acted as the front-end developer and product-minded web administrator. I defined the information architecture, built the UI system, created mock operational data, designed the public and admin experiences, and implemented the workflows.

## Target Users

- Wellness shoppers browsing products and campaign content
- Web administrators maintaining the live site
- Content editors updating product and campaign copy
- Campaign reviewers checking launch readiness
- Localization reviewers managing translated content

## Key Features

- Public homepage with premium wellness brand direction
- Product listing and product detail pages
- Campaign landing pages
- Wellness resources page for CMS-style editorial content
- Admin dashboard with operational summaries
- Product manager with search, filters, SEO completeness, status badges, missing alt text warnings, and form validation
- Collection manager for merchandising groups, market coverage, active dates, and SEO readiness
- Campaign manager with launch readiness and missing requirements
- Banner manager with previews, expiry warnings, and alt text warnings
- Website audit issue table with filters and mark-fixed action
- Multilingual content manager for English, French, German, Spanish, Italian, and Lithuanian
- Content calendar timeline
- Activity log
- Role permissions view
- Loading, empty, error, and confirmation states

## Admin Workflow

The admin side is designed around realistic website maintenance:

1. Review dashboard health and recent activity.
2. Check products for stock, publish status, SEO completeness, and missing alt text.
3. Manage collections for seasonal and editorial merchandising.
4. Prepare campaigns by reviewing readiness scores and launch blockers.
5. Manage banners and remove expired promotions.
6. Review translations before international launches.
7. Track content changes in the activity log.
8. Use audit issues and launch checklists to confirm the site is ready.
9. Confirm publishing actions with a modal before final approval.

## Design System

AuraMarket uses a calm premium wellness style:

- Pearl and soft neutral surfaces
- Sage, clay, and muted gold accents
- Rounded but restrained cards
- Editorial spacing
- Clear status badges
- Accessible focus states
- Responsive admin tables that collapse into readable mobile rows

The public side feels soft and editorial, while the admin side stays practical, dense enough for real work, and visually consistent with the brand.

## Technical Decisions

- Next.js App Router for route organization and static rendering
- TypeScript for reliable data and component contracts
- Tailwind CSS for fast, consistent styling
- Reusable UI primitives for buttons, badges, cards, progress bars, modals, and states
- Mock data first to clarify workflows before adding a database
- React Hook Form and Zod for validated product form UI
- Client components only where interaction is needed

## Challenges

- Balancing premium brand polish with a serious admin interface
- Making admin tables responsive without losing useful operational detail
- Designing realistic mock data instead of decorative placeholder content
- Showing website administration skills through SEO, alt text, localization, audits, and launch readiness
- Keeping the backend intentionally simple while the UI workflows are still being defined

## What I Learned

- Strong portfolio projects need workflow depth, not just good visuals.
- Admin interfaces should make risks visible: missing translations, expired banners, incomplete SEO, and launch blockers.
- Mock data can be valuable when it is structured around real user tasks.
- Good responsive design matters as much in admin tools as it does on public websites.
- Accessible labels, focus states, warnings, and confirmation patterns make the interface feel more professional.

## Future Improvements

- Add authentication and protected admin routes
- Persist products, campaigns, banners, translations, audits, and activity logs in a database
- Add server actions for create/update workflows
- Add image upload and asset library management
- Add automated tests for filters, forms, and publishing flows
- Add import/export for translations
- Add analytics and audit history reporting
