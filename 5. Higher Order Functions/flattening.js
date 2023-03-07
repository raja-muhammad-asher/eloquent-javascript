let arrays = [[1, 2, 3], [4, 5], [6]];
arrays.reduce((flatArray, currentValue) => flatArray.concat(currentValue), []);
