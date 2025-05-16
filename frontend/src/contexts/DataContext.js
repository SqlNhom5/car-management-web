import React, { createContext, useState, useContext, useEffect } from 'react';
import { formatPrice, formatPhoneNumber } from '../utils/formatters';
import { carData } from '../data/carData';
import { customerData } from '../data/customerData';
import { salesData } from '../data/salesData';
import { employeeData } from '../data/employeeData';
import { getToken, setToken, removeToken } from "./localStorageService";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [carsData, setCarsData] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
    currentPage: 0
  });

  const fetchCars = async (page = 0, size = 10) => {  // Set fixed size to 10
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/cars?page=${page}&size=${size}`, {
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
      if (data && data.result) {
        setCarsData({
          content: data.result.content || [],
          totalPages: data.result.totalPages || 0,
          totalElements: data.result.totalElements || 0,
          currentPage: data.result.number || 0
        });
      }
    } catch (error) {
      console.error('Failed to fetch cars:', error);
      setCarsData({
        content: [],
        totalPages: 0,
        totalElements: 0,
        currentPage: 0
      });
    }
  };

  // Initialize customers as empty array
  const [customers, setCustomers] = useState([]);

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
        
        const data = await response.json();
        // Ensure we're setting an array
        setCustomers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
        setCustomers([]); // Reset to empty array on error
      }
    };
  
    fetchCustomers();
  }, []);
  

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const token = getToken();
        if (!token) return;  // Return early if no token

        const response = await fetch('http://localhost:8080/api/favorite', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // Ensure we always set an array
        setFavorites(Array.isArray(data.result) ? data.result : []);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
        setFavorites([]); // Reset to empty array on error
      }
    };

    fetchFavorite();
  }, []); 
   

  // Initialize appointments as empty array
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const fetchAppointments  = async () => {
      try {
        const token = getToken();
        const response = await fetch('http://localhost:8080/api/appointments', {
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
        // Ensure we're setting an array
        setAppointments(data.result && Array.isArray(data.result) ? data.result : []);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setAppointments([]); // Reset to empty array on error
      }
    };
  
    fetchAppointments();
  }, []); 

  const [sales, setSales] = useState(salesData);
  const [employees, setEmployees] = useState(employeeData);

  // Lưu cars vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(carsData.content));
  }, [carsData.content]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  const addCar = async (formData, imageFile) => {
    try {
      const token = getToken();
      if (!token) throw new Error('Vui lòng đăng nhập lại');

      // Format data correctly
      const carData = {
        carName: formData.carName,
        brand: formData.brand,
        model: formData.model,
        price: Number(formData.price),
        count: Number(formData.count),
        numberOfSeats: Number(formData.numberOfSeats),
        gear: formData.gear,
        fuel: formData.fuel,
        note: formData.note
      };

      const formDataToSend = new FormData();
      formDataToSend.append('car', new Blob([JSON.stringify(carData)], { 
        type: 'application/json'
      }));
      formDataToSend.append('image', imageFile);

      const response = await fetch('http://localhost:8080/api/cars', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Lỗi: ${response.status}`);
      }

      if (data.code !== 1000 || !data.result) {
        throw new Error(data.message || 'Thêm xe không thành công');
      }

      // Update local state
      setCarsData(prev => ({
        ...prev,
        content: [...prev.content, data.result],
        totalElements: prev.totalElements + 1
      }));

      return data.result;
    } catch (error) {
      console.error('Add car error:', error);
      throw new Error(`Lỗi khi thêm xe: ${error.message}`);
    }
  };

  const updateCar = async (updatedCar, imageFile) => {
    try {
      const token = getToken();
      if (!token) throw new Error('Unauthorized');

      const carData = {
        ...updatedCar,
        price: Number(updatedCar.price) || 0,
        count: Number(updatedCar.count) || 0,
        manufactureYear: Number(updatedCar.manufactureYear) || 0,
        warrantyPeriod: Number(updatedCar.warrantyPeriod) || 0,
      };

      const formData = new FormData();
      formData.append('car', new Blob([JSON.stringify(carData)], { type: 'application/json' }));
      
      if (imageFile) {
        if (!(imageFile instanceof File)) {
          throw new Error('File ảnh không hợp lệ');
        }
        formData.append('image', imageFile);
      }

      const response = await fetch(`http://localhost:8080/api/cars/${updatedCar.carId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data || data.code !== 1000) {
        throw new Error(data?.message || 'Failed to update car');
      }

      return data.result;
    } catch (error) {
      console.error('Update car error:', error);
      throw error;
    }
  };

  const deleteCar = async (carId) => {
    try {
      const token = getToken();
      if (!token) throw new Error('Unauthorized');

      const response = await fetch(`http://localhost:8080/api/cars/${carId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Delete car error:', error);
      throw error;
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
    const updatedCars = carsData.content.map(car => {
      if (car.name === newSale.car) {
        return { ...car, quantity: car.quantity - 1 };
      }
      return car;
    });
    setCarsData(prev => ({ 
      ...prev, 
      content: updatedCars 
    }));

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
      throw error;
    }
  };

  const toggleFavorite = async (carId) => {
    try {
      const token = getToken();
      if (!token) {
        alert('Vui lòng đăng nhập để thêm vào yêu thích');
        return;
      }

      const isFavorite = Array.isArray(favorites) && favorites.some(fav => fav.carId === carId);

      if (isFavorite) {
        // Remove from favorites
        const response = await fetch(`http://localhost:8080/api/favorite/${carId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setFavorites(prev => prev.filter(fav => fav.carId !== carId));
        }
      } else {
        // Add to favorites
        const response = await fetch('http://localhost:8080/api/favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ carId }),
        });
        if (response.ok) {
          const data = await response.json();
          const carToAdd = carsData.content.find(c => c.carId === carId);
          if (carToAdd) {
            setFavorites(prev => [...prev, { carId, car: carToAdd }]);
          }
        }
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  // Fetch cars
  useEffect(() => {
    fetchCars(0, 6);  // Fetch initial data with 6 items per page
  }, []); // Empty dependency array means this runs once when component mounts

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = getToken();
        if (!token) return;
        
        const response = await fetch('http://localhost:8080/api/customers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setCustomers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
        setCustomers([]);
      }
    };

    fetchCustomers();
  }, []); // Empty dependency array for initial load

  // Fetch favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = getToken();
        if (!token) return;
        
        const response = await fetch('http://localhost:8080/api/favorite', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setFavorites(Array.isArray(data.result) ? data.result : []);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, []); // Empty dependency array for initial load

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = getToken();
        if (!token) return;
        
        const response = await fetch('http://localhost:8080/api/appointments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setAppointments(data.result && Array.isArray(data.result) ? data.result : []);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array for initial load

  // Update context value
  return (
    <DataContext.Provider value={{
      cars: carsData.content,
      totalPages: carsData.totalPages,
      currentPage: carsData.currentPage,
      fetchCars,
      customers, setCustomers, addCustomer, updateCustomer, deleteCustomer,
      favorites, setFavorites, toggleFavorite,
      appointments, setAppointments,
      sales, setSales, addSale, updateSale,
      employees, setEmployees, addEmployee, updateEmployee
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);