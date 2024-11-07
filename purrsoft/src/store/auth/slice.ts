import { PayloadAction, createSlice } from '@reduxjs/toolkit';
//the logic for the storage of the token is in the slice
//state for auth
export type AuthState = {
  token: string | null;
};
//storage key
const STORAGE_KEY = 'auth_token';
const initialState: AuthState = {
  token: localStorage.getItem(STORAGE_KEY),
};

//create the slice
export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    resetAuth() {
      sessionStorage.removeItem(STORAGE_KEY);

      return { token: null };
    },
    updateToken(state: AuthState, action: PayloadAction<string>) {
      sessionStorage.setItem(STORAGE_KEY, action.payload);
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const { resetAuth, updateToken } = authSlice.actions;
