import { useGetCartQuery } from "../services/cartApi";
import CartLine from "../components/CartLine";
import EmptyState from "./EmptyState";

function Cart() {
  const { data: cartData, isLoading, isError } = useGetCartQuery();

  if (isLoading) return <p>Loading cart...</p>;
  if (isError) return <p>Failed to load your cart.</p>;

  if (cartData?.items.length === 0) {
    return (
      <EmptyState titleName='cart'/>
    )
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Shopping Cart</h1>

      {cartData?.items.map((item) => (
        <CartLine key={item.id} item={item} />
      ))}

      <div className="mt-6 text-right text-xl font-bold">
        Total: ${(cartData?.total ?? 0).toFixed(2)}
      </div>
    </div>
  );
}

export default Cart;
