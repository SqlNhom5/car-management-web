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
  const [employees, setEmployees] = useState([]);
  
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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json(); // Parse JSON từ response
        setCars(data.result); // Cập nhật state với dữ liệu từ API
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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json(); // Parse JSON từ response
        setCustomers(data); // Cập nhật state với dữ liệu từ API
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };
  
    fetchCustomers();
  }, []);
  
  // Lay du lieu tu API ve employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = getToken(); // Thay thế bằng cách lấy token thực tế của bạn

        const response = await fetch('http://localhost:8080/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Employee data:", data);

        // Giả sử API trả về trực tiếp mảng users
        // Nếu API trả về dạng { result: [...] } thì dùng data.result
        setEmployees(data.result); 

        // Lưu ý: giá trị employees ở đây chưa được cập nhật ngay
        console.log("Fetched Employees:", employees);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, []); // Chỉ chạy một lần khi component mount
  
  const addCar = async (formData, imageFile) => {
    try {
      const token = getToken();
      const carData = {
        ...formData,
        price: Number(formData.price) || 0,
        count: Number(formData.count) || 0,
        manufactureYear: Number(formData.manufactureYear) || 0,
        warrantyPeriod: Number(formData.warrantyPeriod) || 0,
      };

      if (!imageFile || !(imageFile instanceof File)) {
        throw new Error('Vui lòng chọn một file ảnh hợp lệ');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('car', new Blob([JSON.stringify(carData)], { type: 'application/json' }));
      formDataToSend.append('image', imageFile);

      const response = await fetch('http://localhost:8080/api/cars', {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.code === 1000 && data.result) {
        setCars(prev => [...prev, data.result]); // Cập nhật state cars ngay
        return data.result;
      } else {
        throw new Error(data.message || 'Failed to add car');
      }
    } catch (error) {
      console.error('Lỗi khi thêm xe:', error);
      throw error;
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

  const addEmployee = async (newEmployee) => {
    console.log("Adding employee:", newEmployee); // Log dữ liệu để kiểm tra
    try {
      const token = getToken(); // Lấy token từ localStorage hoặc context
  
      // Format dữ liệu gửi lên API (phải khớp với schema backend)
      const formattedEmployee = {
        ...newEmployee
      };
  
      // Gửi request POST đến API
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Token bắt buộc
        },
        body: JSON.stringify(formattedEmployee)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Nhận dữ liệu employee mới từ API
      const createdEmployee = await response.json();
  
      const employeeWithRoles = {
        ...createdEmployee.result,
        roles: [{ name: "USER" }] // Mặc định nếu không có roles
      };
      console.log("Created employee:", employeeWithRoles); // Log dữ liệu để kiểm tra
  
      setEmployees(prev => [...prev, employeeWithRoles]); // Sử dụng dữ liệu đã được đảm bảo  
  
    } catch (error) {
      console.error("Failed to add employee:", error);
      // Có thể thêm xử lý hiển thị thông báo lỗi
    }
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

  const updateEmployee = async (updatedEmployee) => {
    const employeeToSend = { 
      ...updatedEmployee,
      roles: ["USER"] // Thêm roles mới dạng mảng string
    };
    console.log("Updating employee:", employeeToSend); // Log dữ liệu để kiểm tra
    
    try {
      const token = getToken(); // Lấy token từ localStorage hoặc context
  
      // Gửi request PUT đến API
      const response = await fetch(`http://localhost:8080/api/users/${updatedEmployee.id}`, {
        method: 'PUT', // Hoặc 'PATCH' tùy backend
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employeeToSend)
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      const updatedData = responseData.result; 
  
      // Cập nhật state với dữ liệu mới từ server
      setEmployees(prevEmployees => 
        prevEmployees.map(emp =>
          emp.id === updatedEmployee.id 
            ? { 
                ...emp, 
                ...updatedData,
                roles: [{ name: "USER" }]
              } 
            : emp
        )
      );
  
      console.log("Employee updated successfully:", updatedData);
      return updatedData; // Trả về dữ liệu đã update nếu cần
  
    } catch (error) {
      console.error("Failed to update employee:", error);
      // Hiển thị thông báo lỗi cho người dùng
      alert(`Cập nhật thông tin thất bại: ${error.message}`);
      throw error; // Re-throw nếu cần xử lý tiếp ở nơi gọi hàm
    }
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

  const deleteEmployee = async (employeeId) => {
    // Lưu lại state trước khi thay đổi
    const prevEmployees = employees;
    
    try {
      // Optimistic update
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
      
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/users/${employeeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (!response.ok) throw new Error('Delete failed');
      
      return true;
    } catch (error) {
      // Rollback nếu có lỗi
      setEmployees(prevEmployees);
      alert("Xóa thất bại, đã khôi phục dữ liệu");
      return false;
    }
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
