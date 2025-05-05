import React, { createContext, useState, useContext, useEffect } from 'react';
import { formatPrice, formatPhoneNumber } from '../utils/formatters';
import { carData } from '../data/carData';
import { customerData } from '../data/customerData';
import { salesData } from '../data/salesData';
import { employeeData } from '../data/employeeData';
import { getToken, setToken, removeToken } from "./localStorageService";



const DataContext = createContext();


export const DataProvider = ({ children }) => {

  const [cars, setCars] = useState(carData);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState(salesData);
  const [employees, setEmployees] = useState(employeeData);

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
  

  const addCar = (newCar) => {
    const formattedCar = {
      id: Date.now(),
      ...newCar,
      price: Number(newCar.price),
      quantity: Number(newCar.quantity)
    };
    setCars(prevCars => [...prevCars, formattedCar]);
  };

  const updateCar = (updatedCar) => {
    setCars(prevCars => prevCars.map(car =>
      car.id === updatedCar.id
        ? {
          ...car,
          ...updatedCar,
          price: Number(updatedCar.price),
          quantity: Number(updatedCar.quantity)
        }
        : car
    ));
  };

  const deleteCar = (carId) => {
    setCars(prevCars => prevCars.filter(car => car.id !== carId));
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
