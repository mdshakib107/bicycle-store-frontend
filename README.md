<h1 align="center">
  🚲 Bicycle Store  
</h1>

### **Project Overview & Objective**

A Bicycle Store application featuring user-friendly functionalities, secure authentication, and efficient product management. Ensuring the application is responsive, free of errors, and visually appealing.

## 🌐 Live URL: 
[Bicycle Store](https://bicyclestore.netlify.app/)

## 📌 Credentials:

**Admin:**
 - email: mina@mail.com
 - pass: 1234
   
**User:**
 - email: nina@mail.com
 - pass: 1234

## **Main Functionalities:**

### **1. User Registration & Authentication (Role-Based)**

#### **Secure Registration and Login**

- Users can register by providing their name, email, and password. By default, users are assigned the "customer" role.
- Admin roles can be updated manually; no "super admin" feature is required.
- Passwords must be hashed securely before being stored in the database.
- Users log in using their email and password.

#### **JWT (JSON Web Token)**

- Generate a JWT token upon login for secure authentication.
- Store the token in local storage to maintain user sessions.

#### **Logout**

- Remove the token from local storage upon logout and redirect users to the login page.

<br/>

### **2. Public Routes**

#### **Home Page**

- **Navbar**: Include a logo, navigation items, and buttons for login/signup and other actions.
- **Banner**: Showcase special offers or features using a carousel if preferred.
- **Featured Bicycles**: Display up to 6 bicycles with a "View All" button redirecting to the "All Bicycles" Page.
- **Extra Section**: Add content relevant to e-commerce, such as testimonials.
- **Footer**: Include important links, social media icons, and contact details.

#### **All Bicycles Page**

- **Search Functionality**: Allow users to search by brand, bicycle name, or category.
- **Filters**: Implement options for price range, model, brand, category, and availability.
- **Dynamic Results**: Update results based on search queries or selected filters.
- **Bicycle Cards**: Display details including name, brand, model, price, and category, with a "View Details" button for each.

#### **Bicycle Details Page**

- Show the bicycle image and detailed specifications.
- Provide a "Buy Now" button that redirects to the checkout page.

#### **About Page**

- Create a page detailing your bicycle shop and its mission, including any other relevant information.

<br/>

### **3. Private Routes**

#### **Checkout Page**

- Users can order bicycles.
- Ensure the ordered quantities do not exceed available stock.
- **Order Form**: Include product details, user details, total price calculation, and payment method.
- **Payment Integration**: Integrate SurjoPay, Stripe, or any other payment gateway of your choice.
- Include an "Order Now" button to finalize the purchase.

#### **Dashboard (Role-Based Access)**

- **Admin Dashboard**: Manage users (e.g., deactivate accounts), products (CRUD), and orders (CRUD).
- **User Dashboard**: View orders and manage profile settings. Allow users to update passwords (requiring the current password for security).

<br/>

## **UI/UX Design:**

### **Responsive Design**

- Ensure optimal performance across all screen sizes, maintaining alignment, typography, and intuitive layouts.

### **Error Handling**

- Provide user-friendly error messages for:
  - Invalid login credentials.
  - Registration issues (e.g., duplicate email).
  - Failed operations (e.g., products out of stock).

### **Loading States**

- Display loaders or spinners during API calls like login or data fetching.

### **Toasts**

- Notify users of important actions (e.g., "Login successful," "Order placed," etc.).

<br/>

## **Extra Functionalities**

### **User Side**

- **Bicycle Comparison Tool**: Compare up to 3 bicycles side-by-side. Display specifications, pricing, and features to help users make informed decisions.

### **Admin Side**

- **Sales Dashboard**
  - **Overview Chart**: Display a summary of sales data with visual charts (e.g., bar charts, line charts, or pie charts) for better analysis.
  - **Key Metrics**:
    - **Total Sales Revenue**: Show total revenue over a selectable time period.
    - **Units Sold**: Display the number of bicycles sold.
    - **Top-Selling Bicycles**: Highlight the most popular models with sales figures.

<br/>
<br/>

## :wrench: Steps by steps commands to initialize the project:

- crate a vite project with TipeScript

  ```bash
  npn create vite
  ```

- Install [React Router Dom](https://reactrouter.com/6.28.0/start/tutorial)

  ```bash
  npm install react-router-dom
  ```

- Install [react hook form](https://react-hook-form.com/get-started)

  ```bash
  npm install react-hook-form
  ```

- Install [Ant Design](https://ant.design/docs/react/introduce)

  ```bash
  npm install antd
  ```

- Install [shadcn/ui](https://ui.shadcn.com/docs/installation/vite)

  ```bash
  npx shadcn@latest init
  ```

- Install [Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start)

  ```bash
  npm install @reduxjs/toolkit react-redux
  ```

- Install [react-icon](https://react-icons.github.io/react-icons/)

  ```bash
  npm install react-icons
  ```

- Install [jwt-decode](https://www.npmjs.com/package/jwt-decode) for decoding the JWT token

  ```bash
  npm i jwt-decode
  ```

- Install [sonner](https://sonner.emilkowal.ski/) for toaster rendering

  ```bash
  npm install sonner
  ```

- Install [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/installation) 

  ```bash
  npm i @tanstack/react-query
  ```

  It is recommended to also use our `ESLint Plugin Query` to help you catch bugs and inconsistencies while you code. You can install it via:

  ```bash
  npm i -D @tanstack/eslint-plugin-query
  ```

- Install [Axios](https://www.npmjs.com/package/axios) 

  ```bash
  npm i axios
  ```

- Install [redux-persist](https://www.npmjs.com/package/redux-persist) 

  ```bash
  npm i redux-persist
  ```

- Install [@lottiefiles/dotlottie-react](https://www.npmjs.com/package/@lottiefiles/dotlottie-react) for rendering lottie json file

  ```bash
  npm i @lottiefiles/dotlottie-react
  ```

- Install [TailwindCss](https://tailwindcss.com/docs/installation/using-vite)

  Install tailwindcss and @tailwindcss/vite via npm.

  ```bash
  npm install tailwindcss @tailwindcss/vite
  ```

  Add the @tailwindcss/vite plugin to your Vite configuration.

  ```tsx
  import { defineConfig } from "vite";
  import tailwindcss from "@tailwindcss/vite";
  export default defineConfig({
    plugins: [tailwindcss()],
  });
  ```

  Add an @import to your CSS file that imports Tailwind CSS.

  ```css
  @import "tailwindcss";
  ```

  Make sure your compiled CSS is included in the <head> (your framework might handle this for you), then start using Tailwind’s utility classes to style your content.

  ```html
  <link href="/src/styles.css" rel="stylesheet">
  ```

<br>
<br>
<br>
<br>
