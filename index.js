const sampleImg = "https://3.bp.blogspot.com/-8tO27OaQmKo/W1vhDEBgLMI/AAAAAAABNtc/WqKk_bLT1k0O2loY5VH5UeNp6ejZ3GBwQCLcBGAs/s800/character_earth_chikyu_internet.png";
const imageArea = document.getElementById("image");
imageArea.src = sampleImg;

randomArray = [2,5,9,3,1,6,8,7,4]

// 画像のリサイズを行う関数
// direction=縦横　0なら横のサイズ、1なら縦のサイズを指定する
function imageResize(targetImage,direction, size){
  const orgWidth  = targetImage.width;  // 元の横幅を保存
  const orgHeight = targetImage.height; // 元の高さを保存
  console.log(orgHeight)
  if(direction == 0){
    targetImage.width = size;  // 横幅を指定サイズにリサイズ
    targetImage.height = size; // 同じ割合でリサイズ
  }else{
    targetImage.height = size;  // 縦幅を指定サイズにリサイズ
    targetImage.Width = orgWidth * (targetImage.height / orgHeight); // 同じ割合でリサイズ
  }
}
function cutImage(array){
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0, 0, 300, 300);
    const img = new Image();
    img.src = sampleImg;
    imageResize(img,0,300)
    const xmax = 3;
    const ymax = 3;
    const imgWidth  = img.width;
    const imgHeight = img.height;
    var width0 = imgWidth / xmax;
    var height0 = imgHeight / ymax;
    var ary = [];
    var cnt = 0;

    for(var i = 0; i < xmax; i++){
      for(var j = 0; j < ymax; j++){
        ary[cnt++] = [i,j];
      }
    }

    for(var i = 0; i < xmax; i++){
      for(var j = 0; j < ymax; j++){
        cnt--;
        var x = ary[array[cnt] - 1][0];
        var y = ary[array[cnt] - 1][1];
        ctx.drawImage(img, width0 * x, height0 * y, width0, height0, imgWidth * i, imgWidth * j, imgWidth, imgWidth);
      }
    }
  }
}
imageResize(imageArea,0,300);
cutImage(randomArray);
