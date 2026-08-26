# AI Coding Challenge — Prompt Log

## Prompt 1 — Project Initialization and Foundation Setup

### Role

Act as a senior frontend engineer, software architect, and technical lead.

You are helping me build **Task 1 of a timed AI coding challenge**.

I am starting this project from scratch. There is currently no existing application that needs to be preserved.

Your responsibility in this phase is to establish a clean, production-quality foundation for the project.

Do not implement the complete Product Catalog filtering functionality yet.

---

### Challenge Context

The challenge task is:

#### Product Catalog Filters

Implement faceted filters:

* category
* price range
* rating

along with:

* sorting
* pagination
* correct combination of filters
* clean filter reset
* active filter visibility
* result counts
* preservation of query/filter state during pagination
* mobile-friendly usability

The challenge allows a static or mocked dataset.

The implementation should prioritize a functional MVP first, followed by testing, edge cases, UI/UX refinement, and documentation.

---

### Technology Stack

Use the following technology stack unless there is a compelling technical reason that prevents it:

#### Core

* Next.js
* React
* TypeScript

#### Styling

* Tailwind CSS

#### Data

* Static/mock TypeScript data
* No database
* No backend API

#### State

* React state/hooks
* Prefer simple local state and derived state
* Do not introduce Redux, Zustand, or another state-management library unless a demonstrated requirement makes it necessary

#### Testing

* Vitest
* React Testing Library

#### Code Quality

* ESLint
* Prettier

#### Package Manager

* npm

---

### Architectural Principles

Build the project using these principles:

1. Keep the architecture simple.
2. Prefer composition over unnecessary abstraction.
3. Separate UI components from business logic where useful.
4. Keep filtering/sorting/pagination logic independently testable.
5. Avoid unnecessary dependencies.
6. Avoid premature optimization.
7. Use TypeScript types/interfaces for domain models.
8. Keep components focused on a single responsibility.
9. Make the architecture easy to modify during a live technical evaluation.
10. Favor readable, maintainable production-quality code over clever code.

Do not create a complex enterprise architecture for a small frontend challenge.

---

### Project Initialization

Create a new Next.js application using:

* TypeScript
* Tailwind CSS
* ESLint
* App Router

Use a sensible project configuration suitable for a modern Next.js application.

Do not add unnecessary libraries.

---

### Proposed Project Structure

Use a clean structure similar to:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── catalog/
│   └── ui/
│
├── data/
│   └── products.ts
│
├── lib/
│   └── catalog/
│
├── types/
│   └── product.ts
│
└── test/
```

You may adjust this structure if the actual Next.js setup or a strong architectural reason suggests a better organization.

Do not create empty files merely to satisfy the structure.

Only create files that have a clear purpose.

---

### Domain Model

Create a strongly typed Product model.

The product should contain at minimum:

```text
id
name
category
price
rating
```

Use appropriate TypeScript types.

Create a realistic static/mock product dataset containing enough products to demonstrate:

* multiple categories
* different price ranges
* different ratings
* pagination

The dataset should be deterministic.

Do not fetch data from an external API.

---

### Initial UI

Create a basic application shell for the Product Catalog.

At this stage, the UI should only establish the foundation.

It should include:

* application/page heading
* basic catalog container
* placeholder area for filters
* placeholder area for products
* responsive page layout

Do NOT implement the complete filtering/sorting/pagination behavior yet.

The purpose is to establish the foundation for the next phase.

---

### Business Logic Preparation

Prepare the project so that filtering, sorting, and pagination logic can be implemented independently of presentation components.

Do not over-engineer this.

Create only the types/utilities that are genuinely necessary at this stage.

Do not implement unnecessary abstractions.

---

### Testing Setup

Configure the project for:

* Vitest
* React Testing Library

Ensure the testing environment can run successfully.

Create only a minimal sanity test at this stage if needed to verify that the test configuration works.

Do not write the full feature test suite yet.

---

### Code Quality

Configure:

* ESLint
* Prettier

Make sure the project can successfully run:

```bash
npm run lint
```

and the relevant test command.

If appropriate, add scripts such as:

```text
dev
build
start
lint
test
```

Use the conventions of the generated Next.js project where possible.

---

### Responsive Design Foundation

Set up the initial layout using Tailwind CSS with responsive design in mind.

The final challenge requires the filtering experience to remain usable on mobile.

Do not implement the complete mobile filter drawer yet.

Simply ensure the component/layout architecture will support responsive behavior later.

---

### prompt.md Requirement

The challenge requires a `prompt.md` file in the root directory containing the prompts used during the challenge.

Create:

```text
prompt.md
```

and record this exact prompt in it.

Use this structure:

```markdown
# AI Coding Challenge — Prompt Log

## Prompt 1 — Project Initialization and Foundation Setup

