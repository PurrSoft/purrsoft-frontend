import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Layout } from './features/Layout';
import { Animalute } from './scenes/Animalute';
import { Evenimente } from './scenes/Evenimente';
import { Home } from './scenes/Home';
import { Program } from './scenes/Program';
import { updateToken, useAppDispatch, useAppStateSelector } from './store';

const publicRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);
/*
  for path'/' when authenticated it will go to layout . Layout is for almost every path,
  if path goes into layout put it as a child
  if not put it separately in auth route (if u need to be auth)
*/
const authenticatedRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Program />,
      },
      {
        path: '/Program',
        element: <Program />,
      },
      {
        path: '/Animalute',
        element: <Animalute />,
      },
      {
        path: '/Evenimente',
        element: <Evenimente />,
      },
    ],
  },
  {
    path: '/login',
    element: <Navigate replace to="/" />,
  },

  {
    path: '*',
    element: <Home />,
  },
]);

export const App = () => {
  const token = useAppStateSelector((state) => state.auth.token);
  const tokenCookies = document.cookie.split('=')[1];
  const dispatch = useAppDispatch();
  if (tokenCookies) {
    dispatch(updateToken(tokenCookies));
  }
  return (
    <>
      <RouterProvider router={token ? authenticatedRoutes : publicRoutes} />
    </>
  );
};
