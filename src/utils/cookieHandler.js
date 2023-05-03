import {
    decodeBase64,
    encodeBase64,
} from './utils';

let cachedCookies = {};

const isBase64 = (str) => {
    // str.indexOf('0!') === 0 means that starts with 0!
    if (str) {
        return str.indexOf('0!') === 0;
    }
    return false;
}

const decodeCookieValue = (str) => {
    let tmpValue = decodeURIComponent(str);
    tmpValue = isBase64(tmpValue) ? decodeBase64(tmpValue.substr(2), '1') : tmpValue;
    return tmpValue;
}

const getCookieValue = (content, cookieName) => {
    const tmpValue = content.substr(cookieName.length + 1, content.length);
    if (tmpValue) {
        return decodeCookieValue(tmpValue);
    }
    return '';
}

const setCookieInBrowser = (name, value, milliseconds, base64) => {
    const exdate = new Date();
    let newValue = base64 && value ? '0!' + encodeBase64(value, '1').replace(/,/g, '~') : encodeURIComponent(value); // base64 encoded
    exdate.setMilliseconds(exdate.getMilliseconds() + milliseconds);
    newValue += `;domain=${window.location.hostname};path=/;`;
    newValue += !milliseconds ? '' : `;expires=${exdate.toUTCString()}`;
    newValue += ';secure;SameSite=None;';
    document.cookie = `${name}=${newValue}`;
}

const getCookieFromBrowser = (cookieName) => {
    const rawCookies = document.cookie.split('; ');
    for (let i = 0; i < rawCookies.length; i++) {
        if (rawCookies[i].substr(0, cookieName.length) === cookieName) {
            const newValue = getCookieValue(rawCookies[i], cookieName);
            cachedCookies[cookieName] = newValue;
            return newValue;
        }
    }
    return '';
}

const removeCookieFromBrowser = (name) => {
    document.cookie = `${name}=;domain=${window.location.hostname};path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;secure;SameSite=None`;
  }

const removeCachedCookie = (name) => {
    if (cachedCookies[name]) {
        delete cachedCookies[name];
    }
    removeCookieFromBrowser(name);
}

export const setCookie = (key, value, expire, encode) => {
    if (value) {
        const newValue = typeof value === 'object' ? JSON.stringify(value) : value;
        cachedCookies[key] = newValue;
        setCookieInBrowser(key, newValue, expire, encode);
    } else {
        removeCachedCookie(key);
    }
}

export const getCookie = (key) => {
    if (cachedCookies[key]) {
        return cachedCookies[key];
    }
    const cookieValue = getCookieFromBrowser(key);
    cachedCookies[key] = cookieValue;
    return cookieValue;
}

export const removeCookie = (key) => {
    removeCachedCookie(key);
}