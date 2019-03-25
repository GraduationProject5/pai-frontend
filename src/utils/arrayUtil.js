export function find(array, dataIndex, target) {
  return array.find((value, index, arr) => {
    return value[dataIndex] === target
  });
}
