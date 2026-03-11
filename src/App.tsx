import { Toaster } from "react-hot-toast";
import { Link, Routes, Route } from "react-router-dom";
import { Form, Input, Button, Layout } from "antd";
import Lab1 from "./pages/Lab1";
import Register from "./pages/Register";
import UserList from "./pages/UserList";


const { Header, Content, Footer } = Layout;

function App() {

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>

      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="#" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/">Trang chủ</Link>
            <Link to="/list">Danh sách</Link>
            <Link to="/add">Thêm mới</Link>
            <Link to="/Lab1">Lab1</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="#">Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto mt-10 px-4">

        <Routes>

          <Route
            path="/"
            element={
              <>
                <h1 className="text-4xl font-bold mb-4 text-center">
                  Chào mừng đến với WEB2091
                </h1>

                <Layout style={{ marginTop: 20 }}>
                  <Header style={{ color: "white" }}>Header</Header>

                  <Content style={{ padding: 20 }}>
                    <Form onFinish={onFinish}>

                      <Form.Item label="Username" name="username">
                        <Input placeholder="Nhập Username" />
                      </Form.Item>

                      <Form.Item>
                        <Button htmlType="submit" type="primary">Submit</Button>
                      </Form.Item>

                    </Form>
                  </Content>

                  <Footer>Footer</Footer>
                </Layout>
              </>
            }

          />

          <Route path="/register" element={<Register />} />

          <Route path="/list" element={<UserList />} />

          <Route path="/lab1" element={<Lab1 />} />



        </Routes>

      </div>

      <Toaster />
    </>
  );
}

export default App;