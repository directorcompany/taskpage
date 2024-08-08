import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Замените на реальный URL вашего fakeapi

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, credentials);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка входа');
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw new Error('Не удалось получить продукты');
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, product); // Замените на ваш URL db.json
    return response.data;
  } catch (error) {
    throw new Error('Добавление продукта не удалось');
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${BASE_URL}products/${id}`); // Замените на ваш URL db.json
  } catch (error) {
    throw new Error('Удаление продукта не удалось');
  }
};