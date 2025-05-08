-- Tạo database
CREATE DATABASE CarManagement CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE CarManagement;

-- Bảng Role (quản lý vai trò của người dùng)
CREATE TABLE role (
    name VARCHAR(255) PRIMARY KEY,
    description TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng User (quản lý tài khoản đăng nhập và phân quyền)
CREATE TABLE user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng User_Role (bảng liên kết ManyToMany giữa User và Role)
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, role_name),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (role_name) REFERENCES role(name) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Customer
CREATE TABLE customer (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL UNIQUE,
    address TEXT,
    status VARCHAR(255),
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Car (giữ BIGINT cho carId)
CREATE TABLE car (
    carId BIGINT PRIMARY KEY AUTO_INCREMENT,
    carName VARCHAR(255),
    brand VARCHAR(255),
    model VARCHAR(255),
    manufactureYear INT,
    licensePlate VARCHAR(255),
    price BIGINT,
    count INT,
    status VARCHAR(255),
    color VARCHAR(255),
    specifications TEXT,
    imageUrl VARCHAR(255),
    warrantyPeriod INT,
    number_of_seats int,
    fuel VARCHAR(255),
    gear VARCHAR(255),
    note VARCHAR(2000)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Inventory (carId là BIGINT)
CREATE TABLE inventory (
    inventoryId INT PRIMARY KEY AUTO_INCREMENT,
    storeName VARCHAR(100) NOT NULL,
    carId BIGINT NOT NULL,
    quantity INT,
    FOREIGN KEY (carId) REFERENCES car(carId) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Invoice (carId là BIGINT)
CREATE TABLE invoice (
    invoiceId INT PRIMARY KEY AUTO_INCREMENT,
    customerId BIGINT NOT NULL,
    userId BIGINT NOT NULL,
    carId BIGINT NOT NULL,
    quantity INT NOT NULL,
    unitPrice DECIMAL(18,2) NOT NULL,
    discount DECIMAL(5,2) DEFAULT 0,
    totalAmount DECIMAL(18,2) NOT NULL,
    invoiceDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    paymentMethod ENUM('Cash', 'Credit Card', 'Bank Transfer') NOT NULL,
    FOREIGN KEY (customerId) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (carId) REFERENCES car(carId) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Supplier
CREATE TABLE supplier (
    supplierId INT AUTO_INCREMENT PRIMARY KEY,
    supplierName VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    phoneNumber VARCHAR(15),
    email VARCHAR(100)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng PurchaseOrder (carId là BIGINT)
CREATE TABLE purchaseOrder (
    purchaseOrderId INT AUTO_INCREMENT PRIMARY KEY,
    supplierId INT NOT NULL,
    userId BIGINT NOT NULL,
    carId BIGINT NOT NULL,
    quantity INT NOT NULL,
    unitPrice DECIMAL(18,2) NOT NULL,
    totalAmount DECIMAL(18,2) NOT NULL,
    orderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplierId) REFERENCES supplier(supplierId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (carId) REFERENCES car(carId) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Promotion (carId là BIGINT)
CREATE TABLE promotion (
    promotionId INT AUTO_INCREMENT PRIMARY KEY,
    promoCode VARCHAR(50) UNIQUE NOT NULL,
    discountPercentage DECIMAL(5,2) NOT NULL,
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    applicableTo ENUM('Car', 'Invoice') NOT NULL,
    carId BIGINT NULL,
    FOREIGN KEY (carId) REFERENCES car(carId) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng InvoicePromotion
CREATE TABLE invoicePromotion (
    invoiceId INT NOT NULL,
    promotionId INT NOT NULL,
    PRIMARY KEY (invoiceId, promotionId),
    FOREIGN KEY (invoiceId) REFERENCES invoice(invoiceId) ON DELETE CASCADE,
    FOREIGN KEY (promotionId) REFERENCES promotion(promotionId) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng Appointment (carId là BIGINT)
CREATE TABLE appointment (
    appointmentId INT AUTO_INCREMENT PRIMARY KEY,
    customerId BIGINT NOT NULL,
    carId BIGINT NOT NULL,
    userId BIGINT NOT NULL,
    appointmentDate DATETIME NOT NULL,
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (carId) REFERENCES car(carId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Bảng FavoriteCar (carId là BIGINT)
CREATE TABLE favoritecar (
	id INT AUTO_INCREMENT PRIMARY KEY,
    customerid BIGINT NOT NULL,
    carid BIGINT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (carId) REFERENCES car(carId) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;