import { toast, ToastOptions } from "react-toastify";

// Default configuration for all toast notifications
// These can be overridden by passing options to individual toast calls
const defaultOptions: ToastOptions = {
  position: "top-right", // Toast appears in top-right corner
  autoClose: 3000, // Disappears after 3 seconds
  hideProgressBar: false, // Shows countdown progress bar
  closeOnClick: true, // Closes when clicked
  pauseOnHover: true, // Pause countdown on mouse hover
  draggable: true, // Can be dragged to reposition
  progress: undefined, // Custom progress value (uses default)
  theme: "dark" // Dark theme styling
};

// Unified toast notification interface
// Provides consistent styling and behavior across different toast types
export const showToast = {
  // Success toast - Green color
  // Used for successful operations and positive feedback
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
  },

  // Error toast - Red color
  // Used for errors and operation failures
  // Note: Longer display time (4s) for error messages
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options, autoClose: 4000 });
  },

  // Info toast - Blue color
  // Used for general information and neutral updates
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options });
  },

  // Warning toast - Yellow color
  // Used for warnings and important notices
  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, { ...defaultOptions, ...options });
  },

  // Loading toast - Spinner indicator
  // Used for async operations
  // Returns toast ID for updating/dismissing later
  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, { ...defaultOptions, ...options });
  }
};

/* Usage examples:
 *
 * showToast.success("Item added to cart");
 * showToast.error("Failed to process payment");
 * showToast.info("Order is being processed");
 * showToast.warning("Low stock available");
 *
 * // For loading toasts with updates:
 * const toastId = showToast.loading("Processing...");
 * // Later:
 * toast.update(toastId, {
 *   render: "Complete!",
 *   type: "success",
 *   isLoading: false
 * });
 */
