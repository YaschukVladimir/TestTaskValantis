import { useState } from "react"
import { fetchFilteredProducts, fetchProductIds } from "./api";
import { limit } from "../utils/const";
import { Product } from "../utils/types";

type ProductFiltersProps = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

function ProductFilters({setIsLoading, setProducts}: ProductFiltersProps): React.JSX.Element {
    const [brandName, setBrandName] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');

    const handleFilterProducts = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (evt.currentTarget.classList.contains('brand')) {
            fetchFilteredProducts(setIsLoading, setProducts, {brand: brandName});
            setBrandName('');
        }
        if (evt.currentTarget.classList.contains('price')) {
            fetchFilteredProducts(setIsLoading, setProducts, {price: Number(price)});
            setPrice('');
        }
        if (evt.currentTarget.classList.contains('name')) {
            fetchFilteredProducts(setIsLoading, setProducts, {name: name});
            setName('');
        }
    }

    const handleFilterReset = (): void => {
        setBrandName('');
        setName('');
        setPrice('');
        fetchProductIds(setIsLoading, setProducts, 1, limit);
    }

    const isButtonDisabled = (value: string | number): boolean => {
        if (value) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <div className="filters__wrapper" >
            <div className="filters__elem">
                <button
                    className={`filters__button brand ${isButtonDisabled(brandName) ? 'disabled' : ''}`}
                    onClick={(evt) => handleFilterProducts(evt)} disabled={isButtonDisabled(brandName)}>
                    Filter by brand
                </button>
                <input type="text" className="filters__input" value={brandName} onChange={(evt) => setBrandName(evt.target.value)}/>
            </div>
            <div className="filters__elem">
                <button
                    className={`filters__button price ${isButtonDisabled(price) ? 'disabled' : ''}`}
                    onClick={(evt) => handleFilterProducts(evt)} disabled={isButtonDisabled(price)}>
                    Filter by price
                </button>
                <input type="number" className="filters__input" value={price} onChange={(evt) => setPrice(evt.target.value)}/>
            </div>
            <div className="filters__elem">
                <button
                className={`filters__button name ${isButtonDisabled(name) ? 'disabled' : ''}`}
                onClick={(evt) => handleFilterProducts(evt)} disabled={isButtonDisabled(name)}>
                    Filter by name
                </button>
                <input type="text" className="filters__input" value={name} onChange={(evt) => setName(evt.target.value)}/>
            </div>
            <div className="filters__elem">
                <button className="filters__button reset" onClick={() => handleFilterReset()}>Reset filters</button>
            </div>
        </div>
    )
}

export default ProductFilters;
