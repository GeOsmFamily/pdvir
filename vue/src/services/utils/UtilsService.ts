export const uniqueArray = (array: any[], key = 'id') => {
  return array.filter((obj1, i, arr) => 
  arr.findIndex(obj2 => (obj2[key] === obj1[key])) === i
)};