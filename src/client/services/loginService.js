// 是否展示登录框
export default (dispatch, key = 'showLoginPopup', value = false) => {
  dispatch({
    type: 'SHOWLOGINORRIGISTPOPUP',
    // showLoginPopup 是否显示登录框
    // showRegistPopup 是否显示注册框
    key,
    value,
  });
};
