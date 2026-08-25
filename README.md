# FixTrail — Software Dependency & Impact Explorer

> **A graph-powered application for exploring software architecture, dependencies, and component impact using CognoDB.**

## Overview

Modern applications are built from interconnected components such as features, APIs, services, databases, and external dependencies.

When one component changes or becomes unavailable, developers often need to answer questions such as:

* Which features depend on this service?
* Which APIs communicate with this service?
* Which database does a service use?
* Which dependencies could be affected?
* What path connects one component to another?

**FixTrail** answers these questions by representing the software architecture as a graph.

Users can search for components, inspect their connections, analyse potential impact, find multi-hop paths, and visually explore the architecture.

---

## Why a Graph Database?

FixTrail is fundamentally about **relationships between components**, which makes a graph database a natural fit.

A relational database could store the same information using multiple tables and foreign keys, but relationship-heavy questions become increasingly difficult as the number of hops increases.

For example:

```text
Checkout
   ↓
Payment API
   ↓
Payment Service
   ↓
PostgreSQL
```

FixTrail can traverse this relationship path directly using Cypher.

Graph traversal also makes impact analysis natural. Starting from a service, the application can traverse connected APIs and features to determine what may be affected.

### Key advantage

Instead of asking:

> "Which rows should I join?"

FixTrail can ask:

> "What components are connected to this component, and how are they connected?"

This makes graph traversal a strong fit for dependency and impact analysis.

---

## Core Features

### 🔎 Component Search

Search and identify architecture components such as:

* Features
* APIs
* Services
* Databases
* Dependencies

### 🔗 Connection Explorer

View the components directly connected to a selected component and the relationship between them.

Example:

```text
Payment Service
 ├── USES → PostgreSQL
 └── DEPENDS_ON → Stripe SDK
```

### 💥 Impact Analysis

Starting from a service, FixTrail traverses the graph to identify affected features.

Example:

```text
Checkout
   ↓
Payment API
   ↓
Payment Service
```

### 🧭 Multi-Hop Path Analysis

Find the path between two components.

Example:

```text
Checkout
   ↓
Payment API
   ↓
Payment Service
   ↓
PostgreSQL
```

### 🕸️ Architecture Graph

A React Flow visualization provides an interactive view of the architecture and its relationships.

---

## Graph Data Model

FixTrail uses the following node types:

```text
Project
Feature
API
Service
Database
Dependency
```

### Relationships

```text
Project ──CONTAINS──> Feature

Feature ──USES──> API

API ──CALLS──> Service

Service ──USES──> Database

Service ──DEPENDS_ON──> Dependency
```

### Example Architecture

```text
                    ┌──────────────┐
                    │   Project    │
                    │   ShopEase   │
                    └──────┬───────┘
                           │ CONTAINS
                           ▼
                    ┌──────────────┐
                    │   Feature    │
                    │   Checkout   │
                    └──────┬───────┘
                           │ USES
                           ▼
                    ┌──────────────┐
                    │     API      │
                    │ Payment API  │
                    └──────┬───────┘
                           │ CALLS
                           ▼
                    ┌──────────────┐
                    │   Service    │
                    │Payment Service│
                    └──────┬───────┘
                       ┌───┴────┐
                       │        │
                     USES    DEPENDS_ON
                       │        │
                       ▼        ▼
                ┌──────────┐ ┌──────────┐
                │PostgreSQL│ │Stripe SDK│
                └──────────┘ └──────────┘
```

---

## Seed Data

The included `server/seed.js` script creates a realistic ShopEase architecture.

### Nodes

| Type       | Count |
| ---------- | ----: |
| Project    |     1 |
| Feature    |     5 |
| API        |     5 |
| Service    |     5 |
| Database   |     2 |
| Dependency |     3 |

The seed data contains **24 relationships** connecting these components.

### Example components

**Features**

* Login
* Checkout
* Orders
* Refunds
* Notifications

**Services**

* Auth Service
* Payment Service
* Order Service
* Refund Service
* Notification Service

**Databases**

* PostgreSQL
* Redis

**Dependencies**

* JWT
* Stripe SDK
* Redis Client

The seed script uses `MERGE`, making it safe to run without intentionally creating duplicate nodes or relationships.

---

## Main Graph Queries

FixTrail uses parameterized Cypher queries through the official Neo4j JavaScript driver.

### 1. Direct Architecture Connections

The application retrieves the relationships directly connected to a selected component.

Conceptually:

```cypher
MATCH (start {id: $componentId})
MATCH (start)-[r]-(connected)
RETURN
    start.id AS startId,
    start.name AS startName,
    labels(start)[0] AS startType,
    connected.id AS connectedId,
    connected.name AS connectedName,
    labels(connected)[0] AS connectedType,
    type(r) AS relationship,
    startNode(r).id AS relationshipStart,
    endNode(r).id AS relationshipEnd
```

The `$componentId` parameter is supplied separately through the Neo4j driver.

---

### 2. Multi-Hop Impact Analysis

FixTrail uses graph traversal to identify features affected by a service.

