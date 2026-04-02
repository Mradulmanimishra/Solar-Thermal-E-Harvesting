<div align="center">

<h1>☀️ Solar Thermal E-Harvesting Dashboard</h1>

<p><strong>A real-time, Power BI-style monitoring dashboard for Solar Thermal Energy Harvesting Systems</strong></p>

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime%20DB-orange?logo=firebase)](https://firebase.google.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-v4.4.1-ff6384?logo=chartdotjs)](https://www.chartjs.org/)
[![Status](https://img.shields.io/badge/Status-Live-brightgreen)](#)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mradulmanimishra/Solar-Thermal-E-Harvesting)

</div>

---

## 📌 Overview

This project provides a **live telemetry dashboard** for a Solar Thermal Harvesting research system. It streams sensor data directly from a Firebase Realtime Database and renders it in a sleek, dark-themed interface inspired by Microsoft Power BI — with **zero backend setup required**.

---

## 🖥️ Features

| Feature | Description |
|---|---|
| 🔴 **Live Firebase Stream** | Auto-connects to Firebase on load; no manual configuration needed |
| 🌡️ **4 Temperature Sensors** | T1 (Storage), T2 (Inlet), T3 (Absorber Plate), T4 (Outlet) |
| 💧 **2 Flow Sensors** | F1 (Inlet), F2 (Outlet) in L/min |
| ⚡ **Relay Control Monitor** | Real-time state display for Power Supply, Solenoid Valve, Pump & Lamp |
| 📈 **Live Charts** | Chart.js line graphs with 60-point rolling window |
| 📋 **Data Log** | Up to 10,000 timestamped records in a scrollable table |
| 📥 **CSV Export** | One-click download of the full session log |
| 🎭 **Demo Mode** | Simulated data if hardware is offline |

---

## 🏗️ Project Structure

```
Solar-Thermal-E-Harvesting/
├── index.html               # Main application shell (HTML structure only)
├── assets/
│   ├── css/
│   │   └── style.css        # All UI styling & CSS custom properties
│   └── js/
│       └── app.js           # Firebase, Chart.js logic & data handlers
├── solar_powerbi_data.xlsx  # Reference dataset from physical deployment
└── README.md
```

---

## 🔌 Firebase Data Schema

The dashboard reads from the following Realtime Database path:

```json
/solar_thermal/
  ├── temperature/
  │   ├── t1      → Storage Temp (°C)
  │   ├── t2      → Inlet Temp (°C)
  │   ├── t3      → Absorber Plate Temp (°C)
  │   └── t4      → Outlet Temp (°C)
  ├── flow/
  │   ├── flow1_Lmin  → Inlet Flow Rate (L/min)
  │   └── flow2_Lmin  → Outlet Flow Rate (L/min)
  └── relays/
      ├── relay1_state  → Power Supply
      ├── relay2_state  → Solenoid Valve
      ├── relay3_state  → Pump
      └── relay4_state  → Artificial Lamp
```

---

## 🚀 Getting Started

### Option 1 — Open Locally (No Setup Required)

```bash
git clone https://github.com/Mradulmanimishra/Solar-Thermal-E-Harvesting.git
cd Solar-Thermal-E-Harvesting
# Open index.html in your browser
```

### Option 2 — Deploy to Vercel

Click the button below for instant cloud deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mradulmanimishra/Solar-Thermal-E-Harvesting)

---

## 🛠️ Tech Stack

- **HTML5 / CSS3 / Vanilla JS** — Zero-build frontend
- **Firebase JS SDK v9** — Real-time database streaming
- **Chart.js v4.4.1** — Interactive telemetry charts
- **Google Fonts (Segoe UI)** — Professional typography

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ for Solar Energy Research · <a href="https://github.com/Mradulmanimishra">@Mradulmanimishra</a>
</div>
