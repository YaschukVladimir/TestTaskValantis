import { password } from "./const";
import CryptoJS from 'crypto-js';

export function calculateOffset(currentPage: number, limit: number) {
    return currentPage > 0 ? (currentPage - 1) * limit : 0;
}

const timestamp: string = new Date().toISOString().slice(0, 10).split('-').join('');
const authPassword = `${password}_${timestamp}`;

export const authorizationString = CryptoJS.MD5(authPassword).toString();