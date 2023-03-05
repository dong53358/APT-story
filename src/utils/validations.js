import React from "react";

export const emailValidation = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const passwordValidation = (password) => {
  return password.length >= 6;
};