[This exact prompt]
```

#### Strict prompt.md rules

`prompt.md` is a chronological record of the prompts actually used during the challenge.

You MUST:

* preserve the exact prompt wording
* maintain chronological order
* add future prompts only when I actually provide and use them
* keep previous prompts intact

You MUST NOT:

* invent prompts
* fabricate interactions
* add prompts that were not actually used
* rewrite previous prompts
* delete previous prompts
* add implementation commentary pretending it was part of a prompt

Do not add Prompt 2 or any future prompt yet.

---

### Git Initialization

Initialize a Git repository if one does not already exist.

Create an initial commit after the project foundation is successfully created.

Use a clear commit message such as:

```text
chore: initialize product catalog challenge
```

Do not create unnecessary commits during this phase.

---

### Validation

Before finishing this phase, verify that:

1. The application starts successfully.
2. The application builds successfully.
3. ESLint runs successfully.
4. The configured test runner runs successfully.
5. The basic page renders.
6. TypeScript compilation succeeds.
7. The mock product data is valid.
8. No unnecessary dependencies were introduced.

If a command fails, diagnose and fix the setup problem.

Do not move into feature implementation to hide setup problems.

---

### Important Scope Restriction

This phase is ONLY for project initialization and foundation setup.

DO NOT implement:

* category filtering
* price filtering
* rating filtering
* combined filtering
* sorting
* pagination
* filter reset logic
* active filter logic
* result count logic
* complete mobile filter drawer

Those will be implemented in later prompts.

Do not implement Task 2.

Do not add unrelated features.

---

### Final Response

After completing the setup, report:

#### 1. Technology Stack

#### 2. Final Project Structure

#### 3. Dependencies Added

#### 4. Configuration Added

#### 5. Files Created

#### 6. Validation Results

Report the result of:

* development server
* build
* lint
* tests
* TypeScript validation

#### 7. Architectural Decisions

Briefly explain the important foundation decisions.

#### 8. Next Recommended Step

Describe what should be implemented in the next phase, but do not implement it yet.

Do not modify anything beyond the scope defined in this prompt.

---

## Prompt 2 — Product Catalog Architecture and State Design

### Role

Act as a senior frontend architect and experienced React/Next.js engineer.

The project foundation has now been created for the Product Catalog Filters challenge.

Your task in this phase is to design and establish the architecture for **Task 1 only** before implementing the complete feature.

Do not work on Task 2.

Do not implement the complete filtering/sorting/pagination UI yet.

---

### Challenge Requirement

Task 1 requires a product catalog with:

* Category filters
* Minimum and maximum price filters
* Minimum rating filter
* Correct combination of filters
* Sorting
* Pagination
* Active filter visibility
* Result count
* Clean filter reset
* Pagination that preserves the current query/filter state
* Mobile-friendly usability

The task uses a static or mocked product dataset.

The expected behavior is that all selected filters are applied together.

For example:

```text
Category = Audio
Price = $50–$200
Rating >= 4
Sort = Rating
```

must produce only products satisfying all selected conditions.

Pagination must operate on the filtered/sorted result set and must not lose the user's active query state.

---

### Primary Objective

Analyze the project created in Prompt 1 and establish a clean, simple architecture for implementing Task 1.

The architecture must:

* be easy to understand
* be easy to test
* avoid unnecessary abstraction
* separate business logic from presentation where appropriate
* support responsive UI
* make the filtering pipeline explicit
* make future live code modification easy
* remain appropriate for a small challenge application

Do not introduce unnecessary libraries.

Do not redesign the project without a clear reason.

---

### 1. Inspect the Current Foundation

Before making changes, inspect the project created in Prompt 1.

Verify:

* current project structure
* Product type
* mock dataset
* existing components
* existing page
* Tailwind setup
* testing setup
* existing utility structure
* existing configuration

Use what already exists instead of duplicating it.

---

### 2. Define the Catalog Query State

Design the state required to represent the user's current catalog query.

Consider state such as:

```text
category
minPrice
maxPrice
minRating
sort
page
pageSize
```

Determine:

* which values should be state
* which values should be derived
* sensible default values
* appropriate TypeScript types
* whether category should support one or multiple selections
* how "no filter" should be represented
* how sorting should be represented

Do not automatically create separate React state for every derived value.

Prefer deriving values from a smaller source of truth.

Explain the reasoning.

---

### 3. Define the Data Processing Pipeline

Establish the exact processing order.

The expected conceptual flow should be evaluated carefully:

```text
Products
   ↓
Apply filters
   ↓
Calculate filtered result count
   ↓
Apply sorting
   ↓
Calculate pagination
   ↓
Select current page
   ↓
