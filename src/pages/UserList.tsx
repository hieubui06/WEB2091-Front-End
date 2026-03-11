import { Table, Tag, Button, Space, Avatar } from "antd";

const UserList = () => {
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (avatar: string) => <Avatar src={avatar} />,
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
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "active" ? "green" : "red"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <Space>
                    <Button type="primary">Edit</Button>
                    <Button danger>Delete</Button>
                </Space>
            ),
        },
    ];

    const dataSource = [
        {
            key: 1,
            id: 1,
            avatar: "https://i.pravatar.cc/40?img=1",
            name: "Nguyen Van A",
            email: "a@gmail.com",
            status: "active",
        },
        {
            key: 2,
            id: 2,
            avatar: "https://i.pravatar.cc/40?img=2",
            name: "Tran Thi B",
            email: "b@gmail.com",
            status: "inactive",
        },
        {
            key: 3,
            id: 3,
            avatar: "https://i.pravatar.cc/40?img=3",
            name: "Le Van C",
            email: "c@gmail.com",
            status: "active",
        },
    ];

    return (
        <div>
            <h2 style={{ marginBottom: 20 }}>User Management</h2>
            <Table columns={columns} dataSource={dataSource} />
        </div>
    );
};

export default UserList;