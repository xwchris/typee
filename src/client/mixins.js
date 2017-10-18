export const createTip = (msg, type) => {
  if (global.document) {
    window.createTip(msg, type);
  }
};
