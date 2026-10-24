import type { AuthResponse, RegisterRequest, LoginRequest } from "../types/api";
import { api } from "./api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData
            })
        }),
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (userCreds) => ({
                url: '/login',
                method: 'POST',
                body: userCreds
            })
        })
    })
});

export const { useRegisterMutation, useLoginMutation } = authApi