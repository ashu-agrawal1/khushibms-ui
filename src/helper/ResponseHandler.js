export function objectToArray(keys, data) {
  let resultArray = [];
  data.map((item) => {
    let singleArray = [];
    keys.map((key) => {
      singleArray.push(item[key]);
      return 0;
    });
    resultArray.push(singleArray);
    return 0;
  });
  return resultArray;
}

export function arrayToObject(arr, keys) {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[keys[i]] = arr[i];
  }
  return obj;
}
