// src/app/books/[id]/page.js
"use client"; // This line marks the component as a Client Component

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function BookDetails() {
  const pathname = usePathname();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Check if router is ready before accessing query parameters

      const id = pathname.split('/').pop(); // Extract `id` // Get the book ID from the URL
      console.log("Fetching details for book ID:", id);
      
      if (id) {
        const fetchBookDetails = async () => {
          const token = localStorage.getItem('token'); // Get token from local storage
          const response = await fetch(`http://localhost:3001/api/books/${id}`, { // API call to fetch book details
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setBook(data);
          } else {
            setError('Failed to fetch book details'); // Handle error
            console.error('Failed to fetch book details');
          }
        };

        fetchBookDetails();
      }

  }, []); // Add router.isReady as a dependency

  if (error) return <div>{error}</div>; // Display error message if any
  if (!book) return <div>Loading...</div>; // Loading state

  return (
    <div className="p-4">
      <h1 className="text-3xl">{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <img src={book.coverImage} alt={`${book.title} cover`} className="w-48 h-auto"/>
      
      {/* Add Review Form */}
      {/* You can implement this section to allow users to add reviews */}
      
    </div>
  );
}