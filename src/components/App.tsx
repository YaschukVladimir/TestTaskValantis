import { useEffect, useState } from 'react'
import { fetchProductIds } from './api';
import ProductsList from './products-list';



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  console.log(isLoading, 'www')

  useEffect(() => {
    fetchProductIds( setIsLoading, setProducts, 1, 50)
  }, [])

  return (
    <ProductsList products={products} isLoading={isLoading}/>
  )
}

export default App
