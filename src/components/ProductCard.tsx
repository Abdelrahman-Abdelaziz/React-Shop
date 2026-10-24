import type { Product } from "../types/api";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../services/wishlistApi";
import { useState } from "react";
import AddToCartModal from "./AddToCartModal";

interface ProductCardProps {
  product: Product;
  parentPage: "Products" | "Wishlist";
}

function ProductCard({ product, parentPage }: ProductCardProps) {
  const isOutOfStock = product.quantity === 0;

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const { data: wishlist } = useGetWishlistQuery();
  const isWishlisted =
    wishlist?.some((item) => item.productId === product.id) ?? false;

  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);

  async function handleWishlistButtonClick(
    e: React.MouseEvent<HTMLButtonElement>,
  ) {
    e.preventDefault();

    try {
      if (isWishlisted) await removeFromWishlist(product.id).unwrap();
      else await addToWishlist(product.id).unwrap();
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  }

  async function handleWishlistRemoveButtonClick () {
    try {
      await removeFromWishlist(product.id).unwrap();
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  }

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
      <div className="realtive space-y-1.5">
        <div className="absolute top-4 right-4 z-10">
          {parentPage === "Products" && (
            <Button
              icon={isWishlisted ? <HeartFilled /> : <HeartOutlined />}
              size="small"
              onClick={handleWishlistButtonClick}
            ></Button>
          )}

          {parentPage === 'Wishlist' && (
            <Button
              size="small"
              onClick={handleWishlistRemoveButtonClick}
            >Remove</Button>
          )}
        </div>
        <div className={(parentPage === 'Products') ? 'absolute top-4 right-12 z-10' : 'absolute top-4 right-22 z-10'}>
          <Button
            icon={<ShoppingCartOutlined />}
            size="small"
            onClick={() => {
              setIsCartModalOpen(true);
            }}
          ></Button>
        </div>

        {/* CartModal */}
        <AddToCartModal
          product={product}
          isOpen={isCartModalOpen}
          onClose={() => {
            setIsCartModalOpen(false);
          }}
        />

        {/* Brand & Category */}
        <span className="block text-xs font-semibold tracking-wider text-gray-500 uppercase">
          {product.brand} · {product.category}
        </span>

        {/* Product Name */}
        <h2 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
          {product.name}
        </h2>

        {/* Color Attribute */}
        {product.color && (
          <div className="flex items-center gap-1.5 pt-0.5 text-xs text-gray-500">
            <span className="font-medium">Color:</span>
            <span className="rounded bg-gray-100 px-1.5 py-0.5 font-normal text-gray-700">
              {product.color}
            </span>
          </div>
        )}
      </div>

      {/* Pricing & Stock */}
      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-gray-100 pt-3">
        <span className="text-xl font-extrabold text-gray-900">
          ${product.price.toFixed(2)}
        </span>

        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
            isOutOfStock
              ? "bg-red-50 text-red-700 border-red-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          {isOutOfStock ? "Out of stock" : `${product.quantity} in stock`}
        </span>
      </div>
    </article>
  );
}

export default ProductCard;
