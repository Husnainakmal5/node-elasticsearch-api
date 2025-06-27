# 📦 Node.js Full-Text Search API with Elasticsearch

A production-ready Express.js API with full-text search powered by **Elasticsearch**, fully Dockerized with `.env` configuration and hot-reload via **Nodemon**.

---

## 🚀 Features

- 🔍 Full-text search using custom Elasticsearch analyzers
- 🧾 RESTful API for products/items/goods
- 🐳 Docker + Docker Compose support
- ⚙️ Environment-based configuration
- 🔁 Auto index creation on app startup
- 🔥 Development with live reload (Nodemon)

---

## 📁 Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── .env
├── .gitignore
├── package.json
├── index.js
├── elastic.js                 # Elasticsearch client setup
├── routes/
│   └── products.js            # API routes
├── utils/
│   └── createIndex.js         # Elasticsearch index init logic
```

---

## 🛠️ Setup

### 1️⃣ Clone & Install

```bash
git clone https://github.com/yourusername/node-elasticsearch-api.git
cd node-elasticsearch-api
cp .env.example .env
```

### 2️⃣ Run with Docker Compose

```bash
docker-compose up --build
```

- API → [http://localhost:3000](http://localhost:3005)  
- Elasticsearch → [http://localhost:9200](http://localhost:9200)

---

## ⚙️ Environment Variables

`.env` file:

```env
PORT=3005
ES_NODE=http://elasticsearch:9200
```

> 💡 You can disable Elasticsearch security in Docker config for easier local dev.

---

## 🧪 API Endpoints

### ✅ Create Product

```http
POST /api/products
```

**Body:**

```json
{
  "id": "1",
  "name": "Gaming Laptop",
  "description": "High performance for games",
  "price": 1499.99
}
```

---

### 🔍 Search Products

```http
GET /api/products/search?q=laptop
```

---

### 📄 Get Product by ID

```http
GET /api/products/1
```

---

## 🐳 Docker Compose Preview

```yaml
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.12.2
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"

  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - elasticsearch
    environment:
      - ES_NODE=http://elasticsearch:9200
```

---

## 🧑‍💻 Developer Tips

- Use `docker-compose down -v` to reset all data
- Use `curl` or Postman to test API endpoints
- Modify `.env` to switch auth settings or ports

---

## 🔐 Enabling Security (Optional)

To use basic auth:

1. Remove `xpack.security.enabled=false`
2. Add this to `elasticsearch` in Docker Compose:

```yaml
environment:
  - ES_NODE=http://elasticsearch:9200
```

3. Update `.env`:

```env
ES_NODE=http://elasticsearch:9200
```

---

## 📝 License

MIT License

---

## ✨ Contributions

Pull requests and feedback are welcome! Fork the repo, create a feature branch, and open a PR.

---