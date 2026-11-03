import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../services/productsApi";
import { Select, InputNumber, Button } from "antd";

interface ProductFilters {
  selectedCategories: string[];
  selectedBrands: string[];
  minPrice: number | "";
  maxPrice: number | "";
}

function Products() {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();

  const [filters, setFilters] = useState<ProductFilters>({
    selectedCategories: [],
    selectedBrands: [],
    minPrice: "",
    maxPrice: "",
  });

  const availableCategories = [...new Set(products?.map((p) => p.category))];
  const availableBrands = [...new Set(products?.map((p) => p.brand))];

  const filteredProducts = useMemo(() => {
    return (products ?? []).filter((product) => {
      const { selectedCategories, selectedBrands, minPrice, maxPrice } =
        filters;

      const categoryMatches =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const brandMatches =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const minPriceMatches = minPrice === "" || product.price >= minPrice;
      const maxPriceMatches = maxPrice === "" || product.price <= maxPrice;

      return (
        categoryMatches && brandMatches && minPriceMatches && maxPriceMatches
      );
    });
  }, [products, filters]);

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
            value={filters.selectedCategories}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, selectedCategories: value }))
            }
            options={availableCategories.map((category) => ({
              label: category,
              value: category,
            }))}
          />
          <Select
            mode="multiple"
            placeholder="Filter by brand"
            className="min-w-60"
            value={filters.selectedBrands}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, selectedBrands: value }))
            }
            options={availableBrands.map((brand) => ({
              label: brand,
              value: brand,
            }))}
          />
          <InputNumber
            placeholder="Min price"
            min={0}
            value={filters.minPrice === "" ? null : filters.minPrice}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, minPrice: value ?? "" }))
            }
            className="min-w-60"
          />

          <InputNumber
            placeholder="Max price"
            min={0}
            value={filters.maxPrice === "" ? null : filters.maxPrice}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, maxPrice: value ?? "" }))
            }
            className="min-w-60"
          />
          <Button
            onClick={() => {
              setFilters({
                selectedCategories: [],
                selectedBrands: [],
                minPrice: "",
                maxPrice: "",
              });
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
            <ProductCard
              key={product.id}
              product={product}
              parentPage="Products"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
