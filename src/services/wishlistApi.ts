import type { MessageResponse, WishListItem } from "../types/api";
import { api } from "./api";

export const wishlistApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query<WishListItem[], void>({
            query: () => '/api/wishlist',
            providesTags: ['Wishlist']
        }),
        addToWishlist: builder.mutation<WishListItem, number>({
            query: (productId) => ({
                url: '/api/wishlist',
                method: 'POST',
                body: { productId }
            }),
            invalidatesTags: ['Wishlist']
        }),
        removeFromWishlist: builder.mutation<MessageResponse, number>({
            query: (productId) => ({
                url: `/api/wishlist/${productId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Wishlist']
        })
    })
});

export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } = wishlistApi;