Render products
```

Determine whether this is the correct architecture for the requirements.

Explicitly explain:

* why filtering occurs before pagination
* how sorting interacts with pagination
* where total result count is calculated
* how total page count is calculated
* how page state should behave when filters change

---

### 4. Business Logic Design

Design reusable, independently testable catalog logic.

Consider creating pure functions for concepts such as:

```text
filterProducts()
sortProducts()
paginateProducts()
```

or an equivalent clean design if the existing architecture suggests something better.

These functions should:

* be deterministic
* avoid modifying the original product dataset
* have clear inputs and outputs
* be independently testable
* use TypeScript types
* avoid coupling business logic directly to React components

Do not create abstractions merely for the sake of abstraction.

---

### 5. State Synchronization Rules

Define exactly how state should behave.

Pay particular attention to these scenarios:

#### Scenario A — User changes a filter while on page 4

The implementation should determine whether the page should reset to page 1.

Explain and implement the chosen behavior.

#### Scenario B — User changes sorting

Determine whether pagination should reset.

#### Scenario C — User resets filters

Determine:

* filter values
* sort state
* page state

after reset.

#### Scenario D — Filter produces fewer pages than the current page

For example:

```text
Current page = 5
User applies a filter
Filtered result only has 2 pages
```

Define the correct behavior.

#### Scenario E — User changes page

The current:

* category
* price
* rating
* sort

state must remain intact.

---

### 6. UI Component Architecture

Design the React component hierarchy.

Consider a structure similar to:

```text
CatalogPage
│
├── CatalogHeader
│
├── CatalogControls
│   ├── CategoryFilter
│   ├── PriceFilter
│   ├── RatingFilter
│   ├── SortControl
│   └── ResetFilters
│
├── ActiveFilters
│
├── ResultsSummary
│
├── ProductGrid
│   └── ProductCard
│
└── Pagination
```

This is only a starting point.

Adapt it to the actual project.

For each component, define:

* responsibility
* props
* state ownership
* whether it should be a client component
* how it communicates with the catalog state

Avoid prop drilling where a simple architecture can prevent it, but do not introduce global state just to avoid passing a few props.

---

### 7. Mobile Architecture

The challenge requires the filter experience to remain usable on mobile.

Design how the filters should behave responsively.

A suitable approach may be:

```text
Desktop:
Sidebar filters

Mobile:
Filter button
     ↓
