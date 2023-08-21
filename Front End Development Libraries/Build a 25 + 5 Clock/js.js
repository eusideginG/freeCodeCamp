const { useState, useEffect } = React;
const beep = "https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3";
const BreakLength = 5;
const SessionLength = 25;
//---------------------------------------------------------------------
const App = () => {
  const [breakTime, setBreakTime] = useState(BreakLength);
  const [sessionTime, setSessionTime] = useState(SessionLength);
  const [currentMin, setCurrentMin] = useState(sessionTime);
  const [currentSec, setCurrentSec] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [playPause, setPlayPause] = useState(false);
//---------------------------------------------------------------------
  useEffect(() => {
    setCurrentMin(sessionTime);
  },[sessionTime])
  useEffect(() => {
    if(currentSec == 0 && currentMin == 0){
      document.getElementById("beep").currentTime = 0;
      document.getElementById("beep").play();
    }
  },[currentSec])
//---------------------------------------------------------------------
  const handleDec = (v, id) => {
    if(!playPause){
      if(id === 1){
        if(v > 1 && v <= 60){setBreakTime(v - 1);}
        else{return 1;}
      }
      else if(id === 2){
        if(v > 1 && v <= 60){setSessionTime(v - 1);}
        else{return 1;}
      }
    }
  }
//---------------------------------------------------------------------
  const handleInc = (v, id) => {
    if(!playPause){
      if(id === 1){
        if(v >= 1 && v < 60 ){setBreakTime(v + 1);}
        else{return 60;}
      }
      else if(id === 2){
        if(v >= 1 && v < 60 ){setSessionTime(v + 1);}
        else{return 60;}
      }
    }
  }
//---------------------------------------------------------------------
  useEffect(() => {
    if(playPause){
      const seconds = setInterval(() => {
        if(currentSec == "00" || currentSec == 0){
          setCurrentSec(60);
          setCurrentMin(prev => prev -1);
        }
        setCurrentSec(prev => prev - 1);
        if(currentSec == 0 && currentMin == 0){
          setIsBreak(!isBreak);
          setCurrentMin(breakTime);
        }
      }, 1000);
      return () => {clearInterval(seconds);}
    }
    
  },[playPause, currentSec])
//---------------------------------------------------------------------
const reset = () => {
  setPlayPause(false);
  setIsBreak(false);
  setBreakTime(BreakLength);
  setSessionTime(SessionLength);
  setCurrentMin(sessionTime);
  setCurrentSec(0);
  document.getElementById("beep").pause();
  document.getElementById("beep").currentTime = 0;
  console.clear();
}
//---------------------------------------------------------------------
  return(
  <div id="appWrapper">
    <div id="title">
      <h1 id="appTitle">Break Timer</h1>
      <br/>
    </div>
    <div id="setTimeButtons">
        <h4 id="break-label">Break Length</h4>
      <div id="breakWrapper">
        <button className="btn" id="break-decrement" onClick={() => {handleDec(breakTime,1);}}><i class="bi bi-arrow-down-circle"></i></button>
        <span id="break-length">{breakTime}</span>
        <button className="btn" id="break-increment" onClick={() => {handleInc(breakTime,1);}}><i class="bi bi-arrow-up-circle"></i></button>
      </div>
      <div id="spacer"></div>
        <h4 id="session-label">Session Length</h4>
      <div id="sessionWrapper">
        <button className="btn" id="session-decrement" onClick={() => {handleDec(sessionTime,2);}}><i class="bi bi-arrow-down-circle"></i></button>
        <span id="session-length">{sessionTime}</span>
        <button className="btn" id="session-increment" onClick={() => {handleInc(sessionTime,2);}}><i class="bi bi-arrow-up-circle"></i></button>
      </div>
    </div>
    <div id="display">
      <h5 id="timer-label">{isBreak ? "Break Time" : "Session Time"}</h5>
      <div id="time-left">{currentMin <= 9 ? 0 : ""}{currentMin}:{currentSec <= 9 ? 0 : ""}{currentSec}</div>
    </div>
    <div id="pprButtons">
      <button className="btn" id="start_stop" onClick={() => {setPlayPause(!playPause);}}>{playPause ? <i class="bi bi-pause-circle"></i> : <i class="bi bi-play-circle"></i>}</button>
      <button className="btn" id="reset" onClick={() => {reset();}}><i class="bi bi-arrow-repeat"></i></button>
    </div>
    <audio src={beep} id="beep"/>
  </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));