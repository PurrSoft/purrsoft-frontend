import { authSlice } from './auth';
import { authEndpoints, animalProfilesEndpoints, animalsEndpoints } from './api';
import { fostersEndpoints } from './api';
import {
  combineReducers,
  configureStore,
  ThunkAction,
  UnknownAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const API_PATH = import.meta.env.VITE_API_PATH as string;
//verify in what state u are
const isRootState = (state: unknown): state is RootState =>
  typeof state === 'object' && state !== null && 'auth' in state;
//api
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_PATH,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const state = getState();

      if (!isRootState(state) || ['login', 'register'].includes(endpoint)) {
        return headers;
      }
      if ('token' in state.auth) {
        headers.set('Authorization', `Bearer ${state.auth.token}`);
      }
      return headers;
    },
  }),
  //tagtypes
  endpoints: () => ({}),
})
  .injectEndpoints({
    endpoints: authEndpoints,
  })
  .injectEndpoints({
    endpoints: animalsEndpoints,
  })
  .injectEndpoints({
    endpoints: fostersEndpoints,
  }).injectEndpoints({
  endpoints: animalProfilesEndpoints,
});
//root reducer
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice.reducer,
});
//setup store
export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  });
//store
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type ThunkResult<R> = ThunkAction<R, RootState, unknown, UnknownAction>;
export type AppDispatch = ThunkDispatch<RootState, void, UnknownAction>;
export type AppStore = typeof store;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppStateSelector = <StoreFragment>(
  selector: (state: RootState) => StoreFragment,
  equalityFn?: (left: StoreFragment, right: StoreFragment) => boolean,
) => useSelector<RootState, StoreFragment>(selector, equalityFn);
//export function to use the store
export const {
  useAccountQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetAnimalsQuery,
  useChangePasswordMutation,
  useUpdateAccountMutation,
  useGetFostersQuery,
  useDeleteAnimalMutation,
  useGetAnimalProfileQuery,
  useUpdateAnimalProfileMutation,
  useUpdateAnimalMutation,
} = api;

export { resetAuth, updateToken } from './auth';
