import { TUser } from "@/utils/types";
import baseApi from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users (GET)
    getAllUsers: builder.query<
      { success: boolean; message: string; statusCode: number; data: TUser[] },
      void
    >({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    // Fetch a specific user by ID (GET)
    getUserById: builder.query<TUser, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: (_result, _error, userId) => [
        { type: "Users", id: userId },
      ],
    }),

    // Create a new admin user (POST)
    createAdminUser: builder.mutation<TUser, FormData>({
      query: (formData) => ({
        url: "/users/create-admin",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),

    // Update user (PUT)
    updateUser: builder.mutation<
      TUser,
      { userId: string; updateData: Partial<TUser["data"]> }
    >({
      query: ({ userId, updateData }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: "Users", id: userId },
      ],
    }),

    // Delete user (DELETE)
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateAdminUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
