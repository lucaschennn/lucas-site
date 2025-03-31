import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ParallaxProvider } from 'react-scroll-parallax';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import Tcg from './components/tcg/tcg.jsx'
import './index.css'

// Suggested code may be subject to a license. Learn more: ~LicenseLog:4007071131.

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tcg",
    element: <Tcg />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ParallaxProvider debug={true}>
      <RouterProvider router={router} />
    </ParallaxProvider>
  </StrictMode>,
)
