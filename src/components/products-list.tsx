import { Products } from "../utils/types";

type ProductsListProps = {
    products: Products,
    isLoading: boolean
}

function ProductsList({products, isLoading}: ProductsListProps): React.JSX.Element {
    if (!isLoading) {
        return (
            <div className="product-list__wrapper">
                <ol className="product-list">
                    { products.length ?
                        products.map((product, index) => {
                            return (
                                <li className="product-list__item" key={index}>
                                    <p className="product-list__item-title">{product.product}</p>
                                    {product.brand ? <p className="product-list__item-brand">{product.brand}</p> : ''}
                                    <p className="product-list__item-price">{product.price}</p>
                                </li>
                            )
                        }) : ''
                    }
                </ol>
            </div>
        )
    } else {
        return (
            <p>Loading...</p>
        )
    }
   
}

export default ProductsList;