// components/client/DealershipInfo.js
import React from 'react';

const DealershipInfo = () => {
  return (
    <>
      <style>
        {`
          .dealership-info {
            font-family: 'Inter', sans-serif;
          }

          .dealership-info .card-container {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .dealership-info .card-container:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
          }

          .dealership-info .title {
            font-size: 2rem;
            font-weight: 700;
            color: #1a202c;
            text-align: center;
            margin-bottom: 2rem;
            position: relative;
          }

          .dealership-info .title::after {
            content: '';
            width: 60px;
            height: 4px;
            background-color: #3182ce;
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 2px;
          }

          .dealership-info h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #2d3748;
            margin-top: 2rem;
            margin-bottom: 1rem;
            border-left: 4px solid #3182ce;
            padding-left: 0.75rem;
          }

          .dealership-info p {
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 1rem;
          }

          .dealership-info ul {
            color: #4a5568;
            line-height: 1.6;
            padding-left: 1.5rem;
            margin-bottom: 1rem;
          }

          .dealership-info ul li {
            margin-bottom: 0.5rem;
            position: relative;
            padding-left: 0.5rem;
          }

          .dealership-info ul li::before {
            content: '•';
            color: #3182ce;
            position: absolute;
            left: -0.5rem;
            font-size: 1.2rem;
          }

          .dealership-info a {
            color: #3182ce;
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .dealership-info a:hover {
            color: #2b6cb0;
            text-decoration: underline;
          }

          @media (max-width: 640px) {
            .dealership-info .card-container {
              padding: 1.5rem;
            }

            .dealership-info .title {
              font-size: 1.75rem;
            }

            .dealership-info h3 {
              font-size: 1.125rem;
            }
          }
        `}
      </style>
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 dealership-info">
        <div className="card-container">
          <h2 className="title">Thông Tin Đại Lý</h2>

          <h3>Thông Tin Liên Hệ</h3>
          <p>
            <strong>Tên Đại Lý:</strong> Auto Luxury<br />
            <strong>Địa Chỉ:</strong> 123 Đường Láng, Đống Đa, Hà Nội<br />
            <strong>Số Điện Thoại:</strong>0912879999<br />
            <strong>Email:</strong> <a href="mailto:autoluxury@gmail.com">autoluxury@gmail.com.com</a><br />
          </p>

          <h3>Giờ Làm Việc</h3>
          <p>
            Thứ Hai - Thứ Sáu: 8:00 - 20:30<br />
            Thứ Bảy: 8:00 - 17:30<br />
            Chủ Nhật: 8:00 - 12:00
          </p>

          <h3>Giới Thiệu</h3>
          <p>
            AutoLuxury là đại lý xe hơi hàng đầu tại Việt Nam, chuyên cung cấp các dòng xe cao cấp từ các thương hiệu nổi tiếng thế giới. Với hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng và dịch vụ hậu mãi tuyệt vời.
          </p>

          <h3>Dịch Vụ</h3>
          <ul className="list-none">
            <li>Bán xe mới và xe đã qua sử dụng</li>
            <li>Bảo dưỡng và sửa chữa</li>
            <li>Tư vấn tài chính và bảo hiểm</li>
            <li>Phụ kiện và nâng cấp xe</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DealershipInfo;