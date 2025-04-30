# 🌱 Green Farming Hub

Green Farming Hub is a next-generation web platform designed to support farmers by providing a seamless way to purchase fertilizers, access the latest agricultural knowledge, and leverage AI-powered disease detection. This platform aims to revolutionize agriculture by combining e-commerce, smart farming tools, and community knowledge-sharing.

---

## 🚀 Features

### 🔹 Crop Management (CRUD)
- **Create** new crops with details such as crop name, planting date, harvest date, type, soil type, health status, etc.
- **Read** all crops dynamically from the database.
- **Update** crop info such as health status, fertilizer used, and estimated harvest.
- **Delete** unwanted or duplicate crop entries.
- **PDF Generation** for crop reports.
- **Search Functionality** with support for partial matches.

### 🔹 Disease Detection System
- Upload plant images for disease scanning and instant identification.
- Receive recommended treatments and solutions.
- Real-time disaster alerts (droughts, floods, pests) via third-party APIs (e.g., Kindwise).
- Integrated admin panel for updates.

### 🔹 Fertilizer Marketplace
**For Sellers:**
- Account, product, and inventory management.
- Order tracking and report generation.
- Chat with buyers.

**For Buyers:**
- Product browsing and advanced search.
- Shopping cart and order placement.
- Product reviews and ratings.
- Chat support with sellers.

### 🔹 Blog Management
- Users can **Create**, **Read**, **Update**, and **Delete** blog articles.
- Blogs can include agricultural tips, pest control strategies, fertilizer use, and future planning.
- Users can like, comment, and rate other users' blog posts.

---

## 🧰 Tech Stack

| Tool         | Purpose                          |
|--------------|----------------------------------|
| **Next.js**  | Frontend Framework               |
| **Node.js**  | Backend Runtime                  |
| **React.js** | UI Component Library             |
| **MongoDB**  | Database                         |
| **GitHub**   | Source Code & Version Control    |
| **Kindwise API** | Disease Detection API Integration |

---

## 📦 How to Run the Project

```bash
# 1. Clone the repository
git clone https://github.com/your-username/green-farming-hub.git

# 2. Navigate into the project directory
cd green-farming-hub

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
