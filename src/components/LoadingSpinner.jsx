import React from "react";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="loading-spinner__circle" />
      <p className="loading-spinner__text">{message}</p>
    </div>
  );
}
