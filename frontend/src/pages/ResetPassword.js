import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);
    if (!password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      setIsSubmitting(false);
      return;
    }
    if (password.length < 4) {
      setError('Mật khẩu phải có ít nhất 4 ký tự.');
      setIsSubmitting(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.');
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/forgotPassword/changePassword/${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword }),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Có lỗi xảy ra, vui lòng thử lại.');
      }
      setShowSuccess(true);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đặt lại mật khẩu</h2>
        {showSuccess ? (
          <div style={{ textAlign: 'center' }}>
            <div className="success-message" style={{ marginBottom: '1.5rem' }}>Cập nhật mật khẩu thành công!</div>
            <button className="btn" onClick={() => navigate('/login')}>OK</button>
          </div>
        ) : (
          <>
            {email && <div style={{ marginBottom: '1rem', fontSize: '0.95em' }}>Tài khoản: <b>{email}</b></div>}
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <label>Nhập lại mật khẩu:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button className="btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang xác nhận...' : 'Xác nhận'}
              </button>
            </form>
            <div className="register-link" style={{ marginTop: '1rem' }}>
              <Link to="/login" className="text-blue-600 hover:underline">Quay lại đăng nhập</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
