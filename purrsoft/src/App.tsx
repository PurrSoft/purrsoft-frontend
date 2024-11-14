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
import { Login } from './scenes/Login';

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
  {
    path: '/login',
    element: <Login />
  }
];

const authenticatedRoutesConfig = [
  ...publicRoutes.filter((route) => route.path !== '/login'),

  {
    path: '/management',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="program" />,
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
    element: <Navigate replace to="/management" />,
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
    console.log('Token found in cookies:', tokenCookies);
    dispatch(updateToken(tokenCookies));
  } else {
    console.log('No token found in cookies');
  }

  return (
    <>
      {/* Use authenticatedRouter if the user is authenticated, otherwise use publicRouter */}
      <RouterProvider router={token ? authenticatedRouter : publicRouter} />{' '}
      {/* Uncomment this line to enable authentication */}
      {/* <RouterProvider router={authenticatedRouter} />{' '} */}
      {/* Comment this line after login is done */}
    </>
  );
};
import { DatePicker } from "./components/DatePicker";

function App() {
  return <>'Hello, guys!'</>;
}

export default App;
