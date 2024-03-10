import { useEffect, useState } from 'react'
import { fetchProductIds } from './api';
import ProductsList from './products-list';
import { deleteDuplicateProducts} from '../utils/utils';
import { limit } from '../utils/const';
import PaginationButtons from './pagination-buttons';
import ProductFilters from './filters';
import { Product } from '../utils/types';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueProducts = deleteDuplicateProducts(products);

  useEffect(() => {
    fetchProductIds( setIsLoading, setProducts, currentPage, limit);
  }, [currentPage])

  return (
    <>
    <ProductFilters setIsLoading={setIsLoading} setProducts={setProducts}/>
    {!isLoading ? <ProductsList products={uniqueProducts} isLoading={isLoading}/> : <p>Loading...</p>}
      
      <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
    
  );
}

export default App;
