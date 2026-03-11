import { Form, Input, Button } from "antd";

function Register() {

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <>
            <h2>Form Đăng Ký</h2>

            <Form onFinish={onFinish} style={{ maxWidth: 400 }}>
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password">
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