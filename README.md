# Solar Thermal E-Harvesting Dashboard

A real-time, professional-grade monitoring dashboard built for Solar Thermal Harvesting Systems. Designed to mimic the clean aesthetics of Microsoft Power BI, this single-page dashboard connects directly to Firebase Realtime Database to stream and visualize live thermal and flow data.

## Features

- **Live Sensor Stream**: Automatically fetches and visualizes real-time temperature (T1-T4) and fluid flow (F1-F2) metrics.
- **Relay Controls**: Monitors operational states of system components like the Power Supply, Solenoid Valve, Pump, and Artificial Lamp.
- **Interactive UI**:
  - Live animated telemetry dots and operational timestamps.
  - Interactive Chart.js integration featuring professional, high-contrast layouts.
  - Expanding live data log tracking historical telemetry.
- **CSV Export**: Conveniently download the active session's data logs into a timestamped `.csv` file using zero server dependencies.
- **Demo Mode**: Built-in visualizer fallback to simulate hardware data generation directly in the client if physical edge devices are disconnected.

## Project Structure

- `solar_powerbi_dashboard.html`: The core frontend single-page application.
- `solar_powerbi_data.xlsx`: Reference historic database tied to the mechanical deployment.

## Setup & Execution

Since the dashboard leverages client-side JavaScript to directly bind with the Firebase backend stream, there are zero build steps, transpilers, or package managers required.

1. Clone or download this repository locally.
2. Directly execute/open `solar_powerbi_dashboard.html` in any modern web browser (Edge, Chrome, Firefox).
3. The dashboard executes natively and autonomously connects to the Firebase topology at endpoint `solar-thermal-e-harvesting-default-rtdb`.

## Technology Stack
- **HTML/CSS/JS**: Vanilla frontend implementation for maximum performance portability and execution speed.
- **Firebase SDK**: Web bindings for instant telemetry database connection events.
- **Chart.js**: Client-side structural graphing capabilities for line datasets.

## License
MIT License
