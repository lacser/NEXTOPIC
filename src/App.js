import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { Root } from './Root'
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import React from 'react';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    <Route path='/:mode' element={<HomePage />} />
    <Route path='/:mode/conversation/:chatIndex' element={<ChatPage />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;