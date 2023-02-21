function countChar(string, ch) {
  const regExp = new RegExp(`${ch}`, 'g');
  const counted = string.match(regExp).length;
  return counted;
}

function countBs(string) {
  return countChar(string, "B");
}
