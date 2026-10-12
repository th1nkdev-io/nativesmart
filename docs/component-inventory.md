# Component Inventory

This is the complete list of components Nativesmart will provide. It is the input for contracts,
component tokens and design-system recipes: a component gets a contract only once it appears here.

## Legend

**Priority**

- **P0**: Core v1.0. Blocks the first official release.
- **P1**: needed to build a real product end to end. Follows Core v1.0.
- **P2**: valuable but not blocking; delivered on demand or with a kit.

**Today**

- `C`: a contract exists in `@nativesmart/contracts`.
- `RN`: implemented in `@nativesmart/react-native`.
- `FL`: implemented in `nativesmart_flutter`.
- `—`: not started.

**Platforms**: every component targets web and mobile unless marked _web_ or _mobile_.

Identifiers are kebab-case and become contract ids (`button`, `amount-input`).

---

## Foundation components

Generic UI with no product assumption.

### 1. Layout and structure

| Component        | Id                 | Purpose                                                   | Priority | Today      |
| ---------------- | ------------------ | --------------------------------------------------------- | -------- | ---------- |
| Box              | `box`              | Base container with spacing, background and border tokens | P0       | C, RN, FL  |
| Stack            | `stack`            | Vertical or horizontal layout with consistent gap         | P1       | —          |
| Grid             | `grid`             | Responsive columns                                        | P1       | —          |
| Container        | `container`        | Max-width page wrapper with responsive gutters            | P1       | —          |
| Spacer           | `spacer`           | Flexible empty space inside a stack                       | P2       | —          |
| Divider          | `divider`          | Horizontal or vertical separator                          | P0       | C, RN, FL  |
| Aspect Ratio     | `aspect-ratio`     | Keeps media at a fixed ratio                              | P2       | —          |
| Scroll Area      | `scroll-area`      | Scrollable region with consistent scrollbars and insets   | P1       | —          |
| Safe Area        | `safe-area`        | Respects notches, status and navigation bars              | P1       | — (mobile) |
| Keyboard Avoider | `keyboard-avoider` | Keeps focused inputs visible above the keyboard           | P1       | — (mobile) |
| Surface          | `surface`          | Elevated layer with shadow and tonal background           | P2       | —          |

### 2. Typography and content

| Component | Id        | Purpose                                                   | Priority | Today     |
| --------- | --------- | --------------------------------------------------------- | -------- | --------- |
| Text      | `text`    | Body, caption and label text with semantic roles          | P0       | C, RN, FL |
| Heading   | `heading` | Titles with document outline levels                       | P1       | —         |
| Link      | `link`    | Inline navigation, internal or external                   | P1       | —         |
| Label     | `label`   | Accessible label bound to a form control                  | P1       | —         |
| List      | `list`    | Ordered and unordered text lists                          | P2       | —         |
| Code      | `code`    | Inline and block monospace text                           | P2       | —         |
| Kbd       | `kbd`     | Keyboard shortcut hint                                    | P2       | — (web)   |
| Icon      | `icon`    | Named icon with decorative or meaningful semantics        | P0       | C, RN, FL |
| Image     | `image`   | Responsive image with placeholder, fallback and lazy load | P1       | —         |

### 3. Actions

| Component              | Id                  | Purpose                                                  | Priority | Today      |
| ---------------------- | ------------------- | -------------------------------------------------------- | -------- | ---------- |
| Button                 | `button`            | Primary action with variants, intents and loading        | P0       | C, RN, FL  |
| Icon Button            | `icon-button`       | Icon-only action with required accessible label          | P1       | —          |
| Button Group           | `button-group`      | Related buttons laid out together                        | P2       | —          |
| Toggle Button          | `toggle-button`     | Button with pressed and unpressed state                  | P2       | —          |
| Segmented Control      | `segmented-control` | Mutually exclusive options shown inline                  | P1       | —          |
| Floating Action Button | `fab`               | Main screen action floating above content                | P2       | — (mobile) |
| Copy Button            | `copy-button`       | Copies a value (reference, account number) with feedback | P1       | —          |

### 4. Forms

