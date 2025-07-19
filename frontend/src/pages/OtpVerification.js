import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const OtpVerification = () => {
  const location = useLocation();
  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);
    if (otp.length !== 6) {
      setError('Vui lòng nhập mã OTP hợp lệ (6 ký tự).');
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/forgotPassword/verifyOtp/${encodeURIComponent(otp)}/${encodeURIComponent(email)}`, {
        method: 'POST',
      });
      if (!response.ok) {
        const text = await response.text();
        if (text && text.includes('9999')) {
          setError('Sai OTP');
        } else if (text && text.includes('OTP has expired')) {
          setError('Mã OTP đã hết hạn. Vui lòng nhấn "Gửi lại OTP".');
        } else {
          setError(text || 'Có lỗi xảy ra, vui lòng thử lại.');
        }
        setIsSubmitting(false);
        return;
      }
      // Nếu thành công, chuyển sang trang đặt lại mật khẩu
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setResendMessage('');
    setError('');
    try {
      const response = await fetch(`http://localhost:8080/forgotPassword/verifyMail/${encodeURIComponent(email)}`, {
        method: 'POST',
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Không thể gửi lại OTP.');
      }
      setResendMessage('Đã gửi lại mã OTP, vui lòng kiểm tra email.');
    } catch (err) {
      setError(err.message || 'Không thể gửi lại OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Xác thực OTP</h2>
        {email && <div style={{ marginBottom: '1rem', fontSize: '0.95em' }}>Mã OTP đã gửi tới: <b>{email}</b></div>}
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        {resendMessage && <div className="success-message">{resendMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Mã OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              disabled={isSubmitting}
              autoFocus
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang xác nhận...' : 'Xác nhận'}
            </button>
            <button
              type="button"
              className="btn"
              style={{ background: '#f3f4f6', color: '#2563eb', border: '1px solid #2563eb' }}
              onClick={handleResendOtp}
              disabled={resendLoading}
            >
              {resendLoading ? 'Đang gửi lại...' : 'Gửi lại OTP'}
            </button>
          </div>
        </form>
        <div className="register-link" style={{ marginTop: '1rem' }}>
          <Link to="/login" className="text-blue-600 hover:underline">Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
