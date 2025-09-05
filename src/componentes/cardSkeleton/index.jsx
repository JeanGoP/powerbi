import React from "react";
import "./cardSkeleton.css";

const CardSkeleton = () => {
  return (
    <div className="card text-center shadow-sm p-4 rounded">
      <div className="skeleton-icon mb-3"></div>
      <h5 className="card-title placeholder-glow">
        <span className="placeholder col-6"></span>
      </h5>
      <p className="card-text placeholder-glow">
        <span className="placeholder col-8"></span>
      </p>
    </div>
  );
};

export default CardSkeleton;
