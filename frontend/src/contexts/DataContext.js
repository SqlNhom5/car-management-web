import React, { createContext, useState, useContext, useEffect } from 'react';
import { formatPrice, formatPhoneNumber } from '../utils/formatters';
import { carData } from '../data/carData';
import { customerData } from '../data/customerData';
import { salesData } from '../data/salesData';
import { employeeData } from '../data/employeeData';
import { getToken, setToken, removeToken } from "./localStorageService";



const DataContext = createContext();


export const DataProvider = ({ children }) => {

  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState(salesData);
  const [employees, setEmployees] = useState(employeeData);
  
  // lay du lieu tu API ve cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = getToken();
        const response = await fetch('http://localhost:8080/api/cars', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
          },
        });
        console.log("Response status:", response.status); // Log status code để kiểm tra
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json(); // Parse JSON từ response
        console.log("Car data:", data); // Log dữ liệu để kiểm tra
        setCars(data.result); // Cập nhật state với dữ liệu từ API
        console.log("Fetched Cars:", cars); // Log dữ liệu để kiểm tra
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };
  
    fetchCars();
  }, []); 
  
  // lay du lieu tu API ve customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = getToken();
        const response = await fetch('http://localhost:8080/api/customers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
          },
        });
        console.log("Response status:", response.status); // Log status code để kiểm tra
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json(); // Parse JSON từ response
        console.log("Customer data:", data); // Log dữ liệu để kiểm tra
        setCustomers(data); // Cập nhật state với dữ liệu từ API
        console.log("Fetched customers:", data); // Log dữ liệu để kiểm tra
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };
  
    fetchCustomers();
  }, []);
  

  const addCar = async (newCar) => {
    try {
      const token = getToken();
      
      // Format dữ liệu trước khi gửi
      const carData = {
        ...newCar,
        price: Number(newCar.price),
        count: Number(newCar.count)
        // Các trường number khác cần convert
      };
  
      const response = await fetch('http://localhost:8080/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(carData) // Sử dụng spread object
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.code === 1000 && data.result) {
        setCars(prevCars => [...prevCars, data.result]);
        return data.result; // Trả về kết quả nếu cần
      } else {
        throw new Error(data.message || 'Failed to add car');
      }
    } catch (error) {
      console.error('Failed to add car:', error);
      throw error; // Ném lỗi để component có thể xử lý
    }
  };

  const updateCar = async (updatedCar) => {
    try {
      const token = getToken();
      
      // Chuẩn bị dữ liệu gửi lên API
      const carData = {
        ...updatedCar,
        price: Number(updatedCar.price),
        count: Number(updatedCar.count)
        // Thêm các trường cần convert sang number khác nếu cần
      };
      console.log("Car data to update:", carData); // Log dữ liệu để kiểm tra
      // Gọi API để cập nhật xe
      const response = await fetch(`http://localhost:8080/api/cars/${carData.carId}`, {
        method: 'PUT', // Hoặc 'PATCH' tùy API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(carData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update car');
      }
  
      const data = await response.json();
      
      // Kiểm tra response và cập nhật state
      if (data.code === 1000 && data.result) {
        setCars(prevCars => 
          prevCars.map(car =>
            car.carId === updatedCar.carId
              ? { ...car, ...data.result }
              : car
          )
        );
        return data.result;
      } else {
        throw new Error(data.message || 'Invalid API response');
      }
    } catch (error) {
      console.error('Update car error:', error);
      throw error; // Ném lỗi để component có thể xử lý
    }
  };

  const deleteCar = async (carId) => {
    try {
      const token = getToken();
      if (!token) throw new Error('Missing authentication token');
      // 1. Gọi API DELETE
      const response = await fetch(`http://localhost:8080/api/cars/${carId}`, {
        
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      // 2. Kiểm tra response
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `HTTP ${response.status}`;
        throw new Error(`Delete failed: ${errorMessage}`);
      }
  
      
      // 4. Kiểm tra cấu trúc response (tùy API của bạn)
      if (response.status === 200) {
        // 5. Cập nhật state nếu API thành công
        setCars(prevCars => prevCars.filter(car => car.carId !== carId));
        return true; // Trả về true nếu xóa thành công
      } else {
        throw new Error('Unknown API error');
      }
  
    } catch (error) {
      console.error('Delete car error:', {
        carId,
        error: error.message,
        time: new Date().toISOString()
      });
      
      // 6. Có thể thêm xử lý UI thông báo lỗi ở đây
      throw error; // Ném lỗi để component có thể bắt và hiển thị
    }
  };

  const addCustomer = async (newCustomer) => {
    try {
      // Format dữ liệu trước khi gửi lên server
      const formattedCustomer = {
        ...newCustomer,
        phone: formatPhoneNumber(newCustomer.phoneNumber),
        // Không cần tự tạo ID ở client nữa, server sẽ tự tạo
        // purchased và appointments có thể được server khởi tạo
      };
      const token = getToken();
      const response = await fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getToken() ? `Bearer ${getToken()}` : '',
        },
        body: JSON.stringify(formattedCustomer),
      });
  
      if (!response.ok) {
        throw new Error('Không thể thêm khách hàng');
      }
  
      const createdCustomer = await response.json(); // Giả sử server trả về khách hàng đã tạo
      
      // Cập nhật state với khách hàng từ server (bao gồm ID chính xác)
      setCustomers(prevCustomers => [...prevCustomers, createdCustomer]);
      
      // Có thể thêm thông báo thành công hoặc cập nhật UI khác ở đây
      console.log('Thêm khách hàng thành công');
      return createdCustomer; // Trả về khách hàng đã tạo nếu cần
    } catch (error) {
      console.error('Lỗi khi thêm khách hàng:', error);
      // Xử lý lỗi (hiển thị thông báo cho người dùng, v.v.)
      throw error; // Ném lỗi để component gọi có thể xử lý
    }
  };

  const addSale = (newSale) => {
    const formattedSale = {
      ...newSale,
      id: `DH-${String(sales.length + 1).padStart(3, '0')}`,
      date: new Date().toLocaleDateString('vi-VN'),
      value: formatPrice(Number(newSale.value))
    };
    setSales(prevSales => [...prevSales, formattedSale]);

    // Cập nhật số lượng xe
    const updatedCars = cars.map(car => {
      if (car.name === newSale.car) {
        return { ...car, quantity: car.quantity - 1 };
      }
      return car;
    });
    setCars(updatedCars);

    // Cập nhật số lượng mua của khách hàng
    const updatedCustomers = customers.map(customer => {
      if (customer.name === newSale.customer) {
        return { ...customer, purchased: customer.purchased + 1 };
      }
      return customer; 
    });
    setCustomers(updatedCustomers);
  };

  const addEmployee = (newEmployee) => {
    const formattedEmployee = {
      id: Date.now(),
      ...newEmployee,
      status: 'Đang Hoạt Động',
      joinDate: new Date().toLocaleDateString('vi-VN')
    };
    setEmployees(prevEmployees => [...prevEmployees, formattedEmployee]);
  };

  const updateCustomer = async (updatedCustomer) => {
    try {
      // 1. Optimistic update - cập nhật UI trước
      setCustomers(prevCustomers => 
        prevCustomers.map(customer =>
          customer.id === updatedCustomer.id 
            ? { ...customer, ...updatedCustomer } 
            : customer
        )
      );
      const token = getToken();
      // 2. Gọi API để cập nhật trên server
      const response = await fetch(`http://localhost:8080/api/customers/${updatedCustomer.id}`, {
        method: 'PUT', // hoặc 'PATCH' tùy API của bạn
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getToken() ? `Bearer ${getToken()}` : '',
        },
        body: JSON.stringify(updatedCustomer),
      });
  
      if (!response.ok) {
        throw new Error('Cập nhật không thành công');
      }
  
      // 3. (Tùy chọn) Cập nhật lại với dữ liệu chính xác từ server
      const serverUpdatedCustomer = await response.json();
      setCustomers(prevCustomers => 
        prevCustomers.map(customer =>
          customer.id === serverUpdatedCustomer.id 
            ? serverUpdatedCustomer 
            : customer
        )
      );
  
    } catch (error) {
      console.error('Lỗi khi cập nhật khách hàng:', error);
      
      // Rollback state nếu có lỗi
      setCustomers(customers);
      
      // Có thể thêm thông báo lỗi cho người dùng
    }
  };

  const updateSale = (updatedSale) => {
    setSales(sales.map(sale =>
      sale.id === updatedSale.id ? { ...sale, ...updatedSale } : sale
    ));
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(prevEmployees => prevEmployees.map(emp =>
      emp.id === updatedEmployee.id ? { ...emp, ...updatedEmployee } : emp
    ));
  };

  const deleteCustomer = async (customerId) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/customers/${customerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!response.ok) {
        throw new Error('Không thể xóa khách hàng');
      }
  
      // Nếu xóa thành công trên server, cập nhật state ở client
      setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== customerId));
      
      // Có thể thêm thông báo thành công hoặc cập nhật UI khác ở đây
      console.log('Xóa khách hàng thành công');
    } catch (error) {
      console.error('Lỗi khi xóa khách hàng:', error);
      // Xử lý lỗi (hiển thị thông báo cho người dùng, v.v.)
    }
  };

  const deleteSale = (saleId) => {
    setSales(prevSales => prevSales.filter(sale => sale.id !== saleId));
  };

  const deleteEmployee = (employeeId) => {
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));
  };

  return (
    <DataContext.Provider value={{
      cars, setCars, addCar, updateCar, deleteCar,
      customers, setCustomers, addCustomer, updateCustomer, deleteCustomer,
      sales, setSales, addSale, updateSale, deleteSale,
      employees, setEmployees, addEmployee, updateEmployee, deleteEmployee
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