Collapsible/drawer filter panel
```

Determine:

* what remains visible on mobile
* how the user opens filters
* how active filters are communicated
* how the reset action works
* how the result count remains visible

Do not implement visual polish yet.

Focus on architecture and usability.

---

### 8. URL / Query State Decision

Evaluate whether the catalog state should be represented in URL query parameters.

Consider whether using query parameters would improve:

* pagination state
* shareability
* browser navigation
* refresh persistence

However, do not introduce URL synchronization simply because it is technically possible.

For this timed challenge, choose the simplest approach that satisfies the stated requirements.

If you decide to use URL query parameters, define exactly which parameters will exist.

If you decide not to use them, explain why.

---

### 9. Testing Architecture

Design the testing boundaries.

Identify which logic can be tested without rendering React components.

At minimum, plan tests for:

#### Filtering

* category
* price
* rating
* combined filters

#### Sorting

* ascending
* descending
* rating
* deterministic ordering

#### Pagination

* first page
* middle page
* last page
* page beyond available results

#### State behavior

* filter changes reset pagination appropriately
* sorting preserves filters
* page changes preserve filters
* reset restores defaults

#### Edge cases

* empty result
* invalid price range
* boundary values
* duplicate/invalid product data if relevant

Do not write the complete tests in this phase unless needed to validate the architecture.

---

### 10. Performance Considerations

Evaluate the expected dataset size.

Because this challenge uses a static/mock dataset, prefer a straightforward implementation.

Do not introduce:

* premature memoization
* complex caching
* unnecessary state libraries
* virtualization
* server infrastructure

unless the repository or requirements provide a real reason.

Explain where React memoization such as `useMemo` would or would not be appropriate.

---

### 11. Accessibility

Define basic accessibility requirements for:

* filter controls
* select/dropdown controls
* buttons
* mobile filter drawer
* pagination
* active filter removal
* product cards

Make sure the future implementation can be operated with keyboard controls where appropriate.

Do not introduce an accessibility library unless necessary.

---

### 12. Implementation Plan

Produce a precise implementation sequence.

For example:

```text
1. Implement pure catalog filtering logic
2. Implement sorting
3. Implement pagination
4. Build filter controls
5. Connect catalog state
6. Build product grid
7. Add active filters
8. Add result count
9. Add reset behavior
10. Add pagination controls
11. Add responsive mobile filter experience
12. Add tests
13. Validate edge cases
14. Polish UI
```

Adapt the order based on the actual architecture.

---

### 13. Architectural Trade-offs

Explicitly document:

* why local React state is sufficient
* why a state-management library is or isn't needed
* why the chosen filtering pipeline is appropriate
* why business logic is separated or not separated
* why the chosen component boundaries are appropriate
* why URL synchronization is or isn't being used
* what has intentionally NOT been implemented

The goal is to produce architecture that can be defended during a technical evaluation.

---

### 14. Implementation Scope

After completing the architectural analysis, implement ONLY the architectural foundations required for the next implementation phase.

You may:

* create/update TypeScript types
* create pure catalog utility functions if appropriate
* create necessary component shells
* establish state interfaces/types
* establish test utilities if necessary

You MUST NOT yet implement the complete user-facing feature.

Do not spend time on visual polish.

Do not implement Task 2.

---

### prompt.md Requirement

The repository must maintain a `prompt.md` file containing the actual prompts used during this challenge.

Update `prompt.md` by appending this exact prompt under:

```markdown
## Prompt 2 — Product Catalog Architecture and State Design
```

Strict rules:

* Preserve Prompt 1 exactly as it currently exists.
* Do not rewrite Prompt 1.
* Do not delete Prompt 1.
* Do not invent previous prompts.
* Add only this Prompt 2.
* Do not add future prompts.
* Do not add fabricated AI interactions.
* Keep the prompts in chronological order.

`prompt.md` is a factual record of the prompts actually used.

---

### Validation

After making the permitted architectural changes:

1. Run TypeScript validation.
2. Run ESLint.
3. Run the existing tests.
4. Confirm the application still starts.
5. Confirm no unrelated functionality has been broken.
6. Confirm no unnecessary dependencies were introduced.

If something fails, fix only issues caused by this phase.

---

### Required Final Response

Return:

#### 1. Architecture Summary

#### 2. Catalog State Model

#### 3. Filtering / Sorting / Pagination Pipeline

#### 4. Component Hierarchy

#### 5. Business Logic Design

#### 6. State Synchronization Rules

#### 7. Mobile Strategy

#### 8. Testing Strategy

#### 9. Accessibility Strategy

#### 10. Trade-offs

#### 11. Files Created/Modified

#### 12. Validation Results

#### 13. What Will Be Implemented Next

Do not implement the complete Product Catalog feature yet.
Do not work on Task 2.

---

## Prompt 3 — Product Catalog Functional MVP Implementation

### Role

Act as a senior frontend engineer specializing in Next.js, React, TypeScript, and production-quality application development.

The project foundation and architecture for Task 1 have already been established.

Your objective in this phase is to implement the **complete functional MVP** of Task 1 — Product Catalog Filters.

Focus on correctness, maintainability, and complete functional behavior.

Do not work on Task 2.

Do not spend significant effort on visual decoration or advanced UI polish in this phase. A dedicated UI/UX refinement phase will follow.

---

### Task Requirements

Implement a Product Catalog based on the existing static/mock product dataset.

The catalog must support:

* Category filtering
* Minimum price filtering
* Maximum price filtering
* Minimum rating filtering
* Combining multiple filters correctly
* Sorting
* Pagination
* Result count
* Active filter visibility
* Filter reset
* Preservation of filter and sorting state during pagination
* Responsive usability

The implementation must satisfy the actual challenge requirements without adding speculative functionality.

---

### Functional Processing Pipeline

Implement the catalog processing flow using a clear and deterministic pipeline:

```text
Product Dataset
      ↓
Apply active filters
      ↓
Calculate filtered result count
      ↓
Sort filtered results
      ↓
Calculate pagination
      ↓
Select current page
      ↓
Render products
```

Filtering must occur before pagination.

Sorting must occur before pagination.

The original product dataset must never be mutated.

---

### 1. Product Rendering

Create a reusable product presentation component.

Each product should display at minimum:

* product name
* category
* price
* rating

Use the existing Product TypeScript type and mock dataset.

Do not duplicate product data inside components.

---

### 2. Category Filtering

Implement category filtering using the categories represented in the dataset.

Provide an appropriate option for:

```text
All Categories
```

and the individual categories.

When a category is selected, only products belonging to that category should remain.

The implementation should derive categories from the dataset where practical rather than unnecessarily hardcoding them.

---

### 3. Price Range Filtering

Implement:

* minimum price
* maximum price

Support:

```text
minimum only
maximum only
minimum + maximum
no price filter
```

Define and enforce sensible behavior when:

```text
minimum price > maximum price
```

Do not silently produce confusing results.

Use appropriate numeric validation.

---

### 4. Rating Filtering

Implement a minimum-rating filter.

For example:

```text
All Ratings
4+ stars
3+ stars
2+ stars
```

Only products satisfying the selected minimum rating should remain.

Ensure the comparison behavior is consistent at boundary values.

---

### 5. Combined Filtering

All active filters must be applied together using AND semantics.

For example:

```text
Category = Audio
AND
Price >= 50
AND
Price <= 200
AND
Rating >= 4
```

must return only products satisfying every active condition.

Changing one filter must not accidentally remove or overwrite the other active filters.

---

### 6. Sorting

Implement appropriate sorting options, including at minimum:

```text
Default
Price: Low to High
Price: High to Low
Rating: High to Low
Name: A to Z
```

Sorting must operate on the filtered dataset.

Changing sorting must preserve all active filters.

Ensure sorting does not mutate the original dataset.

Ensure sorting is deterministic.

---

### 7. Pagination

Implement pagination over the filtered and sorted results.

Include:

* current page
* total pages
* previous control
* next control
* page numbers where appropriate
* sensible page size

The pagination calculation must use the number of filtered results.

For example:

```text
Original products: 50
Filtered products: 17
Page size: 6
Total pages: 3
```

The UI should correctly represent this state.

---

### 8. Query State Behavior

Implement predictable state transitions.

#### Filter change

When a filter changes, reset the current page to the first page.

Do not reset unrelated filters.

#### Sorting change

When sorting changes, preserve the active filters.

Reset pagination if necessary to ensure the user starts from a valid page.

#### Pagination change

When changing pages, preserve:

* category
* minimum price
* maximum price
* minimum rating
* sorting

#### Reset

Reset all filter state, sorting, and pagination to sensible defaults.

---

### 9. Invalid Pagination State

Handle situations such as:

```text
Current page = 5

