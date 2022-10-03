import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSWR, {useSWRConfig} from 'swr';

export const ProductList = () => {
    const {mutate} = useSWRConfig();
    const fetcher = async () => {
        const response = await axios.get(process.env.REACT_APP_BACKEND + '/products');
        console.log(response.data);
        return response.data;
    };

    const { data, error } = useSWR('products', fetcher);
    if(error) return <div>Failed to load</div>;
    if(!data) return <h2>Loading...</h2>;

    const deleteProduct = async (productId) => {
        const URL = process.env.REACT_APP_BACKEND + '/products/' + productId;
        await axios.delete(URL);
        mutate('products');
    }

  return (
    <div className='flex flex-col mt-5'>
        <div className='w-full flex flex-row justify-between'>
            <div className='w-1/2'>
                <h1 className='text-2xl font-bold'>Products</h1>
            </div>
            <div className='w-1/2 flex flex-row justify-end'>
                <Link to='/add' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Add Product</Link>
            </div>
        </div>
        <div className='w-full flex flex-row justify-between mt-5'>
            
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th className="py-3 px-1 text-center">No</th>
                        <th className="py-3 px-6">Product Name</th>
                        <th className="py-3 px-6">Price</th>
                        <th className="py-3 px-1 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product, index) => (
                        <tr className="bg-white border-b" key={product.id}>
                            <td className="py-3 px-1 text-center">{index + 1}</td>
                            <td className="py-3 px-6 font-medium text-gray-900">
                                {product.name}
                            </td>
                            <td className="py-3 px-6">{product.price}</td>
                            <td className="py-3 px-1 text-center">
                                <Link
                                    to={`/edit/${product.id}`}
                                    className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
  
        </div>
    </div>
    )   
}
