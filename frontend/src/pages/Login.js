import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Thêm Link từ react-router-dom
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login, error: authError, isAuthenticated, isLoading, user } = useAuth();

    // Chuyển hướng nếu đã đăng nhập
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            const role = user?.role;
            console.log('Vai trò người dùng:', role);
            if (role === 'admin') {
                navigate('/dashboard');
            } else if (role === 'user') {
                navigate('/');
            }
        }
    }, [isAuthenticated, isLoading, navigate, user]);

    // Hiển thị lỗi từ AuthContext
    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const role = await login(username, password);
            console.log('Đăng nhập với vai trò:', role);
            if (role === 'admin') {
                navigate('/dashboard');
            } else if (role === 'staff') {
                navigate('/staff');
            } else {
                setError('Tên đăng nhập hoặc mật khẩu không đúng');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi đăng nhập');
            console.error('Lỗi đăng nhập:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Đăng nhập</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên đăng nhập:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <button className="btn" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>
                <div className="register-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <div>
                        Chưa có tài khoản?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Đăng ký
                        </Link>
                    </div>
                    <div>
                        <Link to="/forgot-password" className="text-blue-600 hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;