User applies a filter

Filtered dataset only has 2 pages
```

The implementation must prevent the UI from remaining on an invalid page.

The resulting state should always point to a valid page.

---

### 10. Result Count

Display the number of products matching the current filters.

The count must represent the entire filtered result set rather than only the currently visible page.

Examples:

```text
24 products found
```

or:

```text
1 product found
```

or:

```text
No products found
```

---

### 11. Active Filters

Display the currently active filters clearly.

For example:

```text
Active Filters

[Audio ×] [₹50–₹200 ×] [4+ ★]
```

The implementation should make it obvious to the user which filters are currently affecting the results.

If removing individual active filters fits naturally into the existing architecture, implement it.

---

### 12. Reset Filters

Provide a clear reset action.

Resetting must restore:

* category
* minimum price
* maximum price
* minimum rating
* sorting
* page

to their default states.

The complete dataset should become visible again.

---

### 13. Empty State

Implement a clear empty-result state.

When no products match the active query:

* show that no products were found
* make the state understandable
* provide an obvious way to reset filters

Do not leave the user with a blank product grid.

---

### 14. Responsive Functional Structure

Ensure the functional filter controls can be used on:

* desktop
* tablet
* mobile

The UI does not need final visual polish yet, but the underlying component structure must support a responsive filter experience.

A mobile filter drawer/collapsible filter panel may be used during the later UI refinement phase.

---

### 15. Business Logic

Keep catalog business logic independently testable.

Use pure functions or equivalent well-defined utilities for:

* filtering
* sorting
* pagination

The business logic should:

* be deterministic
* avoid mutating input data
* have explicit TypeScript types
* be independent from React rendering where practical

Do not create unnecessary abstraction layers.

---

### 16. Testing

Add meaningful tests for the core functionality.

At minimum cover:

#### Filtering

* category
* minimum price
* maximum price
* rating
* multiple filters together

#### Sorting

* price ascending
* price descending
* rating
* name

#### Pagination

* first page
* middle page
* last page
* filtered result pagination
* total page calculation

#### State behavior

* filter change resets page
* sorting preserves filters
* pagination preserves query state
* reset restores defaults

#### Edge cases

* no results
* invalid price range
* boundary values
* invalid page

Prefer high-value tests over artificially increasing test count.

---

### 17. Code Quality

Maintain:

* strict TypeScript typing
* clear naming
* focused components
* reusable business logic
* no duplicated filtering/sorting logic
* no unnecessary dependencies
* no unnecessary state
* no mutation of source data
* clean separation between presentation and business logic

Do not refactor unrelated parts of the project.

---

### 18. Validation

After implementation, run the project's appropriate validation commands.

At minimum verify:

```text
TypeScript
ESLint
Unit Tests
Production Build
```

Fix errors caused by this implementation.

Verify the application can start successfully.

---

### 19. Functional Acceptance Scenarios

Manually verify these scenarios:

#### Scenario 1

No filters → all products are visible.

#### Scenario 2

Category filter → only matching products are visible.

#### Scenario 3

Minimum price → only products at or above the minimum are visible.

#### Scenario 4

Maximum price → only products at or below the maximum are visible.

#### Scenario 5

Minimum + maximum price → only products within the range are visible.

#### Scenario 6

Minimum rating → only products meeting the rating threshold are visible.

#### Scenario 7

Category + price + rating → all conditions are applied simultaneously.

#### Scenario 8

Sort while filters are active → filters remain active.

#### Scenario 9

Navigate between pages while filters are active → query state remains intact.

#### Scenario 10

Apply a restrictive filter from a later page → pagination returns to a valid page.

#### Scenario 11

Reset filters → catalog returns to the initial state.

#### Scenario 12

No matching products → clear empty state is displayed.

---

### Scope Control

Do not implement:

* Task 2
* backend services
* databases
* authentication
* external APIs
* unnecessary state-management libraries
* speculative features
* complex animations
* unnecessary architectural abstractions

The goal of this phase is a **complete and reliable functional MVP**.

A separate prompt will be used for visual/UI/UX refinement.

---

### prompt.md Requirement

The repository must maintain a root-level `prompt.md` containing the exact prompts actually used during the challenge.

Append this exact prompt under:

```markdown
## Prompt 3 — Product Catalog Functional MVP Implementation
```

Rules:

* Preserve Prompt 1 exactly.
* Preserve Prompt 2 exactly.
* Append Prompt 3 exactly.
* Do not rewrite previous prompts.
* Do not invent prompts.
* Do not add future prompts.
* Do not fabricate interactions.
* Maintain chronological order.

Do not add time estimates, internal discussion, or commentary to the prompt log.

The file must remain a professional and factual record of the AI prompts used during development.

---

### Final Response

After implementation, provide:

#### 1. Implemented Functionality

#### 2. Filtering Logic

#### 3. Sorting Logic

#### 4. Pagination Logic

#### 5. State Management

#### 6. Tests Added

#### 7. Validation Results

Include:

* TypeScript
* ESLint
* Tests
* Build

#### 8. Files Created/Modified

#### 9. Known Limitations

#### 10. Recommended Next Phase

Do not implement Task 2 or the dedicated visual refinement phase yet.

---

## Prompt 4 — Premium Product Catalog UI/UX Refinement

### Role

Act as a senior product designer, UI/UX designer, design-system engineer, and senior frontend engineer specializing in Next.js, React, TypeScript, and Tailwind CSS.

The functional implementation of **Task 1 — Product Catalog Filters** is now complete.

Your responsibility in this phase is to transform the existing functional interface into a **high-quality, polished, aesthetically strong, professional product-catalog experience** while preserving all existing functionality.

This is a dedicated visual and UX refinement phase.

Do not implement Task 2.

---

### Primary Objective

Improve the Product Catalog so that it feels like a deliberately designed modern production application rather than a basic coding-challenge interface.

The final result should demonstrate:

* strong visual hierarchy
* thoughtful spacing
* polished typography
* cohesive color usage
* excellent product-card design
* intuitive filter interactions
* clear active-state communication
* refined controls
* responsive behavior
* accessibility
* visual consistency
* professional attention to detail

The interface should look impressive immediately when opened.

However, aesthetics must never break the functional requirements.

---

### Design Direction

Create a modern, premium product-discovery/catalog experience.

Aim for a visual language comparable to a polished modern SaaS/e-commerce product without copying any specific existing website.

The design should feel:

* clean
* sophisticated
* modern
* intentional
* spacious
* approachable
* premium
* highly usable

Avoid making the interface look like a generic admin dashboard.

Avoid excessive decoration.

Avoid visual noise.

Avoid unnecessary gradients, excessive glassmorphism, excessive shadows, or random colors.

Every visual element should have a purpose.

---

### 1. First Inspect the Existing Implementation

Before modifying the UI:

* inspect all current catalog components
* inspect the current layout
* inspect filter components
* inspect product cards
* inspect active-filter implementation
* inspect sorting controls
* inspect pagination
* inspect responsive behavior
* inspect existing Tailwind styles
* inspect existing business logic

Do not blindly rewrite the application.

Preserve working business logic.

Improve the presentation layer wherever possible.

---

### 2. Establish a Visual Design System

Create a consistent visual language across the entire catalog.

Define and consistently use:

#### Color system

Choose a restrained, professional palette.

The palette should have:

* primary/accent color
* primary text
* secondary text
* muted text
* page background
* surface/card background
* border color
* success/positive state where useful
* warning/error state where useful

Do not use many unrelated colors.

Interactive elements should have a clear visual hierarchy.

Ensure sufficient contrast for accessibility.

---

#### Typography

Create a clear hierarchy for:

* page title
* subtitle/description
* section headings
* product names
* product metadata
* prices
* ratings
* filter labels
* result counts
* pagination

Use font sizes and weights intentionally.

Do not make everything bold.

Do not make every piece of text the same visual weight.

---

#### Spacing

Use a consistent spacing rhythm.

Maintain appropriate spacing between:

* page sections
* filters
* product cards
* controls
* labels
* chips
* pagination
* headings

Avoid cramped layouts.

Avoid excessive empty space that makes the interface feel unfinished.

---

#### Borders, Radius, and Shadows

Choose a consistent design language for:

* card radius
* button radius
* input radius
* chip radius
* borders
* shadows

Do not mix many unrelated styles.

Prefer subtle depth over heavy shadows.

---

### 3. Page Header

Create a polished catalog header.

It should communicate:

* what the catalog is
* what the user can do
* current result state

Consider a structure such as:

```text
Product Catalog