| Component         | Id                  | Purpose                                                    | Priority | Today     |
| ----------------- | ------------------- | ---------------------------------------------------------- | -------- | --------- |
| Input             | `input`             | Single-line text field                                     | P0       | C, RN, FL |
| Form Field        | `form-field`        | Wraps a control with label, helper text, error and counter | P1       | —         |
| Text Area         | `textarea`          | Multi-line text field with optional auto-grow              | P1       | —         |
| Password Input    | `password-input`    | Masked input with visibility toggle                        | P1       | —         |
| Search Input      | `search-input`      | Search field with clear action and debounced change        | P1       | —         |
| Number Input      | `number-input`      | Numeric field with increment and decrement                 | P2       | —         |
| Masked Input      | `masked-input`      | Input following a pattern (dates, IDs, card numbers)       | P2       | —         |
| Pin Input         | `pin-input`         | Segmented code entry; base of OTP and PIN entry            | P1       | —         |
| Select            | `select`            | Pick one option from a list                                | P1       | —         |
| Combobox          | `combobox`          | Searchable select with autocomplete                        | P1       | —         |
| Multi Select      | `multi-select`      | Pick several options, shown as tags                        | P2       | —         |
| Checkbox          | `checkbox`          | Independent boolean choice, with indeterminate state       | P1       | —         |
| Checkbox Group    | `checkbox-group`    | Related checkboxes with shared label and validation        | P1       | —         |
| Radio Group       | `radio-group`       | One choice among a few visible options                     | P1       | —         |
| Switch            | `switch`            | Immediate on/off setting                                   | P1       | —         |
| Slider            | `slider`            | Value or range selection on a track                        | P2       | —         |
| Date Picker       | `date-picker`       | Date selection with locale-aware formats                   | P1       | —         |
| Date Range Picker | `date-range-picker` | Start and end date selection                               | P2       | —         |
| Time Picker       | `time-picker`       | Time selection                                             | P2       | —         |
| Calendar          | `calendar`          | Month grid used by pickers and booking                     | P2       | —         |
| File Upload       | `file-upload`       | File or photo selection with progress and validation       | P1       | —         |
| Rating Input      | `rating-input`      | Star or scale rating entry                                 | P2       | —         |
| Tag Input         | `tag-input`         | Free text entries turned into tags                         | P2       | —         |
| Fieldset          | `fieldset`          | Groups related fields with a legend                        | P2       | —         |
| Form              | `form`              | Submission, validation summary and error focus management  | P1       | —         |

### 5. Feedback and status

| Component       | Id                | Purpose                                                     | Priority | Today     |
| --------------- | ----------------- | ----------------------------------------------------------- | -------- | --------- |
| Toast           | `toast`           | Short, non-blocking notification                            | P0       | C, RN, FL |
| Alert           | `alert`           | Inline message with intent (info, success, warning, danger) | P1       | —         |
| Banner          | `banner`          | Persistent page or app-level message                        | P1       | —         |
| Spinner         | `spinner`         | Indeterminate loading indicator                             | P0       | C, RN, FL |
| Progress Bar    | `progress-bar`    | Determinate or indeterminate linear progress                | P1       | —         |
| Progress Circle | `progress-circle` | Circular progress, also used for countdowns                 | P2       | —         |
| Skeleton        | `skeleton`        | Placeholder shapes while content loads                      | P1       | —         |
| Badge           | `badge`           | Small status or count label                                 | P0       | C, RN, FL |
| Status Dot      | `status-dot`      | Colored presence or state indicator                         | P2       | —         |
| Empty State     | `empty-state`     | No-data screen section with illustration and action         | P1       | —         |
| Error State     | `error-state`     | Recoverable error section with retry                        | P1       | —         |
| Result State    | `result-state`    | Full success or failure outcome screen section              | P1       | —         |

### 6. Overlays

| Component       | Id                | Purpose                                               | Priority | Today      |
| --------------- | ----------------- | ----------------------------------------------------- | -------- | ---------- |
| Modal           | `modal`           | Blocking dialog with focus trap                       | P0       | C, RN, FL  |
| Alert Dialog    | `alert-dialog`    | Confirmation of a destructive or important action     | P1       | —          |
| Drawer          | `drawer`          | Side panel sliding over content                       | P1       | —          |
| Bottom Sheet    | `bottom-sheet`    | Panel rising from the bottom, with snap points        | P1       | —          |
| Action Sheet    | `action-sheet`    | List of actions in a sheet                            | P1       | — (mobile) |
| Popover         | `popover`         | Anchored floating content                             | P1       | —          |
| Tooltip         | `tooltip`         | Short description on hover, focus or long press       | P1       | —          |
| Menu            | `menu`            | Dropdown list of actions                              | P1       | —          |
| Context Menu    | `context-menu`    | Menu on right click or long press                     | P2       | —          |
| Command Palette | `command-palette` | Keyboard-driven search over actions                   | P2       | — (web)    |
| Image Viewer    | `image-viewer`    | Fullscreen zoomable image, for receipts and documents | P2       | —          |

