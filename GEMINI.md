# Material You Widgets App — Project Master Brief

## Purpose of this document
Complete handoff reference for generating the codebase. The goal is to build a React Native Android app that replicates the Material You (MD3) widget system from Android 12+.

**Target platform:** Android (APK via Expo bare workflow)
**Framework:** React Native (Expo)
**Library:** `react-native-android-widget`

---

## 🚨 CRITICAL ANDROID NATIVE CONSTRAINTS (READ FIRST)
This project compiles to native Android `RemoteViews`. You MUST adhere to these rules or the Android launcher will crash:
1. **NO REACT WEB CODE:** Do not output `<div>`, `<span>`, or `<svg>`. 
2. **NO STANDARD REACT NATIVE COMPONENTS:** Do not use standard `<View>`, `<Text>`, or `<Image>`.
3. **ONLY NATIVE WIDGET COMPONENTS:** You MUST exclusively use components exported from `react-native-android-widget`: `<FlexWidget>`, `<TextWidget>`, `<IconWidget>`, and `<SvgWidget>`.
4. **CSS/STYLE LIMITATIONS:** Do not use CSS variables (`var(--md3-primary)`). Use raw hex codes passed dynamically via the theme engine. Use integer values for padding and radius (no 'px' or 'rem' strings).
5. **SVG HANDLING:** Any vector graphics, squiggly lines, or progress rings MUST be passed as a raw XML string literal into the `<SvgWidget svg={svgString} />` component.
6. **CODE CONSOLIDATION:** Always write the full, consolidated file from top to bottom. Do not generate separate, fragmented modules for a single component.

---

## 1. Project Overview & Tech Stack
* **Animations:** `react-native-reanimated` v3
* **Music / Media:** `react-native-music-control` + Android MediaSession API
* **Widget drag/sort:** `react-native-drag-sort`
* **Weather API:** Open-Meteo
* **Theming:** Custom MD3 tonal palette engine (built from scratch)

---

## 2. Design System — Material You (MD3)
### 2.1 Color Token Structure
UI components reference these tokens:
* `primary`, `onPrimary`, `primaryContainer`, `onPrimaryContainer`
* `secondary`, `onSecondary`, `secondaryContainer`, `onSecondaryContainer`
* `surface`, `surfaceBright`, `surfaceVariant`, `onSurface`, `onSurfaceVariant`
* `outline`, `outlineVariant`

### 2.2 Typography & Spacing
* **Fonts:** Google Sans (Display/Body), Roboto (Title), Montserrat Black (Analog Clocks).
* **Radii:** Large containers: 19-20dp | Medium cards: 12-13dp | Pills: 100dp | Chips: 8dp.
* **Base spacing:** 6.5dp (Padding small), 13dp (Padding medium).

---

## 3. Widget Catalog
* **W01-W03 — Music Players:** Ranges from 4×1 horizontal with squiggly progress bars to 2×1 mini bars.
* **W04-W06 — Weather:** 1×1 to 2×2 blocks showing current temp and hourly forecasts.
* **W07-W11 — Clocks:** Digital date pills and Montserrat Black analog circles.
* **W12-W13 — Calendar:** 3×2 Event list and 2×1 Mini.
* **W14-W15 — Maps & Shortcuts:** Search bars and 2×2 quick action grids.
* **W16-W17 — Google News:** Light and Dark RSS-fed cards.
* **W18 — Battery:** 1×1. Percentage with circular arc SVG progress ring.
* **W19 — Quick Settings:** 3×2. 2×2 grid of functional toggles (WiFi, BT, Flashlight, Alarm).
* **W20-W21 — Notes / Checklist:** 2×2 Dark and Light list items.
* **W22 — Translator History:** 2×3 Scrollable list.
* **W23 — Gaming / Friends:** 2×1 Static display.
* **W24 — Storage Ring:** 1×1 multi-segment SVG ring.
* **W25-W32 — Advanced Utilities:** System Resource Monitors, Pomodoro Timers, Habit Grids, Voice Memo Bars.

---

## 4. Figma MCP Integration Instructions
The design source is located at: `https://www.figma.com/design/XdDTr1pIR4ctDXIT0Asytf/Material-You-Widgets--Community-`

1. Use the `@figma/mcp-server` to fetch the specific Figma node URL provided by the user.
2. Extract the exact `cornerRadius`, `padding`, `backgroundColor`, and layout alignment properties from the Figma node.
3. Map Figma's raw hex colors to the closest MD3 semantic token (`surface`, `primary`, etc.) based on the Theme Engine guidelines above.
4. Output ONLY the `react-native-android-widget` code.