import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publicRoutes } from './routes/route/publicRoutes';
import Router from './routes/Router';
import { Toaster } from "react-hot-toast";
import { getAllRoutes } from './routes/route';
import { getInitialState } from './Store/Auth/authReducer';
import { getPrivateRoutes } from './routes/route/privateRoutes';
import { clearMenu, getMenu } from './Store/Menu/menuReducer';
import socket from './utils/websocket/socket ';
import { setDashState } from './Store/Dashboard/dashboard';
import { getUpdatedOrderStats, getUpdatedTableStats } from './Apis/dashboardApi';

function App() {
  const allRoutes = [
    ...publicRoutes,
    getAllRoutes(),
    ...getPrivateRoutes()
  ];
  const { theme, userInfo, activeResId } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialState());
  }, []);

  useEffect(() => {
    if (userInfo?.id) {

      socket.auth = {
        userId: userInfo.id,
        resId: activeResId,
      }
      socket.connect();

      socket.on('table_status_change',sendDashNotification);
      socket.on('order_status_change',sendOrderNotification);

      return () => {
        socket.disconnect();

      }
    }

  }, [userInfo])

  useEffect(() => {
    if (activeResId) {
      dispatch(getMenu());
    }
    else {
      dispatch(clearMenu())
    }
  }, [activeResId])

  useEffect(() => {
    if (theme == 'dark') {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const sendDashNotification = async () => {
    function successFunction(updatedTableStats) {
      if (updatedTableStats) {
        dispatch(setDashState({ table_occupied_stats: updatedTableStats }))
      }
    }
    await getUpdatedTableStats(successFunction);

  }
  const sendOrderNotification =async()=>{
    function successFunction (data){
      dispatch(setDashState(data));
    }

    await getUpdatedOrderStats(successFunction);
  }
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