### 7. Navigation

| Component         | Id                  | Purpose                                          | Priority | Today      |
| ----------------- | ------------------- | ------------------------------------------------ | -------- | ---------- |
| App Bar           | `app-bar`           | Top bar with title, back and actions             | P1       | —          |
| Tabs              | `tabs`              | Switch between related views                     | P1       | —          |
| Bottom Navigation | `bottom-navigation` | Primary destinations at the bottom of the screen | P1       | — (mobile) |
| Sidebar           | `sidebar`           | Primary navigation for wide layouts              | P1       | — (web)    |
| Navigation Rail   | `navigation-rail`   | Compact side navigation for tablets              | P2       | —          |
| Breadcrumb        | `breadcrumb`        | Location within a hierarchy                      | P2       | — (web)    |
| Pagination        | `pagination`        | Page navigation for long lists and tables        | P1       | —          |
| Stepper           | `stepper`           | Progress through a multi-step flow               | P1       | —          |
| Toolbar           | `toolbar`           | Group of contextual actions                      | P2       | —          |
| Skip Link         | `skip-link`         | Keyboard shortcut to main content                | P1       | — (web)    |

### 8. Data display

| Component        | Id                 | Purpose                                                 | Priority | Today     |
| ---------------- | ------------------ | ------------------------------------------------------- | -------- | --------- |
| Card             | `card`             | Grouped content with header, body and footer            | P0       | C, RN, FL |
| Avatar           | `avatar`           | Person or entity image with initials fallback           | P0       | C, RN, FL |
| Avatar Group     | `avatar-group`     | Stacked avatars with overflow count                     | P2       | —         |
| Tag              | `tag`              | Removable or selectable label (filters, categories)     | P1       | —         |
| List Item        | `list-item`        | Row with leading, content, trailing and press action    | P1       | —         |
| Description List | `description-list` | Key and value pairs (transaction details, profiles)     | P1       | —         |
| Table            | `table`            | Tabular data with sorting and selection                 | P1       | —         |
| Data Grid        | `data-grid`        | Large data sets with virtualization and column controls | P2       | — (web)   |
| Accordion        | `accordion`        | Expandable sections                                     | P1       | —         |
| Carousel         | `carousel`         | Horizontally swiped content                             | P2       | —         |
| Timeline         | `timeline`         | Ordered events (order, delivery and case tracking)      | P1       | —         |
| Stat             | `stat`             | Single metric with label, trend and delta               | P1       | —         |
| Chart            | `chart`            | Line, bar, area and donut charts from tokens            | P2       | —         |
| Sparkline        | `sparkline`        | Inline trend line                                       | P2       | —         |
| Tree View        | `tree-view`        | Hierarchical expandable data                            | P2       | — (web)   |
| QR Code          | `qr-code`          | Renders a QR code (payment requests, tickets)           | P1       | —         |

### 9. Media and device

| Component        | Id                 | Purpose                                        | Priority | Today      |
| ---------------- | ------------------ | ---------------------------------------------- | -------- | ---------- |
| Camera Capture   | `camera-capture`   | Guided photo capture with framing overlay      | P1       | — (mobile) |
| QR Code Scanner  | `qr-code-scanner`  | Scans QR and barcodes with permission handling | P1       | — (mobile) |
| Document Scanner | `document-scanner` | Edge detection and crop for identity documents | P2       | — (mobile) |
| Signature Pad    | `signature-pad`    | Captures a handwritten signature               | P2       | —          |
| Map View         | `map-view`         | Map with markers and routes, provider-agnostic | P2       | —          |
| Video Player     | `video-player`     | Accessible video playback with captions        | P2       | —          |

### 10. Utilities and providers

