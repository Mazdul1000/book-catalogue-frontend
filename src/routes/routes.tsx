import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import AllBooks from '../pages/AllBooks';
import AddBook from '../pages/AddBook';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import BookDetails from '../pages/BookDetails';

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
        element: <PrivateRoute><AddBook /></PrivateRoute>
      },
      {
        path: '/books/:bookId',
        element: <BookDetails />
      }
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  }, 
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
