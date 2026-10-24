import type { Product } from "../types/api";
import { api } from "./api";

export const productsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products',
            providesTags: ['Products']
        }),
    })
});

export const { useGetProductsQuery } = productsApi