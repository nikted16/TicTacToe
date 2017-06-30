$(document).ready(function(){
 
  $(".chX").click(function(){
    $(".start").css("visibility","hidden");
    $(".boxes").css("visibility","visible");
  });
  $(".chO").click(function(){
    $(".start").css("visibility","hidden");
    $(".boxes").css("visibility","visible");
    hu = "O";
    comp ="X";
  });
  
  $(".tic").click(function(){
    move(this,hu);
  });
  
});

var board = [0,1,2,3,4,5,6,7,8];
var comp = "O";
 var hu = "X";
var iter = 0;
var round = 0;

function move(element,player){
  if(board[element.id] != "X" && board[element.id] != "O")
    {
      round++;
      $("#"+element.id).text(player);
      board[element.id] = player;
      
      
      if(winning(board,player)){
        setTimeout(function(){
          alert("YOU WIN");
          reset();
        },500);
        return;
      }
      else if(round > 8){
        setTimeout(function(){
          alert("TIE");
          reset();
        },500);
        return;  
      }
      else
        {
          round++
          var index = minmax(board,comp).index;
          var selector = "#" + index;
          $(selector).text(comp);
          board[index] = comp;
          if(winning(board,comp)){
             setTimeout(function(){
            alert("YOU LOSE");
            reset();
          },500);
            return;
             }
          else if(round === 0)
            {
              setTimeout(function(){
                alert("TIE");
                reset();
              },500);
              return;
            }
        }
    }
}

function reset(){
  round = 0;
  board = [0,1,2,3,4,5,6,7,8];
  $(".tic").text('');
}

function minmax(board,player){
  iter++;
  var array = availSpots(board);
  if(winning(board,hu)){
    return{
      score : -10 
    };
  }
  else if(winning(board,comp)){
    return{
      score : 10
    };
  }
    else if(array.length == 0){
      return{
        score : 0
      };
    }
  
  var moves = [];
  for(var i = 0; i < array.length; i++)
    {
      var move = {};
      move.index = board[array[i]];
      board[array[i]] = player;
      
      if(player == comp)
        {
          var res = minmax(board,hu);
          move.score = res.score;
        }
      else
        {
          var res = minmax(board,comp);
          move.score = res.score;
        }
      
      board[array[i]] = move.index;
      moves.push(move);
    }
  
  var bestMove;
  if(player == comp)
    {
      var bestScore = -10000;
      for(var i = 0 ; i < moves.length ; i++)
        {
          if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
        }
    }
  else
    {
      var bestScore = 10000;
      for(var i = 0; i < moves.length ; i++)
        {
          if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
        }
    }
  
  return moves[bestMove];
}

function availSpots(board)
{
  return board.filter(s => s != "X" && s != "O");
}

function winning(board,player)
{
   if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}