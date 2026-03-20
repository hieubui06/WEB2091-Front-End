import { useState } from "react";
import { Button, Image, Input, Space, Table } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function Lab5() {
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState("");

    const { data: stories, isLoading, isError } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/stories');
            return res.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:3000/stories/${id}`);
        },
        onSuccess: () => {
            toast.success("Xoá truyện thành công!");
            queryClient.invalidateQueries({ queryKey: ['stories'] });
        },
        onError: () => {
            toast.error("Xoá truyện thất bại!");
        }
    });

    const columns = [
        {
            title: 'Tên truyện',
            dataIndex: 'title'
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text: string) => text ? new Date(text).toLocaleDateString('en-GB') : 'N/A',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            render: (src: string) => <Image src={src} height={100} />,
        },

        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Button
                    danger
                    type="primary"
                    loading={deleteMutation.isPending && deleteMutation.variables === record.id}
                    onClick={() => {
                        if (window.confirm("Bạn có chắc chắn muốn xoá truyện này không?")) {
                            deleteMutation.mutate(record.id);
                        }
                    }}
                >
                    Xóa
                </Button>
            )
        }
    ];

    if (isError) {
        return <div>Có lỗi xảy ra</div>
    }

    const filteredData = stories?.filter((story: any) =>
        story.title?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <h2>Danh sách truyện (Lab 5)</h2>
            <Space style={{ marginBottom: 16 }}>
                <Input.Search
                    placeholder="Tìm kiếm truyện theo tên..."
                    allowClear
                    enterButton="Search"
                    onSearch={(value) => setSearchText(value)}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 400 }}
                />
            </Space>
            <br />

            <Table
                columns={columns}
                dataSource={filteredData}
                loading={isLoading}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    )
}