import { Button, Input, Form, Select } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type books = {
    id: number,
    title: string,
    quantity: number,
    coverImage: string,
    genre: string

}

function AddPage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const mutation = useMutation({
        mutationFn: async (value: books) => {
            return await axios.post("http://localhost:3000/books", value);
        },
        onSuccess: () => {
            toast.success('them thanh cong');
            navigate("/list")
        },
        onError: () => {
            toast.error('them that bai')
        },
    });

    const onFinish = (values: books) => {
        mutation.mutate({
            ...values,
        });
    };

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
                    <option value="tieuthuyet">Tiểu thuyết</option>
                    <option value="khoahoc">Khoa Học</option>
                    <option value="lichsu">Lịch sử</option>
                </Select>

            </Form.Item>


            <Button type="primary" htmlType="submit" loading={mutation.isPending}>Thêm</Button>
        </Form >
    )
}

export default AddPage