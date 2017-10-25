import { message as antMessage } from 'antd';

export const message = {
  error: (msg) => {
    if (global.document) {
      antMessage.error(msg);
    }
  },
  success: (msg) => {
    if (global.document) {
      antMessage.success(msg);
    }
  },
  warning: (msg) => {
    if (global.document) {
      antMessage.warning(msg);
    }
  },
};

// cookie操作
export const cookie = {
  delete: (name) => {
    const domain = '.ustudents.cn';
    const path = '/';
    document.cookie = `${name}=; expires=${new Date()}; domain=${domain}; path=${path}`;
  },
};

// storage操作
export const storage = {
  setItem: (name, value) => {
    if (global.document) {
      const memory = window.localStorage
        || (window.UserDataStorage && new window.UserDataStorage())
        || new window.CookieStorage();
      memory.setItem(name, value);
    }
  },
  getItem: (name) => {
    if (global.document) {
      const memory = window.localStorage
        || (window.UserDataStorage && new window.UserDataStorage())
        || new window.CookieStorage();
      const result = memory.getItem(name);
      return result;
    }
    return null;
  },
};
