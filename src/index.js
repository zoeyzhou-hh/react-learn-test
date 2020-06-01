import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     constructor(props){
//         super(props);
//         this.state={
//             value:null,
//         };
//     }
//     render() {
//         return (
//           <button
//               className="square"
//               onClick={()=>this.setState({value:'X'})}
//           >
//               {this.state.value}
//           </button>
//         );
//     }
// }

//用函数替换掉Square类
function Square(props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state={
            squares:Array(9).fill(null),
            XIsNext:true,
        };
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        if(calculateWinner((squares)||squares[i])){
            return;
        }
        squares[i]=this.state.XIsNext?'X':'O';
        this.setState({
            squares:squares,
            XIsNext:!this.XIsNext,
        });
    }

    renderSquare(i) {
        return(
            <Square
                value={this.state.squares[i]}
                onClick={()=>this.handleClick(i)}
            />
        );
    }

    render() {
        // const status = 'Next player: X'+(this.state.XIsNext?'X':'O');
        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner){
            status = 'Winner:' + winner;
        }else{
            status = 'Next player:'+(this.state.XIsNext?'X':'O');
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i=0;i<lines.length;i++){
        const [a,b,c] = lines[i];
        if(squares[a]&&squares[a] === squares[b] && squares[a]===squares[c])
            return squares[a];
    }
    return null;
}

// class ShoppingList extends React.Component{
//     render(){
//         return (
//             <div>
//                 <h1>你好 哈哈哈</h1>
//                 <ul>
//                     <li>
//                         UL-Li
//                     </li>
//                 </ul>
//             </div>
//         );
//
//     }
// }

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
