import { getCookie, setCookie, removeCookie } from './cookieHandler';
import {
    jsonParse
} from './utils';

const DEFAULT_EXPIRY = 300000;

export const setStorage = (key, value, encode, expire) => {
    setCookie(key, value, expire || DEFAULT_EXPIRY, encode);
}

export const getStorage = (key) => {
    let storageValue = getCookie(key);
    const parsedValue = storageValue ? jsonParse(storageValue) : {};
    if (storageValue === 'undefined') {
        storageValue = undefined;
    }
    return storageValue && parsedValue ? parsedValue : storageValue;
}

export const removeStorage = (key) => {
    removeCookie(key);
}
