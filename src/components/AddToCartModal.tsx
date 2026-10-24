import { Modal, InputNumber, Button } from "antd";
import type { Product } from "../types/api";
import { useState } from "react";
import { useAddToCartMutation, useGetCartQuery } from "../services/cartApi";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "../services/wishlistApi";

interface ModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

function AddToCartModal({ product, isOpen, onClose }: ModalProps) {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const { data } = useGetCartQuery();
  const quantityInCart =
    data?.items.find((item) => item.productId === product.id)?.quantity ?? 0;

  const [addToCard, { isLoading: isAdding }] = useAddToCartMutation();

  const { data: wishlistItems } = useGetWishlistQuery();

  const isInWishlist = wishlistItems?.find((item)=>(item.productId === product.id));
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  async function handleAddToCartButton() {
    try {
      await addToCard({
        productId: product.id,
        quantity: selectedQuantity,
      }).unwrap();

      setSelectedQuantity(1);
      onClose();
      if (isInWishlist) await removeFromWishlist(product.id);

    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  }

  return (
    <Modal
      title={
        <span className="text-xl font-semibold text-slate-800">
          {product.name}
        </span>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="max-w-md"
    >
      <div className="py-4 space-y-4 text-slate-600">
        {/* Product Info Section */}
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <span className="text-sm font-medium text-slate-500">Unit Price</span>
          <span className="text-lg font-bold text-slate-900">
            ${product.price}
          </span>
        </div>

        <div className="flex justify-between items-center pb-4">
          <span className="text-sm font-medium text-slate-500">
            Available Stock
          </span>
          <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            {product.quantity - quantityInCart <= 0
              ? "Out of Stock"
              : `${product.quantity - quantityInCart} units left`}
          </span>
        </div>

        {/* Quantity Selector Section */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Select Quantity
          </label>
          <InputNumber
            min={1}
            max={product.quantity - quantityInCart}
            value={selectedQuantity}
            onChange={(value) => {
              setSelectedQuantity(value ?? 1);
            }}
            className="w-full h-10 flex items-center border-slate-200 rounded-lg text-slate-800 text-base focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
          />
        </div>

        <Button
          block
          type="primary"
          loading={isAdding}
          disabled={product.quantity - quantityInCart <= 0}
          onClick={handleAddToCartButton}
          className="w-full h-11 mt-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium rounded-lg border-none shadow-sm shadow-indigo-100 transition-colors duration-200"
        >
          Add to Cart
        </Button>
      </div>
    </Modal>
  );
}

export default AddToCartModal;