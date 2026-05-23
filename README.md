# AuraMarket

AuraMarket is a portfolio project built to demonstrate front-end development ability and practical website administration skills. It combines a premium wellness storefront with an admin system for managing products, campaigns, banners, translations, audits, launch readiness, activity logs, and permissions.

The goal is to show more than page styling. AuraMarket is designed around realistic admin workflows a Web Administrator or Junior Front-End Developer might support: content checks, SEO completeness, accessibility warnings, localization progress, publishing confirmation, and campaign readiness.

AuraMarket was built to demonstrate both front-end development ability and practical website administration skills, including product management, campaign scheduling, multilingual content handling, QA audits, and launch readiness workflows.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Lucide icons
- Mock data-first architecture

## Current Features

- Premium wellness public homepage
- Product listing page
- Product detail pages
- Campaign landing pages
- Wellness resources page
- Admin dashboard overview
- Product manager with search, filters, SEO indicators, status badges, missing alt text warnings, and validated add/edit form
- Collection manager with merchandising status, featured products, markets, language coverage, and SEO completeness
- Campaign manager with readiness score, launch blockers, and publish confirmation modal
- Banner manager with previews, expired banner warnings, and missing alt text warnings
- Website audit issue table with priority/status filters and mark-fixed action
- Launch readiness checklist
- Multilingual content manager with English, French, German, Spanish, Italian, and Lithuanian tabs
- Content calendar timeline
- Activity log
- Role permissions settings
- Loading, empty, error, and not-found states
- Responsive layouts for mobile, tablet, laptop, and desktop

## Why This Project Exists

AuraMarket was created as a serious portfolio project for a Web Administrator / Junior Front-End Developer role. It is intended to show:

- Clean component structure
- Responsive UI implementation
- Accessible admin workflows
- Content and website administration awareness
- Practical handling of SEO, alt text, translation, audit, and launch-readiness tasks
- Ability to turn a brand direction into a polished interface

## Target Role Relevance

AuraMarket is tailored for Web Administrator, Website Administrator, Junior Front-End Developer, E-commerce Assistant, CMS Administrator, Digital Content Assistant, Shopify Assistant, and Junior Web Designer roles.

It demonstrates that I can help manage a website after it goes live: updating products, preparing campaigns, checking banners, reviewing translations, tracking audit issues, and making publishing decisions carefully.

## Admin Workflow

The admin workflow is the core of the project:

1. Check the dashboard for website health, campaign readiness, translations, and recent activity.
2. Review products for status, stock, SEO completeness, and missing alt text.
3. Manage collections that group products for seasonal or editorial merchandising.
4. Prepare campaigns by checking launch blockers and readiness scores.
5. Manage banners, expiry dates, CTA links, and image alt text.
6. Track multilingual content across six languages.
7. Use the calendar to coordinate launches, QA deadlines, and banner changes.
8. Record audit issues and mark them fixed.
9. Confirm publishing actions before content goes live.

## Database Models

The current build uses mock data first so the UI and workflows are clear before adding persistence. The project is structured around realistic models that can later be moved into Prisma/PostgreSQL:

- `Product`: catalog item with status, stock, market, SEO completeness, image alt text, ritual steps, and ingredients
- `Collection`: merchandising group with featured products, active dates, market/language coverage, and SEO completeness
- `Campaign`: launch or promotion with readiness score, focus products, market, launch date, and missing requirements
- `Banner`: promotional placement with message, dates, market, destination, visual preview, and alt text
- `Translation`: language-level status and reviewer ownership
- `AuditIssue`: website QA issue with priority, status, owner, and due date
- `ActivityLog`: trace of admin actions and system warnings
- `Market`: regional operating status
- `LaunchChecklistItem`: campaign readiness requirement
- `PermissionRole`: controlled access model for admin responsibilities

## Screenshots

Recommended screenshots for a portfolio case study:

- Public homepage hero
- Product listing page
- Product detail page
- Wellness resources page
- Admin dashboard overview
- Product manager with SEO and alt text warnings
- Collection manager
- Campaign manager with publish confirmation modal
- Banner manager with previews and expired content warnings
- Multilingual content manager with language tabs
- Content calendar timeline
- Website audit issue table
- Role permissions page

## Getting Started

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is already in use, run:

```bash
npm run dev -- -p 3001
```

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Project Structure

```text
app/
  (public)/          Public storefront routes
  admin/             Admin management routes
components/
  admin/             Workflow-specific admin components
  layout/            Public and admin layout components
  public/            Storefront components
  ui/                Shared UI primitives
lib/
  mock-data.ts       Mock domain data
  utils.ts           Shared helpers
public/images/       Project images
```

## Future Improvements

- Add authentication and role-based route protection
- Persist data with a database
- Connect forms to server actions
- Add real image uploads and asset management
- Add tests for admin workflows
- Add richer localization editing and import/export
- Add analytics and audit history persistence
