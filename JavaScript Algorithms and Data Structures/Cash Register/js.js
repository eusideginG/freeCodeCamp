function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let ccid = JSON.parse(JSON.stringify(cid));
  let sum = cidSum(cid);
  let cR = canReturn(cid,change);

  if(sum < change || cR === false){
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }
  if(change - sum === 0 && cR === true){
    return {status: "CLOSED", change: ccid}
  }
  if(cR === true && sum > change){
    return {status: "OPEN", change: arr(cid,change)}
  }
  
}
//=====================================================
function cidSum(c){
  let sum = 0;
  for(let i = 0; i < c.length; i++){
    sum += c[i][1] * 1000;
  }
  return sum / 1000;
}
//=====================================================
function canReturn(c,cng){
  let cid = JSON.parse(JSON.stringify(c));
  let i = cid.findIndex(elem => elem[0] === startP(cng))
  for(; i >= 0; i--){
    if(cid[i][1]-mEq(cid[i][0])>=0&&cng-mEq(cid[i][0])>=0){
      cng = minus(cng,mEq(cid[i][0]));
      cid[i][1] = minus(cid[i][1],mEq(cid[i][0]));
      i++;
    } 
  }
  if(cng === 0){
    return true;
  }
  else{
    return false;
  }
}
//===========================================================
function arr(c,cng){
  let cid = JSON.parse(JSON.stringify(c));
  let i = cid.findIndex(elem => elem[0] === startP(cng));
  let sum = 0;
  let j = 0;
  let arr = [];
  for(; i >= 0; i--){
    if(cid[i][1]-mEq(cid[i][0])>=0&&cng-mEq(cid[i][0])>=0){
      cng = minus(cng,mEq(cid[i][0]));
      cid[i][1] = minus(cid[i][1],mEq(cid[i][0]));
      sum = sSum(sum,mEq(cid[i][0]));
      i++;
      j = i - 1;
    }
    if(j === i){
      if(i >= 0){
        arr.push([cid[i][0], sum]);
      } 
      sum = 0;
    }  
  }
  if(cng === 0){
    return arr;
  }
  else{
    return false;
  }
  
}
//=======================================================
function sSum(a, b){
  a *= 1000;
  b *= 1000;
  a += b;
  return a /= 1000;
}
//===========================================================
function startP(c){
  if (c >= 0.01 && c <= 0.04) return "PENNY";
  if (c >= 0.05 && c <= 0.09) return "NICKEL";
  if (c >= 0.1 && c <= 0.24) return "DIME";
  if (c >= 0.25 && c <= 0.99) return "QUARTER";
  if (c >= 1.0 && c <= 4.99) return "ONE";
  if (c >= 5.0 && c <= 9.99) return "FIVE";
  if (c >= 10.0 && c <= 19.99) return "TEN";
  if (c >= 20.0 && c <= 99.99) return "TWENTY";
  if (c >= 100) return "ONE HUNDRED";
}
//=======================================================
function mEq(w){
if (w === "PENNY") return 0.01;
if (w === "NICKEL") return 0.05;
if (w === "DIME") return 0.10;
if (w === "QUARTER") return 0.25;
if (w === "ONE") return 1.00;
if (w === "FIVE") return 5.00;
if (w === "TEN") return 10.00;
if (w === "TWENTY") return 20.00;
if (w === "ONE HUNDRED") return 100.00;
}
//=======================================================
function minus(a,b){
  a = a * 1000;
  b = b * 1000;
  return (a - b) / 1000;
}
//===================================================
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);