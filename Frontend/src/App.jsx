import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AuthWindow from './Pages/auth/AuthWindow';
import { publicRoutes } from './routes/route/publicRoutes';
import Login from './Pages/auth/Login';
import Router from './routes/Router';


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
      <Router allRoutes={allRoutes} />
    </>
  )
}

export default App
