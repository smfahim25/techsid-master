// apiServices.js
import axios from "axios";

// Define the base URI for the API
export const API_BASE_URI = "https://techsiid-master.onrender.com/api/v1";

// Create an axios instance with default settings
const apiInstance = axios.create({
  baseURL: API_BASE_URI,
  headers: {
    "Content-Type": "application/json",
    // Add other default headers here if needed
  },
  // Add additional settings like timeouts if required
});

// Define a class to handle API services
class ApiServices {
  // Auth
  signup(data, params) {
    return apiInstance.post(`/auth/social-auth`, data);
  }

  // Add other service methods as needed, for example:
  // login(data) {
  //   return apiInstance.post(`/auth/login`, data);
  // }
}

// Create an instance of ApiServices
const apiServicesInstance = new ApiServices();

// Export the instance as the default export
export default apiServicesInstance;
