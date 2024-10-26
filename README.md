# Auto Premium (Frontend)

This is a web application that allows users to create and manage announcements to sell their cars. Each user can sign up, log in, and create detailed car sale announcements, including photos and specific information about their vehicle. The app also enables potential buyers to contact sellers directly through the platform using SMS.

## Features

- **User Registration and Authentication**: Create an account and log in securely.
- **Create, Edit, and Manage Announcements**:
  - Add photos and details for each car announcement.
  - Include information such as:
    - KMs
    - Year
    - Make (e.g., BMW)
    - Model (e.g., M5)
    - Color
    - HP
    - Engine Displacement
    - Fuel Type (e.g., Hybrid)
    - Number of Doors
    - Traction Type (e.g., AWD)
    - Gearbox Type (e.g., Automatic)
    - Location
- **User Profile Management**: Edit personal information like contact details, password, and phone number.
- **Location Visualization**: Display the car's location using Google Maps, including a range area for better visualization.
- **Contact via SMS**: Interested buyers can reach out to the seller through the website using a form, which sends a sms/message directly to the announcement owner using the Vonage API.

## Tech Stack

- **Frontend**:

  - JavaScript
  - React
  - Chakra UI for styling and UI components
  - Axios
  - HTML & CSS

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB for database management
  - Bcrypt for password encryption

- **Third-Party Services**:
  - Google Maps Geo Localization API for location display.
  - Vonage API for sending SMS messages.

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- MongoDB instance (local or cloud).
- API keys for:
  - **Google Maps** (for geo-localization)
  - **Vonage API** (for sending SMS)

### Installation

1. Clone the repository:

```bash
    git clone https://github.com/joaovff/Auto-Premium-Frontend
    cd Auto-Premium-Frontend
```

2. Install dependencies:

```bash
    npm install
```

3. Create a .env file in the root directory and add the following environment variables:

```bash
    MONGODB_URI=your-mongodb-connection-string
    GOOGLE_MAPS_API_KEY=your-google-maps-api-key
    VONAGE_API_KEY=your-vonage-api-key
    VONAGE_API_SECRET=your-vonage-api-secret
```

4. Start the development server:

```bash
    npm start
```

This command will start only the frontend server, in case of using the backend server as well, you should use the following command:

```bash
    npm run dev
```

# Project Preview:

![image](https://github.com/joaovff/Auto-Premium-Frontend/assets/110693830/81b9d80c-2918-4e59-949e-601a968fff68)

![image](https://github.com/joaovff/Auto-Premium-Frontend/assets/110693830/bab99754-afca-448e-8801-5ccee7c07576)

### Usage

- Visit `https://auto-premium.netlify.app/` in your browser.
- Create a new account or log in with existing credentials.
- Create, edit, or delete car announcements with detailed information.
- Visualize the car's location on a map and adjust the range.
- Contact sellers directly through the built-in SMS feature.

# License

Commercial use of the software is only available by mutual agreement.
