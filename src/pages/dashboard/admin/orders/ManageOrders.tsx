/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/shared/Loading";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/api/orderApi";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Order, ShippingStatus } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  //   const [limit, setLimit] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedOrderId, setSelectedOrderId] = useState<ShippingStatus | string>("");
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery({ page, limit: 5 });
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  // console.log(data);
  const orderStatusOptions = [
    { label: "PENDING", value: "pending" },
    { label: "PROCESSING", value: "processing" },
    { label: "SHIPPED", value: "shipped" },
    { label: "DELIVERED", value: "delivered" },
    { label: "CANCELED", value: "canceled" },
  ];
  useEffect(() => {
    if (data?.data?.data) {
      setOrders(data.data.data);
    }
  }, [data]);

  const handleDeleteOrder = async (orderId: string) => {
    // console.log(orderId);

    try {
      const result = await deleteOrder(orderId);
      // console.log("result",result)
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        refetch();
      }
      //   console.log(result.data);
    } catch (err: any) {
      toast.error("Failed to delete order", err);
    }
  };

  const handleUpdateOrder = async (orderId: string, status: ShippingStatus) => {
    // console.log({ orderId, status });
    if (selectedOrderId && selectedStatus) {
      try {
        const result = await updateOrder({
          orderId: orderId,
          updateData: { status },
        });
        // console.log(result)
        if (result?.data?.success) {
          toast.success(result?.data?.message);
          setOpenStatusDialog(false);
        }
      } catch (err: any) {
        //   console.error(err);
        toast.error("Failed to update order", err);
      }
    }
  };

    // console.log(orders);

  if (isLoading) return <Loading />;
  if (orders?.length < 1) {
    return (
      <div>
        <h2 className="text-center font-bold text-3xl mb-14">
          Till now There is no order to show!!
        </h2>
      </div>
    );
  }
  if (isError) return <p>Failed to load orders.</p>;

  return (
    <div className="lg:w-2/3 p-6 border-2 shadow-md border-purple-600 shadow-purple-600 rounded-2xl overflow-x-auto">
      <h2 className="text-center font-bold text-3xl mb-14">
        All of your Orders
      </h2>

      {/* tables of lists */}
      <Table>
        <TableCaption className="mt-8">
          A list of your recent Orders
        </TableCaption>
        {/* header */}
        <TableHeader className="text-l">
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Update Shipping Status</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        {/* body */}
        <TableBody>
          {orders?.map((order: Order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">{order?.user?.name || "User Not Found"}</TableCell>
              <TableCell className="font-medium">
                {order.products[0].product.name}
              </TableCell>
              <TableCell>{order?.paymentStatus}</TableCell>
              <TableCell className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer" variant="outline">
                      {order?.status}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2">
                    <DropdownMenuGroup>
                      {orderStatusOptions.map((option) => (
                        <DropdownMenuItem
                          key={option?.label}
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedStatus(option?.label);
                            setOpenStatusDialog(true);
                            setSelectedOrderId(order?._id);
                          }}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>{order?.products[0]?.quantity}</TableCell>
              <TableCell>{order?.totalPrice}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-purple-600">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this Order data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        Confirm Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>

        <span className="flex items-center font-medium text-lg">
          Page {page}
        </span>

        <Button
          variant="outline"
          disabled={orders.length < 5} // Disable if less than 5, assuming no more pages
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>

      {/* action buttons */}
      <AlertDialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the status to{" "}
              <span className="font-semibold text-purple-600">
                {selectedStatus}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => handleUpdateOrder(selectedOrderId, selectedStatus as ShippingStatus)}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageOrders;
