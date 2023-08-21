function rot13(str) {
  let mystr = ""
  for(let i = 0 ; i < str.length; i++){
      if(str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 77){
        mystr = mystr.concat(String.fromCharCode(str.charCodeAt(i) + 13));
        continue;
      }
      else if(str.charCodeAt(i) >= 78 && str.charCodeAt(i) <= 90){
        mystr = mystr.concat(String.fromCharCode(str.charCodeAt(i) - 13));
        continue;
      }
      else{
        mystr = mystr.concat(str[i]);
      }
  }
  console.log(mystr);
  return mystr;
}

rot13("SERR PBQR PNZC");