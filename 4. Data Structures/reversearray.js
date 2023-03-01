function reverseArray(array) {
  let temp = [];
  for (let i = array.length - 1; i >= 0; i--) {
    temp.push(array[i]);
  }
  return temp;
}

function reverseArrayInPlace(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    let old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
  }
  return array;
}
