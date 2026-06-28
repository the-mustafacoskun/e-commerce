# 🛍️ Bandage — Full-Stack E-Commerce Application

A modern, fully-featured e-commerce web application built with **React**, **Redux**, and **Tailwind CSS**. Users can browse products, manage their cart, place orders, and track their purchase history.

---

## 🌐 Live Demo

🔗 **[https://e-commerce-topaz-seven-96.vercel.app/](https://e-commerce-topaz-seven-96.vercel.app/)**

---

## 🔐 Test Users

You can log in with the following pre-existing accounts (Password: `123456`):

| Role     | Email                    |
|----------|--------------------------|
| Customer | `customer@commerce.com`  |
| Store    | `store@commerce.com`     |
| Admin    | `admin@commerce.com`     |

---

## ✨ Features — What Was Built & Where

### 🏠 Homepage (`MainPage.jsx`)
- **Hero Slider** (`Hero.jsx`) — Full-screen banner with two background images. Left/right arrow buttons allow manual switching between slides.
- **Editor's Pick** — `SubCategoryCard` (full height) and `HalfSubCategoryCard` (half height) components display Men / Women / Accessories / Kids categories as cards. Clicking navigates to the relevant shop page.
- **Bestseller Products** (`BestSellerCard.jsx`) — Fetches the top 8 products from the API sorted by `rating:desc` and renders them in a responsive grid using `ProductCard`.
- **Carousel** (`Carousel.jsx`) — Promotional banner with a gradient background, product image, and an "ADD TO CART" button.
- **Container** (`Container.jsx`) — "Part of the Neural Universe" feature block with BUY NOW and Learn More buttons.
- **Blog Section** (`BlogCard.jsx`) — Three blog cards with image, category tags, date, and comment count.
- **Brands Strip** (`BrandsFav.jsx`) — Horizontal list of partner brand logos (AWS, Hooli, Lyft, etc.).

---

### 🛒 Shop Page (`ShopPage.jsx`)
Several complex mechanisms work together on this page:

- **Category Cards** (`CategoryCard.jsx`) — Top 5 highest-rated categories for the active gender filter are displayed at the top. Product count per category is calculated separately by fetching all products once.
- **View Toggle** (`ViewAndFilterButtons.jsx`) — Switch between Grid (⊞) and List (☰) views. A sort select handles price ascending/descending and rating ascending/descending.
- **Filter Panel** (`Filter.jsx`) — Opens and closes via the "Filter" button with a smooth CSS transition. Includes:
  - **Gender radio buttons** — Women / Men
  - **Category radio buttons** — Dynamically updated based on selected gender; clicking updates the URL
  - **Color selection** — 4 color options as styled radio inputs
  - **Dual-range price slider** — Custom min/max slider with two independent thumbs; applies price filter in real time
- **Product Listing** — Rendered based on `productsDisplay` state:
  - Grid view: `ProductCard.jsx` — Image, name, price, color dots; clicking navigates to the detail page
  - List view: `ProductCardList.jsx` — Horizontal card with image on the left, details on the right, inline "Add to Cart" button, rating, and discount badge
- **Client-Side Filtering** — All products are fetched once (`/products?limit=2000`); filtering and sorting are handled entirely on the frontend.
- **Pagination** — Dynamically calculated from total products / limit. Shows ellipsis (`...`) when there are more than 4 pages. First / numbered pages / Next buttons.
- **URL Query Params** — `filter`, `sort`, `limit`, and `offset` are written to the URL on every change and survive page refresh.

---

### 🔍 Product Detail Page (`ProductDetailsPage.jsx` → `ProductDetailsCard.jsx`)
- **Image Area** — Main image with two thumbnails below; left/right navigation arrows (currently same image, structure is ready to extend into a full slider).
- **Stock Status** — Displays `In Stock` or `Out of Stock` with color coding. Stock decrements when added to cart and increments when removed (via custom event: `cartStockUpdated`).
- **Color Variants** — 4 color options rendered as styled radio inputs.
- **Add to Cart** (`handleAddCart`) — Dispatches Redux `setCart` action; button color changes for 2 seconds as feedback.
- **Add to Favorites** (`handleLikeClick`) — Writes to `localStorage`; updates the header heart icon in real time via custom event `likedProductsUpdated`.
- **Description / Reviews Tabs** — Tabbed content below the product:
  - **Description:** Product description text, word list rendered from description string, shadow-effect image block
  - **Reviews** (`ProductRewievForm.jsx`): Review form (star rating, name, email, message, save checkbox). Review cards (`ProductReviewCard.jsx`) display masked name and email. Reviews are stored in `localStorage`.
- **Bestseller Products** — `BestSellerCard` renders product recommendations at the bottom of the page.

---

### 🛍️ Shopping Cart (`ShoppingCartPage.jsx`)
- **`ShoppingCartCard.jsx`** — Per product: checkbox to include/exclude from total, product image and name, size label, increment/decrement quantity (auto-removes when count reaches 0), unit price, delete button.
- **Total Price** — Only products with `checked: true` are included in the calculation.
- **`SummaryBox.jsx`** — Subtotal, shipping fee (+$10 when cart is not empty), discount code input (numeric 0–50, calculates percentage), and grand total. The "Confirm Order" button passes price data to the `/create-order` page via router `state`.

---

### 📦 Order Creation (`CreateOrderPage.jsx`)
Two-tab layout:

**Address Tab:**
- Saved addresses are listed; a radio button selects the delivery address.
- "Send Invoice to Same Address" checkbox; unchecking reveals a separate billing address column.
- "Add New Address" button opens `AddressForm.jsx` as a modal with a backdrop blur overlay.
- **`AddressForm.jsx`** (`react-hook-form` + `react-country-state-city`):
  - Country is fixed to Turkey; province uses `StateSelect`, district uses `CitySelect` — cascading dropdowns that reset when the parent changes.
  - Phone number is auto-formatted as `(5XX) XXX XX XX` on input.
  - In edit mode, existing address values are pre-filled via `defaultValues`.
  - On save → API POST or PUT → list refreshes → modal closes.
- Trash icon next to each address sends a DELETE request immediately.

**Payment Tab:**
- Saved credit cards are displayed visually using `MyCreditCard.jsx` (gradient card design, masked number: `1234 **** **** 5678`).
- Checkbox selects a card; selecting one reveals a CVC/CVV input field below.
- "Pay with a Different Card" toggle opens `AddCreditCard.jsx` form:
  - Card number (digits only, 16 chars), name on card (Turkish/Latin letters only), month/year dropdowns (`CustomDropdown.jsx`), CVV.
  - Shows Update + Delete buttons when a card is selected, Save button otherwise.
- **3D Secure** checkbox.
- **Installment Table** — Appears when a card is selected; currently shows single-payment option.
- **`SummaryOrder.jsx`** — Fixed right panel; the "Confirm Order" button stays disabled until both an address and a card are selected.
- `handleSubmitOrder` — Validates address, card, CVC, and that at least one product is checked → POST `/order` → on success, shows confirmation screen and clears the cart.

---

### ✅ Order Confirmation Screen
- Displays the order ID and total amount paid.
- "My Orders" and "Home" navigation buttons.

---

### 📋 Previous Orders (`PreviousOrders.jsx`)
- Fetches all orders from the API (`GET /order`).
- Table layout: Order No, Date, Amount, Detail toggle.
- Accordion: clicking a row reveals the delivery address (matched from address list by `id`) and the list of ordered products. Each product is clickable and links to its detail page.

---

### ❤️ Favorites
- The heart button on `ProductDetailsCard` adds/removes the product from `localStorage`.
- The header heart icon shows a badge with the count and opens a `LikedProduct.jsx` dropdown on click.
- Each favorite item shows: product image, name, price, "Add to Cart" button, and "Remove from Favorites" button.
- A custom event (`likedProductsUpdated`) keeps the header in sync without page refresh.

---

### 🔐 Authentication
- **Login** (`LoginPage.jsx`) — `react-hook-form` with `mode: onBlur`; email + password validation, "Remember Me" checkbox. On success, redirects to `location.state.from` (the page the user came from).
- **Sign Up** (`SignUp.jsx`) — Role selector (Customer / Store); selecting Store reveals extra fields: store name, Turkish phone regex, tax number (`TXXXXVXXXXXX`), IBAN (`TRXX...`). A toast notification prompts email activation after successful registration.
- **Token Verification** (`verifyUser`) — On app load, if a token exists in `localStorage`, `GET /verify` is called to restore the session and refresh the token. If no token, the loading screen closes immediately.
- **Gravatar** — User avatar is generated automatically from the MD5 hash of the email address.
- **Protected Routes** — `/create-order` and `/myorders` redirect to `/login` if no token is present; `state.referrer` preserves the return path.
- **Logout** — Clears the token from `localStorage`, resets Redux `user`, and navigates to the homepage.

---

### 🧭 Header (`Header.jsx`)
- Sticky top navbar with smooth scroll-to-top on route change (`ScrollTop.jsx`).
- Logo, desktop nav links (active styling via `NavLink`), animated mobile hamburger menu.
- **Shop Dropdown** — Women/Men categories are filtered and sorted by rating using `useMemo`. Opens on click (not hover), closes on outside click via `useOnClickOutside` hook.
- **Search Bar** — Animated input that slides down when the search icon is clicked. On submit, dispatches Redux `setFilter` and navigates to the shop page.
- **Cart Dropdown** — Clickable only when cart has items; opens `Cart.jsx` with product list and "Go to Cart" / "Complete Order" buttons.
- **Favorites Dropdown** — Heart icon with count badge; opens `LikedProduct` list from `localStorage`.
- **User Menu** — If logged in: avatar + name + hover dropdown (My Orders, Logout). If not: Login / Register links.
- Five independent `useRef` instances + `useOnClickOutside` ensure each dropdown closes without affecting the others.

---

## 🧱 Tech Stack

| Category         | Technology                                        |
|------------------|---------------------------------------------------|
| Framework        | React 19                                          |
| Routing          | React Router DOM v5                               |
| State Management | Redux + Redux Thunk + Redux Logger                |
| Form Handling    | React Hook Form                                   |
| Styling          | Tailwind CSS v4                                   |
| HTTP Client      | Axios                                             |
| Notifications    | React Toastify                                    |
| Icons            | Lucide React                                      |
| Avatar           | Gravatar (via MD5 hash)                           |
| Location Select  | react-country-state-city                          |
| Build Tool       | Vite                                              |
| API              | [Workintech FE E-Commerce API](https://workintech-fe-ecommerce.onrender.com) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── CreateOrderComponents/    # AddCreditCard, AddressForm, CreditCard, SummaryOrder
│   ├── generalElements/          # CheckBox, CustomDropdown
│   ├── layout/                   # Header, Footer, MainLayout
│   ├── ProductDetailsComponents/ # BestSellerCard, ProductDetailsCard, ProductRating,
│   │                             # ProductReviewCard, ProductRewievForm
│   ├── ShopComponents/           # BrandsFav, CategoryCard, ViewAndFilterButtons
│   ├── ShoppingCartComponents/   # ShoppingCartCard, SummaryBox
│   ├── TeamPageComponents/
│   ├── BlogCard, Carousel, Cart, CartProductCard
│   ├── Container, Filter, Hero
│   ├── HalfSubCategoryCard, SubCategoryCard
│   ├── LikedProduct, ProductCard, ProductCardList
│   └── ScrollTop
├── data/                         # Static content (contact data, etc.)
├── hooks/
│   └── useOnClickOutside.js      # Reusable outside-click detection hook
├── icons/
├── pages/
│   ├── AboutPage, BlogPage, ContactPage
│   ├── CreateOrderPage, LoginPage, MainPage
│   ├── PagesPage, PreviousOrders, ProductDetailsPage
│   ├── ShopPage, ShoppingCartPage, SignUp, TeamPage
├── store/
│   ├── actions/                  # clientActions, productActions, shoppingCartActions
│   ├── reducers/                 # clientReducer, productReducer, shoppingCartReducer
│   ├── types/                    # actionTypes.js
│   └── store.js
├── api.js                        # Axios instance with baseURL config
├── App.jsx                       # Route definitions + auth guards
└── main.jsx                      # Redux Provider, BrowserRouter, ToastContainer
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/e-commerce.git
cd e-commerce

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔧 Available Scripts

| Script              | Description                                    |
|---------------------|------------------------------------------------|
| `npm run dev`       | Start Vite development server                  |
| `npm run build`     | Build for production                           |
| `npm run preview`   | Preview production build locally               |
| `npm run lint`      | Run ESLint                                     |
| `npm run server`    | Start JSON Server mock API on port 5000        |

---

## 🔌 API Endpoints

All requests go to:

```
https://workintech-fe-ecommerce.onrender.com
```

| Method | Endpoint            | Description                    |
|--------|---------------------|--------------------------------|
| GET    | `/categories`       | Fetch all categories           |
| GET    | `/products`         | Fetch products (filter/sort)   |
| GET    | `/products/:id`     | Fetch single product           |
| POST   | `/login`            | User login                     |
| POST   | `/signup`           | User registration              |
| GET    | `/verify`           | Token verification             |
| GET    | `/user/address`     | Fetch saved addresses          |
| POST   | `/user/address`     | Add new address                |
| PUT    | `/user/address`     | Update address                 |
| DELETE | `/user/address/:id` | Delete address                 |
| GET    | `/user/card`        | Fetch saved credit cards       |
| POST   | `/user/card`        | Add credit card                |
| PUT    | `/user/card`        | Update credit card             |
| DELETE | `/user/card/:id`    | Delete credit card             |
| POST   | `/order`            | Submit order                   |
| GET    | `/order`            | Fetch order history            |

---

## 🗂️ Redux Store Shape

```js
{
  client: {
    user: {},               // Logged-in user data
    isAuthLoading: true,    // True while token is being verified
    addressList: [],        // Saved delivery addresses
    creditCards: [],        // Saved credit cards
    roles: [],
    theme: "light",
    language: "tr"
  },
  product: {
    categories: [],         // All product categories
    productList: [],        // Current product list from API
    total: 0,
    limit: 25,
    offset: 0,
    filter: "",             // Active search filter string
    fetchState: "NOT_FETCHED" // FETCHING | FETCHED | FAILED
  },
  shoppingCart: {
    cart: [],               // Array of { product, count, checked }
    payment: {},
    address: {},
    orders: []              // Previous orders
  }
}
```

---

## 🌍 Routing

| Path                                                         | Component          | Auth Required |
|--------------------------------------------------------------|--------------------|---------------|
| `/`                                                          | MainPage           | ❌            |
| `/shop/:gender?/:categoryName?/:categoryId?`                 | ShopPage           | ❌            |
| `/shop/:gender/:categoryName/:categoryId/:slug/:productId`   | ProductDetailsPage | ❌            |
| `/products/:productId`                                       | ProductDetailsPage | ❌            |
| `/cart`                                                      | ShoppingCartPage   | ❌            |
| `/create-order`                                              | CreateOrderPage    | ✅            |
| `/myorders`                                                  | PreviousOrders     | ✅            |
| `/login`                                                     | LoginPage          | ❌            |
| `/signup`                                                    | SignUp             | ❌            |
| `/about`                                                     | AboutPage          | ❌            |
| `/blog`                                                      | BlogPage           | ❌            |
| `/contact`                                                   | ContactPage        | ❌            |
| `/team`                                                      | TeamPage           | ❌            |
| `/pages`                                                     | PagesPage          | ❌            |

---

## 📝 Technical Notes

- **Liked products** are persisted in `localStorage` under the key `liked_products`.
- **Product reviews** are persisted in `localStorage` under `product_reviews`.
- **Auth token** is stored in `localStorage` under `token` only when "Remember Me" is checked.
- **Gravatar** avatar URL: `https://www.gravatar.com/avatar/{md5(email)}`
- **Stock sync** — When a product is added to or removed from the cart, `window.dispatchEvent(new CustomEvent("cartStockUpdated", { detail: { productId, returnedCount } }))` notifies `ProductDetailsCard` to update stock in real time.
- **Favorites sync** — `window.dispatchEvent(new Event("likedProductsUpdated"))` keeps the header badge and dropdown in sync without a page reload.
- Category gender codes: `k` → Women, `e` → Men

---

## 👨‍💻 Author

Built as part of the **Workintech Full-Stack Bootcamp** (Java/React track).

---

## 📄 License

This project is for educational purposes.