import React from 'react';
import { useForm } from 'react-hook-form';
import { addProduct } from '../api/api';

const AddProduct = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await addProduct(data);
      alert('Продукт успешно добавлен');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" {...register('name', { required: true })} />
        <input type="number" placeholder="Price" {...register('price', { required: true })} />
        <input type="text" placeholder="Description" {...register('description', { required: true })} />
        <input type="text" placeholder="Category" {...register('category', { required: true })} />
        <input type="file" {...register('image')} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;