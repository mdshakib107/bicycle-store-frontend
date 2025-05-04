import { RootState } from "@/redux/store";
import { AllBicycleFilterProps } from "@/utils/types";
import { Checkbox, Input, Select, Slider } from "antd";
import { useSelector } from "react-redux";

const { Option } = Select;

const AllBicycleFilter = ({
  handleChange,
  brandOptions,
  typeOptions,
}: AllBicycleFilterProps) => {
  const filters = useSelector((state: RootState) => state.filter);
  // console.log(brandOptions, typeOptions);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Search Input */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Search</label>
        <Input
          placeholder="Search by name, model, or brand"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Price Range</label>
        <Slider
          range
          min={0}
          max={500000}
          step={100}
          value={filters.priceRange}
          onChange={(value) => handleChange("priceRange", value)}
        />
        <div className="text-sm text-gray-500">
          ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </div>
      </div>

      {/* Type */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Type</label>
        <Select
          placeholder="Select Type"
          className="w-full"
          value={filters.type}
          onChange={(value) => handleChange("type", value)}
          allowClear
        >
          <Option value="">All</Option>
          {typeOptions?.map((type) => (
            <Option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Option>
          ))}
        </Select>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Brand</label>
        <Select
          placeholder="Select Brand"
          className="w-full"
          value={filters.brand}
          onChange={(value) => handleChange("brand", value)}
          allowClear
        >
          <Option value="">All</Option>
          {brandOptions?.map((brand) => (
            <Option key={brand} value={brand}>
              {brand}
            </Option>
          ))}
        </Select>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <Checkbox
          checked={filters.availability}
          onChange={(e) => handleChange("availability", e.target.checked)}
        >
          Only Available Products
        </Checkbox>
      </div>
    </div>
  );
};

export default AllBicycleFilter;
