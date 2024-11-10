# Company Stock Dashboard

A web application for visualizing stock data of various companies. This dashboard allows users to select a company and view its stock's opening and closing values over time, along with additional financial metrics.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)

## Features
- Search for companies in the sidebar.
- View historical stock data for selected companies, including opening and closing index values.
- Display additional financial metrics such as high and low index values, volume, P/E ratio, P/B ratio, and dividend yield.
- Interactive, time-series line chart to visualize stock trends.
<!-- Add a screenshot image here -->

## Technologies Used
- **Frontend**: React, Chart.js
- **Backend**: Node.js, Express
- **Database**: Given dataset i.e. dump.csv
- **Other Libraries**: axios, dotenv, cors, csv-parser, chart.js, chartjs-adapter-date-fns

## Getting Started

Follow these steps to run the project locally.

### Prerequisites
- **Node.js** and **npm**: Download and install [Node.js](https://nodejs.org/) which includes npm.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/company-stock-dashboard.git
   cd company-stock-dashboard
   
2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   
3. **Install frontend dependencies:**
   ```bash
   cd client
   npm install

### Running the Project

1. **Setup env file:**
   ```bash
   cd server
   type null > config.env
  Inside the env file, set 'PORT=5000'

2. **Start the backend server:**
   ```bash
   cd server
   node app.js
  
3. **Start the React application:**
   ```bash
   cd client
   npm start
  Open your browser and navigate to [http://localhost:3000](http://localhost:3000)




