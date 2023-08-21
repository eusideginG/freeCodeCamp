function palindrome(str) {
  str = str.toLowerCase().replace(/[\W_]/gi,"")
  console.log(str)
  return str === str.split("").reverse().join("") ? true : false;
}

palindrome("eye");