Not visual on their own but required by every renderer.

| Component       | Id                | Purpose                                                    | Priority | Today  |
| --------------- | ----------------- | ---------------------------------------------------------- | -------- | ------ |
| Theme Provider  | `theme-provider`  | Resolves design system, brand, mode, density and direction | P0       | RN, FL |
| Portal          | `portal`          | Renders overlays at the root layer                         | P1       | —      |
| Focus Trap      | `focus-trap`      | Keeps focus inside overlays                                | P1       | —      |
| Visually Hidden | `visually-hidden` | Content for assistive technologies only                    | P1       | —      |
| Live Region     | `live-region`     | Announces dynamic changes to screen readers                | P1       | —      |
| Locale Provider | `locale-provider` | Language, number, currency and date formats                | P1       | —      |

---

## Business components

Product patterns built only from foundation components. Kits reference these ids. Names used
twice across kits are merged here.

### 11. Identity and onboarding

| Component               | Id                        | Purpose                                            | Kits                     | Priority | Today  |
| ----------------------- | ------------------------- | -------------------------------------------------- | ------------------------ | -------- | ------ |
| Phone Number Input      | `phone-number-input`      | Country code plus number, validated per country    | fintech, mobile-money    | P1       | RN, FL |
| Country Selector        | `country-selector`        | Searchable country list with flags and dial codes  | all                      | P1       | —      |
| Language Selector       | `language-selector`       | Switches app language                              | all                      | P2       | —      |
| OTP Input               | `otp-input`               | One-time code entry with resend timer and autofill | fintech, mobile-money    | P1       | RN, FL |
| PIN Code Input          | `pin-code-input`          | Transaction PIN with numeric keypad and masking    | fintech, mobile-money    | P1       | —      |
| Numeric Keypad          | `numeric-keypad`          | On-screen keypad for amounts and PINs              | fintech, mobile-money    | P1       | —      |
| Biometric Prompt        | `biometric-prompt`        | Fingerprint or face confirmation with fallback     | fintech                  | P2       | —      |
| Password Strength Meter | `password-strength-meter` | Strength feedback on password creation             | saas                     | P2       | —      |
| Consent Checkbox        | `consent-checkbox`        | Terms and privacy acceptance with links            | all                      | P1       | —      |
| KYC Document Upload     | `kyc-document-upload`     | Identity document capture and upload with status   | fintech, public-services | P1       | RN, FL |
| Selfie Capture          | `selfie-capture`          | Guided face capture for identity checks            | fintech                  | P2       | —      |
| KYC Status Card         | `kyc-status-card`         | Verification level, pending steps and next action  | fintech                  | P1       | —      |
| Onboarding Carousel     | `onboarding-carousel`     | First-run value screens with progress              | all                      | P2       | —      |
| Profile Header          | `profile-header`          | User identity, verification and quick actions      | all                      | P2       | —      |

### 12. Money and payments

