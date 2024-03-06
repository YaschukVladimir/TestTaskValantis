import { useEffect, useState } from 'react'
import { fetchProductIds } from './api';
import ProductsList from './products-list';
import { deleteDuplicateProducts, setFilterType } from '../utils/utils';
import { limit } from '../utils/const';
import PaginationButtons from './pagination-buttons';
// import { Products } from '../utils/types';



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueProducts = deleteDuplicateProducts(products)

  console.log(uniqueProducts, 'uniqye')

  useEffect(() => {
    fetchProductIds( setIsLoading, setProducts, currentPage, limit, setFilterType)
  }, [currentPage])

  return (
    <>
    {!isLoading ? <ProductsList products={uniqueProducts} isLoading={isLoading}/> : <p>Loading...</p>}
      
      <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
    
  )
}

export default App
