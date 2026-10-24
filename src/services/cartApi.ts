import type { AddToCartRequest, CartItem, CartResponse, MessageResponse, UpdateCartItemRequest } from "../types/api";
import { api } from "./api";

export const cartApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<CartResponse, void>({
            query: () => '/api/cart',
            providesTags: ['Cart']
        }),
        addToCart: builder.mutation<CartItem, AddToCartRequest>({
            query: (itemData) => ({
                url: '/api/cart',
                method: 'POST',
                body: itemData
            }),
            invalidatesTags: ['Cart']
        }),
        updateCartItem: builder.mutation<CartItem | MessageResponse, UpdateCartItemRequest>({
            query: ({productId, quantity}) => ({
                url: `/api/cart/${productId}`,
                method: 'PATCH',
                body: { quantity }
            }),
            invalidatesTags: ['Cart']
        }),
        removeFromCart: builder.mutation<MessageResponse, number>({
            query: (productId) => ({
                url: `/api/cart/${productId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        })
    })
});

export const { useGetCartQuery, useAddToCartMutation, useUpdateCartItemMutation, useRemoveFromCartMutation } = cartApi;