| Component                 | Id                          | Purpose                                                   | Kits                    | Priority | Today  |
| ------------------------- | --------------------------- | --------------------------------------------------------- | ----------------------- | -------- | ------ |
| Amount Input              | `amount-input`              | Currency-aware amount entry with limits                   | fintech, mobile-money   | P1       | RN, FL |
| Money Text                | `money-text`                | Formatted amount display with currency and sign           | all                     | P1       | —      |
| Currency Selector         | `currency-selector`         | Choose a currency                                         | fintech                 | P2       | —      |
| Balance Visibility Toggle | `balance-visibility-toggle` | Hides and reveals balances                                | fintech                 | P1       | —      |
| Wallet Balance Card       | `wallet-balance-card`       | Balance, account and primary actions                      | fintech                 | P1       | —      |
| Mobile Money Selector     | `mobile-money-selector`     | Choose an operator (Orange Money, MTN MoMo, Wave…)        | mobile-money            | P1       | RN, FL |
| Payment Method Selector   | `payment-method-selector`   | Choose between mobile money, card, bank or cash           | mobile-money, ecommerce | P1       | RN, FL |
| Provider Selector         | `provider-selector`         | Choose a biller or service provider                       | mobile-money            | P2       | —      |
| Transfer Form             | `transfer-form`             | Beneficiary, amount, reason and fees in one form          | fintech                 | P1       | —      |
| Beneficiary Selector      | `beneficiary-selector`      | Pick a saved or new beneficiary                           | fintech                 | P1       | —      |
| Beneficiary Card          | `beneficiary-card`          | Beneficiary identity and account                          | fintech                 | P2       | —      |
| Fee Breakdown             | `fee-breakdown`             | Amount, fees, taxes and total (FeeSummary, FeesBreakdown) | fintech, mobile-money   | P1       | —      |
| Payment Confirmation      | `payment-confirmation`      | Review before validating a payment                        | fintech, mobile-money   | P1       | —      |
| Payment Status            | `payment-status`            | Pending, success, failed or timeout outcome               | mobile-money            | P1       | —      |
| Retry Payment State       | `retry-payment-state`       | Guided recovery after a failed or expired payment         | mobile-money            | P1       | —      |
| Transaction Card          | `transaction-card`          | One transaction summary                                   | fintech                 | P1       | RN, FL |
| Transaction List          | `transaction-list`          | Grouped, filterable transaction history                   | fintech                 | P1       | —      |
| Transaction Details       | `transaction-details`       | Full transaction record with references                   | fintech                 | P1       | —      |
| Transaction Status Badge  | `transaction-status-badge`  | Standard status labels and colors                         | fintech, mobile-money   | P1       | —      |
| Receipt View              | `receipt-view`              | Printable and shareable receipt                           | fintech, mobile-money   | P1       | RN, FL |
| Receipt Share View        | `receipt-share-view`        | Share receipt as image, PDF or message                    | fintech                 | P2       | —      |
| QR Payment Request        | `qr-payment-request`        | Displays a QR code to receive money                       | fintech, mobile-money   | P2       | —      |
| QR Payment Scanner        | `qr-payment-scanner`        | Scans a merchant or user QR to pay                        | fintech, mobile-money   | P2       | —      |
| Bank Card Input           | `bank-card-input`           | Card number, expiry and CVV with brand detection          | ecommerce               | P2       | —      |

### 13. Connectivity and offline

| Component           | Id                    | Purpose                                    | Kits          | Priority | Today  |
| ------------------- | --------------------- | ------------------------------------------ | ------------- | -------- | ------ |
| Offline Banner      | `offline-banner`      | Signals lost connectivity                  | offline-first | P1       | RN, FL |
| Network Retry State | `network-retry-state` | Failed request recovery with retry         | offline-first | P1       | RN, FL |
| Retry Action        | `retry-action`        | Inline retry control with backoff feedback | offline-first | P2       | —      |
| Sync Status Card    | `sync-status-card`    | Last sync, pending items and sync action   | offline-first | P2       | —      |
| Pending Queue List  | `pending-queue-list`  | Actions waiting to be sent                 | offline-first | P2       | —      |
| Conflict State      | `conflict-state`      | Resolve local and server data conflicts    | offline-first | P2       | —      |
| Data Saver Notice   | `data-saver-notice`   | Low-data mode indicator and controls       | offline-first | P2       | —      |

### 14. Commerce and marketplace

| Component                | Id                         | Purpose                                         | Kits                             | Priority | Today |
| ------------------------ | -------------------------- | ----------------------------------------------- | -------------------------------- | -------- | ----- |
| Product Card             | `product-card`             | Product image, name, price and action           | ecommerce, marketplace           | P2       | —     |
| Product List             | `product-list`             | Grid or list of products with loading states    | marketplace                      | P2       | —     |
| Product Gallery          | `product-gallery`          | Product images with zoom                        | ecommerce, marketplace           | P2       | —     |
| Price Tag                | `price-tag`                | Price, discount and old price                   | ecommerce, marketplace           | P2       | —     |
| Quantity Stepper         | `quantity-stepper`         | Increase or decrease item quantity              | ecommerce, marketplace           | P2       | —     |
| Cart Summary             | `cart-summary`             | Items, subtotal and checkout action             | ecommerce, marketplace           | P2       | —     |
| Checkout Summary         | `checkout-summary`         | Final order review                              | ecommerce, marketplace           | P2       | —     |
| Promo Code Input         | `promo-code-input`         | Apply and validate a discount code              | ecommerce                        | P2       | —     |
| Order Status Card        | `order-status-card`        | Order progress and next step                    | ecommerce, marketplace           | P2       | —     |
| Seller Card              | `seller-card`              | Seller identity, rating and contact             | marketplace                      | P2       | —     |
| Rating Summary           | `rating-summary`           | Average rating and distribution                 | marketplace                      | P2       | —     |
| Review Card              | `review-card`              | One customer review                             | marketplace                      | P2       | —     |
| Address Selector         | `address-selector`         | Choose a saved address or add one               | delivery, marketplace, ecommerce | P2       | —     |
| Address Form             | `address-form`             | Address entry adapted to informal addressing    | delivery, marketplace, ecommerce | P2       | —     |
| Delivery Method Selector | `delivery-method-selector` | Delivery or pickup options with price and delay | delivery, marketplace            | P2       | —     |
| Filter Bar               | `filter-bar`               | Filter chips, sort and filter sheet             | ecommerce, marketplace, saas     | P2       | —     |

