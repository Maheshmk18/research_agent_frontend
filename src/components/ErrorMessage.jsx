import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="error-message" role="alert">
      <strong className="error-message__title">Something went wrong.</strong>
      <p className="error-message__text">{message}</p>
    </div>
  );
}
