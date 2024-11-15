## Scheduling App
## Description
This is a React-based web application for scheduling, allowing users to manage their profiles, and learn more about the services offered. The app also features sign-in and login functionality, along with a customizable schedule. The project leverages Bootstrap for styling and includes several key components, such as a homepage, navigation bar, profile page, and an informative "About" page.

## Features
-**Home Page**: Displays introductory content and provides navigation to other sections.
-**Profile Management**: Users can log in, manage their profiles, and view their schedules.
-**Sign-In and Login**: New users can register, while existing users can log in to their profiles.
-**About Page**: Contains information about the schedule application in general and its purpose.
-**Error Handling**: A "No Page" component handles 404 errors for unmatched routes.
-**Routing**: Implemented using react-router-dom for seamless navigation.
-**Footer and Navigation Bar**: Consistent design across the application.

## Technologies Used
   React: Component-based structure.

   React Router: For navigation between different pages.

   Bootstrap: For responsive styling.

   JSON Server: Used as a mock backend for user data.

   Node.js: Backend server support.

## Installation

To get a copy of the project up and running on your local machine, follow these steps:

1. **Clone the repository**:
  git clone https://github.com
  cd

2. **Install dependencies:
           npm install
           Start the mock JSON server:
           npx json-server --watch db.json --port 3000
           Start the development server:
           npm start
                 Access the app at http://localhost:3000.

### Folder Structure
**src/
├── Components/
│   ├── Home.js
│   ├── Nav.js
│   ├── Footer.js
│   ├── Profile.js
│   ├── About.js
│   └── Nopage.js
├── App.js
└── index.js**

 ## Component Overview
**Home.js**
   Displays the homepage with a background image and a prominent "Learn More" button linking to the About page.

**Nav.js**
Provides a navigation bar with login and sign-in modals. Uses the useNavigate hook to route authenticated users to their profiles.

**Footer.js**
A simple footer component for consistent design.

**Profile.js**
Dynamically displays user-specific information based on the profile ID from the URL.

**About.js**
Contains information about the app's purpose and features.

**Nopage.js**
Handles 404 errors and displays a user-friendly error message.

**App.js**
The main component, responsible for rendering the app and defining routes.

## links
##### Live link :(https://schedule-v2.vercel.app/)

##### Github link:(https://github.com/RadiatingPI46/Schedule-v2)

##### PowerPoint link:(https://docs.google.com/presentation/d/19XAf-m8vb0pxITb0vD-P0XatPUH8-NcnhcLE-3TrRlo/edit?usp=sharing)

##### Figma link:(https://www.figma.com/design/mzmEUXij5FfEi5xMNv2aOk/Untitled?node-id=0-1&t=h7UcGXEMK12lkqJa-1)

##### Documentation link:(https://docs.google.com/document/d/1XRTYrlJimOHT1LxfT3vGapUgKSBfwp3HfTy3ua6l9Mo/edit?usp=sharing)

## Future Enhancements
Google Calendar Integration: For a more robust scheduling feature.
Admin Dashboard: To manage appointments and user profiles.
Notifications: Alerts for upcoming appointments.
Enhanced Security: With hashed passwords and secure authentication.

## License
This project is licensed under the MIT License.