### 15. Delivery and logistics

| Component               | Id                        | Purpose                                        | Kits     | Priority | Today |
| ----------------------- | ------------------------- | ---------------------------------------------- | -------- | -------- | ----- |
| Delivery Tracking Card  | `delivery-tracking-card`  | Package status, ETA and timeline               | delivery | P2       | —     |
| Courier Status Card     | `courier-status-card`     | Courier identity, location and contact         | delivery | P2       | —     |
| Location Picker         | `location-picker`         | Pick a point on a map or from current location | delivery | P2       | —     |
| Proof of Delivery State | `proof-of-delivery-state` | Photo, signature or code confirmation          | delivery | P2       | —     |

### 16. SaaS and workspace

| Component           | Id                    | Purpose                                       | Kits | Priority | Today |
| ------------------- | --------------------- | --------------------------------------------- | ---- | -------- | ----- |
| Metric Card         | `metric-card`         | KPI with trend, built on Stat                 | saas | P2       | —     |
| Subscription Card   | `subscription-card`   | Plan, renewal and billing status              | saas | P2       | —     |
| Plan Selector       | `plan-selector`       | Compare and pick a plan                       | saas | P2       | —     |
| Usage Meter         | `usage-meter`         | Quota consumption                             | saas | P2       | —     |
| Workspace Switcher  | `workspace-switcher`  | Switch organization or workspace              | saas | P2       | —     |
| Activity Feed       | `activity-feed`       | Chronological events                          | saas | P2       | —     |
| Team Member Card    | `team-member-card`    | Member identity, role and actions             | saas | P2       | —     |
| Notification Center | `notification-center` | Notification list with read state and actions | saas | P2       | —     |
| Settings List       | `settings-list`       | Grouped settings rows with toggles and links  | all  | P1       | —     |

### 17. Public services

| Component                 | Id                          | Purpose                                    | Kits            | Priority | Today |
| ------------------------- | --------------------------- | ------------------------------------------ | --------------- | -------- | ----- |
| Service Request Card      | `service-request-card`      | Service description, cost and requirements | public-services | P2       | —     |
| Case Status Card          | `case-status-card`          | Case progress and next action              | public-services | P2       | —     |
| Document Requirement List | `document-requirement-list` | Required documents with upload status      | public-services | P2       | —     |
| Appointment Slot Picker   | `appointment-slot-picker`   | Available dates and times                  | public-services | P2       | —     |
| Appointment Summary       | `appointment-summary`       | Booked appointment details                 | public-services | P2       | —     |
| Public Notice Card        | `public-notice-card`        | Official announcement                      | public-services | P2       | —     |

---

## Totals

| Group                      | Components | P0  | P1  | P2  |
| -------------------------- | ---------- | --- | --- | --- |
| Foundation (sections 1–10) | 113        | 13  | 63  | 37  |
| Business (sections 11–17)  | 80         | 0   | 28  | 52  |
| **Total**                  | **193**    | 13  | 91  | 89  |

Today, 12 foundation components have a contract and an implementation in React Native and
Flutter, the theme provider exists in both, and 10 business components are implemented in React
Native and Flutter without a contract.

## Next steps

1. Review this inventory and adjust names, scope and priorities.
2. Write contracts for every P1 component, starting with forms, overlays and navigation.
3. Add contracts for the 10 business components already implemented.
4. Define component tokens for each contract.
5. Add recipes for each design system, then implement in the renderers.
