import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../services/productsApi";
import { Select, InputNumber, Button } from "antd";

function Products() {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const availableCategories = [...new Set(products?.map((p) => p.category))];
  const availableBrands = [...new Set(products?.map((p) => p.brand))];

  const filteredProducts = useMemo(() => {
    return (products ?? []).filter((product) => {
      const categoryMatches = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const brandMatches = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const minPriceMatches = minPrice === "" || product.price >= minPrice;
      const maxPriceMatches = maxPrice === "" || product.price <= maxPrice;

      return ( categoryMatches && brandMatches && minPriceMatches && maxPriceMatches );
    });
  }, [products, selectedCategories, selectedBrands, minPrice, maxPrice]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return (
      <div>
        <p>Couldn't load products.</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 gray: bg-gray-100">
      <div className="mb-8 border-b border-gray-100 pb-5 dark:border-gray-800">

        {/* Filters section */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Select
            mode="multiple"
            placeholder="Filter by category"
            className="min-w-60"
            value={selectedCategories}
            onChange={setSelectedCategories}
            options={availableCategories.map((category) => ({
              label: category,
              value: category,
            }))}
          />
          <Select
            mode="multiple"
            placeholder="Filter by brand"
            className="min-w-60"
            value={selectedBrands}
            onChange={setSelectedBrands}
            options={availableBrands.map((brand) => ({
              label: brand,
              value: brand,
            }))}
          />
          <InputNumber
            placeholder="Min price"
            min={0}
            value={minPrice === "" ? null : minPrice}
            onChange={(value) => setMinPrice(value ?? "")}
            className="min-w-60"
          />

          <InputNumber
            placeholder="Max price"
            min={0}
            value={maxPrice === "" ? null : maxPrice}
            onChange={(value) => setMaxPrice(value ?? "")}
            className="min-w-60"
          />
          <Button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedBrands([]);
              setMinPrice('');
              setMaxPrice('');
            }}
          >
            Clear Filters
          </Button>
        </div>

        <p className="mt-2 text-sm text-gray-900 dark:text-gray-800">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {filteredProducts.length}
          </span>{" "}
          products available
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        /* Product Cards */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} parentPage="Products"/>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
