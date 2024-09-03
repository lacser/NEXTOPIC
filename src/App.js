import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { Root } from './Root'
import { Homepage } from './features/HomePage/Homepage';
import { Chat } from './features/ChatPanel/Chat';
import React from 'react';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    <Route index element={<Homepage />} />
    <Route path='conversation/:chatIndex' element={<Chat />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;