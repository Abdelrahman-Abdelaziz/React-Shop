import { useGetWishlistQuery } from "../services/wishlistApi";
import ProductCard from "../components/ProductCard";
import EmptyState from "./EmptyState";

function Wishlist() {
  const { data: items, isLoading } = useGetWishlistQuery();

  if (isLoading) return <div>Loading...</div>;

  if (items?.length === 0) {
    return (
      <EmptyState titleName='wishlist' />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {items?.map((item) => (
        <ProductCard key={item.productId} product={item.product} parentPage="Wishlist" />
      ))}
    </div>
  );
}

export default Wishlist;
