// 获取类别
export function getClassName(index, character, state) {
  const classNames = [];
  if (character === '\n') {
    classNames.push('enter');
  }
  if (character === ' ') {
    classNames.push('space');
  }
  if (index === state.pointer) {
    classNames.push('active');
  }
  if (index < state.pointer) {
    classNames.push(state.inputArray[index]);
  }
  return classNames.join(' ');
}

// 对象转数组
export function objectToArray(obj = {}) {
  const arr = [];
  Object.keys(obj).forEach((item) => {
    arr.push({
      key: item,
      value: obj[item],
    });
  });
  return arr;
}

// 计算结果
export function calculateResult(result = {}) {
  const { time = 0, totalCount = 0, inputChars = {}, errorChars = {} } = result;
  // 错误字符排序
  const errorArray = objectToArray(errorChars).sort((a, b) => (b.value - a.value)) || [];
  // wpm = 总字符数 / 时间(s) * 60
  const wpm = Math.round((totalCount / time) * 12) || 0;
  // 输入字符数
  const inputCount = Object.values(inputChars).reduce((sum, item) => (sum + item), 0);
  // 错误字符数
  const errorCount = Object.values(errorChars).reduce((sum, item) => (sum + item), 0);
  // 无效输入比例 = （输入字符数 - 总字符数） /  总字符数
  const invalidRate = `${Math.round(((inputCount - totalCount) / totalCount) * 100)}%`;
  // 退格次数
  const deleteCount = inputChars.delete || 0;
  // 返回结果
  return { totalCount, inputCount, errorCount, wpm, deleteCount, invalidRate, errorArray };
}

// 格式化时间
export function parseTime(seconds) {
  const minute = (seconds - (seconds % 60)) / 60;
  const second = seconds - (minute * 60);
  return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
}

export default getClassName;