Discover products that match your preferences.

24 products
```

The exact wording and layout can be improved based on the existing implementation.

The header should establish visual hierarchy without consuming excessive vertical space.

---

### 4. Catalog Layout

Create a strong desktop composition.

A good structure may be:

```text
┌──────────────────────────────────────────────────────┐
│ Header                                               │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Filters          Results Area                       │
│                  Result count + sorting              │
│                  Active filters                      │
│                  Product grid                        │
│                  Pagination                          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

The exact layout is up to you.

The result should feel balanced and intentional.

The filter area should not visually overpower the products.

The product grid should be the primary visual focus.

---

### 5. Filter Panel

Redesign the filter interface carefully.

The filters should be easy to scan and understand.

Organize them into clear sections:

```text
Filters

Category
[ ...]

Price
[ Min ] — [ Max ]

Rating
[ ...]

[Reset filters]
```

Use appropriate visual grouping.

Make labels clear.

Avoid overly complicated controls.

---

### 6. Category Filter

Make the category control visually polished.

Depending on the existing implementation, use an appropriate control such as:

* radio buttons
* checkboxes
* segmented controls
* select
* custom selectable list

Prioritize usability over novelty.

Selected and unselected states must be immediately distinguishable.

Hover and focus states should feel intentional.

---

### 7. Price Filter

