-- Tạo database
CREATE DATABASE CarManagement;
USE CarManagement;

-- Bảng User (quản lý tài khoản đăng nhập và phân quyền)
CREATE TABLE User (
    UserID INT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(50) NOT NULL,
    Email VARCHAR(100),
    IsActive BOOLEAN DEFAULT TRUE
);

-- Bảng Customer
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Address NVARCHAR(200),
    PhoneNumber VARCHAR(15),
    Email VARCHAR(100),
    Notes TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Car
CREATE TABLE Car (
    CarID INT AUTO_INCREMENT PRIMARY KEY,
    CarName NVARCHAR(100),
    Brand NVARCHAR(50),
    Model NVARCHAR(50),
    ManufactureYear INT,
    LicensePlate VARCHAR(100),
    Price INT,
    Status NVARCHAR(200),
    Color NVARCHAR(50),
    Specifications TEXT,
    ImageURL VARCHAR(255),
    WarrantyPeriod INT
);

-- Bảng Inventory
CREATE TABLE Inventory (
    InventoryID INT PRIMARY KEY,
    StoreName NVARCHAR(100) NOT NULL,
    CarID INT NOT NULL,
    Quantity INT,
    FOREIGN KEY (CarID) REFERENCES Car(CarID)
);

-- Bảng Invoice
CREATE TABLE Invoice (
    InvoiceID INT PRIMARY KEY,
    CustomerID INT NOT NULL,
    UserID INT NOT NULL,
    CarID INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(18,2) NOT NULL,
    Discount DECIMAL(5,2) DEFAULT 0,
    TotalAmount DECIMAL(18,2) NOT NULL,
    InvoiceDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    PaymentMethod ENUM('Cash', 'Credit Card', 'Bank Transfer') NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (CarID) REFERENCES Car(CarID)
);

-- Bảng Supplier
CREATE TABLE Supplier (
    SupplierID INT auto_increment PRIMARY KEY,
    SupplierName NVARCHAR(100) NOT NULL,
    Address NVARCHAR(200),
    PhoneNumber VARCHAR(15),
    Email VARCHAR(100)
);

-- Bảng PurchaseOrder
CREATE TABLE PurchaseOrder (
    PurchaseOrderID INT AUTO_INCREMENT PRIMARY KEY,
    SupplierID INT NOT NULL,
    UserID INT NOT NULL,
    CarID INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(18,2) NOT NULL,
    TotalAmount DECIMAL(18,2) NOT NULL,
    OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (CarID) REFERENCES Car(CarID)
);

-- Bảng Promotion
CREATE TABLE Promotion (
    PromotionID INT AUTO_INCREMENT PRIMARY KEY,
    PromoCode VARCHAR(50) UNIQUE NOT NULL,
    DiscountPercentage DECIMAL(5,2) NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    ApplicableTo ENUM('Car', 'Invoice') NOT NULL,
    CarID INT NULL,
    FOREIGN KEY (CarID) REFERENCES Car(CarID) ON DELETE CASCADE
);

-- Bảng InvoicePromotion
CREATE TABLE InvoicePromotion (
    InvoiceID INT NOT NULL,
    PromotionID INT NOT NULL,
    PRIMARY KEY (InvoiceID, PromotionID),
    FOREIGN KEY (InvoiceID) REFERENCES Invoice(InvoiceID) ON DELETE CASCADE,
    FOREIGN KEY (PromotionID) REFERENCES Promotion(PromotionID) ON DELETE CASCADE
);

-- Bảng Appointment (thêm UserID để gán nhân viên phụ trách lịch hẹn)
CREATE TABLE Appointment (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT NOT NULL,
    CarID INT NOT NULL,
    UserID INT NOT NULL,
    AppointmentDate DATETIME NOT NULL,
    Status ENUM('Pending', 'Confirmed', 'Cancelled') DEFAULT 'Pending',
    Notes TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (CarID) REFERENCES Car(CarID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Bảng FavoriteCar (mục yêu thích của khách hàng)
CREATE TABLE FavoriteCar (
    CustomerID INT NOT NULL,
    CarID INT NOT NULL,
    AddedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (CustomerID, CarID),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (CarID) REFERENCES Car(CarID)
);
