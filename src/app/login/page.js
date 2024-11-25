// src/app/login/page.js
"use client"; // This line marks the component as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();


    const response = await fetch('http://localhost:3001/api/users/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });


    if (response.ok) {
      const data = await response.json();
      console.log('data.token', data.token)
      localStorage.setItem('token', data.token); // Store the token in local storage
      router.push('/'); // Redirect to home page after successful login
    } else {
      console.error('Login failed');
      // Handle error (e.g., show a message)
    }
  }


  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4 p-4">
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
    </form>
  );

  
}