Make minimum and maximum price inputs feel like part of the same design system.

Consider:

```text
Price

₹ Min       ₹ Max
┌────────┐  ┌────────┐
│        │  │        │
└────────┘  └────────┘
```

Inputs should have:

* clear labels
* appropriate focus state
* consistent border/radius
* sensible placeholder values
* readable numbers

Do not make the controls visually overwhelming.

---

### 8. Rating Filter

Make rating selection easy to understand at a glance.

Use appropriate visual treatment for stars.

For example:

```text
★★★★★  4+
★★★★☆  3+
★★★☆☆  2+
```

Do not use decorative stars that make the actual rating control ambiguous.

The selected state should be obvious.

---

### 9. Active Filter Chips

Create polished active-filter chips.

Example:

```text
Active filters

[ Audio × ] [ ₹50–₹200 × ] [ 4+ ★ ]
```

Requirements:

* clearly distinguish active filters
* compact but readable
* easy to remove
* consistent with the design system
* appropriate hover/focus states

If there are no active filters, handle the state gracefully rather than leaving an awkward empty section.

---

### 10. Result Summary

Create a clear result summary.

For example:

```text
24 products found
```

The result count should be visually prominent enough to provide context but should not compete with the page heading.

When no results exist, transition naturally into the empty state.

---

### 11. Sorting Control

Create a polished sorting control.

Example:

```text
Sort by
[ Rating: High to Low ▾ ]
```

It should visually belong to the same control system as the filters.

Ensure changing sorting continues to preserve active filters.

Do not change the existing sorting logic unnecessarily.

---

### 12. Product Cards

This is one of the most important visual areas.

Design product cards that feel polished and cohesive.

Each card should clearly communicate:

* product name
* category
* price
* rating

Create a strong visual hierarchy.

Consider:

```text
┌────────────────────────┐
│                        │
│      PRODUCT AREA      │
│                        │
├────────────────────────┤
│ Category               │
│ Product Name           │
│ ★ 4.5                  │
│                        │
│ ₹1,299                 │
└────────────────────────┘
```

The exact design should be based on the available product data.

If there are no product images in the dataset, do NOT introduce an external image dependency just to decorate cards.

Instead, create an elegant typography/data-focused card design.

Do not invent product photography that does not belong to the dataset.

---

### 13. Product Grid

Create a responsive product grid.

It should adapt naturally across:

* large desktop
* laptop
* tablet
* mobile

Avoid cards becoming excessively narrow or excessively wide.

Maintain consistent card heights where practical.

Ensure product names and metadata do not cause ugly layout shifts.

---

### 14. Empty State

Design a polished empty state.

When filters return no results, show something similar in spirit to:

```text
No products found

Try adjusting or clearing your filters.

[Reset filters]
```

The empty state should feel intentional rather than like a broken page.

Keep it visually simple.

---

### 15. Pagination

Redesign pagination so that it feels like part of the same product.

Example:

```text
← Previous    1   2   3   4    Next →
```

Clearly communicate:

* current page
* available pages
* disabled states
* hover states
* focus states

Do not make pagination visually louder than the products.

---

### 16. Reset Filters

Make the reset action easy to discover without making it visually dominant.

Use appropriate styling for its importance.

When filters are active, the reset action should be obvious.

When there are no active filters, avoid unnecessary visual noise.

---

### 17. Responsive Mobile Experience

This is a major requirement.

Do not simply shrink the desktop layout.

Design a genuinely usable mobile experience.

A suitable approach is:

```text
Mobile

Product Catalog
24 products

[ Filters ]       [ Sort ]

Active filters

Product grid
```

