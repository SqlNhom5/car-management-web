import React, { createContext, useState, useContext, useEffect } from 'react';
import { formatPrice, formatPhoneNumber } from '../utils/formatters';
import { carData } from '../data/carData';
import { customerData } from '../data/customerData';
import { salesData } from '../data/salesData';
import { employeeData } from '../data/employeeData';
import { getToken, setToken, removeToken } from "./localStorageService";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Khởi tạo state từ localStorage hoặc dữ liệu mặc định
  const [cars, setCars] = useState([]);
  // lay du lieu tu API ve cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = getToken();
        const response = await fetch('http://localhost:8080/api/cars', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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





  const [customers, setCustomers] = useState([]);
  // lay du lieu tu API ve customers
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
        
        const data = await response.json(); // Parse JSON từ response
        setFavorites(data.result); // Cập nhật state với dữ liệu từ API
        console.log("fetch: ",data.result);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };
  
    fetchFavorite();
  }, []); 
   

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
        
        const data = await response.json(); // Parse JSON từ response
        setAppointments(data.result); // Cập nhật state với dữ liệu từ API
        console.log("fetchAPpoint: ",data.result);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };
  
    fetchAppointments();
  }, []); 

  const [sales, setSales] = useState(salesData);
  const [employees, setEmployees] = useState(employeeData);

  // Lưu cars vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

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
      console.log('Appending car data to FormData:', carData);
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

  const updateCar = async (updatedCar, imageFile) => {
    try {
      const token = getToken();
      const carData = {
        ...updatedCar,
        price: Number(updatedCar.price) || 0,
        count: Number(updatedCar.count) || 0,
        manufactureYear: Number(updatedCar.manufactureYear) || 0,
        warrantyPeriod: Number(updatedCar.warrantyPeriod) || 0,
      };

      console.log('updateCar input:', { carData, imageFile });

      const formData = new FormData();
      formData.append('car', new Blob([JSON.stringify(carData)], { type: 'application/json' }));
      if (imageFile) {
        if (!(imageFile instanceof File)) {
          throw new Error('File ảnh không hợp lệ');
        }
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(imageFile.type)) {
          throw new Error('Chỉ hỗ trợ file ảnh JPEG, PNG hoặc GIF');
        }
        console.log('Appending image to FormData:', imageFile.name, imageFile.type, imageFile.size);
        formData.append('image', imageFile);
      } else {
        console.log('No imageFile provided, sending only car data');
      }

      console.log('Sending updateCar FormData:');
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }

      const response = await fetch(`http://localhost:8080/api/cars/${updatedCar.carId}`, {
        method: 'PUT',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      console.log('updateCar response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('updateCar response data:', data);

      if (data.code === 1000 && data.result) {
        setCars(prev =>
          prev.map(c => (c.carId === data.result.carId ? data.result : c))
        );
        return data.result;
      } else {
        throw new Error(data.message || 'Failed to update car');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật xe:', error);
      throw error;
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

  const toggleFavorite = async (carId) => {
    console.log('Toggling favorite for carId:', carId); // Để debug
    try {
      const token = getToken();
      if (!token) throw new Error('No token found');

      const isFavorite = favorites.some((fav) => fav.carId === carId);
      console.log('Is favorite:', isFavorite); // Để debug

      if (isFavorite) {
        // Xóa khỏi yêu thích
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
        // Cập nhật state: Xóa car khỏi favorites
        setFavorites((prev) => prev.filter((fav) => fav.carId !==carId));
      } else {
        // Thêm vào yêu thích
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
        // Giả sử API trả về object car vừa thêm
        const data = await response.json();
        // Cập nhật state: Thêm car vào favorites
        // Nếu API trả về car đầy đủ, dùng data; nếu không, dùng car từ tham số
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
    console.log('Adding new appointment:', newAppointment); // Để debug
    setAppointments(prevAppointments => {
      const updatedAppointments = [...prevAppointments, newAppointment];
      // Lưu vào localStorage ngay lập tức
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      return updatedAppointments;
    });
  };

  const addAppointmentAndCustomer = async (formData, carId) => {
    try {
      // Ghép date và time thành appointmentDate
      const token = getToken();
      const appointmentDate = `${formData.date}T${formData.time}:00`;
  
      // Tạo object newAppointment theo cấu trúc API yêu cầu
      const newAppointment = {
        carId: carId,
        fullName: formData.name || '', // Ánh xạ 'name' thành 'fullName'
        phone: formData.phone || '', // Giữ nguyên
        mail: formData.email || '', // Ánh xạ 'email' thành 'mail'
        appointmentDate: appointmentDate || new Date().toISOString(), // Sử dụng date và time đã ghép
        notes: formData.note || '', // Ánh xạ 'note' thành 'notes'
        status: 'Chờ xác nhận',
        createdAt: new Date().toISOString(),
      };
  
      // Gửi yêu cầu POST tới API
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
  
  
      return result; // Trả về kết quả từ API
    } catch (error) {
      // Thông báo rằng đã đặt lịch hẹn với xe
      alert(`Bạn đã đặt lịch hẹn với xe này rồi!`);
      console.error('Error:', error);
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const token = getToken();
      if (!token) throw new Error('No token found');
  
      // Gọi API để cập nhật trạng thái
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
  
      // Cập nhật state appointments, chỉ thay đổi status
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
      addAppointmentAndCustomer
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);