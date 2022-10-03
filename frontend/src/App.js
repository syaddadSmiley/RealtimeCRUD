// import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ProductList } from './components/ProductList';
import { AddProduct } from './components/AddProduct';

function App() {
  return (
    <div className='container'>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductList/>} />
          <Route path='/add' element={<AddProduct/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
