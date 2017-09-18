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

// 计算结果
export function calculateResult(result) {
  const { time, totalCount, inputChars, errorChars } = result;
  // 输入字符数
  const inputCount = Object.values(inputChars).reduce((sum, item) => (sum + item), 0);
  // 错误字符数
  const errorCount = Object.values(errorChars).reduce((sum, item) => (sum + item), 0);
  // wpm
  const wpm = ((totalCount - (totalCount % time)) / time) * 60;
  // 退格次数
  const deleteCount = inputChars.delete;
  // 返回结果
  return { totalCount, inputCount, errorCount, wpm, deleteCount };
}

export default getClassName;
