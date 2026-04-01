import { Form, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: any) => {
            return await axios.post("http://localhost:3000/register", values);
        },

        onSuccess: () => {
            message.success("Đăng ký thành công!");
            navigate("/login");
        },

        onError: () => {
            message.error("Đăng ký thất bại!");
        },
    });

    const onFinish = (values: any) => {
        mutate(values);
    };

    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: "50px auto" }}
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký thành viên</h2>
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Nhập username!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Nhập email!" }, { type: "email", message: "Email không hợp lệ!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Nhập password!" }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isPending} block>
                    Đăng ký
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Register;
