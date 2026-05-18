# 📍 Location-Based Notes App

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 📖 App Overview
A premium, production-grade location-based Notes App built with **React Native CLI** and **Redux Toolkit**. This application allows users to seamlessly capture their thoughts, automatically attaching the exact GPS coordinates to each note. The app features robust data persistence, highly responsive UI, and graceful error handling.

## ✨ Core Features (Reduced Scope Achieved)
* **Bottom Tab Navigation**: Clean and intuitive navigation between the "Notes List" and "Create Note" screens.
* **Create Notes**: Form includes a mandatory Title field, optional Content, and an automatically generated timestamp.
* **Automatic Geolocation**: Fetches the device's GPS coordinates upon note creation, with graceful handling of Android permissions.
* **Chronological Feed**: Notes are displayed in a beautifully styled list from newest to oldest.
* **Delete Functionality**: Safely and permanently remove notes from the list.
* **Complete Data Persistence**: State is persisted locally using Redux Persist—closing or restarting the app will not wipe your notes.
* **Production-Grade Validation**: Strict form validation with clear, user-friendly error alerts.

## 🚀 Premium Features (Added Proactively)
To deliver a significantly better User Experience (UX), the following extra features were added despite the officially reduced scope:
* **Image Attachments**: Attach images to notes via Camera or Gallery, seamlessly handling Android permissions and persisting the image data.
* **Instant Inline Editing**: Edit the title and content of an existing note directly from the list view via a polished modal.
* **Pull-to-Refresh**: Native pull-to-refresh functionality integrated smoothly into the notes list.

---

## 🏛️ Architectural Decisions & Assumptions

* **Android-Only Development**: Due to local hardware constraints, this project was developed, configured, and tested exclusively for Android. There is no iOS configuration provided.
* **Reduced Scope + Extras**: While the assignment scope was officially reduced (removing Authentication and Maps integration), I proactively chose to implement the "Edit Note" and "Pull-to-Refresh" features from the original requirements to deliver a polished end product.
* **Separation of Concerns**: UI components strictly handle rendering. All complex business logic and native API interactions are extracted into Custom Hooks (e.g., `useLocation`, `useNotes`).
* **State Management**: Redux Toolkit was chosen for scalable global state management, combined with Redux Persist for immediate UI updates without reloading and long-term storage reliability.

---

## 🐛 Known Bugs & Emulator Limitations

* **Emulator Gallery Error**: When testing on a standard Android Emulator, pressing the "Gallery" button may throw a `Gallery error: no activity found to handle intent` Toast message. This is **not a code bug**, but rather an emulator limitation—most stock Android emulators do not come with a default "Gallery" or "Photos" app installed out of the box, meaning the Android OS has no application to open when requested. 
  * **Workaround**: Either use the "Camera" button (which uses the emulator's default virtual camera), or install "Google Photos" from the Play Store on your emulator to provide a gallery activity.

---

## 📦 Main Libraries & Reasoning

* **`@reduxjs/toolkit` & `react-redux`**: The industry standard for managing complex global state in a scalable way. We utilized memoized selectors (`createSelector`) to optimize re-renders.
* **`redux-persist` & `@react-native-async-storage/async-storage`**: Used to save the Redux store locally to the device, ensuring notes survive app restarts.
* **`@react-navigation/native` & `@react-navigation/bottom-tabs`**: Provides smooth, native-feeling routing and the customizable bottom tab interface.
* **`react-native-geolocation-service` & `react-native-permissions`**: Chosen for highly accurate GPS fetching and strict, standardized handling of Android OS-level location permissions.
* **`react-hook-form` & `zod`**: Implemented for production-grade form validation. Zod provides strict schema definitions, while react-hook-form prevents unnecessary re-renders during text input.
* **`react-native-toast-message`**: Selected to replace basic console logs and default system alerts with a beautiful, slide-in Toast UI for success and error feedback.
* **`react-native-safe-area-context`**: Essential for adapting the UI beautifully across devices with diverse notches, punch-holes, and gesture bars.

---

## ⚙️ Installation & Running the Project

### Prerequisites
* Node.js installed.
* Android Studio and an Android Emulator (or physical device) set up and running.

### Step 1: Install Dependencies
Open your terminal, navigate to the project directory, and run:
```bash
npm install
```

### Step 2: Run the Android App
With your Android emulator running (or a physical device connected), execute:
```bash
npm run android
```

*(Note: This command will automatically start the Metro Bundler in a separate window. If you ever need to clear the bundler cache, you can run `npm start -- --reset-cache`)*

*(Note: This may take a few minutes to run for the first time, as the build process includes downloading Gradle, other dependencies and bundling for the first run)*
