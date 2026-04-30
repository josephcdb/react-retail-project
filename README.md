# React Retail Page Project

This project is to build **React Retail Page **.

Goal:
- A minimal React app created with Vite
- A mock API server that returns a list of products
- A simple grid view that renders products on the page using basic `fetch`
- Design and implement routing, cart behavior, auth, React Query, checkout flow, tests, etc.

---

## 1. Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed
- **npm** (comes with Node)

You can check your versions with:

```bash
node -v
npm -v
```

---

## 2. Getting Started

1. **Install dependencies**

   ```bash
   cd React-React-Project
   npm install
   ```

2. **Start the mock API server**

   The project includes a small Express server that serves product data and accepts orders.  
   In one terminal:

   ```bash
   npm run dev:api
   ```

   By default, this starts the API on:

   ```text
   http://localhost:5174
   ```

3. **Start the React app**

   In **another** terminal:

   ```bash
   npm run dev
   ```

   Vite will print a local development URL, usually:

   ```text
   http://localhost:5173
   ```

4. **View the starter app in overall**

   Open the Vite URL in your browser. You should see:

   - A simple page titled **React Retail Page**
   - A grid of products (title, category, price, and image)
   - Add to Cart button on Product List and Detail Page
   - A header that has links (Products, Cart and Login)
   - When you click Login, you should see:
      - Name field
      - Login and Clear button
   - If Cart is empty and you try to click this link, you should see:
      - Cart is empty
      - Go Shopping button
   - If you are on Product List and Detail Page trying to add any item to cart, you should see:
      - A toast notification message on top right of this screen
      - New cart number added on Cart link
   - If you are on Cart Page, you should see:
      - Cart details with total summary
      - Proceed to Checkout button
   - If you are on Checkout Page, you should see:
      - If you have not logged in, it redirects you to login page first before going to checkout page
      - If you are logged before, you should see:
         - Order Details
         - Form (name, email, address)
         - Two buttons (Place Order and Clear)
      - If the form is validated correctly and you click Place Order, it redirects to order confirmation page and you should see:
         - Order Details
         - Customer Details
         - A button (Continue Shopping)
---

## 3. Mock API Overview

The mock API lives in `backend/server.js` and is started with:

```bash
npm run dev:api
```

All endpoints are prefixed with `/api`:

### `GET /api/products`

Returns an array of products. Each product looks roughly like:

```json
{
  "id": 1,
  "title": "React Retail T-Shirt",
  "price": 19.99,
  "description": "A comfy tee for frontend devs.",
  "image": "https://placehold.co/300x200?text=React+Retail+T-Shirt",
  "category": "Apparel"
}
```

### `GET /api/products/:id`

Returns a single product by its numeric ID.

- Responds with `404` if the product is not found.

### `POST /api/orders`

Accepts an order payload and returns a created order object.

Example request body:

```json
{
  "items": [
    { "id": 1, "title": "React Retail T-Shirt", "price": 19.99, "quantity": 2 }
  ],
  "customer": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "address": "123 Main St"
  }
}
```

Example response:

```json
{
  "id": 1,
  "items": [...],
  "customer": { ... },
  "status": "confirmed",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

The API is purely in-memory—orders are **not** persisted between runs.

---

## 5. Tasks (High-Level)

Using this starter, you will build out a complete React Retail experience. At a high level, you will:

1. **Design and implement the app structure**

   - Add routing (e.g., catalog, product detail, cart, checkout, login).
   - Decide how to organize your components and pages.

2. **Handle server state**

   - Move beyond a simple `fetch` call.
   - Use tools such as **React Query** to manage products and orders as server state.
   - Handle loading and error states appropriately.

3. **Implement cart functionality**

   - Allow users to add items to a cart, update quantities, and remove items.
   - Keep cart state consistent across the app (e.g., via React Context and/or other global state patterns).

4. **Implement authentication and protected routes**

   - Add a basic login flow (no real backend auth required).
   - Track whether a user is “logged in.”
   - Protect the checkout route so only logged-in users can access it.

5. **Implement the checkout flow**

   - Create a checkout page that:
     - Shows the items in the cart and a summary.
     - Collects basic customer information.
     - Submits an order to `POST /api/orders`.
   - Show a confirmation view when an order is successfully placed.

6. **Add testing** (run the script by typing npm test)

   - Add at least one **unit test** (e.g., for cart logic or a utility function).
   - Add at least one **integration test** (e.g., simulating an “add to cart” flow).

7. **Refine the UI**
   - Improve styling and layout as needed.
   - Make thoughtful UX decisions that match the project requirements and rubric.

---
