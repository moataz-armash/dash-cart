// src/contexts/PhoneNumberContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const PhoneNumberContext = createContext();

// Create a provider component
export const PhoneNumberProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <PhoneNumberContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </PhoneNumberContext.Provider>
  );
};
