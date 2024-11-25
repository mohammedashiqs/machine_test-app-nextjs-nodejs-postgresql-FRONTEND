// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, []);
};

export default useAuth;