import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { App } from './App'
import { Login } from './components/Login/Login';
import { AuthEmailProvider } from './contexts/AuthEmailProvider';
import { LightModeProvider } from './contexts/LightModeProvider';
import { ToastifyProvider } from './contexts/ToastifyProvider';
import { PrivateRoutes } from './PrivateRoutes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthEmailProvider>
      <ToastifyProvider>
        <LightModeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<App />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LightModeProvider>
      </ToastifyProvider>
    </AuthEmailProvider>
  </React.StrictMode>
)
