---
name: Modern Heritage
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#554336'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#887364'
  outline-variant: '#dbc2b0'
  surface-tint: '#8f4e00'
  primary: '#8f4e00'
  on-primary: '#ffffff'
  primary-container: '#ff9933'
  on-primary-container: '#693800'
  inverse-primary: '#ffb77a'
  secondary: '#056e00'
  on-secondary: '#ffffff'
  secondary-container: '#8dfc75'
  on-secondary-container: '#067500'
  tertiary: '#77574d'
  on-tertiary: '#ffffff'
  tertiary-container: '#d0a99d'
  on-tertiary-container: '#5a3d34'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc2'
  primary-fixed-dim: '#ffb77a'
  on-primary-fixed: '#2e1500'
  on-primary-fixed-variant: '#6d3a00'
  secondary-fixed: '#8dfc75'
  secondary-fixed-dim: '#72de5c'
  on-secondary-fixed: '#012200'
  on-secondary-fixed-variant: '#035300'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#e7bdb1'
  on-tertiary-fixed: '#2c160e'
  on-tertiary-fixed-variant: '#5d4037'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: beVietnamPro
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-xl-mobile:
    fontFamily: beVietnamPro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: beVietnamPro
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: beVietnamPro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: beVietnamPro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: notoSans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: notoSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: notoSans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.5px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  touch-target-min: 48px
---

## Brand & Style
This design system is built to foster trust, reliability, and an emotional connection to the land. It balances a modern digital experience with the grounded, traditional values of Indian land ownership. The aesthetic is **Corporate / Modern** but infused with warmth, utilizing a high-contrast palette to ensure accessibility for users who may not be digital natives.

The style avoids complex visual flourishes in favor of clear information hierarchy, using large whitespace and robust structural elements to convey a sense of stability and institutional strength.

## Colors
The palette is deeply rooted in national identity and the natural landscape of Morena.
- **Saffron (#FF9933):** Used for primary actions and highlights to denote energy and auspicious beginnings.
- **Deep Green (#138808):** Represents fertility, growth, and the land itself. Used for success states and secondary branding.
- **Earth Brown (#5D4037):** A grounded tertiary color used for text and structural borders to evoke the literal soil of the plots.
- **Pure White & Off-White:** The primary background colors to ensure the high contrast required for readability and a "clean" professional feel.

## Typography
Typography is optimized for bilingual clarity (English and Hindi). 
- **beVietnamPro** is used for headlines to provide a contemporary, welcoming feel.
- **notoSans** is used for body copy and labels. Its neutral, systematic design ensures maximum legibility across different screen qualities and resolutions.
- **Key Principle:** Never use a font size smaller than 14px to ensure accessibility for older demographics or users with visual impairments.

## Layout & Spacing
The layout follows a **Fixed Grid** on desktop (12 columns, 1200px max-width) and a fluid single-column layout on mobile. 

A generous 8px-base spacing system is used to prevent "clutter." Elements are given significant breathing room to help non-tech-savvy users distinguish between different sections of information. Vertical spacing between logical sections (e.g., plot details and pricing) should be no less than 48px to clearly signal a change in context.

## Elevation & Depth
This design system uses **Tonal Layers** combined with **Ambient Shadows**. 
- Surfaces are primarily flat white.
- Depth is communicated through very soft, large-radius shadows (Blur: 20px, Opacity: 8%, Color: Earth Brown) to make "cards" appear slightly lifted from the background.
- This "lift" indicates interactivity, helping users understand that a card can be tapped or clicked to see more plot details.

## Shapes
The shape language is **Rounded**. 
Standard UI components like buttons and input fields use a 0.5rem (8px) radius. Larger containers, such as plot image cards, use a 1rem (16px) radius. This softness reduces the "industrial" feel of land development and makes the product feel more approachable and modern.

## Components
- **Buttons:** High-contrast buttons with a minimum height of 56px for easy tapping. Primary buttons use the Saffron background with white text.
- **Plot Cards:** Use a white background, soft shadows, and a 1px Earth Brown border at 10% opacity to define edges without adding visual noise.
- **Input Fields:** Large, clearly labeled fields with 16px internal padding. The active state should be highlighted with a 2px Saffron border.
- **Chips:** Used for plot status (e.g., "Available", "Sold", "Reserved"). "Available" should always use the Deep Green to signal growth and opportunity.
- **Trust Indicators:** Special icon-and-text components highlighting "RERA Approved" or "Government Verified" should use a light green tonal background to instill confidence.