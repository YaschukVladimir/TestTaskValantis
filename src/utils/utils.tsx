import { password } from "./const";
import CryptoJS from 'crypto-js';
import { Products } from "./types";

export function calculateOffset(currentPage: number, limit: number): number {
    return currentPage > 0 ? (currentPage - 1) * limit : 0;
}

const timestamp: string = new Date().toISOString().slice(0, 10).split('-').join('');
const authPassword = `${password}_${timestamp}`;

export const authorizationString = CryptoJS.MD5(authPassword).toString();

export function deleteDuplicateProducts(products: Products): Products {
    const uniqueProducts = new Map();
    products.forEach(product => {
        if (!uniqueProducts.has(product.id)) {
            uniqueProducts.set(product.id, product)
        } 
    });

    return Array.from(uniqueProducts.values());
}
