import { password } from "./const";
import CryptoJS from 'crypto-js';
import { Products } from "./types";

export function calculateOffset(currentPage: number, limit: number) {
    return currentPage > 0 ? (currentPage - 1) * limit : 0;
}

const timestamp: string = new Date().toISOString().slice(0, 10).split('-').join('');
const authPassword = `${password}_${timestamp}`;

export const authorizationString = CryptoJS.MD5(authPassword).toString();

export function deleteDuplicateProducts(products: Products) {
    const uniqueProducts = new Map();
    products.forEach(product => {
        if (!uniqueProducts.has(product.id)) {
            uniqueProducts.set(product.id, product)
        } 
    });

    return Array.from(uniqueProducts.values());
}

export function setFilterType(type: string, price = 0, page = 1, productsLimit: number, brand = '') {
    switch (type) {
        case 'base':
            return (
                {
                    action: 'get_ids',
                    params: {
                      offset: calculateOffset(page, productsLimit),
                      limit: productsLimit,
                    },
                  }
            );
        case 'price':
            return (
                {
                    action: 'filter',
                    params: {'price': price}
                }
            );
        case 'brand':
            return (
                {
                    action: 'filter',
                    params: {'brand': brand}
                }
            )
    }
}