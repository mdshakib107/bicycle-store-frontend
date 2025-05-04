/* eslint-disable @typescript-eslint/no-unused-vars */
// import image
import cycle from "../../assets/images/img/bicycle.jpg";

import { Card, Flex, Skeleton } from "antd";
import { useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import CustomButton from "./CustomButton";

export interface ItemData {
  map?(arg0: (d: ItemData) => JSX.Element): import("react").ReactNode;
  name: string;
  Img?: string;
  brand: string;
  price: number;
  type: string;
  description: string;
  quantity: number;
  inStock: boolean;
  _id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ItemsCardProps {
  data: ItemData;
  isPending: boolean;
}

const ItemsCard: React.FC<ItemsCardProps> = ({ data, isPending }) => {
  // loading state
  const [loading, _setLoading] = useState<boolean>(isPending);

  // mavigation
  const navigate = useNavigate();

  // destructure items
  const {
    brand,
    // description,
    inStock,
    name,
    quantity,
    Img,
    type,
    // updatedAt,
    _id,
    price,
    // createdAt,
  } = data;

  // button for card
  const actions: React.ReactNode[] = [
    <>
      <CustomButton
        handleAnything={(e) => {
          e.preventDefault(); //  Prevent <Link> default nav
          e.stopPropagation(); //  Prevents the Link from triggering / event bubbling
          navigate(`/checkout/${_id}`);
        }}
        textName={
          <div className="flex gap-1 justify-content-center items-center">
            <FcMoneyTransfer />
            BuyNow
          </div>
        }
        className="w-[90%] !py-2"
      />
    </>,
  ];

  return (
    <Link to={`/bicycles/${_id}`}>
      <Flex
        gap="middle"
        align="start"
        vertical
        className="hover:shadow-blue-600 shadow-2xl hover:scale-105 rounded-2xl"
      >
        {/* <Switch
          checked={!loading}
          onChange={(checked) => setLoading(!checked)}
        /> */}

        {loading ? (
          <div className="w-full p-6">
            <Skeleton active avatar paragraph={{ rows: 4 }} />
          </div>
        ) : (
          <Card 
          loading={loading} actions={actions} style={{ minWidth: 200 }}
          className="w-full"
          >
            {!Img ? (
              <img alt="Bicycle" src={cycle} className="mb-6 w-full" />
            ) : (
              <img alt="Bicycle" src={Img} className="mb-6 w-full h-52" />
            )}

            <Card.Meta
              className="max-h-68"
              // avatar={
              //   <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              // }
              title={name}
              description={
                <div className="space-y-2">
                  {/* <p className="mb-2 min-h-20 font-semibold">{description}</p> */}
                  <p className="flex justify-between">
                    <span className="font-medium">Brand:</span>
                    <span className="font-serif">{brand}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Type:</span>
                    <span className="font-serif">{type}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Price:</span>
                    <span className="font-serif">{price} ৳</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Quantity:</span>
                    <span className="font-serif">{quantity}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">In Stock:</span>
                    <span className="font-serif">{inStock ? "Yes" : "No"}</span>
                  </p>
                </div>
              }
            />
          </Card>
        )}
      </Flex>
    </Link>
  );
};

export default ItemsCard;
