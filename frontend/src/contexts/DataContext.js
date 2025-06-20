import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { formatPrice, formatPhoneNumber } from '../utils/formatters';
import { carData } from '../data/carData';
import { customerData } from '../data/customerData';
import { salesData } from '../data/salesData';
import { employeeData } from '../data/employeeData';
import { getToken, setToken, removeToken } from "./localStorageService";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [carsCurrentPage, setCarsCurrentPage] = useState(0);
  const [carsTotalPages, setCarsTotalPages] = useState(1);
  const [carsLoading, setCarsLoading] = useState(false);
  const [carsError, setCarsError] = useState(null);
  const pageSize = 5;

  const fetchCars = async () => {
    try {
      setCarsLoading(true);
      setCarsError(null);
      const token = getToken();
      if (!token) {
        setCarsError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
        window.location.href = '/login';
        return;
      }
      const response = await fetch(`http://localhost:8080/api/cars?size=${pageSize}&page=${carsCurrentPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        removeToken();
        setCarsError('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
        window.location.href = '/login';
        return;
      }
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
      }
      const data = await response.json();
      setCars(data.result.content || []);
      setCarsTotalPages(data.result.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch cars:', error);
      setCars([]);
      setCarsTotalPages(1);
      setCarsError(error.message);
    } finally {
      setCarsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [carsCurrentPage]);

  const fetchCarsWithFilters = useCallback(async (filters, page = 0) => {
    try {
      setCarsLoading(true);
      setCarsError(null);
      const token = getToken();
      if (!token) {
        setCarsError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
        window.location.href = '/login';
        return;
      }
      const queryParams = new URLSearchParams({
        size: 6,
        page,
        ...(filters.priceMax && { priceMax: filters.priceMax }),
        ...(filters.brand && filters.brand !== 'Tất cả' && { brand: filters.brand }),
        ...(filters.seats && filters.seats !== 'Tất cả' && { seats: filters.seats }),
        ...(filters.model && filters.model !== 'Tất cả' && { model: filters.model }),
      });
      const response = await fetch(`http://localhost:8080/api/cars?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        removeToken();
        setCarsError('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
        window.location.href = '/login';
        return;
      }
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
      }
      const data = await response.json();
      setCars(data.result.content || []);
      setCarsTotalPages(data.result.totalPages || 1);
      setCarsCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch filtered cars:', error);
      setCars([]);
      setCarsTotalPages(1);
      setCarsError(error.message);
    } finally {
      setCarsLoading(false);
    }
  }, []);

  const [customers, setCustomers] = useState([]);
  const [customersCurrentPage, setCustomersCurrentPage] = useState(0);
  const [customersTotalPages, setCustomersTotalPages] = useState(1);

  const fetchCustomersWithFilters = useCallback(async (filters, page = 0) => {
    try {
      const token = getToken();
      if (!token) {
        setCustomers([]);
        setCustomersTotalPages(1);
        window.location.href = '/login';
        return;
      }
      const queryParams = new URLSearchParams({
        size: pageSize,
        page,
        ...(filters.searchTerm && { search: filters.searchTerm }),
      });
      const response = await fetch(`http://localhost:8080/api/customers?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        removeToken();
        setCustomers([]);
        setCustomersTotalPages(1);
        window.location.href = '/login';
        return;
      }
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data.result.content || []);
      setCustomersTotalPages(data.result.totalPages || 1);
      setCustomersCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      setCustomers([]);
      setCustomersTotalPages(1);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchCustomersWithFilters({}, customersCurrentPage);
  }, [customersCurrentPage, fetchCustomersWithFilters]);

  const [favorites, setFavorites] = useState([]);
  const [favoritesCurrentPage, setFavoritesCurrentPage] = useState(0);
  const [favoritesTotalPages, setFavoritesTotalPages] = useState(1);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [favoritesError, setFavoritesError] = useState(null);

  const fetchFavorite = async () => {
    try {
      setFavoritesLoading(true);
      setFavoritesError(null);
      const token = getToken();
      if (!token) {
        setFavoritesError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
        window.location.href = '/login';
        return;
      }
      const response = await fetch(`http://localhost:8080/api/favorite?size=${pageSize}&page=${favoritesCurrentPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        removeToken();
        setFavoritesError('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
        window.location.href = '/login';
        return;
      }
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
      }
      const data = await response.json();
      setFavorites(data.result.content || []);
      setFavoritesTotalPages(data.result.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
      setFavoritesError(error.message);
    } finally {
      setFavoritesLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorite();
  }, [favoritesCurrentPage]);

  const [appointments, setAppointments] = useState([]);
  const [appointmentsCurrentPage, setAppointmentsCurrentPage] = useState(0);
  const [appointmentsTotalPages, setAppointmentsTotalPages] = useState(1);

  const fetchAppointments = async () => {
    try {
      const token = getToken();
      if (!token) {
        setAppointments([]);
        setAppointmentsTotalPages(1);
        window.location.href = '/login';
        return;
      }
      const response = await fetch(`http://localhost:8080/api/appointments?size=${pageSize}&page=${appointmentsCurrentPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        removeToken();
        setAppointments([]);
        setAppointmentsTotalPages(1);
        window.location.href = '/login';
        return;
      }
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
      }
      const data = await response.json();
      setAppointments(data.result.content || []);
      setAppointmentsTotalPages(data.result.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [appointmentsCurrentPage]);

  const [sales, setSales] = useState(salesData);
  const [employees, setEmployees] = useState(employeeData);

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

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
      if (response.status === 401) {
        removeToken();
        throw new Error('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Lỗi HTTP! trạng thái: ${response.status}`);
      }
      await fetchCars();
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
      if (response.status === 401) {
        removeToken();
        throw new Error('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Lỗi HTTP! trạng thái: ${response.status}`);
      }
      await fetchCars();
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
      if (response.status === 401) {
        removeToken();
        throw new Error('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Lỗi HTTP! trạng thái: ${response.status}`);
      }
      await fetchCars();
    } catch (error) {
      console.error('Lỗi khi xóa xe:', error);
      throw error;
    }
  };

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
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formattedCustomer),
      });
      if (response.status === 401) {
        removeToken();
        throw new Error('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
      }
      if (!response.ok) {
        throw new Error('Không thể thêm khách hàng');
      }
      const createdCustomer = await response.json();
      await fetchCustomersWithFilters({}, customersCurrentPage);
      return createdCustomer;
    } catch (error) {
      console.error('Lỗi khi thêm khách hàng:', error);
      throw error;
    }
  };

  const updateCustomer = async (updatedCustomer) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/customers/${updatedCustomer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCustomer),
      });
      if (response.status === 401) {
        removeToken();
        throw new Error('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
      }
      if (!response.ok) {
        throw new Error('Cập nhật không thành công');
      }
      await fetchCustomersWithFilters({}, customersCurrentPage);
    } catch (error) {
      console.error('Lỗi khi cập nhật khách hàng:', error);
      throw error;
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/customers/${customerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        removeToken();
        throw new Error('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
      }
      if (!response.ok) {
        throw new Error('Không thể xóa khách hàng');
      }
      await fetchCustomersWithFilters({}, customersCurrentPage);
    } catch (error) {
      console.error('Lỗi khi xóa khách hàng:', error);
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

  const updateSale = (updatedSale) => {
    setSales(sales.map(sale =>
      sale.id === updatedSale.id ? { ...sale, ...updatedSale } : sale
    ));
  };

  const deleteSale = (saleId) => {
    setSales(prevSales => prevSales.filter(sale => sale.id !== saleId));
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

  const updateEmployee = (updatedEmployee) => {
    setEmployees(prevEmployees => prevEmployees.map(emp => 
      emp.id === updatedEmployee.id ? { ...emp, ...updatedEmployee } : emp
    ));
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
        if (response.status === 401) {
          removeToken();
          throw new Error('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
        }
        if (!response.ok) {
          throw new Error(`Failed to remove favorite: HTTP error! status: ${response.status}`);
        }
        await fetchFavorite();
      } else {
        const response = await fetch('http://localhost:8080/api/favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ carId: carId }),
        });
        if (response.status === 401) {
          removeToken();
          throw new Error('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
        }
        if (!response.ok) {
          throw new Error(`Failed to add favorite: HTTP error! status: ${response.status}`);
        }
        await fetchFavorite();
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const addAppointment = async (newAppointment) => {
    try {
      const token = getToken();
      const response = await fetch('http://localhost:8080/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newAppointment),
      });
      if (response.status === 401) {
        removeToken();
        throw new Error('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
      }
      if (!response.ok) {
        throw new Error('Không thể thêm lịch hẹn');
      }
      await fetchAppointments();
    } catch (error) {
      console.error('Lỗi khi thêm lịch hẹn:', error);
      throw error;
    }
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
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newAppointment),
      });
      if (response.status === 401) {
        removeToken();
        throw new Error('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
      }
      const result = await response.json();
      if (!response.ok) {
        alert('Bạn đã có lịch hẹn với xe này rồi !');
        return;
      }
      alert('Đặt lịch hẹn thành công!');
      await fetchAppointments();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
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
      if (response.status === 401) {
        removeToken();
        throw new Error('Phiên đã hết hạn. Vui lòng đăng nhập lại.');
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update appointment status: HTTP error! status: ${response.status}`);
      }
      await fetchAppointments();
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
      carsCurrentPage, setCarsCurrentPage, carsTotalPages, carsLoading, carsError,
      customersCurrentPage, setCustomersCurrentPage, customersTotalPages,
      favoritesCurrentPage, setFavoritesCurrentPage, favoritesTotalPages, favoritesLoading, favoritesError,
      appointmentsCurrentPage, setAppointmentsCurrentPage, appointmentsTotalPages,
      fetchCarsWithFilters,
      fetchCustomersWithFilters
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);