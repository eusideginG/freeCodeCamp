const maxWin = <i class="btn btn-default fa fa-arrows-alt"></i>;
const minWin = <i class="btn btn-default fa fa-compress"></i>;
const content = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://libormarko.github.io/), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;
marked.setOptions({
  breaks: true
});
const renderer = new marked.Renderer();
//--------------------------------------------
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: content
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }
  render(){
    let isEMm = true;
    let isPMm = false;
    
    return (
      <div className="App">
        <div className="editor" id="EDI">
          <div id="editorBar">
          <div id="winBar">
    <span className="barName">Editor</span>
      <span><EMmBtn/></span>
    </div>
          </div>
          <Editor 
            input={this.state.input}
            onChange={this.handleChange}
           />
        </div>
        <div className="previewer" id="PRE">
          <div id="winBar">
    <span className="barName">Previewer</span>
      <span><PMmBtn/></span>
    </div>
          <Previewer input={this.state.input}/>
        </div>
      </div>
    );
  }
}
//---------------------------------------------
class EMmBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBtnMax: false,
    };
  }

  render(){

    function EmM(boolState){
      if(!boolState){
      document.getElementById("PRE").style.display = "none";   
      }
      else{
        document.getElementById("PRE").style.display = "";
      }
    }
    return (this.state.isBtnMax ? <i class="btn btn-default fa fa-compress" onClick={() => {
                EmM(this.state.isBtnMax);
this.setState({isBtnMax:false});
}}></i> : <i class="btn btn-default fa fa-arrows-alt" onClick={() => {EmM(this.state.isBtnMax);this.setState({isBtnMax:true});}}></i>)
  }
}
//------------------------------------------
class PMmBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBtnMax: false,
    };
  }

  render(){

    function EmM(boolState){
      if(!boolState){
      document.getElementById("EDI").style.display = "none";   
      }
      else{
        document.getElementById("EDI").style.display = "";
      }
    }
    return (this.state.isBtnMax ? <i class="btn btn-default fa fa-compress" onClick={() => {
                EmM(this.state.isBtnMax);
this.setState({isBtnMax:false});
}}></i> : <i class="btn btn-default fa fa-arrows-alt" onClick={() => {EmM(this.state.isBtnMax);this.setState({isBtnMax:true});}}></i>)
  }
}
//------------------------------------------
const Editor = props => {
  return (
    <textarea
      id="editor"
      value={props.input}
      onChange={props.onChange}
      type="text"
    />
  );
};
//---------------------------------------
const Previewer = props => {
  return (
    <div
      id="preview"
      dangerouslySetInnerHTML={{
        __html: marked.parse(props.input, { renderer: renderer })
      }}
    />
  );
};
//----------------------------------------------
const root = document.getElementById("root");
ReactDOM.render(<App />, root);