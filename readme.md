# Real Estate App

A real estate web application where users can browse properties for sale and rent, filter search results by various criteria, and view detailed property information with image galleries. Includes smooth pagination and fast data prefetching with React Query.

---

## Features

### Property Browsing

- View properties for sale and rent
- Quick glance at essential property details (price, rooms, area, etc.)
- Prefetch property details on hover for faster loading

### Search & Filters

- Filter by various criteria (purpose, price, area, rooms, baths, panorama, and more)
- Sort results by price, time, and relevance
- Search by location
- Smooth pagination for large result sets

### Property Details

- Horizontal image gallery with arrows
- Clickable images open a carousel for easy navigation

---

## Tech Stack

**Tech Stack:** React, TypeScript, Chakra UI, React Query, REST API, React Icons, React Horizontal Scrolling Menu

---

## Installation & Usage

### Setup

```bash
# Clone the repository
git clone https://github.com/nemanjagradic/Real-estate.git
cd Real-estate

# Install dependencies
npm install

# Run the development server
npm start

# For production build
npm run build

# Create a file .env in the root directory with the following placeholder:
REACT_APP_API_URL=<your_api_endpoint>
```
