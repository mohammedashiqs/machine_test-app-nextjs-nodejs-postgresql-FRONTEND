// src/app/NavBar.js
"use client"; // This line marks the component as a Client Component

import Link from "next/link";

export default function NavBar() {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    window.location.href = '/'; // Redirect to home page or login page
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/books" className="mr-4">Books</Link>
        <Link href="/signup" className="mr-4">Sign Up</Link> {/* Link to Signup Page */}
        {!localStorage.getItem('token') ? (
          <Link href="/login" className="mr-4">Login</Link>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 p-2 rounded">Sign Out</button>
        )}
      </div>
    </nav>
  );
}