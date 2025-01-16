import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Layout } from './features/Layout';
import { ListaAnimalute } from './scenes/Animalute/ListaAnimalute';
import { Animalute } from './scenes/Animalute';
import { Evenimente } from './scenes/Evenimente';
import { Home } from './scenes/Home';
import { Program } from './scenes/Program';
import { updateToken, useAppDispatch, useAppStateSelector } from './store';
import { Login } from './scenes/Login';
import { DespreNoi } from './scenes/DespreNoi';
import { DespreNoiNou } from './scenes/DespreNoiNou';
import { AccountOverview } from './scenes/AccountOverview/component';
import { ContulMeu } from './scenes/AccountOverview/ContulMeu';
import { RolurileMele } from './scenes/AccountOverview/RolurileMele';
import { SchimbaParola } from './scenes/AccountOverview/SchimbaParola';
import { AplicaRol } from './scenes/AccountOverview/AplicaRol';
import { Fosteri } from './scenes/Fosteri';
import { Cereri } from './scenes/Cereri';
import { ModificaAnimal } from './scenes/Animalute/ModificaAnimal';
import { Voluntari } from './scenes/Voluntari';
import { ListaEvenimente } from './scenes/Evenimente/ListaEvenimente';
import { ModificaEveniment } from './scenes/Evenimente/ModificaEveniment';

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
    element: <Login />,
  },
  {
    path: '/DespreNoi',
    element: <DespreNoiNou />,
  },
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
        children: [
          {
            index: true,
            element: <Navigate replace to="lista" />,
          },
          {
            path: 'lista',
            element: <ListaAnimalute />,
          },
          {
            path: ':id',
            element: <ModificaAnimal />,
          },
        ],
      },
      {
        path: 'evenimente',
        element: <Evenimente />,
        children: [
          {
            index: true,
            element: <Navigate replace to="lista" />,
          },
          {
            path: 'lista',
            element: <ListaEvenimente />,
          },
          {
            path: ':id',
            element: <ModificaEveniment />,
          }
        ]
      },
      {
        path: 'fosteri',
        element: <Fosteri />,
      },
      {
        path: 'voluntari',
        element: <Voluntari />,
      },
      {
        path: 'cereri',
        element: <Cereri />,
      },
    ],
  },
  {
    path: '/account-overview',
    element: <AccountOverview />,
    children: [
      {
        index: true,
        element: <Navigate replace to="contul-meu" />,
      },
      {
        path: 'contul-meu',
        element: <ContulMeu />,
      },
      {
        path: 'rolurile-mele',
        element: <RolurileMele />,
      },
      {
        path: 'aplica-rol',
        element: <AplicaRol />,
      },
      {
        path: 'schimba-parola',
        element: <SchimbaParola />,
      },
    ],
  },

  {
    path: '/login',
    element: <Navigate replace to="/management/program" />,
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
