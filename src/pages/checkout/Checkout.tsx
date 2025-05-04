/* eslint-disable @typescript-eslint/no-explicit-any */
import ResponsiveNavbar from "@/components/home/ResponsiveNavbar";
import CustomButton from "@/components/shared/CustomButton";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../../components/shared/Loading";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const Checkout = () => {
  const axiosCommon = useAxiosCommon();
  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState("");

  // navigation
  const navigate = useNavigate();

  // check data for stock
  const { data, isLoading, isError } = useGetProductByIdQuery(id as string);

  const productData = data?.data;

  useEffect(() => {
    if (productData && productData?.inStock === false) {
      toast.info("Items is not available!");

      navigate("/");
    }
  }, [productData, navigate]);

  useEffect(() => {
    const localUser = localStorage.getItem("userData");
    if (localUser) {
      const user = JSON.parse(localUser);
      setUserId(user?._id);
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const { isPending, data: product } = useQuery({
    queryKey: ["checkoutProduct", id],
    queryFn: async () => {
      try {
        // const response = await axios(`${import.meta.env.VITE_SERVER}/api/products`);
        const response = await axiosCommon.get(`/api/products/${id}`);
        // console.log("response ==>",response);

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // return the featured Bicycles
        return response.data.data;
      } catch (error: any) {
        console.error("Error fetching featured bicycles:", error);

        // toast
        toast.error(error.message);
        throw error;
      }
    },
    enabled: !!id,
  });

  // console.log({id, data});

  const quantity = watch("quantity");

  useEffect(() => {
    if (product && product.price) {
      const total = product.price * quantity;
      setTotalPrice(Number(total.toFixed(2)));
    }
  }, [product, quantity]);

  const onSubmit = async (formData: { quantity: number }) => {
    // Prepare order data
    const orderData = {
      products: [
        {
          product: id,
          quantity: formData.quantity,
          price: product.price,
        },
      ],
      user: userId,
      totalPrice: totalPrice,
      isDeleted: false,
      status: "PENDING",
      paymentStatus: "UNPAID",
    };

    console.log(orderData);

    const response = await axiosCommon.post(
      "/api/orders/create-order",
      orderData
    );
    console.log(response);
    window.location.replace(response.data.data.GatewayPageURL);
    // console.log(response.data.data);
  };

  if (isPending) return <Loading />;
  // console.log(product);

  if (isError) return toast.error("Something went wrong!");

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen container mx-auto space-y-6 sm:space-y-8 lg:space-y-12 sm:px-6 px-4 lg:px-8">
      {/* navbar */}
      <ResponsiveNavbar />

      <div className="w-full min-h-[55vh] rounded-4xl shadow-purple-600 shadow-2xl my-10 p-10">
        {product && (
          <div className="w-full mx-auto">
            {/* <img src= alt="" className="hidden md:flex"/> */}
            <img
              src={
                product.Img
                  ? product.Img
                  : "../../../src/assets/images/img/bicycle.jpg"
              }
              alt={product?.name}
              className="hidden md:flex rounded-4xl"
            />
            <div className="w-full mx-auto p-6 bg-white rounded-4xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">Checkout</h2>

              <div className="mb-6 border-b pb-4">
                <h3 className="text-xl font-semibold">{product?.name}</h3>
                <p className="text-gray-600"> {product?.price} Tk per unit</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="quantity"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max="100"
                    className="w-full p-2 border rounded"
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: {
                        value: 1,
                        message: "Quantity must be at least 1",
                      },
                      valueAsNumber: true,
                    })}
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold">Order Summary</h4>
                  <div className="flex justify-between mt-2">
                    <span>Subtotal ({quantity} items):</span>
                    <span>{totalPrice} Taka</span>
                  </div>
                  <div className="border-t mt-2 pt-2 font-bold flex justify-between">
                    <span>Total:</span>
                    <span>{totalPrice} Taka</span>
                  </div>
                </div>

                <CustomButton
                  textName={isSubmitting ? "Placing Order..." : "Place Order"}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
