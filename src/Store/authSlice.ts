import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  is_user_verified: boolean;

}

interface AuthState {
  token_for_authnetication: string | null;
  user_info: UserInfo | null;
  is_user_authenticated: boolean;
  is_user_verified: boolean;
}


const initialState: AuthState = {
  token_for_authnetication: localStorage.getItem('User-Settings') || null,
  user_info: JSON.parse(localStorage.getItem('User-Info') || 'null'),
  is_user_authenticated: !!localStorage.getItem('User-Settings'),
  is_user_verified: JSON.parse(localStorage.getItem('User-Verification') || 'false'),
};

const AUTH_PROVIDER = createSlice({
  name: 'auth_provider',
  initialState,
  reducers: {
    set_token(state, action: PayloadAction<{ token: string; user_info: UserInfo }>) {
      state.token_for_authnetication = action.payload.token;
      state.user_info = action.payload.user_info;
      state.is_user_authenticated = !!action.payload.token;

      localStorage.setItem('User-Settings', action.payload.token);
      localStorage.setItem('User-Info', JSON.stringify(action.payload.user_info));
      localStorage.setItem('User-Verification', JSON.stringify(action.payload.user_info.is_user_verified));
    },
    remove_token(state) {
      state.token_for_authnetication = null;
      state.user_info = null;
      state.is_user_authenticated = false;
      state.is_user_verified = false;

      localStorage.removeItem('User-Settings');
      localStorage.removeItem('User-Info');
      localStorage.removeItem('User-Verification');
    },
    updateUserVerified(state, action: PayloadAction<boolean>) {
      state.is_user_verified = action.payload;
      localStorage.setItem('User-Verification', JSON.stringify(action.payload));
    },
    updateAuthToken(state, action: PayloadAction<string>) {
      state.token_for_authnetication = action.payload;
      state.is_user_authenticated = !!action.payload;
    },
  },
});

export const { set_token, remove_token, updateUserVerified, updateAuthToken } = AUTH_PROVIDER.actions;
export default AUTH_PROVIDER.reducer;