A representative traversal is:

```text
Feature → API → Service
```

This allows the application to answer:

> "Which features are connected to this service?"

---

### 3. Multi-Hop Path Finding

FixTrail can find paths between components across multiple relationships.

For example:

```text
Feature
   ↓
API
   ↓
Service
   ↓
Database
```

This demonstrates a graph query that becomes increasingly relationship-oriented as the number of hops grows.

---

## Security

Database credentials are **not stored in the source code**.

The backend reads connection information from environment variables:

```text
COGNODB_URI
COGNODB_USERNAME
COGNODB_PASSWORD
```

The `.env` file is excluded from Git using `.gitignore`.

Example:

```text
COGNODB_URI=<your-cognodb-uri>
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=<your-password>
```

**Never commit the real password or `.env` file to GitHub.**

---

## Technology Stack

### Frontend

* React
* React Flow
* JavaScript
* Vite
* CSS

### Backend

* Node.js
* Express.js
* JavaScript

### Database

* CognoDB
* openCypher
* Bolt protocol
* Official Neo4j JavaScript driver

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: CognoDB Cloud

---

## Project Structure

```text
FixTrail/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── package.json
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── queries/
│   │   ├── routes/
│   │   └── app.js
│   │
│   ├── seed.js
│   ├── test-connection.js
│   ├── package.json
│   └── .gitignore
│
├── package.json
├── package-lock.json
└── README.md
```

---

## Local Setup

### Prerequisites

Make sure you have:

* Node.js installed
* A CognoDB Cloud account
* A CognoDB instance
* Git

---

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd FixTrail
```

---

### 2. Create a CognoDB instance

Create a free CognoDB Cloud instance and obtain:

* Bolt URI
* Username
* Password

CognoDB uses the Bolt protocol and is compatible with the official Neo4j drivers.

---

### 3. Configure the backend

Go to:

```text
server/
```

Create a `.env` file:

```env
COGNODB_URI=your_cognodb_uri
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=your_cognodb_password
PORT=5000
```

Do not commit this file.

---

### 4. Install backend dependencies

```bash
cd server
npm install
```

---

### 5. Test the database connection

```bash
node test-connection.js
```

A successful connection should report that the CognoDB connection is working.

---

### 6. Seed the database

```bash
node seed.js
```

This loads the ShopEase graph data into CognoDB.

---

### 7. Start the backend

```bash
node src/app.js
```

The API runs on:

```text
http://localhost:5000
```

---

### 8. Start the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

---

## API Health Check

The backend exposes a health endpoint to verify that the API and database are available.

Example successful response:

```json
{
  "success": true,
  "message": "FixTrail API is healthy",
  "database": "connected"
}
```

The application also handles database/API failures by returning appropriate error responses instead of exposing internal errors to the user.

---

## Example Results

### Component Search

```json
{
  "success": true,
  "data": [
    {
      "id": "api-payment",
      "type": "API",
      "name": "Payment API",
      "description": ""
    },
    {
      "id": "service-payment",
      "type": "Service",
      "name": "Payment Service",
      "description": "Handles payment processing"
    }
  ]
}
```

### Component Details

Payment Service is connected to:

```text
Payment Service
 ├── USES → PostgreSQL
 └── DEPENDS_ON → Stripe SDK
```

### Impact Analysis

```text
Payment Service
       ↑
   Payment API
       ↑
    Checkout
```

### Multi-Hop Path

```text
Checkout
   ↓
Payment API
   ↓
Payment Service
   ↓
PostgreSQL
```

---

## Screenshots

Add the screenshots of the deployed application below.

### Dashboard / Main Application

![FixTrail Dashboard](screenshots/dashboard.png)

### Component Details

![Component Details](screenshots/component-details.png)

### Impact Analysis

![Impact Analysis](screenshots/impact-analysis.png)

### Connection Explorer

![Connection Explorer](screenshots/connection-explorer.png)

### Architecture Graph

![Architecture Graph](screenshots/architecture-graph.png)

> Replace the image paths above with the actual screenshot filenames committed to the repository.

---

## Live Demo

**Live Application:**
<YOUR_VERCEL_URL>

**Backend API:**
<YOUR_RENDER_API_URL>

**GitHub Repository:**
<YOUR_GITHUB_REPOSITORY_URL>

> Replace the placeholders with your actual deployed URLs before submitting.

---

## Future Improvements

Possible future improvements include:

* Dependency version tracking
* Historical architecture changes
* Failure simulation
* More advanced impact scoring
* Authentication and user-specific projects
* Larger graph visualization layouts
* Architecture comparison between versions
* Additional graph-based analysis

---

## Conclusion

FixTrail demonstrates how a graph database can be used to model and explore software architecture as a network of connected components.

Instead of treating features, APIs, services, databases, and dependencies as isolated records, FixTrail focuses on the **relationships between them**.

This enables practical capabilities such as:

* dependency exploration
* impact analysis
* multi-hop traversal
* architecture visualization
* relationship-based debugging

**FixTrail turns a complex software architecture into a graph that developers can explore and understand.**
