import useSWR from "swr";

import { fetchProducts } from "../../../misc/api/api"

export default function useProducts() {
    const { data, mutate, error, isLoading } = useSWR('products', fetchProducts)

    return {
        products: data,
        mutate,
        isLoading,
        isError: error
    }
}