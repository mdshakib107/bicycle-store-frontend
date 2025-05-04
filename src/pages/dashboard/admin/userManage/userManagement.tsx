/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { TUser } from "@/utils/types";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Table, Tag } from "antd";
import { toast } from "sonner";

const UserManagement = () => {
  const { data, isLoading, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  //   console.log("users", data?.data);
  const users = data?.data || [];

  const handleMakeAdmin = async (user: TUser["data"]) => {
    try {
      await updateUser({
        userId: user._id,
        updateData: {
          role: "admin",
        },
      }).unwrap();
      refetch(); // Refetch the users after updating
      toast.success(`${user.name} is now an admin!`);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(`{error?.data?.message || "Failed to make admin"}`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted");
    } catch (err: any) {
      toast.error("Failed to delete user");
      // console.log(err);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => (
        <Avatar
          src={record.image || undefined}
          icon={!record.image && <UserOutlined />}
          shape="circle"
          alt={record.name}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "green" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    // {
    //   title: "Needs Password Change",
    //   dataIndex: "needsPasswordChange",
    //   key: "needsPasswordChange",
    //   render: (needs: boolean) => (needs ? "Yes" : "No"),
    // },
    // {
    //   title: "Password Changed At",
    //   dataIndex: "passwordChangedAt",
    //   key: "passwordChangedAt",
    //   render: (date: string) =>
    //     date ? new Date(date).toLocaleString() : "Never",
    // },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (date: string) => new Date(date).toLocaleString(),
    // },
    // {
    //   title: "Updated At",
    //   dataIndex: "updatedAt",
    //   key: "updatedAt",
    //   render: (date: string) => new Date(date).toLocaleString(),
    // },
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    //   key: "_id",
    // },
    {
      title: "Make Admin",
      key: "makeAdmin",
      render: (_: any, record: any) => (
        <Button
          type="primary"
          size="small"
          disabled={record.role === "admin"}
          onClick={() => {
            handleMakeAdmin(record);
          }}
        >
          {record.role === "admin" ? "Admin" : "Make Admin"}
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Are you sure?"
          onConfirm={() => handleDeleteUser(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-4  border border-purple-600 shadow-purple-600 shadow-lg rounded">
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={users}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default UserManagement;
