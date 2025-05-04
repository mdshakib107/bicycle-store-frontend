import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  priceRange: [number, number];
  search: string;
  brand: string;
  category: string;
  availability: boolean;
  type: string;
}

const initialState: FilterState = {
  priceRange: [0, 100000],
  search: "",
  brand: "",
  category: "",
  availability: false,
  type: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
