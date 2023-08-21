function convertToRoman(num) {
 const rtable = [
    ["I" , 1],
    ["IV" , 4],
    ["V"	, 5],
    ["IX" , 9],
    ["X"	, 10],
    ["XL" , 40],
    ["L"	, 50],
    ["XC" , 90],
    ["C"	, 100],
    ["CD" , 400],
    ["D"	, 500],
    ["CM" , 900],
    ["M"	, 1000]
    ];
    let finalArr = [];
    while(num > 0){
      for(let i = 0; i < rtable.length; i++){
        if(num > rtable[i][1]){
          if(num > 1000){
            finalArr.push("M");
            num -= 1000;
          }
          continue;
        }
        else if(num === rtable[i][1]){
          
          finalArr.push(rtable[i][0]);
          num -= rtable[i][1];
          break;
        }
        else{
          finalArr.push(rtable[i-1][0]);
          num -= rtable[i-1][1];
          break;
        }
      } 
    }
    return finalArr.join("")
}
convertToRoman(36);