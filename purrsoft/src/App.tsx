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

// Define the base routes for public access - we need for the auth to have access to the public route
const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
];

const authenticatedRoutesConfig = [
  ...publicRoutes,

  {
    path: '/managment',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="program" replace />,
      },
      {
        path: 'program',
        element: <Program />,
      },
      {
        path: 'animalute',
        element: <Animalute />,
      },
      {
        path: 'evenimente',
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
    element: <Navigate replace to="/" />,
  },
];

// Create separate routers based on authentication
const publicRouter = createBrowserRouter(publicRoutes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

const authenticatedRouter = createBrowserRouter(authenticatedRoutesConfig, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export const App = () => {
  const token = useAppStateSelector((state) => state.auth.token); // will need it for the future
  const tokenCookies = document.cookie.split('=')[1];
  const dispatch = useAppDispatch();

  if (tokenCookies) {
    dispatch(updateToken(tokenCookies));
  }

  return (
    <>
      {/* Use authenticatedRouter if the user is authenticated, otherwise use publicRouter */}
      {/* <RouterProvider router={token ? authenticatedRouter : publicRouter} /> */}{' '}
      {/* Uncomment this line to enable authentication */}
      <RouterProvider router={authenticatedRouter} />{' '}
      {/* Comment this line after login is done */}
    </>
  );
};
