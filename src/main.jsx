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
import { PrivateRoutes } from './PrivateRoutes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthEmailProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthEmailProvider>
  </React.StrictMode>
)
