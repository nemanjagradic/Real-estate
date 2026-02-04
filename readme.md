# Real Estate App

A real estate web application where users can browse properties for sale and rent, filter search results by various criteria, sort results, and view detailed property information with image galleries. Includes smooth pagination and fast data prefetching with React Query.

---

## Features

### Property Browsing
- View properties for sale and rent
- Quick glance at essential property details (price, rooms, area, etc.)
- Prefetch property details on hover for faster loading

### Search & Filters
- Filter by various criteria (price, area, rooms, baths, sqft, and more), with filters adapting based on whether you are searching for rent or sale
- Sort results by price, time, relevance, and additional criteria
- Search by city and state code
- Smooth pagination for large result sets

### Property Details
- Horizontal image gallery with arrows
- Clickable images open a carousel for easy navigation

---

## Tech Stack
- React
- TypeScript
- Chakra UI
- React Query
- Zod
- REST API
- React Icons
- React Horizontal Scrolling Menu

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
REACT_APP_US_REAL_ESTATE_API_KEY=<your_api_endpoint>
```

---

### Notes / Data Source

- This project previously used a more stable real estate API, but now uses a new API that provides similar property data.
- The new API may occasionally return empty responses or slower results.
- All filters, sorting, and property details have been adapted to work with this API.
