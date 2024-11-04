import axios from 'axios';

// Function to send OTP
export const sendOtpApi = async (phoneNumber) => {
  try {
    const response = await axios.post('http://localhost:5000/send-otp', {
      phoneNumber:  phoneNumber,
    });
   
    return response.data; // Return response data if needed
  } catch (error) {
    // Log and throw the error to be handled by the component
    console.error('Error sending OTP:', error);
    throw error; // Rethrow the error so the calling component can handle it
  }
};
