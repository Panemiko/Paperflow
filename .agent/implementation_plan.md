# Implementation Plan - Website Reorganization & FAQ

Rearrange the Paperflow landing page to create a more compelling narrative flow, add a FAQ section, and finalize button/icon styling.

## 1. Narrative Reorganization

The page will be restructured to follow this "story":

1.  **Hero**: The hook (Master your manuscript).
2.  **Quote**: The thesis (Writing is revision).
3.  **Mechanism**: "The Logic" (Split Canvas) + "Philosophy" (Branching). Immediate "How".
4.  **Result**: "Your Archive" (Commit History). The tangible output of the system.
5.  **Stance**: "Our Stance" (No-AI) + "Principles". The emotional/ethical differentiator.
6.  **Audience**: "For Writers" (Personas). Identifying the user.
7.  **Reliability**: "Architecture". Confirming it's built to last.
8.  **Social Proof**: Testimonials.
9.  **Clarification**: FAQ (New).
10. **Final Call**: Waitlist.

## 2. FAQ Section Implementation

- Create a `faq` array with 5-6 key questions.
- Add a new section in `page.tsx` before the final waitlist area.
- Style: Editorial, minimal, utilizing `MaxWidth`.

## 3. Styling & Interaction Finalization

- **Persona Icons**: Ensure `group-hover:text-primary-foreground` is consistently applied.
- **Button Icons**:
  - Add icons to any remaining "naked" buttons.
  - Standardize on `ArrowRight`, `GitBranch`, `Save`, `Loader2`, `Check`.
- **Consistency**: Verify all sections use the correct numbering (01, 02, etc.) after the move.

## 4. Proposed FAQ Items

- How do I keep my data? (Exportable Markdown/Git formats)
- Is it really No-AI? (Yes, zero LLM integration by choice)
- Cloud vs Local? (Cloud-first with local-first reliability)
- Pricing? (Founding author discount for early adopters)
- Data Privacy? (E2E encryption mentioned in architecture)
