import { Button, InputNumber } from "antd";
import type { CartItem } from "../types/api";
import {
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
} from "../services/cartApi";
import { useState } from "react";

interface CartLineProps {
  item: CartItem;
}

function CartLine({ item }: CartLineProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(item.quantity);

  const [updateCartItem, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();

  const [removeFromCart, { isLoading: isRemoving }] =
    useRemoveFromCartMutation();

  async function handleQuantityChange(value: number | null) {
    if (value === null || value < 0 || value === selectedQuantity) {
      return;
    }

    setSelectedQuantity(value);

    if (value === 0) {
        try {
            await removeFromCart(item.productId);
        } catch {
            console.log("Failed to update cart quantity");
        }
    }

    try {
      await updateCartItem({
        productId: item.productId,
        quantity: value,
      }).unwrap();
    } catch {
      console.log("Failed to update cart quantity");
    }
  }

  async function handleRemoveClick() {
    try {
      await removeFromCart(item.productId).unwrap();
    } catch {
      console.log("Failed to remove item from cart");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 py-4">
      <div className="min-w-32 flex-1">
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-sm text-gray-500">
          {item.product.brand} · {item.product.category}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Unit price</p>
        <p>${item.product.price.toFixed(2)}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Quantity</p>
        <InputNumber
          min={0}
          value={selectedQuantity}
          onChange={handleQuantityChange}
          disabled={isRemoving}
        />
      </div>

      <div>
        <p className="text-sm text-gray-500">Subtotal</p>
        <p className="font-semibold">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          danger
          onClick={handleRemoveClick}
          loading={isRemoving}
          disabled={isUpdating}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default CartLine;
