import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { publicRoutes } from './routes/route/publicRoutes';
import Router from './routes/Router';
import { Toaster } from "react-hot-toast";


function App() {
  const [allRoutes, setAllRoutes] = useState([]);
  const { theme } = useSelector(state => state.auth);

  useEffect(() => {
    setAllRoutes(prev => ([...prev, ...publicRoutes]));
  }, [])

  useEffect(() => {
    if (theme == 'dark') {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background:'var(--color-toast-bg)',
            color: 'var(--color-low-text)',
            padding:'6px',
            fontSize:'var(--font-main-toast)'
          },
          success: {
            style: {
              background: 'var(--color-success-bg)',
              color:'var(--color-sec-text)',
            }
          },
          error: {
            style: {
              background: 'var(--color-error-bg)',
              color:'var(--color-sec-text)'
            }
          }
        }}
      />
      <Router allRoutes={allRoutes} />
    </>
  )
}

export default App
