
var blocks = [];
var canvas; 
var img;
var status = 0;
var option = {
    'difficulty' : ""
};

var difficulty; 

function selectDifficulty( value, difficulty ){
    value = difficulty; 
    return value ;
};

var BOARD = { 
    'X_RANGE'   : document.getElementById("image").width,
    'Y_RANGE'   : document.getElementById("image").height,
    'X_BLOCKS'  
};

