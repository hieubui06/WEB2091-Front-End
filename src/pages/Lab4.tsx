import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";


interface Story {
    id?: number;
    title: string;
    author: string;
    image: string;
    description?: string;
    categoryId?: number;
    createdAt?: string;
}


interface CategoryFormValues {
    title: string;
    description?: string;
    active?: boolean;
}


function CategoryForm() {
    const mutation = useMutation({
        mutationFn: async (values: CategoryFormValues) => {
            const res = await axios.post("http://localhost:3000/categories", values);
            return res.data;
        },
        onError: () => {
            toast.error("Thêm danh mục thất bại!");
        },
        onSuccess: () => {
            toast.success("Thêm danh mục thành công!");
        },
    });

    const onFinish = (values: CategoryFormValues) => {
        mutation.mutate(values);
    };

    return (
        <div>
            <h2>Thêm danh mục truyện</h2>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
                >
                    <Input placeholder="Nhập tiêu đề danh mục" />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <Input.TextArea rows={2} placeholder="Nhập mô tả" />
                </Form.Item>

                <Form.Item name="active" valuePropName="checked">
                    <Checkbox>Active</Checkbox>
                </Form.Item>

                <Form.Item>

                    <Button type="primary" htmlType="submit" loading={mutation.isPending}>
                        Submit
                    </Button>
                </Form.Item>


                {mutation.isPending && (
                    <p style={{ color: "#1677ff" }}>⏳ Đang gửi dữ liệu...</p>
                )}
            </Form>
        </div>
    );
}


function StoryForm() {
    const queryClient = useQueryClient();
    const { data: categories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/categories");
            return res.data;
        }
    });
    const { mutate, isSuccess, isPending } = useMutation({

        mutationFn: async (values: Story) => {

            const dataToSubmit = { ...values, createdAt: values.createdAt || new Date().toISOString() };
            const res = await axios.post("http://localhost:3000/stories", dataToSubmit);
            return res.data;
        },
        onError: () => {
            toast.error("Lỗi api");
        },
        onSuccess: () => {
            toast.success("Thêm truyện thành công!");
            queryClient.invalidateQueries({ queryKey: ['stories'] });
        },
    });


    const onFinish = (values: Story) => {
        console.log("Success:", values);
        mutate(values);
    };

    return (
        <div>
            <h2>Thêm truyện</h2>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Created At" name="createdAt">
                    <Input type="date" />
                </Form.Item>
                <Form.Item label="Author" name="author">
                    <Input />
                </Form.Item>
                <Form.Item label="Image" name="image">
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="Danh mục (Thể loại)" 
                    name="categoryId" 
                    rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
                >
                    <Select 
                        loading={isLoadingCategories}
                        placeholder="Chọn danh mục"
                        options={categories?.map((cat: any) => ({
                            label: cat.title,
                            value: cat.id
                        })) || []}
                    />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input.TextArea />
                </Form.Item>
                


                <Button htmlType="submit" loading={isPending} type="primary">
                    Submit
                </Button>


                {isPending && (
                    <p style={{ color: "#1677ff", marginTop: 8 }}>⏳ Đang gửi dữ liệu...</p>
                )}

                {isSuccess && <p>Story submitted successfully!</p>}
            </Form>
        </div>
    );
}


export default function Lab4() {
    return (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: 24 }}>
            <CategoryForm />
            <hr style={{ margin: "32px 0" }} />
            <StoryForm />
        </div>
    );
}