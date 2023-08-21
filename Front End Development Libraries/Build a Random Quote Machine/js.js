const QUOTES = ["Be yourself; everyone else is already taken.","Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.","So many books, so little time.","A room without books is like a body without a soul."];
const AUTHORS = ["Oscar Wilde","Albert Einstein","Frank Zappa","Marcus Tullius Cicero"];
const COLORS = ["rgb(0, 83, 71)","rgb(202, 36, 135)","rgb(43, 204, 182)","rgb(218, 204, 52)"];
//----------------------------------------------
function rQ(arr){
  return Math.floor(Math.random() * arr.length);
}
//---------------------------------------------
let qna = rQ(QUOTES);
let c = rQ(COLORS);
let text = document.getElementById("text");
let author = document.getElementById("author");
let body = document.querySelector('body');
let button = document.querySelector('button');
let iconTw = document.querySelector('#tweet-quote');
let iconTb = document.querySelector('#tumblr');
//--------------------------------------------------
function onL(){
  while(body.style.backgroundColor === COLORS[c] || author.innerHTML.slice(3) === AUTHORS[qna]){
    c = rQ(COLORS);
    qna = rQ(QUOTES);
  }
  body.style.backgroundColor = COLORS[c];
  body.style.color = COLORS[c];
  button.style.backgroundColor = COLORS[c];
  iconTw.style.backgroundColor = COLORS[c];
  iconTb.style.backgroundColor = COLORS[c];
  text.innerHTML = "<i class=\"fa fa-quote-left\"></i> " + QUOTES[qna];
  author.innerHTML = " - " + AUTHORS[qna];
}