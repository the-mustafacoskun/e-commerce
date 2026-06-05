# Bandage - E-Commerce Platform

Bandage is a production-ready, highly optimized E-Commerce web application built with modern React patterns, responsive UI architectures, and a scalable global state management ecosystem. 

The platform delivers a complete end-to-end (E2E) digital commerce experience—covering everything from secure session initialization and multi-criteria product exploration to asynchronous shopping cart pipelines, saved address hooks, and a dynamically paired order history viewport.

---

## 💻 Core Functional Architecture

### 1. Robust Session Lifecycle & Authentication
* **Persistent Session Recovery:** Utilizes token-based (`JWT`) authorization. On app initialization or hardware refreshes, a background verification thunk (`verifyUser`) validates local storage tokens to reconstruct state integrity.
* **Gravatar Profile Mapping:** Normalizes and encrypts user email strings via the `MD5` hashing algorithm to fetch custom profile avatars, abstracting sensitive identifiers away from direct view layouts.
* **Global Header Injection:** Dynamically mounts and clears active tokens within Axios global defaults (`api.defaults.headers.common['Authorization']`) to securely guard private backend operations.

### 2. Advanced Product Query & Filtration
* **Unified Filtering Framework:** Merges dynamic gender routing, distinct product categories, and text-based query strings into a singular, reactive filtering pipeline.
* **Frictionless Price Brackets:** Leverages a high-performance dual-slider input system that processes custom price boundaries in real-time, preventing layout stutter and avoiding redundant network overhead.

### 3. Reactive E-Commerce Basket & Checkout Systems
* **State-Controlled Inventory Rules:** Monitors basket changes through precise reference updates. Increments structural duplicates seamlessly, while dropping item counts below `1` triggers automatic element purging to maintain data purity.
* **Historical Order Aggregation:** Keeps track of previous purchases inside a dedicated viewport, instantly connecting background order tracking numbers with the customer’s active physical location books.

---

## 🛠️ Tech Stack & Strategic Rationales

| Technology / Tool | Architectural Purpose & Strategic Benefit |
| :--- | :--- |
| **React** | Component-driven workspace providing modular layouts, optimal code reusability, and lightning-fast rendering states via the Virtual DOM. |
| **Redux & React-Redux** | Centralized application state manager acting as the singular "Source of Truth" across separate domains (User profiles, shopping cart, checkout data). |
| **Redux Thunk** | Middleware utility designed to encapsulate and run asynchronous API queries (Axios sequences) completely outside the clean rendering layer. |
| **React Router DOM** | Single Page Application (SPA) routing foundation handling browser history adjustments, parameters, and deep linking without triggering full page reloads. |
| **Tailwind CSS** | Utility-first styling powerhouse ensuring custom responsive behaviors, fluid asset layouts, and minimum utility CSS production footprint. |
| **Axios** | Promised-based HTTP controller managing the core networking interface (`api.js`) with automated JSON handling and custom payload delivery. |
| **Lucide React** | Low-overhead inline vector icons rendering razor-sharp SVGs without burdening client-side performance loops. |

---

## 📂 Project Directory Architecture

The system structure isolates UI components, page layouts, global state workflows, and underlying infrastructure setups:

```text
src/
├── api/
│   └── api.js                  # Configured Axios instance with global interceptors
├── components/
│   ├── CartDropdown.jsx        # Quick-view navbar basket modal
│   ├── CategoryCard.jsx        # Product category entry banners
│   ├── Filter.jsx              # Search, sort, and dual-slider price control engine
│   ├── Footer.jsx              # Multi-column dynamic application footer
│   ├── Header.jsx              # Desktop/Mobile responsive core navigational bar
│   ├── OrderSummary.jsx        # Checkout breakdown calculations (taxes, discounts)
│   ├── ProductCard.jsx         # Individual catalog item layout templates
│   └── ShopPagination.jsx      # Multi-page dataset splitting controllers
├── pages/
│   ├── HomePage.jsx            # Application landing viewport & promotional cards
│   ├── LoginPage.jsx           # Clean user session validation forms
│   ├── PreviousOrders.jsx      # Order history list view with relational mapping
│   ├── ProductDetailsPage.jsx  # Rich imagery galleries and extended item breakdowns
│   ├── ShopPage.jsx            # Core catalog browser carrying the Filter engine
│   └── ShoppingCartPage.jsx    # Complete basket dashboard with item counters
├── store/
│   ├── actions/
│   │   ├── clientActions.js    # Auth thunks, user profiles, address & card CRUD flows
│   │   ├── productActions.js   # Product data streams and structural fetch states
│   │   └── shoppingCartActions.# Basket mutations and server-side order placements
│   ├── reducers/
│   │   ├── clientReducer.js    # Handles login histories, address books, and credentials
│   │   ├── productReducer.js   # Stores active catalogs and search conditions
│   │   └── shoppingCartReducer.# Pure reducer handling strict cart data trees
│   ├── types/
│   │   └── actionTypes.js      # Consolidated actions registry avoiding naming duplicates
│   └── store.js                # Central store compiler injected with Thunk middleware
├── App.jsx                     # Router distribution center and app wrapper
└── main.jsx                    # Primary entry hub attaching the React DOM tree