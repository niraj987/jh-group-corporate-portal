# JH Group — Corporate FinTech & Quantitative Intelligence Portal

> **Next-Generation Quantitative Intelligence, Multi-Agent Financial Research & Basel III/IV Automated Underwriting**

Welcome to the official corporate repository for **JH Group**. This enterprise portal defines our work, demonstrates our quantitative problem-solving methodology, explains how we partner with institutional clients, and showcases our **three live production platforms**.

---

## 🌐 The JH Group Production Ecosystem

JH Group owns, operates, and continuously engineers three production-grade platforms:

| Flagship Platform | Live Production URL | Domain & Core Technology | Problem Tackled & Solution |
| :--- | :--- | :--- | :--- |
| **JH Crypto Analytics Desk** | [jh-crypto-analytics.vercel.app](https://jh-crypto-analytics.vercel.app/) | Quantitative Finance & Digital Assets <br> *(Python, React, FastAPI, WebSockets)* | **Problem:** Noisy retail indicators, extreme volatility, and execution latency in digital assets. <br> **Solution:** Ultra-low latency telemetry, order book skew modeling, and RAG-powered quantitative price forecasting across 25+ major digital assets. |
| **Earnings Desk** | [earningsdesk-two.vercel.app](https://earningsdesk-two.vercel.app/) | Corporate Finance & Equity Research <br> *(Multi-Agent LLMs, Python NLP, Vector RAG)* | **Problem:** Hundreds of manual hours reading 100+ page SEC 10-K/10-Q filings and earnings calls, risking missed guidance shifts. <br> **Solution:** Autonomous multi-agent debate and consensus architecture extracting semantic disclosures, guidance anomalies, and tone variances with verifiable citations. |
| **CreditPulse Underwriting Suite** | [frontend-one-woad-nn4q1jdjwi.vercel.app](https://frontend-one-woad-nn4q1jdjwi.vercel.app/) | Credit Risk & Consumer Lending <br> *(Basel III/IV IRB, Explainable AI, MERN)* | **Problem:** Opaque, slow loan approval pipelines (days to weeks) and non-compliant black-box scoring. <br> **Solution:** Sub-800ms automated underwriting calculating Probability of Default (PD) and Loss Given Default (LGD) with regulatory-grade Explainable AI (SHAP) factor breakdowns. |

---

## 🏛️ Core Pages & Site Structure

The portal consists of four comprehensive, responsive pages:

1. **Home Page (`/`)**:
   - **Hero Section:** Value proposition, live market metrics ticker, and animated gradients.
   - **Flagship Ecosystem Showcase:** Interactive cards for the 3 live platforms with direct links, status badges, and key performance stats.
   - **Operating Philosophy Overview:** Summary of our client engagement model.
   - **Interactive Model Sandbox:** Live Basel III underwriting simulator allowing visitors to adjust income, debt, and credit score to test our risk algorithm.
   - **Direct Call to Action:** Streamlined path to consultations.

2. **Our Works (`/works`)**:
   - Comprehensive technical case studies for all three production platforms.
   - Problem deconstruction, mathematical solutions, and architectural breakdowns.
   - Live telemetry statistics and direct links to live applications.
   - Filterable view across Asset Intelligence, Equity Research, and Credit Underwriting.

3. **About & Methodology (`/about`)**:
   - **Our Story:** The evolution from quantitative research to a tri-platform production ecosystem.
   - **How We Deal With Clients:** Absolute algorithmic transparency, bespoke engineering (never off-the-shelf), institutional data sovereignty, and long-term model calibration SLAs.
   - **How We Tackle Problems and Solve Them:** Our tested 5-stage deterministic methodology:
     1. *Mathematical Deconstruction:* Formulating the problem at the micro-level with exact boundary equations.
     2. *Multi-Agent Co-Pilot Architecture:* Deploying specialized agent debate protocols to prevent hallucinations.
     3. *Stress-Testing & Stochastic Validation:* Extensive Monte Carlo simulation and out-of-sample backtesting.
     4. *Explainable AI & Institutional Compliance:* Embedding SHAP/LIME attribution for full audit readiness.
     5. *Production Deployment & Sub-Second Execution:* Packaging algorithms into resilient MERN stack web applications and Python microservices.
   - **Technology Stack Grid:** Deep dive into our tools across frontend, backend, AI/quant, and regulatory frameworks.

4. **Contact Us (`/contact`)**:
   - **Interactive Consultation Form:** Full Name, Corporate Email, Organization, Service Interest dropdown, Budget Range, and Project Brief.
   - **Full-Stack Persistence:** Connected to the Express backend (`/api/contact`), with instant MongoDB storage and resilient local JSON backup (`server/data/contacts.json`).
   - **Client Guarantees:** 24-hour response SLA, mutual non-disclosure enforcement, and sandbox access.
   - **Technical FAQ Accordion:** Answers regarding on-premise deployments, multi-agent validation, and Basel III mathematical audits.

---

## 🛠️ Architecture & Tech Stack

This portal is built using the **MERN stack** and **Python**:

- **Frontend (`/client`)**:
  - React 19 + Vite 8
  - Tailwind CSS v4 (`@tailwindcss/vite`)
  - Lucide React Icons
  - React Router DOM v7
  - Dark-mode quantitative intelligence design system inspired by Bloomberg Terminal & Linear.

- **Backend (`/server`)**:
  - Node.js & Express
  - MongoDB via Mongoose (with automated fallback to local JSON file persistence if no MongoDB URI is supplied)
  - CORS, dotenv, and RESTful routing
  - `/api/ecosystem`, `/api/metrics`, `/api/contact`, `/api/contacts`, `/api/quant/simulate-underwriting`

- **Quantitative Engine (`/python_service`)**:
  - Python 3.14 + FastAPI + Uvicorn
  - Pydantic data validation
  - Basel III/IV IRB risk calculation engine
  - Multi-agent earnings sentiment simulator
  - Quantitative crypto alpha signal feed

---

## 🚀 Quick Start & Development Guide

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v18+)
- Python (v3.10+)

### 2. Run All Services with One Command
From the root directory (`F:\Jh Group`):
```bash
node run_dev.js
```
This concurrently starts:
- **Client:** `http://localhost:5173`
- **Express Backend:** `http://localhost:5000`
- **Python Engine:** `http://localhost:8000`

### 3. Or Run Services Individually

#### React Frontend:
```bash
cd client
npm run dev
```

#### Express API Server:
```bash
cd server
npm start
```

#### Python Algorithmic Microservice:
```bash
python python_service/app.py
```

### 4. Running Verification Tests

To verify the Express backend API and file persistence:
```bash
cd server
node test_server.js
```

To verify the Python quantitative microservice:
```bash
cd python_service
python test_python_service.py
```

To verify the client production build:
```bash
cd client
npm run build
```

---

## 🔒 Environment Configuration

Create a `.env` file in `server/` (see `server/.env.example`):
```env
PORT=5000
NODE_ENV=development

# Optional: MongoDB connection string
# If left blank, inquiries are safely saved in server/data/contacts.json
MONGO_URI=mongodb://localhost:27017/jh_group

PYTHON_SERVICE_URL=http://localhost:8000
```

---

© 2026 JH Group. High-Performance Quantitative Intelligence & Multi-Agent FinTech Architecture.
