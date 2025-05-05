import React, { createContext, useState, useContext } from 'react';
import { formatPrice, formatPhoneNumber } from '../utils/formatters';
import { carData } from '../data/carData';
import { customerData } from '../data/customerData';
import { salesData } from '../data/salesData';
import { employeeData } from '../data/employeeData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cars, setCars] = useState(carData);
  const [customers, setCustomers] = useState(customerData);
  const [sales, setSales] = useState(salesData);
  const [employees, setEmployees] = useState(employeeData);

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

  const addCustomer = (newCustomer) => {
    const formattedCustomer = {
      ...newCustomer,
      id: Date.now(),
      purchased: 0,
      appointments: 0,
      phone: formatPhoneNumber(newCustomer.phone)
    };
    setCustomers(prevCustomers => [...prevCustomers, formattedCustomer]);
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

  const updateCustomer = (updatedCustomer) => {
    setCustomers(customers.map(customer =>
      customer.id === updatedCustomer.id ? { ...customer, ...updatedCustomer } : customer
    ));
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

  const deleteCustomer = (customerId) => {
    setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== customerId));
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
