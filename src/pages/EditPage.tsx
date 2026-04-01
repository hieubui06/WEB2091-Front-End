import { Button, Form, Input, message, Spin, Select } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function EditPage() {
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["books", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/books/${id}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        };
    }, [data]);

    const mutation = useMutation({
        mutationFn: async (values: any) => {
            return axios.put(`http://localhost:3000/books/${id}`, values)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] })
            message.success('sua thanh cong');
            navigate("/list")
        },
    });

    const onFinish = (values: any) => {
        mutation.mutate(values);

        if (isLoading) return <Spin />;
    }

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="title" label="Tên sách"
                rules={[{ required: true, message: "Nhập tên sách" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="quantity" label="Số lượng"
                rules={[{ required: true, message: "Nhập tên sách" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="coverImage" label="Ảnh"
                rules={[{ required: true, message: "Nhập tên sách" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="genre" name="genre">
                <Select>
                    <Select.Option value="tieuthuyet">Tiểu thuyết</Select.Option>
                    <Select.Option value="khoahoc">Khoa Học</Select.Option>
                    <Select.Option value="lichsu">Lịch sử</Select.Option>
                </Select>

            </Form.Item>


            <Button type="primary" htmlType="submit" loading={mutation.isPending}>Sửa</Button>
        </Form >
    )
}
