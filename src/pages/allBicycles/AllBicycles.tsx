/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemsCard, { ItemData } from "@/components/shared/ItemsCard";
import Loading from "@/components/shared/Loading";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { setFilter } from "@/redux/features/filterSlice/filterSlice";
import { RootState } from "@/redux/store";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Pagination } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AllBicycleFilter from "./AllBicycleFilter";

const AllBicycles = () => {
  const dispatch = useDispatch(); // Redux dispatch function
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const { data, isLoading, isError } = useGetAllProductsQuery({ page, limit });
  const meta = data?.data?.meta;
  const products = data?.data?.result;

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilter({ [key]: value }));
    setIsFilterApplied(true);
  };

  const filters = useSelector((state: RootState) => state.filter);
  if (isLoading) return <Loading />;
  if (isError) return toast.error("Failed to load products");

  const filteredProducts = isFilterApplied
    ? products?.filter((product: ItemData) => {
        const matchSearch =
          !filters.search ||
          product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.brand.toLowerCase().includes(filters.search.toLowerCase());

        const matchPrice =
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];

        const matchType =
          !filters.type ||
          product.type.toLowerCase() === filters.type.toLowerCase();

        const matchBrand =
          !filters.brand ||
          product.brand.toLowerCase() === filters.brand.toLowerCase();

        const matchAvailability = filters.availability
          ? product.inStock === true
          : true;

        return (
          matchSearch &&
          matchPrice &&
          matchType &&
          matchBrand &&
          matchAvailability
        );
      })
    : products;

  // two arrays for filter
  const brands = Array.from(new Set(products?.map((p) => p.brand) || []));
  const types = Array.from(new Set(products?.map((p) => p.type) || []));

  return (
    <div className="w-full">
      {/* Filter Button on Mobile */}
      <div className="flex justify-end px-4 mt-4 lg:hidden">
        <Button icon={<MenuOutlined />} onClick={() => setFilterOpen(true)}>
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 px-4 mt-6">
        {/* Products */}
        <div className="lg:col-span-4 col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product: ItemData) => (
                <ItemsCard
                  key={product._id}
                  data={product}
                  isPending={isLoading}
                />
              ))
            ) : (
              <div className="col-span-full text-center h-[60vh] text-gray-500 mt-10 flex justify-center items-center">
                <img
                  src="https://img.freepik.com/free-vector/abstract-empty-concrete-room-with-led-illumination_107791-18444.jpg?semt=ais_hybrid&w=740"
                  alt="vast emptiness"
                  className="bg-fit w-full h-full relative"
                />
                <p className="absolute text-5xl text-red-600 shadow-2xl">
                  No bicycles found!
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {meta?.totalPage && meta?.totalPage > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                current={meta.page}
                pageSize={meta.limit}
                total={meta.total}
                onChange={(p) => setPage(p)}
                className="mt-6"
                disabled={(filteredProducts?.length as number) <= 0}
              />
            </div>
          )}
        </div>

        {/* Filter for large screens */}
        <div className="hidden lg:block lg:col-span-1">
          <AllBicycleFilter
            handleChange={handleFilterChange}
            brandOptions={brands}
            typeOptions={types}
          />
        </div>
      </div>

      {/* Drawer Filter for small screens */}
      <Drawer
        title="Filter"
        placement="left"
        onClose={() => setFilterOpen(false)}
        open={filterOpen}
      >
        <AllBicycleFilter
          handleChange={handleFilterChange}
          brandOptions={brands}
          typeOptions={types}
        />
      </Drawer>
    </div>
  );
};

export default AllBicycles;
