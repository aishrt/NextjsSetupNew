export const isEmpty = (value: any) => {
  if (value === null || value === undefined || value === false) {
    return true;
  }
  if (typeof value?.getMonth === "function") {
    return false;
  }
  if (typeof value === 'number') {
    return value === 0;
  }
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return  Object.keys(value).length === 0 || Object.values(value).every(value => value === '' || value === null)
  }
  return !value;
}
