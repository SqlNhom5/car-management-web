import React, { createContext, useState, useContext, useEffect } from "react";
import { getToken, setToken, removeToken } from "./localStorageService";

// Hàm giải mã JWT
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Lỗi khi giải mã JWT:", e);
    return null;
  }
};

// Hàm chuẩn hóa scope thành role
const normalizeRole = (scope) => {
  if (scope === "ROLE_ADMIN") return "admin";
  if (scope === "ROLE_STAFF") return "staff";
  return "user"; // Vai trò mặc định nếu scope không khớp
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái xác thực
  const [user, setUser] = useState(null); // Thông tin người dùng
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải khi kiểm tra token
  const [error, setError] = useState(null); // Thêm trạng thái để lưu lỗi

  // Kiểm tra token hiện có khi component mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      const payload = parseJwt(token);
      if (payload) {
        const role = normalizeRole(payload.scope); // Chuẩn hóa scope thành role
        setIsAuthenticated(true);
        setUser({
          username: payload.sub || "user", // Lấy username từ 'sub'
          role, // Lưu role đã chuẩn hóa
        });
      }
    }
    setIsLoading(false);
  }, []);

  // Hàm đăng nhập
  const login = async (username, password) => {
    console.log("Đang đăng nhập với username:", username, "và password:", password);
    setError(null); // Xóa lỗi cũ
    try {
      const response = await fetch("http://localhost:8080/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("Trạng thái phản hồi:", response.status); // Log trạng thái HTTP
      if (!response.ok) {
        const errorText = await response.text(); // Lấy chi tiết lỗi từ response
        console.error("Lỗi từ server:", errorText);
        setError(`Lỗi: ${response.status} - ${errorText || "Không kết nối được server"}`);
        return null;
      }

      const data = await response.json();
      console.log("Phản hồi từ API:", data); // Log dữ liệu nhận được
      if (data.code !== 1000) {
        setError(`Lỗi: ${data.message || "Mã xác thực không đúng"}`);
        return null;
      }

      const token = data.result?.token;
      if (!token) {
        setError("Lỗi: Không nhận được token từ server");
        return null;
      }

      // Giải mã token để lấy scope
      const payload = parseJwt(token);
      if (!payload || !payload.scope) {
        setError("Lỗi: Token không hợp lệ hoặc không chứa scope");
        return null;
      }

      // Chuẩn hóa scope thành role
      const role = normalizeRole(payload.scope);
      console.log("Vai trò người dùng:", role); // Log vai trò người dùng  
      // Lưu token và cập nhật trạng thái
      setToken(token);
      setIsAuthenticated(true);
      setUser({
        username,
        role, // Lưu role đã chuẩn hóa
      });
      
      return role; // Trả về role (ví dụ: "admin", "staff")
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setError(`Lỗi mạng: ${error.message}`);
      return null;
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
    setError(null); // Xóa lỗi khi đăng xuất
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);