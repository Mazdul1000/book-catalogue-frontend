import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import AllBooks from '../pages/AllBooks';
import AddBook from '../pages/AddBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'/books',
        element: <AllBooks />
      },
      {
        path:'/add-book',
        element: <AddBook />
      },
    ],
  },
/*   {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  }, */
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
