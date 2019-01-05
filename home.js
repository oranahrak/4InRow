var app = angular.module("startapp",[]);

app.controller('homectrl',function($scope,$http){
    var counter=[0,0,0,0,0,0,0];//count the time that one column clicked
    var height=[90,90,90,90,90,90,90];//the height that the circle will fall
    var redColor=true;
    $scope.player1=true;
    $scope.gameOver=false;
    $scope.board=[];
    // init the board
    for(var i=0;i<42;i++){
        $scope.board[i]={id:'circle'};
    }
    // init the circles
    $scope.circles = new Array(6);
    
    for(var i=0;i<6;i++){
        $scope.circles[i]= new Array(7);
    }
    for(var j=0;j<7;j++){
    for(var i=0;i<6;i++)
    {
        $scope.circles[i][j]={color:null,id:'circle'+(i+1)+j};
    }
    }
    
    $scope.changeColor=false;
    var winArray=[];
    for(var i=0;i<4;i++){
        winArray[i]={columnIndex:'',rowIndex:''};
    }


    // when the user click on the board
    $scope.columnClick=function(index){
        var row=counter[index%7];
        var column=(index%7);
        // to keep the array that win
        function paintWinArr(){
            for(var i=0;i<4;i++){
                document.getElementById("circle"+(winArray[i].rowIndex+1)+(winArray[i].columnIndex)).style.backgroundColor = 'green';
            }
        }
        //check if the user dont over the limit in clicked the same column
        if(counter[index%7]<=7){
            $( "#circle"+(counter[index%7]+1)+(index%7) ).animate({"margin-top":height[index%7]+'vh'});
            if(redColor){
                document.getElementById("circle"+(counter[index%7]+1)+(index%7) ).style.backgroundColor = 'yellow';
                document.getElementById("circle"+(counter[index%7]+1)+(index%7) ).style.visibility = 'visible';
                $scope.circles[counter[index%7]][index%7].color='yellow';
                $scope.player1=false;
            }
            if(!redColor){
                document.getElementById("circle"+(counter[index%7]+1)+(index%7) ).style.backgroundColor = 'red';
                document.getElementById("circle"+(counter[index%7]+1)+(index%7) ).style.visibility = 'visible';
                $scope.circles[counter[index%7]][index%7].color='red';
                $scope.player1=true;
            }
            //change the colors
            if(redColor){
                redColor=false;
            }
            else{
                redColor=true;
            }

            if(downCheck(row,column)||diagonalsCheck(row,column)||sideCheck(row,column)){
                paintWinArr();
                $scope.gameOver=true;
            }
            counter[index%7]++;
            height[index%7]=height[index%7]-10.8;
        }
    }
    //the function get row and column, return true if there is 4 circles under the current circle in the same color
    function downCheck(row,column)
    {
        var numberm = row;
        var count=0;
        var win=0;
        if(numberm>3){
            numberm=3;
        }
        for(var i=1;i<numberm+1;i++){
            if($scope.circles[row][column].color==$scope.circles[row-i][column].color){
                count++;
            }
        }
        ///here the user win + put in the index in the win array
        if(count==3){
            for(var j=0;j<4;j++)
            {
            winArray[j].columnIndex=column;
            winArray[j].rowIndex=(row-j);
            }
            win=count;
        }
        count=0;
        return win==3;
    }
    //the function get row and column. return true if there is line of 4 circles in riw in the same color
    function sideCheck(row,column)
    {
        var win=0;
        var count=0;
        var countRight=0,countLeft=0;
            //checkes the left and the right
        for(var i=1;i<4;i++){
            if(column+i<7){
                if($scope.circles[row][column].color==$scope.circles[row][column+i].color){
                    countRight++;
                    count++;
                }
            }

            if((column-i)>=0){
                
                if($scope.circles[row][column].color==$scope.circles[row][column-i].color){
                    countLeft++;
                    count++;
                }
            }


        }
        ///here the user win + put in the index in the win array
        if(count>=3){
            winArray[0].columnIndex=column;
            winArray[0].rowIndex=row;
            for(var j=1;j<countRight+1;j++)
            {
                winArray[j].columnIndex=(column+j);
                winArray[j].rowIndex=row;
            }
            for(var j=1;j<countLeft+1;j++)
            {
                winArray[j+countRight].columnIndex=(column-j);
                winArray[j+countRight].rowIndex=row;
            }
            win=count;
        }
        count=0;
        return win==3;
    }
    //the function get row and column , return true if there is diagonal line in the same color
    function diagonalsCheck(row,column)
    {   
        var win=0;
        var count=0;
        var countUpRight=0,countDownLeft=0;
        var countUpLeft=0;countDownRight=0;
            // checkes the diagonal
        for(var i=1;i<4;i++){
            if((row+i)<6&&(column+i)<7){
                if($scope.circles[row][column].color==$scope.circles[row+i][column+i].color){
                    countUpRight++;
                    count++;
                }
            }
            if((row-i)>=0&&(column-i)>=0){
                if($scope.circles[row][column].color==$scope.circles[row-i][column-i].color){
                    countDownLeft++;
                    count++;
                }
            }
        }
        ///here the user win + put in the index in the win array

        if(count>=3){
            winArray[0].columnIndex=column;
            winArray[0].rowIndex=row;
            for(var j=1;j<countUpRight+1;j++)
            {
                winArray[j].columnIndex=(column+j);
                winArray[j].rowIndex=(row+j);
            }
            for(var j=1;j<countDownLeft+1;j++)
            {
                winArray[j+countUpRight].columnIndex=(column-j);
                winArray[j+countUpRight].rowIndex=(row-j);
            }
            win=count;
        }
        count=0;
            // checkes the diagonal
        for(var i=1;i<4;i++){
            if((row+i)<6&&(column-i)>0){
                if($scope.circles[row][column].color==$scope.circles[row+i][column-i].color){
                    countUpLeft++;
                    count++;
                }
            }
            if((row-i)>=0&&(column+i)<7){
                if($scope.circles[row][column].color==$scope.circles[row-i][column+i].color){
                    countDownRight++;
                    count++;
                }
            }
        }
            ///here the user win + put in the index in the win array
        if(count>=3){
            winArray[0].columnIndex=column;
            winArray[0].rowIndex=row;
            for(var j=1;j<countUpLeft+1;j++)
            {
                winArray[j].columnIndex=(column-j);
                winArray[j].rowIndex=(row+j);
            }
            for(var j=1;j<countDownRight+1;j++)
            {
                winArray[j+countUpLeft].columnIndex=(column+j);
                winArray[j+countUpLeft].rowIndex=(row-j);
            }
            win=count;
        }
        count=0;
        return win>=3;
    }
    //the function reset the game, when user clicked -new game-
    $scope.resetGame=function()
    {
        // init the circles
        $scope.circles = new Array(6);
        for(var i=0;i<6;i++){
            $scope.circles[i]= new Array(7);
        }
        for(var j=0;j<7;j++){
            for(var i=0;i<6;i++)
            {
                $scope.circles[i][j]={color:null,id:'circle'+(i+1)+j};
            }
        }
        counter=[0,0,0,0,0,0,0];//count the time that one column clicked
        height=[90,90,90,90,90,90,90];
        $scope.gameOver=false;
        $scope.player1=true;
        redColor=true;
    }
});