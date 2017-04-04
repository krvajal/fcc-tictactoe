import React from 'react';
import ReactDOM from 'react-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class Square extends React.Component{
  constructor(){

    super();
    this.state = { value: null};
  }
  render(){
    return     <div className="box" onClick={() => this.props.onClick()} > { this.props.value}</div>;
  }
}



class Board extends React.Component{


  renderSquare(i){

    return <Square value={this.props.value[i]} onClick={ () => this.props.onClick(i)} />
  }


  render(){
    var winner = calculateWinner(this.props.value);
    if(winner){
      return (<div className="game-board">
          <div className="winner-wrapper">
            <div className="winner-info">  {winner} </div>
            won
          </div>

        </div>);
    }else {
    return (
      <div className="game-board">
        <div className="row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
        <div className="row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
        </div>
        <div className="row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}

        </div>
      </div>
      );
    }
  }
}

function TurnButton(props){
  if(props.active){
      return (  <button className="turn-btn active">{props.value}     </button>);
  }else{
      return (  <button className="turn-btn">{props.value}</button>);
  }

}

class Game extends React.Component{


    handleChange = (event, index, value) =>{
       this.setState({difficulty: value});
    };

    constructor(){
      super();
      this.state = {squares: Array(9).fill(null), isXNext: true, difficulty: 1, playing: false};
    }
     render(){
         let status;
       if(this.state.isXNext){
         status = "X Turn";
       }else{
         status = "O Turn";
       }

        return (
          <div className="container">
             <SelectField
          floatingLabelText=""
             value={this.state.difficulty}
             onChange={this.handleChange}
             disabled={this.state.playing}
        >
          <MenuItem value={1} primaryText="Easy" />
          <MenuItem value={2} primaryText="Medium" />
          <MenuItem value={3} primaryText="Hard" />
          <MenuItem value={4} primaryText="Play against a friend" />
        </SelectField>
            <div className="turn-buttons">

                <TurnButton value="X" active={this.state.isXNext}/>
                <TurnButton value="O" active={!this.state.isXNext}/>

            </div>
             <div className="status-info">{status}</div>
          <Board value={this.state.squares}  onClick={(i) => this.handleClick(i)}/>
        <button className="restart-btn" onClick={()=>this.startState()}>
          RESTART GAME
        </button>

        </div>);
      }
   handleClick(i){

    if(this.canPlay()){
      const squares = this.state.squares.slice();
      var winner = calculateWinner(squares);
      if(winner || squares[i]) return;
      squares[i] = (this.state.isXNext)?'X':'O';
      this.setState({squares: squares, isXNext : !this.state.isXNext});
      this.setState({playing: true});
      if(this.state.difficulty !== 4){
        this.playComputer();
      }
    }

  };

  playComputer(){
      this.setState({playing: true});
  }

  canPlay(){

    if(this.state.difficulty == 4) return true;
    if(this.state.isXNext) return true;
    return false;
  }

  startState(){

      this.setState( {squares: Array(9).fill(null), isXNext: true});
      this.setState({playing: false});
  };

}


const App = () => (
  <MuiThemeProvider>
    <Game />
  </MuiThemeProvider>
);

var elem = <App/>;
ReactDOM.render(elem, document.getElementById("root"));

function calculateWinner(squares){
     const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

