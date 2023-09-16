import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { Root } from './Root'
import { Homepage } from './Homepage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root/> }>
    <Route index element={ <Homepage/> }/>
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;