import React, { createContext, useState, useContext, useEffect } from 'react';
import { formatPrice, formatPhoneNumber } from '../utils/formatters';
import { carData } from '../data/carData';
import { customerData } from '../data/customerData';
import { salesData } from '../data/salesData';
import { employeeData } from '../data/employeeData';
import { getToken, setToken, removeToken } from "./localStorageService";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Khởi tạo state cho xe
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  // Lấy danh sách xe từ API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = getToken();
        const response = await fetch(`http://localhost:8080/api/cars?size=${pageSize}&page=${currentPage}`, {
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
        setCars(data.result.content);
        setTotalPages(data.result.totalPages);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    };
  
    fetchCars();
  }, [currentPage]);

  // Lưu cars vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  const addCar = async (formData, imageFile) => {
    try {
      const token = getToken();
      if (!token) throw new Error('Missing authentication token');
      
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
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Làm mới danh sách xe
      const fetchResponse = await fetch(`http://localhost:8080/api/cars?size=${pageSize}&page=${currentPage}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await fetchResponse.json();
      setCars(data.result.content);
      setTotalPages(data.result.totalPages);
    } catch (error) {
      console.error('Lỗi khi thêm xe:', error);
      throw error;
    }
  };

  const updateCar = async (updatedCar, imageFile) => {
    try {
      const token = getToken();
      if (!token) throw new Error('Missing authentication token');
      
      const carData = {
        ...updatedCar,
        price: Number(updatedCar.price) || 0,
        count: Number(updatedCar.count) || 0,
        manufactureYear: Number(updatedCar.manufactureYear) || 0,
        warrantyPeriod: Number(updatedCar.warrantyPeriod) || 0,
      };

      const formData = new FormData();
      formData.append('car', new Blob([JSON.stringify(carData)], { type: 'application/json' }));
      if (imageFile && imageFile instanceof File) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(imageFile.type)) {
          throw new Error('Chỉ hỗ trợ file ảnh JPEG, PNG hoặc GIF');
        }
        formData.append('image', imageFile);
      }

      const response = await fetch(`http://localhost:8080/api/cars/${updatedCar.carId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Làm mới danh sách xe
      const fetchResponse = await fetch(`http://localhost:8080/api/cars?size=${pageSize}&page=${currentPage}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await fetchResponse.json();
      setCars(data.result.content);
      setTotalPages(data.result.totalPages);
    } catch (error) {
      console.error('Lỗi khi cập nhật xe:', error);
      throw error;
    }
  };

  const deleteCar = async (carId) => {
    try {
      const token = getToken();
      if (!token) throw new Error('Missing authentication token');
      
      const response = await fetch(`http://localhost:8080/api/cars/${carId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Làm mới danh sách xe
      const fetchResponse = await fetch(`http://localhost:8080/api/cars?size=${pageSize}&page=${currentPage}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await fetchResponse.json();
      setCars(data.result.content);
      setTotalPages(data.result.totalPages);
    } catch (error) {
      console.error('Lỗi khi xóa xe:', error);
      throw error;
    }
  };

  // Các state và logic khác (không sửa đổi)
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
        setCustomers(data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };
  
    fetchCustomers();
  }, []);

  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const token = getToken();
        const response = await fetch('http://localhost:8080/api/favorite', {
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
        setFavorites(data.result);
        console.log("fetch: ", data.result);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };
  
    fetchFavorite();
  }, []);

  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const fetchAppointments = async () => {
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
        setAppointments(data.result);
        console.log("fetchAPpoint: ", data.result);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };
  
    fetchAppointments();
  }, []);

  const [sales, setSales] = useState(salesData);
  const [employees, setEmployees] = useState(employeeData);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  const addCustomer = async (newCustomer) => {
    try {
      const formattedCustomer = {
        ...newCustomer,
        phone: formatPhoneNumber(newCustomer.phoneNumber),
      };
      const token = getToken();
      const response = await fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(formattedCustomer),
      });
  
      if (!response.ok) {
        throw new Error('Không thể thêm khách hàng');
      }
  
      const createdCustomer = await response.json();
      setCustomers(prevCustomers => [...prevCustomers, createdCustomer]);
      return createdCustomer;
    } catch (error) {
      console.error('Lỗi khi thêm khách hàng:', error);
      throw error;
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

    const updatedCars = cars.map(car => {
      if (car.name === newSale.car) {
        return { ...car, quantity: car.quantity - 1 };
      }
      return car;
    });
    setCars(updatedCars);

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
      setCustomers(prevCustomers => 
        prevCustomers.map(customer =>
          customer.id === updatedCustomer.id 
            ? { ...customer, ...updatedCustomer } 
            : customer
        )
      );
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/customers/${updatedCustomer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(updatedCustomer),
      });
  
      if (!response.ok) {
        throw new Error('Cập nhật không thành công');
      }
  
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
      setCustomers(customers);
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
        },
      );
  
      if (!response.ok) {
        throw new Error('Không thể xóa khách hàng');
      }
  
      setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== customerId));
      console.log('Xóa khách hàng thành công');
    } catch (error) {
      console.error('Lỗi khi xóa khách hàng:', error);
    }
  };

  const deleteSale = (saleId) => {
    setSales(prevSales => prevSales.filter(sale => sale.id !== saleId));
  };

  const deleteEmployee = (employeeId) => {
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));
  };

  const toggleFavorite = async (carId) => {
    try {
      const token = getToken();
      if (!token) throw new Error('No token found');

      const isFavorite = favorites.some((fav) => fav.carId === carId);
      if (isFavorite) {
        const response = await fetch(`http://localhost:8080/api/favorite/${carId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to remove favorite: HTTP error! status: ${response.status}`);
        }
        setFavorites((prev) => prev.filter((fav) => fav.carId !== carId));
      } else {
        const response = await fetch('http://localhost:8080/api/favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ carId: carId }),
        });
        if (!response.ok) {
          throw new Error(`Failed to add favorite: HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFavorites((prev) => {
          const carToAdd = data.car || cars.find((c) => c.carId === carId) || { carId };
          return [...prev, carToAdd];
        });
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const addAppointment = (newAppointment) => {
    setAppointments(prevAppointments => {
      const updatedAppointments = [...prevAppointments, newAppointment];
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      return updatedAppointments;
    });
  };

  const addAppointmentAndCustomer = async (formData, carId) => {
    try {
      const token = getToken();
      const appointmentDate = `${formData.date}T${formData.time}:00`;
      const newAppointment = {
        carId: carId,
        fullName: formData.name || '',
        phone: formData.phone || '',
        mail: formData.email || '',
        appointmentDate: appointmentDate || new Date().toISOString(),
        notes: formData.note || '',
        status: 'Chờ xác nhận',
        createdAt: new Date().toISOString(),
      };
  
      const response = await fetch('http://localhost:8080/api/appointments/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(newAppointment),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to add appointment');
      }
      return result;
    } catch (error) {
      alert(`Bạn đã đặt lịch hẹn với xe này rồi!`);
      console.error('Error:', error);
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const token = getToken();
      if (!token) throw new Error('No token found');
  
      const response = await fetch(`http://localhost:8080/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update appointment status: HTTP error! status: ${response.status}`);
      }
  
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.appointmentId === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (error) {
      console.error('Failed to update appointment status:', error);
    }
  };

  return (
    <DataContext.Provider value={{
      cars, setCars, addCar, updateCar, deleteCar,
      customers, setCustomers, addCustomer, updateCustomer, deleteCustomer,
      sales, setSales, addSale, updateSale, deleteSale,
      employees, setEmployees, addEmployee, updateEmployee, deleteEmployee,
      favorites, toggleFavorite,
      appointments, setAppointments, addAppointment, updateAppointmentStatus,
      addAppointmentAndCustomer,
      currentPage, setCurrentPage, totalPages
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);