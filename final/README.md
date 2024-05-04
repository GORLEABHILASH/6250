# Event Reservation Platform

 Event Reservation Platform! Here, you can register for various events happening in Boston. Below are step-by-step instructions on how to use this platform effectively.

## Getting Started

### Step 1: Sign Up

Create your account by entering the necessary details. Please adhere to the following validations for successful sign-up due to our front-end and back-end requirements:
- **Username:** (e.g., brett)(no roles)
- **Phone Number:** Must be 10 digits (e.g., 9000907128)
- **Zip Code:** Must be 5 digits (e.g., 02118)
- **Email:** gorle.a@northeastern.edu

Note: All fields are required except for "Street Address 2".

### Step 2: Log In

Once your account is created, log in using your username. Remember, you cannot log in before setting up an account.

### Step 3: View and Register for Events

Browse the list of upcoming events in Boston. Select any event to view more details and click "Register" to book your spot. The seat availability will decrement by one upon registration.

### Step 4: Re-Registration Check

If you attempt to register for the same event again, a notification will inform you that you are already registered.

### Step 5: Handling Sold Out Events

If you wish to test the registration for a sold-out event, you can either:
- Create two additional accounts and register for the same event until the seats are fully booked, or
- Manually set the number of available seats to 0 in the `events.js` file and restart the server. or
- To save you from additional work i have already made available seats to 0 for the second  event(Lucky you !!).

### Step 6: Activity Dashboard

Navigate to the Home page and click on "Activity" to see a list of events you have registered for. You can also view more detailed information about each event.

### Step 7: Update Profile

Update your profile information following the same validations as during Sign-Up. Changes, especially in your username, will not affect your ability to view activities registered under the old username.

### Step 8: Logout and Re-login

After updating your profile or completing your activities, ensure to log out and then log back in with your credentials.

## Additional Information

Keep an eye out for various messages displayed via modals throughout the platform, which will guide you through processes such as signing up and registering for events.





## API Endpoints

The following table outlines the available API endpoints along with their purpose and functionality:

| Method | Endpoint                  | Description                                                                                     |
|--------|---------------------------|-------------------------------------------------------------------------------------------------|
| `GET`  | `/api/v1/session`         | Retrieves the session data for the logged-in user, if authenticated.                           |
| `POST` | `/api/v1/session`         | Logs in a user by creating a session if the username is valid and exists in the database.      |
| `DELETE`| `/api/v1/session`        | Logs out a user by clearing the session cookie and deleting the session data.                  |
| `GET`  | `/api/v1/events`          | Returns a list of all available events, provided the user is authenticated.                    |
| `POST` | `/api/v1/register`        | Registers a user for an event by booking a seat, assuming seats are available.                 |
| `GET`  | `/api/v1/eventid/:eventId`| Provides detailed information about a specific event, including name, location, and date.     |
| `GET`  | `/api/v1/activity`        | Displays a list of events the user has registered for, only if authenticated.                  |
| `POST` | `/api/v1/signup`          | Registers a new user with validation checks for username, email, phone number, and zip code.  |
| `PATCH`| `/api/v1/updateprofile`   | Updates user profile information, checks for validation, and handles changes in username.      |
| `GET`  | `/api/v1/profile`         | Retrieves detailed profile information for the logged-in user, if authenticated.               |

### Descriptions

- **Session Endpoints**
  - `/api/v1/session` (GET): Returns the current user's username if a session is active and valid.
  - `/api/v1/session` (POST): Creates a new session for the user if the username provided is valid and not blocked. Responds with user data.
  - `/api/v1/session` (DELETE): Ends the user's session and clears the session identifier.

- **Event and Registration Endpoints**
  - `/api/v1/events` (GET): Retrieves a complete list of events for authenticated users.
  - `/api/v1/register` (POST): Registers the user for an event if seats are available. It checks for user authentication and whether the user is already registered.
  - `/api/v1/eventid/:eventId` (GET): Fetches details for a specific event by ID.

- **User Data Management Endpoints**
  - `/api/v1/activity` (GET): Provides information on events that the user has registered for, accessible only to authenticated users.
  - `/api/v1/signup` (POST): Handles new user registration, checking for data validity such as username uniqueness and format of email and phone number.
  - `/api/v1/updateprofile` (PATCH): Allows users to update their profile. It checks for the existence of a new username if a change is requested.
  - `/api/v1/profile` (GET): Provides profile details for the authenticated user, including registered events.


- No roles, No Polling and  No Service pagination 

## User Interface Views



- **Not Logged In (`notLoggedIn`)**: This is the default view for users who are not logged in. It includes the login and signup options.
  
- **Logged In (`loggedIn`)**: This view is accessible once the user successfully logs in. It serves as the dashboard, providing access to event browsing, activity viewing, and profile management.
  
- **Sign Up (`signup`)**: This view is for new users to create an account. It includes form validations to ensure data integrity.
  
- **View Event (`view-event`)**: Accessible from the dashboard, this view provides detailed information about specific events. Users can register for events from this page.
  
- **Activity (`activity`)**: This view displays all events that the user has registered for. It allows users to review their upcoming activities.
  
- **Profile (`profile`)**: Users can view and edit their profile information in this view. Profile updates are handled with validations similar to the signup process.
  
- **Booked Events (`booked-events`)**: This view shows the details of the event user has registered for, allowing them to review their booked events.

### Special UI Elements and Interactive Components



- **Modal Dialogs**: Used throughout the platform for feedback during user actions like signing up, logging in, or registering for events. These provide immediate, contextual feedback without redirecting the user away from the current task.
  
- **Dynamic Forms**: Input fields in forms such as signup and profile update utilize real-time validation to guide users in correcting errors before submission.
  

---


