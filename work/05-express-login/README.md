# Express Login Assignment

* Start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'express-login' (`git checkout -b express-login`)
* Create a package.json and necessary files to complete the work described below
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the reviewer(s).  
* **Due by Mon Feb 12, 11:59pm ET**

## Goal and Requirements

The application will be a site that performs login, keeps information for each user, and allows a logout
- Special Note: We will not have a "register user" step.  When a user tries to login with a username, we will consider that a valid account (except for user "dog", which we will treat like a bad password, since we will not have password)

- The home page of the application will show either a login form, or the data page
  - Both of these pages are dynamically generated
- The home page offers the option to logout IF the user is already logged in
- The data page will show current "stored word" for the current logged in user
- The data page will include a form to replace the stored word with a new one
- Multiple users can use the system without problems
  - Each with their own separate stored word
- You should demonstrate the skills taught in this course where applicable
- You will not be using HTTPS
- You will not be using any password entry or handling

See "Requirements" below for more specific requirements

## Requirements

### Visuals

You must show effort to make it visually attractive and usable
- Make different areas of content visually distinct using colors and/or spacing
- Make content legible using whitespace (padding, margin, line-height, etc)
- Interactions (form fields, buttons, links) must have text/labels to be understood by an uninformed user
- Context (additional text/headings) should make it clear what content is being displayed
- The content should be responsive (text flow to fit) the page at desktop sizes 
  - Avoid fixed sizes on structural elements (those elements that would prevent responsive behavior)
  - Enforced reasonable visual gutters to keep content to a maximum width is allowed but not required

### Logic

#### Login

- A user that is not logged in will be prompted to enter their username
    - Hint: the `/` route can simply return DIFFERENT response content.  A logged in user will see the data, a not-logged in user will see a login form
    - Hint: Showing different HTML content should just be your controller deciding to call and return a different view function
- The form that collects the username should POST to a different route (path is up to you)
- The server will create a UUID-based session id and store it in a cookie.  The server will also associate that sid with the username.  (hint: have the sid be a key for an object that is defined OUTSIDE the request handler in the server.  Set the value to an object, with `username` as one of the properties in that object)
- login will fail for an empty username or the username "dog" or any username that is not made up of letters or numbers only
  - Hint: If you want to look into regular expressions, see the [/readings/js/regex.md](/readings/js/regex.md) file for some base info, then checkout https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
- If login fails due to an invalid username, you should respond with a 400 status code and a web page that informs them and offers a link to see the login form again (this can be simply a link to the home page)
    - If login fails because the username is dog, you should respond with a 403 status code, but otherwise offer the same option to return to the login form above
    - Hint: use `res.status(400);` to set the status code you want to return.  You will still need to `.send(...);` the HTML content
- If login succeeds the server should respond with a redirect to the home page.

#### Data Page

- A user that is validly logged in will see the data page on `/`
- The data page will offer a button to logout (use POST to logout for this assignment)
- The data page will display a "stored word" specific to that user
  - The stored word for each user defaults to the empty string
  - The stored word is stored on the server
    - NOT sent as a cookie
- The data page has a form to change the stored word
  - Show an input of type text with a value of the current stored word value
  - The path of the route to change the stored word is up to you
- If a change is submitted, the server will record that change and associate it to the username and redirect to `/`
  - Hint: A second object to hold the stored words is a good idea.  Use keys of the username.  That way the data is associated with the user, not the session id. Every change attempt will make sure the session id is a valid user
  - Hint: To test that you have proper separation of the data for different users, try storing a word, logging out and logging in as a different user.  You should not see the stored word of the first user.  Then logout and log back in as the first user.  You should see their stored word.
  - Hint: To test that you are checking the session each time, delete or change your session id cookie in the DevTools before submitting the change form
- A user that sets a stored word, logs out, and later logs back in will still see their stored word
  - Hint: To test that you have proper separation of session data and user data, try storing a word, logging out, and logging back in as the same user.  You should see their stored word.
- Stored words can be different for different users
  - Hint: Use an incognito/private browser to login in as a second user at the same time your main browser window is logged in as a first user

#### Logout

- The logout route will:
  - Remove the session id from the object it is using to store the session info
    - Hint `delete obj.key` or `delete obj['key']` removes property `key` from object `obj`
  - Remove the cookie from the browser
  - Redirect the user to `/`
- The logout route will NOT:
  - Remove the stored word from being associated with that username
  - Hint: This means the session object doesn't hold the stored word.  Try using a second object that connects the username to the stored word, just like the session object connected the sid to the username.

#### Internals

* The application must be runnable via: `npm install` and then `node server.js` and then going to `http://localhost:3000`
* You should try to follow an MVC structure: 
  - The code that generates HTML should be separate from the data logic
  - The code that generates HTML should be separate from the express route handlers
* Every response from the server should either be a redirect or include all required HTML structure
  - Example: Don't have `res.send('invalid username')` - that doesn't have the html/body/etc 

## Allowances
* You may reuse files or parts of files from previous assignments or classes - but they will be graded by the criteria here!
* You may create your HTML as you see fit, but it must be fundamentally semantically valid and follow other best practices from class
* You may create the CSS as you see fit but you must follow the best practices given in class and the Restrictions below
* You may add icons and background images but there is no requirement to do so

## Restrictions
* You should use `express`, `cookie-parser`, and `uuid` modules only
  - `jest` is allowed if you add unit tests for your content, but (sadly) no test code will be graded
    - Remember that a unit test should not test the server itself
* You must add additional JS files (server-side ONLY) that YOU write to uphold the idea of separation of concerns
* You must use the correct HTTP methods (GET for loading pages, POST for adding content)
* Reloading a page should not trigger a POST (use a redirect)
  - Except for errors that don't change the server state
* Do not use external JS other than base express and cookie-parser
* Do not use external CSS libraries
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables for layout or CSS table layouts
* You may NOT use client-side/browser-side Javascript
* Do not have any outside files in your PR (no files from other assignments, for example)
* Use arrays and objects when they each make sense
* Do not use Map() or Set() for this assignment
  * In order to ensure you know how to use objects and arrays for the purposes
* Do not use `var`, use `const` and `let` appropriately
* Do not use `alert`
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have console.log messages from debugging
* Do not have commented out code
* Do not use client-side(browser) JS
* Do not use localStorage or other client-side storage other than a cookie to hold your session id
* Do not use meta tag refreshes
* Do not use CSS preprocessors, minifiers, or other tools to modify your CSS

