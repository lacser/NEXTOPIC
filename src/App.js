import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { Root } from './Root'
import { Homepage } from './components/Homepage';
import { Chat } from './components/Chat';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root/> }>
    <Route index element={ <Homepage/> }/>
    <Route path='conversation/:conversationIndex' element={ <Chat/> }/>
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;