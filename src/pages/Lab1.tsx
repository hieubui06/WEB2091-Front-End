import { Button, Modal, Form, Input } from "antd";
import { useState } from "react";

function Lab1() {

    const [open, setOpen] = useState(false);

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <>
            <h2>User</h2>

            <Button type="primary" onClick={() => setOpen(true)}>
                Thêm User
            </Button>

            <Modal
                title="Thêm User"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <Form onFinish={onFinish}>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Role" name="role">
                        <Input />
                    </Form.Item>

                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    );
}

export default Lab1;