## Project Demo

You can view the project demo here: [Project Demo](https://drive.google.com/file/d/1idBmbe9BBhsxECQ3laiLHJqVPY5RuzLO/view?usp=drive_link)

# Login and Signup App with Remember Me Feature

This project is a simple React Native app that implements a **Login** and **Signup** flow with features such as form validation, password strength indicator, and a "Remember Me" option. The app uses **Formik** for form handling, **Yup** for validation, and **AsyncStorage** for persisting the "Remember Me" state.

---

## **Features**
- **Login and Signup** forms with field validations.
- Password strength indicator for Signup.
- "Remember Me" functionality for persisting login details.
- Navigation between Login and Signup screens.
- User feedback with success messages on successful submission.

---

## **How to Run the Project**

### **Prerequisites**
1. Ensure **Node.js** and **npm** (or **Yarn**) are installed.
2. Install the **React Native CLI**.
3. Have an emulator or physical device configured for Android/iOS.

### **Steps to Run**
1. Clone the repository:
   ```bash
   git clone 'https://github.com/Ankitha2130/Better-Assignment'
   cd bettersoftwareapp

2. Install dependencies:
   ```bash
   npm install

3. Start the Metro bundler:
   ```bash
   npx react-native start

4. Run the app:
   For Android 
   ```bash
   npx react-native run-android
   ```
   For iOS
   ```bash
   npx react-native run-ios

## Design Choices

### Form Handling
- Used **Formik** for handling forms due to its simple integration with React Native components.
- Added field-level validation using **Yup** for precise and reusable validation logic.

### State Management
- Implemented local state management with React's **useState** for dynamic UI updates (e.g., password strength).
- Used **AsyncStorage** for persisting the "Remember Me" state.

### Navigation
- Used **React Navigation** for screen transitions between Login and Signup.

### UI Components
- Developed custom components (`CustomInput` and `CustomButton`) for reusability and cleaner code.
- Styled with React Native's **StyleSheet** for platform-specific performance.

