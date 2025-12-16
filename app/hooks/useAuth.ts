import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'profesor' | 'estudiante';
  initials: string;
}

export function useAuth(requiredRole?: 'admin' | 'profesor' | 'estudiante') {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Solo ejecutar una vez
    if (checked) return;

    const userStr = localStorage.getItem('user');
    
    if (!userStr) {
      // No hay usuario, redirigir a login
      setLoading(false);
      setAuthorized(false);
      setChecked(true);
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(userStr) as User;
      setUser(userData);

      // Verificar si el rol es el requerido
      if (requiredRole && userData.role !== requiredRole) {
        // Rol no autorizado, redirigir a login
        setAuthorized(false);
        setLoading(false);
        setChecked(true);
        router.push('/login');
        return;
      }

      setAuthorized(true);
      setLoading(false);
      setChecked(true);
    } catch (error) {
      console.error('Error parsing user:', error);
      setLoading(false);
      setAuthorized(false);
      setChecked(true);
      router.push('/login');
    }
  }, [checked, requiredRole, router]);

  return { user, loading, authorized };
}
