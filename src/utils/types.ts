// types.ts

import { ItemData } from "@/components/shared/ItemsCard";
import { TUserFromToken } from "@/redux/features/auth/authSlice";
import { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TPathItem = {
  name: string;
  path?: string;
  element: ReactNode;
};
export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: {
    name?: string;
    path?: string;
    element: ReactNode;
  }[];
};

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export type TResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

//User type definition
// This type is used to define the structure of a user object in the application. move it as a separate file if needed.
export interface TUser {
  data: {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "customer";
    status: "active" | "inactive" | "banned";
    needsPasswordChange: boolean;
    passwordChangedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    image?: string;
  };
}

export type ShippingStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

// (Ordered Item)
export interface OrderedItem {
  product: {
    name: string;
    Img?: string;
    brand: string;
    price: number;
    type: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric" | "Fat Bikes";
    description: string;
    quantity: number;
    inStock: boolean;
  };
  quantity?:number;
  _id?: string;
  price?: number;
}

// (Main Order Type)
export interface OrderResponse {
  data: {
    data: Order[]; 
    totalOrders: number;
    totalPages: number;
    currentPage: number;
  };
  message: string;
  success: boolean;
  statusCode: number;
}

export interface Order {
  _id: string;
  products: OrderedItem[];
  user: TUserFromToken | null;
  totalPrice: number;
  isDeleted: boolean;
  paymentStatus: 'UNPAID' | 'PAID';
  status: ShippingStatus;
  createdAt: string;
  updatedAt?: string;
}

// interface for get products api response
export interface ApiResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  data: {
    map?(arg0: (d: ItemData) => JSX.Element): import("react").ReactNode;
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    result: ItemData[]; // An array of your `ItemData` objects
  };
}

// interface for get products by id api response
export interface ApiResponseById {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  data: ItemData; // An array of your `ItemData` objects
}

type FilterKey = "search" | "priceRange" | "type" | "brand" | "availability";

export interface AllBicycleFilterProps {
  handleChange: (key: FilterKey, value: string | number[] | boolean) => void;
  brandOptions: string[];
  typeOptions: string[];
}
