import { createSlice } from '@reduxjs/toolkit';


const initial_state = {
    token_for_authnetication : null,
    user_info : null,
    is_user_authenticated : false
}

const AUTH_PROVIDER = createSlice({
    name: 'auth_provider',
    initialState: initial_state,
    reducers: {
        set_token(state, action) {
            state.token_for_authnetication = action.payload;
            state.user_info = action.payload,
            state.is_user_authenticated = true
        },
        remove_token(state) {
            state.token_for_authnetication = null;
            state.user_info = null;
            state.is_user_authenticated = false
        }
    }
})

export const {set_token , remove_token } = AUTH_PROVIDER.actions
export default AUTH_PROVIDER.reducer