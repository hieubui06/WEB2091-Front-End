import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Button } from "antd";

export default function Navbar() {
    const context = useContext(UserContext);

    if (!context) return null;
    const { user, setUser } = context;

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
                                <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                                <span>{user.name}</span>
                            </div>
                            <Button onClick={() => setUser(null)} type="primary" danger>
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <Button 
                            onClick={() => setUser({ name: "Hieu Bui", avatar: "https://i.pravatar.cc/150?u=hieu" })}
                            type="primary"
                        >
                            Đăng nhập giả lập
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
}