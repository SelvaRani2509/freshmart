# FreshMart – Local Store Online

React + TypeScript single-page app with role-based access (User/Admin), Bootstrap UI, left sidebar layout, realistic products, and demo-friendly login rules.

## Quick start
1) `cd freshmart`
2) `npm install`
3) `npm start` → open http://localhost:3000

## Demo login rules
- Any username + any password → logged in as **User**.
- Admin only if:
  - Username: `Selva Rani`
  - Password: `Selva#2509rani`

## User features
- Home (category spotlight), Categories, Product grid & detail, Add to Cart (detail page only)
- Cart with quantity update/remove, Checkout form
- Orders list + full tracking view
- Ratings/Reviews unlocked after delivery

## Admin features
- Dashboard (revenue and order overview)
- Orders: update status (Placed → Packed → Shipped → Out for Delivery → Delivered) and assign preloaded delivery staff (Arun Kumar, Suresh, Mani)
- Products: add/edit/delete with live catalog update
- Ratings & Feedback viewer

## Tech & notes
- React Router, Bootstrap, Bootstrap Icons
- In-memory data with `localStorage` persistence (products, cart, orders, delivery persons, reviews)
- Easy backend handoff: replace store actions with API calls (Flask/REST) and keep the UI routes/components unchanged.
