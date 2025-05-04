import Loading from "@/components/shared/Loading";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
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
import { Order } from "@/utils/types";

const ViewOrders = () => {
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const localUser = localStorage.getItem("userData");
    if (localUser) {
      const user = JSON.parse(localUser);
      setUserId(user?._id);
    }
  }, []);

  const { data, isLoading, isError } = useGetAllOrdersQuery(
    { id: userId },
    { skip: !userId }
  );
  // console.log(data);
  useEffect(() => {
    if (data?.data) {
      setOrders(data.data.data);
    }
  }, [data]);

  // console.log(orders);



  if (isLoading) return <Loading />;
  if (orders.length<1) {
    return <div>
            <h2 className="text-center font-bold text-3xl mb-14">
        Till now you dont have any order
      </h2>
    </div>
  }
  if (isError) return <p>Failed to load orders.</p>;

  return (
    <div className="lg:w-2/3 p-6 border-2 shadow-md border-purple-600 shadow-purple-600 rounded-2xl ">
      <h2 className="text-center font-bold text-3xl mb-14">
        All of your Orders
      </h2>

      <Table>
        <TableCaption className="mt-8">
          A list of your recent Orders
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order?._id}>
              <TableCell className="font-medium">
                {order.products[0].product.name}
              </TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell className="text-right">{order.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewOrders;
