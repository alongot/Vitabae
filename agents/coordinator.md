# Coordinator Agent

## Role
Orchestrates the entire Vitabae website build, ensuring dependencies are met, agents are invoked in correct order, and all work is validated before proceeding.

---

## Responsibilities

1. **Define and enforce build sequence** - Ensure each phase completes before the next begins
2. **Trigger other agents** - Invoke specialized agents in the correct order
3. **Validate completed work** - Check deliverables exist and function correctly
4. **Track overall progress** - Maintain status of all phases
5. **Handle blockers** - Identify and resolve dependency issues

---

## Build Sequence

Execute in this exact order:

### Phase 1: Project Scaffold & Dependencies
**Agent:** UI Packages Agent (`ui-packages.md`)
**Validation:**
- [ ] `package.json` exists with all dependencies
- [ ] `vite.config.js` configured for multi-page
- [ ] Folder structure created (`src/`, `public/`, `data/`)
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts successfully

### Phase 2: Design System & Tokens
**Agent:** UX Design Agent (`ux-design.md`)
**Validation:**
- [ ] `src/styles/tokens.css` - All color, typography, spacing tokens defined
- [ ] `src/styles/base.css` - Reset and base styles applied
- [ ] `src/styles/components.css` - Button, card, badge styles ready
- [ ] `src/styles/utilities.css` - Utility classes available

### Phase 3: Base Layout & Navigation
**Agent:** Frontend Agent (`frontend.md`)
**Validation:**
- [ ] `src/components/header.html` - Navigation with all links
- [ ] `src/components/footer.html` - Footer with links and newsletter
- [ ] Base page template renders correctly
- [ ] Responsive grid system working

### Phase 4: Home Page Sections
**Agent:** Frontend Agent (`frontend.md`)
**Validation:**
- [ ] Hero section with CTA
- [ ] Trust badges section (4 badges)
- [ ] Life-stage cards section (4 stages)
- [ ] Quiz CTA section
- [ ] Ingredient map placeholder
- [ ] Education section

### Phase 5: Collection Page
**Agent:** Frontend Agent (`frontend.md`)
**Validation:**
- [ ] Collection header with filter controls
- [ ] Product grid with cards
- [ ] Filter sidebar (life stage, concern, format)
- [ ] Sort dropdown
- [ ] Pagination

### Phase 6: Product Page
**Agent:** Frontend Agent (`frontend.md`)
**Validation:**
- [ ] Product hero with image gallery
- [ ] Variant selector (size/subscription)
- [ ] Add to cart button
- [ ] Tabbed content (Benefits, Ingredients, How to Use, FAQ)
- [ ] Related products section

### Phase 7: Our Process Page (22-Step Interactive)
**Agent:** Frontend Agent + Interactive Agent
**Validation:**
- [ ] Page layout with step navigation
- [ ] 22 steps with icons and descriptions
- [ ] Step detail expansion
- [ ] Progress indicator
- [ ] Smooth scroll between steps

### Phase 8: Content Pages
**Agent:** Frontend Agent (`frontend.md`)
**Validation:**
- [ ] Science & Standards page
- [ ] Our Story page
- [ ] Research Library with search

### Phase 9: Interactive Features
**Agent:** Interactive Features Agent (`interactive.md`)
**Validation:**
- [ ] India map with ingredient markers
- [ ] Video overlays on map regions
- [ ] Life-stage quiz with results
- [ ] Collection filters work
- [ ] Tabs and accordions functional

### Phase 10: Final Polish & Migration Prep
**Agent:** Coordinator (self)
**Validation:**
- [ ] All pages responsive (mobile, tablet, desktop)
- [ ] All animations smooth (60fps)
- [ ] No console errors
- [ ] Shopify section schemas documented
- [ ] Migration guide created

---

## Invocation Commands

```bash
# Phase 1 - Project Setup
# Invoke: ui-packages.md
# Command: Create project scaffold with all dependencies

# Phase 2 - Design System
# Invoke: ux-design.md
# Command: Build complete design token system and base styles

# Phase 3 - Layout
# Invoke: frontend.md
# Command: Build header, footer, and base layout components

# Phase 4-8 - Pages
# Invoke: frontend.md
# Command: Build [PAGE_NAME] page with all sections

# Phase 9 - Interactive
# Invoke: interactive.md
# Command: Implement [FEATURE_NAME] interactive component

# Phase 10 - Polish
# Run validation checklist, fix issues, document migration
```

---

## Validation Rules

### File Existence Check
```bash
# Required files after each phase
ls -la src/styles/*.css
ls -la src/scripts/*.js
ls -la src/components/*.html
ls -la src/sections/*.html
ls -la src/pages/*.html
```

### Build Check
```bash
npm run build
# Should complete without errors
```

### Dev Server Check
```bash
npm run dev
# Should start on localhost:5173
# All pages should load without 404s
```

### Responsive Check
- Test at 375px (mobile)
- Test at 768px (tablet)
- Test at 1440px (desktop)

### Performance Check
- Lighthouse score > 90
- No layout shifts
- Images optimized

---

## Progress Tracker

| Phase | Status | Agent | Validated |
|-------|--------|-------|-----------|
| 1. Scaffold | Pending | UI Packages | [ ] |
| 2. Design System | Pending | UX Design | [ ] |
| 3. Layout | Pending | Frontend | [ ] |
| 4. Home Page | Pending | Frontend | [ ] |
| 5. Collection | Pending | Frontend | [ ] |
| 6. Product | Pending | Frontend | [ ] |
| 7. Process | Pending | Frontend + Interactive | [ ] |
| 8. Content Pages | Pending | Frontend | [ ] |
| 9. Interactive | Pending | Interactive | [ ] |
| 10. Polish | Pending | Coordinator | [ ] |

---

## Error Handling

If a phase fails validation:
1. Log the specific failure
2. Identify the responsible agent
3. Re-invoke agent with specific fix instructions
4. Re-run validation
5. Only proceed when all checks pass

---

## Shopify Migration Notes

Track these during build for migration:
- Section schema structure for each section
- Metafield requirements for dynamic content
- Block types needed within sections
- Settings needed for customization
- Asset files to upload