The filter controls can open inside a drawer or collapsible panel.

The mobile filter experience should:

* be easy to open
* be easy to close
* preserve filter state
* provide reset functionality
* not obstruct the entire experience unnecessarily
* remain keyboard accessible

Use Tailwind responsive utilities appropriately.

---

### 18. Interaction Design

Add subtle interaction feedback where useful.

Consider:

* hover states
* focus states
* selected states
* disabled states
* button transitions
* filter chip transitions
* card hover treatment

Keep animations subtle.

Do not add animations merely because they are possible.

Avoid excessive motion.

Respect reduced-motion preferences where practical.

---

### 19. Accessibility

The visual redesign must maintain or improve accessibility.

Ensure:

* semantic HTML
* proper labels
* keyboard navigation
* visible focus states
* sufficient contrast
* meaningful button names
* accessible mobile filter controls
* pagination controls with meaningful labels

Do not sacrifice accessibility for aesthetics.

---

### 20. Avoid Common AI-Generated UI Problems

The final design MUST avoid:

* excessive gradients
* random accent colors
* excessive rounded cards
* excessive shadows
* excessive glassmorphism
* giant hero sections
* unnecessary icons everywhere
* inconsistent spacing
* inconsistent border radii
* arbitrary font sizes
* overly saturated colors
* generic dashboard appearance
* visual clutter
* unnecessary animations
* decorative elements that do not communicate information

Do not make every element look like a floating card.

Use hierarchy and whitespace intentionally.

---

### 21. Visual Consistency Review

After implementation, review the complete page as a single design system.

Check:

#### Typography

Are headings, labels, metadata, and prices clearly differentiated?

#### Color

Are colors consistent and purposeful?

#### Spacing

Do sections share a consistent rhythm?

#### Controls

Do buttons, inputs, selects, chips, and pagination feel like the same product?

#### Cards

Do all product cards share the same visual language?

#### Responsive design

Does the interface remain polished at different widths?

#### Accessibility

Are focus states and contrast adequate?

---

### 22. Preserve Functionality

This is critical.

Do not break:

* filtering
* combined filters
* price filtering
* rating filtering
* sorting
* pagination
* result counts
* active filters
* reset
* empty state behavior

Do not rewrite business logic unless necessary.

If a visual change requires changing component structure, preserve the existing functional behavior.

---

### 23. Performance

Do not add unnecessary dependencies solely for UI polish.

Prefer:

* Tailwind CSS
* existing React components
* CSS transitions
* existing project utilities

Do not introduce a large UI library unless there is a compelling reason.

---

### 24. Validation

After completing the visual refinement:

Run:

```text
TypeScript validation
ESLint
Tests
Production build
```

Then manually verify:

* desktop layout
* tablet layout
* mobile layout
* filter interactions
* sorting
* pagination
* reset
* active filters
* empty state
* keyboard navigation

Fix any regressions caused by the UI changes.

---

### 25. Screenshot-Level Quality Review

Before finishing, inspect the application as if you were evaluating it visually in a frontend coding challenge.

Ask:

1. Does the page look professionally designed?
2. Is the visual hierarchy immediately obvious?
3. Is the product grid attractive and readable?
4. Are filters easy to understand?
5. Are active filters obvious?
6. Is the result count easy to find?
7. Is sorting easy to understand?
8. Does pagination look polished?
9. Does the mobile version feel intentionally designed?
10. Does anything look unfinished or inconsistent?

Fix obvious issues you identify.

---

### Scope

This phase is ONLY for Task 1 UI/UX refinement.

Do not:

* implement Task 2
* introduce a backend
* introduce a database
* change the data model unnecessarily
* add unrelated features
* rewrite working business logic without need
* add unnecessary dependencies

---

### prompt.md Requirement

Update the root `prompt.md`.

Append this exact prompt under:

```markdown
## Prompt 4 — Premium Product Catalog UI/UX Refinement
```

Strict rules:

* Preserve Prompt 1 exactly.
* Preserve Prompt 2 exactly.
* Preserve Prompt 3 exactly.
* Append only Prompt 4.
* Do not rewrite previous prompts.
* Do not delete previous prompts.
* Do not invent prompts.
* Do not fabricate interactions.
* Do not add future prompts.
* Maintain chronological order.

`prompt.md` must remain a professional and accurate record of the prompts actually used during development.

Do not add internal commentary, time constraints, or private reasoning to `prompt.md`.

---

### Final Response

After completing the refinement, provide:

#### 1. UI/UX Improvements

#### 2. Design System

#### 3. Responsive Improvements

#### 4. Accessibility Improvements

#### 5. Interaction Improvements

#### 6. Files Modified

#### 7. Validation Results

Report:

* TypeScript
* ESLint
* Tests
* Build

#### 8. Remaining Visual Limitations

#### 9. Recommended Next Step

Do not implement Task 2.
