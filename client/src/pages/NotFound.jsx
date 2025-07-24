import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="h-screen flex items-center justify-center flex-col text-center p-6">
    <h1 className="text-4xl font-bold text-red-500 mb-4">
      404 - Page Not Found
    </h1>
    <Link to="/" className="text-blue-600 underline">
      Go back to Home
    </Link>
  </div>
);

export default NotFound;
