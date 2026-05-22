import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publicRoutes } from './routes/route/publicRoutes';
import Router from './routes/Router';
import { Toaster } from "react-hot-toast";
import { getAllRoutes } from './routes/route';
import { getInitialState } from './Store/Auth/authReducer';
import { getPrivateRoutes } from './routes/route/privateRoutes';
import { getMenu } from './Store/Menu/menuReducer';


function App() {
  const allRoutes = [
    ...publicRoutes,
    getAllRoutes(),
    ...getPrivateRoutes()
  ];
  const { theme, userInfo,activeResId } = useSelector(state => state.auth);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialState());
  }, []);

  useEffect(()=>{
    if(activeResId){
      dispatch(getMenu());
    }
  },[activeResId])

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
            background: 'var(--color-toast-bg)',
            color: 'var(--color-low-text)',
            padding: '6px',
            fontSize: 'var(--font-main-toast)'
          },
          success: {
            style: {
              background: 'var(--color-success-bg)',
              color: 'var(--color-sec-text)',
            }
          },
          error: {
            style: {
              background: 'var(--color-error-bg)',
              color: 'var(--color-sec-text)'
            }
          }
        }}
      />
      <Router allRoutes={allRoutes} />
    </>
  )
}

export default App
