export const removeIfExists = (array: any[], item: any) => {
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}
export const addUniqueItem = (array: any[], newItem: any) => {
  if (!array.includes(newItem)) {
    array.push(newItem);
  }
}
export const removeItemByIndex = (array: any[], index: any) => {
  array.splice(index, 1);
}
export const removeItemByValue = (array: any[], value: any) => {
  return array.filter(item => item !== value);
}
export const removeLastItem = (array: void[]) => {
  array.pop();
}
