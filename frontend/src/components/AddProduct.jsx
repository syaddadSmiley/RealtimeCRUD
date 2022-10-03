import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const addProduct = async (e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_BACKEND +'/products', {
            nama: name,
            price: parseInt(price)
        });
        navigate('/');
    }   
  return (
    <form className='w-full max-w-sm' onSubmit={addProduct}>
        <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-name'>
                    Name
                </label>
                <input

                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                    id='grid-name'
                    type='text'
                    placeholder='Product Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-price'>
                    Price
                </label>
                <input

                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                    id='grid-price'
                    type='text'
                    placeholder='Product Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
                <button

                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    type='submit'
                >
                    Add Product
                </button>
            </div>
        </div>
    </form>
    );
}
