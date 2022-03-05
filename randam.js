
// var blocks = [];
// var canvas; 
// var img;
// var status = 0;
// var option = {
//     'difficulty' : ""
// };


 var blocks = []; 
 var canvas ; 
 var img ; 
 var status = 0;

 var BOARD = {
     'X_RANGE' : 300,
     'Y_RANGE' : 300,
     'X_BLOCKS' : 3,
     'Y_BLOCKS' : 3,
     'DIRECT_MAX' : 4,
     'SHUFFLE_CNT' : 100,
     };


     var diff = [-BOARD.X_BLOCKS, -1, 1, BOARD.X_BLOCKS];
 
     function shuffleBlocks(array) {
       
       var blk_id = -1;
       for (var i = 0; i < BOARD.X_BLOCKS * BOARD.Y_BLOCKS; i++) {
         if ((array[i][0] == (BOARD.X_BLOCKS-1)) && 
             (array[i][1] == (BOARD.Y_BLOCKS-1))) {
            
            // 空きブロックのindex
            blk_id = i;
            break;
         }  
       }
       
       var n = 0;
       while (n < BOARD.SHUFFLE_CNT) {
       
         var direct = Math.floor(n * Math.random() % BOARD.DIRECT_MAX);
         
         // 空きブロックを移動可能な限り適当に移動する
         if (0 <= blk_id + diff[direct] && blk_id + diff[direct] < BOARD.X_BLOCKS * BOARD.Y_BLOCKS) {
           var tmp_blocks = array[blk_id];
           
           array[blk_id] = array[blk_id + diff[direct]];
           array[blk_id + diff[direct]] = tmp_blocks;
           
           blk_id = blk_id + diff[direct];
         }
         
         n++;
       }
       
       return array;
     }
      
     function moveBlock(e) {
       var rect = e.target.getBoundingClientRect();
       var width = BOARD.X_RANGE / BOARD.X_BLOCKS;
       var height = BOARD.Y_RANGE / BOARD.Y_BLOCKS;
       
       // クリックしたブロック(座標)を算出
       var mouseX = Math.floor((e.clientX - Math.floor(rect.left)) / width);
       var mouseY = Math.floor((e.clientY - Math.floor(rect.top)) / height);
       
       // ブロック(blocks)のindexに変換
       var blk_id = mouseX * BOARD.X_BLOCKS + mouseY;
       
       // 上下左右の4方向
       for (i = 0; i < BOARD.DIRECT_MAX; i++) {
         if (0 <= blk_id + diff[i] && blk_id + diff[i] < BOARD.X_BLOCKS * BOARD.Y_BLOCKS) {
           // 隣が空ブロックなら位置を交換
           if ((blocks[blk_id + diff[i]][0] == (BOARD.X_BLOCKS-1)) &&
               (blocks[blk_id + diff[i]][1] == (BOARD.Y_BLOCKS-1))) {
               
             var tmp_blocks = blocks[blk_id];
             
             blocks[blk_id] = blocks[blk_id + diff[i]];
             blocks[blk_id + diff[i]] = tmp_blocks;
             
             break;
           }
         }
       }
     }
      
     function drawBlock(ctx) {
       
       var width   = BOARD.X_RANGE / BOARD.X_BLOCKS;
       var height  = BOARD.Y_RANGE / BOARD.Y_BLOCKS;
       var width0  = img.width / BOARD.X_BLOCKS;
       var height0 = img.height / BOARD.Y_BLOCKS;
       var blk_cnt = BOARD.X_BLOCKS * BOARD.Y_BLOCKS;
       
       // 一度キャンバスを白に戻す
       ctx.fillStyle = "rgb(255,255,255)";
       ctx.fillRect(0, 0, BOARD.X_RANGE, BOARD.Y_RANGE);
       
       // ブロックを描画
       for(var i = 0; i < BOARD.X_BLOCKS; i++){
         for(var j = 0; j < BOARD.Y_BLOCKS; j++){
           
           var x = blocks[(BOARD.X_BLOCKS * BOARD.Y_BLOCKS) - blk_cnt][0];
           var y = blocks[(BOARD.X_BLOCKS * BOARD.Y_BLOCKS) - blk_cnt][1];
           
           // 最右下のブロックは空ブロック(黒塗り)
           if ((x == BOARD.X_BLOCKS - 1) && (y == BOARD.Y_BLOCKS - 1)) {
             ctx.fillStyle = "rgb(0,0,0)";
             ctx.fillRect(width * i, height * j, width, height);
           } else {
             ctx.drawImage(img, width0 * x, height0 * y,width0, height0, width * i, height * j, width, height);
           }
           blk_cnt--;
         }
       }
     }
      
     function shuffle() {
       
       // 描画コンテキストの取得
       var canvas = document.getElementById('c');
       
       if (canvas.getContext) {
         var ctx = canvas.getContext('2d');
         ctx.fillStyle = "rgb(255,255,255)";
         ctx.fillRect(0, 0, BOARD.X_RANGE, BOARD.Y_RANGE);
         
         // 画像データがロード済みならシャッフルして描画
         if (status != 0) {
           var width = BOARD.X_RANGE / BOARD.X_BLOCKS;
           var height = BOARD.Y_RANGE / BOARD.Y_BLOCKS;
           var width0 = img.width / BOARD.X_BLOCKS;
           var height0 = img.height / BOARD.Y_BLOCKS;
           var blk_cnt = 0;
           
           // 初期配置
           for(var i = 0; i < BOARD.X_BLOCKS; i++){
             for(var j = 0; j < BOARD.Y_BLOCKS; j++){
               blocks[blk_cnt++] = [i,j];
             }
           }
           
           // ブロックをシャッフル
           blocks = shuffleBlocks(blocks);
           
           // ブロックの配置
           for(var i = 0; i < BOARD.X_BLOCKS; i++){
             for(var j = 0; j < BOARD.Y_BLOCKS; j++){
               
               var x = blocks[(BOARD.X_BLOCKS * BOARD.Y_BLOCKS) - blk_cnt][0];
               var y = blocks[(BOARD.X_BLOCKS * BOARD.Y_BLOCKS) - blk_cnt][1];
               
               // 最右下のブロックは空ブロック(黒塗り)
               if ((x == BOARD.X_BLOCKS - 1) && (y == BOARD.Y_BLOCKS - 1)) {
                 ctx.fillStyle = "rgb(0,0,0)";
                 ctx.fillRect(width * i, height * j, width, height);
               } else {
                 ctx.drawImage(img, width0 * x, height0 * y,width0, height0, width * i, height * j, width, height);
               }
               blk_cnt--;
             }
           }
         } else {
           ctx.font = "20px Arial";
           ctx.strokeStyle = "red";
           ctx.strokeText("画像データが未ロードです", 0, 150);
         }
         
         // ブロック移動処理
         canvas.onclick = function(event) {
           moveBlock(event);
           drawBlock(ctx);
         }
       }
     }
      
     function loadImage() {
       status = 0;
       canvas = document.getElementById('c');
       
       if (canvas.getContext) {
         var ctx = canvas.getContext('2d');
         ctx.fillStyle = "rgb(255,255,255)";
         ctx.fillRect(0, 0, 300, 300);
         
         img = new Image();
         
         img.src = document.getElementById('url').value;
         img.onload = function() {
           ctx.drawImage(img, 0,0, this.width, this.width, 0, 0, BOARD.X_RANGE, BOARD.Y_RANGE);
           status = 1;
         }
       }
     }


     
var difficulty; 

function selectDifficulty( array,  number ){
    
    value = number; 
    
    array.X_BLOCKS = number;
    array.Y_BLOCKS = number; 

    document.getElementById("test").textContent = number;
    document.getElementById("test1").textContent = array.X_BLOCKS;
    document.getElementById("test2").textContent = array.Y_BLOCKS;
    return array;
}


