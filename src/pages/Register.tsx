import { Form, Input, Button } from "antd";

function Register() {

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <>
            <h2>Form Đăng Ký</h2>

            <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập Username!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Vui lòng nhập Password!" }, {
                        min: 6,
                        message: "Password phải có ít nhất 6 ký tự!"
                    }]}
                >
                    <Input.Password />
                </Form.Item>

                <Button htmlType="submit" type="primary">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default Register;