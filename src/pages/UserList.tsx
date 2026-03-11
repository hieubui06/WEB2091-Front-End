import { Table } from "antd";

const UserList = () => {
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Major",
            dataIndex: "major",
            key: "major",
        },
    ];

    const dataSource = [
        {
            key: 1,
            id: 1,
            name: "Nguyen Van A",
            age: 20,
            major: "Information Technology",
        },
        {
            key: 2,
            id: 2,
            name: "Tran Thi B",
            age: 21,
            major: "Business",
        },
        {
            key: 3,
            id: 3,
            name: "Le Van C",
            age: 19,
            major: "Design",
        },
        {
            key: 4,
            id: 4,
            name: "Le Van D",
            age: 15,
            major: "Design",
        },
        {
            key: 5,
            id: 5,
            name: "Le Van C",
            age: 17,
            major: "Design",
        },
    ];

    return (
        <div>
            <h2 style={{ marginBottom: 20 }}>User List</h2>
            <Table columns={columns} dataSource={dataSource} />
        </div>
    );
};

export default UserList;