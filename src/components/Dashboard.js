import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        alert('Не удалось получить продукты');
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      alert('Не удалось удалить продукт');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/products/${editingProduct.id}`, formData);
      setProducts(products.map(product =>
        product.id === editingProduct.id ? { ...product, ...formData } : product
      ));
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: ''
      });
    } catch (error) {
      alert('Не удалось обновить продукт');
    }
  };

  const data = {
    labels: products.map(product => product.name),
    datasets: [
      {
        label: 'Product Prices',
        data: products.map(product => product.price),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Bar data={data} />
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            {product.image && (
              <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            )}
            <button onClick={() => handleDelete(product.id)}>Удаить</button>
            <button onClick={() => handleEdit(product)}>Редактировать</button>
          </li>
        ))}
      </ul>
      {editingProduct && (
        <form onSubmit={handleUpdate}>
          <h3>Edit Product</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <button type="submit">Обновить Продукт</button>
          <button type="button" onClick={() => setEditingProduct(null)}>Отмена</button>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
