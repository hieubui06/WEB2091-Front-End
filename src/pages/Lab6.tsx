import { useQuery, useMutation } from "@tanstack/react-query";
import { Form, Button, Input } from "antd";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Lab6() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id") || "1";

    const { data } = useQuery({
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/stories/${id}`)
            return res.data;
        },
        queryKey: ["story", id],
    })

    const [form] = Form.useForm();
    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data]);

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: any) => {
            await axios.patch(`http://localhost:3000/stories/${id}`, values)
        },
        onSuccess: () => {
            toast.success("Cập nhật thành công!");
            navigate("/Lab5");
        },
        onError: () => {
            toast.error("Cập nhật thất bại!");
        }
    });

    const onFinish = (values: any) => {
        console.log(values);
        mutate(values);
    };

    return (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: 24 }}>
            <h2>Chỉnh sửa truyện (Lab 6)</h2>
            <Form layout="vertical" form={form} onFinish={onFinish} disabled={isPending}>
                <Form.Item 
                    label="Tên truyện" 
                    name="title" 
                    rules={[{ required: true, message: 'Vui lòng nhập tên truyện!' }]}
                >
                    <Input placeholder="Nhập tên truyện" />
                </Form.Item>

                <Form.Item 
                    label="Tác giả" 
                    name="author" 
                    rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}
                >
                    <Input placeholder="Nhập tác giả" />
                </Form.Item>

                <Form.Item 
                    label="Hình ảnh (URL)" 
                    name="image" 
                    rules={[{ required: true, message: 'Vui lòng nhập đường dẫn hình ảnh!' }]}
                >
                    <Input placeholder="Nhập đường dẫn hình ảnh" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isPending}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
