import axios from "axios";
import { getStorage, setStorage } from '../utils/storage';

const DEVICE = 'pc';

const config = {
    eventsApiDomain: '',
    eventsPath: '/event/v4/publish/',
    customerKey: '',
    debug: false,
    env: '', // staging || dev
    userId: null,
    ip: '',
    locale_country: '',
    locale_language: '',
};

const locales = {
    "en": { country: "us", language: "en" },
    "es": { country: "es", language: "es" },
    "de": { country: "de", language: "de" },
    "it": { country: "it", language: "it" },
    "fr": { country: "fr", language: "fr" },
    "zh": { country: "cn", language: "zh" },
    "da": { country: "dk", language: "da" },
    "ja": { country: "jp", language: "ja" },
};


export const setConfigData = () => {
    setConfig("env", "staging");
    setConfig('userId', getUID());
    axios.get('https://api.ipify.org?format=json').then(res => res.data.ip).then(data => setConfig('ip', data));
};

export const setConfig = (key, value) => {
    if (config.hasOwnProperty(key)) {
        config[key] = value;
    } else {
        console.warn(`${key} is not a valid configuration property.`);
    }
};

export const getConfigProperty = (key) => config[key];

export const getCookieUID = () => getStorage('__ruid');

export const getDomainKey = () => {
    const customerKey = String(getConfigProperty('customerKey'));
    const keyParts = customerKey.split('-');
    return (keyParts.length === 2 && keyParts[1]) || '';
};

export const getUID = (reset = 0) => {
    let uid = getStorage('__ruid');
    if (uid && !reset) {
      return uid;
    }

    const uidx = 'xx-xx-4x-1' + DEVICE[0] + '-'; // pattern of prefix to user id
    uid = uidx.replace(/[x]/g, () => digit2string((Math.random() * 36) | 0));
    for (let i = 0; i < 5; i++) {
        uid += ('0000' + ((Math.random() * 1679615) | 0).toString(36)).slice(-4);
    }
    const value = getDomainKey() + '-' + uid + '-' + Date.now();
    setStorage('__ruid', value, false);
    return value;
}

export const digit2string = (i) => {
    // 0-9 -> 0-9; 10-35 > a-z; 36-61 -> A-Z
    return String.fromCharCode(i < 10 ? i + 48 : i < 36 ? i + 87 : i + 29);
};

export const getLocaleData = value => {
    return locales[value];
};
