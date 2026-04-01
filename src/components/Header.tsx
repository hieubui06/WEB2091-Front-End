import { Link } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import { useContext } from "react";
import { Button } from "antd";
import { useAuthStore } from "../stores/useAuthStore";

export default function Navbar() {
    // const context = useContext(UserContext);

    // if (!context) return null;
    // const { user, setUser } = context;


    const { user, setUser } = useAuthStore();



    return (
        <nav className="bg-blue-600 text-white shadow">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="#" className="text-xl font-semibold">
                    <strong>WEB2091 App</strong>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link to="#" className="hover:text-gray-200">
                        Trang chủ
                    </Link>
                    <Link to="/list" className="hover:text-gray-200">
                        Danh sách
                    </Link>
                    <Link to="/add" className="hover:text-gray-200">
                        Thêm mới
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    {user ? (
                        <>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">Đã đăng nhập:</span>
                                <span className="text-yellow-300 font-semibold">{user.email}</span>
                            </div>
                            <Button onClick={() => setUser(null)} type="primary" danger>
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-200">Chưa đăng nhập</span>
                            <div className="flex items-center space-x-2">
                                <Link to="/login">
                                    <Button type="primary">Đăng nhập</Button>
                                </Link>
                                <Link to="/register">
                                    <Button>Đăng ký</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}