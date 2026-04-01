import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Popconfirm, Spin } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type books = {
    id: number,
    title: string,
    quantity: number,
    coverImage: string,
    genre: string

}

const ListPage = () => {
    const { data, isLoading, isError } = useQuery<books[]>({
        queryKey: ["book"],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/books')
            return res.data;
        }
    });

    const ac = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:3000/books/${id}`);
        },

        onSuccess: () => {
            toast.success('xoa thanh cong');
            ac.invalidateQueries({ queryKey: ["book"] });
        },
    });
    const columns = [
        {
            title: "ID",
            dataIndex: "id"
        },
        {
            title: "Tên sách",
            dataIndex: "title"
        },
        {
            title: "Số lượng",
            dataIndex: "quantity"
        },
        {
            title: "Ảnh",
            dataIndex: "coverImage",
            render: (url: string) => (
                <img src={url} alt="" style={{ width: 80, height: 80, objectFit: "cover" }} />
            )
        },
        {
            title: "Thể loại",
            dataIndex: "genre"
        },
        {
            title: "Hành động",
            render: (_: any, record: any) => (
                <>
                    <Popconfirm
                        title="xoa sach"
                        description="xoa sach khong?"
                        okText="co"
                        cancelText="khong"
                        onConfirm={() => mutate(record.id)}
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>

                    <Button type="primary" style={{ marginLeft: 8 }}>
                        <Link to={`/edit/${record.id}`}>Edit</Link>
                    </Button>
                </>
            )
        }
    ]
    if (isLoading) return <Spin />
    if (isError) return <p>Lỗi khi tải dữ liệu</p>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

            <div className="overflow-x-auto">
                <Table columns={columns} dataSource={data || []} rowKey="id"></Table>
            </div>
        </div>
    )

}

export default ListPage;


