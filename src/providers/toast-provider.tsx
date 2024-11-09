"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import default styles

// Global toast notification container
// Should be mounted once at the root level of your application
// Handles the rendering and management of all toast notifications
export function ToastProvider() {
  return (
    <ToastContainer
      // Position toast notifications in the bottom-right corner
      position="bottom-right"
      // Automatically close toasts after 3 seconds
      autoClose={3000}
      // Show a progress bar indicating time until auto-close
      hideProgressBar={false}
      // Display newest notifications on top of the stack
      newestOnTop
      // Close the toast when clicked
      closeOnClick
      // Left-to-right text direction (false for LTR, true for RTL)
      rtl={false}
      // Pause the auto-close timer when the window loses focus
      pauseOnFocusLoss
      // Allow users to drag toasts to reposition them
      draggable
      // Pause the auto-close timer when hovering over a toast
      pauseOnHover
      // Use light theme styling (alternatives: 'dark', 'colored')
      theme="light"
    />
  );
}
