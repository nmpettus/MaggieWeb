

// EmailJS configuration
export const EMAILJS_SERVICE_ID = "hostinger_titan"; // Replace with your actual service ID after setup
export const EMAILJS_USER_ID = "ATZA2J0GP6wyUlTlD"; // Replace with your actual user ID (public key)

// Template IDs for different email types
export const EMAIL_TEMPLATES = {
  CONTACT: "template_ca5qut7", // Replace with your contact form template ID
  NEWSLETTER: "template_ca5qut7", // Replace with your newsletter signup template ID
  LETTER_TO_MAGGIE: "template_ca5qut7", // Replace with your letter to Maggie template ID
};

// Initialize EmailJS (call this once in your app entry point)
export const initEmailJS = () => {
};

// Check if EmailJS is valid and configured properly
export const isEmailJSConfigValid = () => {
  return (
    EMAILJS_SERVICE_ID !== "hostinger_titan" &&
    EMAILJS_USER_ID !== "ATZA2J0GP6wyUlTlD" &&
    Object.values(EMAIL_TEMPLATES).every(
      (templateId) => templateId !== "template_ca5qut7"
    )
  );
};
