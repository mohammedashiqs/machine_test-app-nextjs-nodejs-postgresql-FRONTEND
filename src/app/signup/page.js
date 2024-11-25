// src/app/signup/page.js
"use client"; // This line marks the component as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState(''); // State for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to hold error messages
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/users/signup', { // Adjust this URL based on your backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }), // Include name in the request body
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token); // Store the token in local storage
      router.push('/'); // Redirect to home page after successful signup
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Signup failed'); // Set error message if signup fails
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSignup} className="flex flex-col space-y-4 p-4">
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="border p-2"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="border p-2"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Sign Up</button>
      </form>
    </div>
  );
}