$(function(){


 // Nhạc nền-------------------------------------------------
const music = document.getElementById("bg-music");
const btn = document.getElementById("music-toggle");

music.volume = 0.3;

// khi người dùng chạm lần đầu ở bất kỳ đâu
document.addEventListener("click", () => {

  music.muted = false;
  music.play();

}, { once: true });

// nút bật/tắt nhạc
btn.addEventListener("click", () => {

  if (music.paused) {

    music.play();
    btn.innerHTML = "🔊";

  } else {

    music.pause();
    btn.innerHTML = "🔇";

  }

});
// Nhạc nền-----

// cuộn mượt khi bấn link trong trang
$("a[href^='#']").click(function(e){

e.preventDefault();

$("html,body").animate({
scrollTop:$($(this).attr("href")).offset().top
},500);

});

// Click ảnh cá nhân sẽ hiện to ra
$(".parents img").click(function(){

let src=$(this).attr("src");

let modal=`<div class="modal fade" id="photoModal">
 <div class="modal-dialog modal-dialog-centered"> <div class="modal-content border-0 bg-transparent"> 
 <img src="${src}" style="width:100%;border-radius:5px;"> </div> </div> </div>`; //bo góc ảnh

$("body").append(modal);

$("#photoModal").modal("show");

$("#photoModal").on("hidden.bs.modal",function(){
$(this).remove();
});

});


//click ảnh trong album sẽ hiện ra ảnh to
$(".gallery-scroll img").click(function(){

let src=$(this).attr("src");

let modal=`<div class="modal fade" id="photoModal">
 <div class="modal-dialog modal-dialog-centered"> <div class="modal-content border-0 bg-transparent"> 
 <img src="${src}" style="width:100%;border-radius:5px;"> </div> </div> </div>`; //bo góc ảnh

$("body").append(modal);

$("#photoModal").modal("show");

$("#photoModal").on("hidden.bs.modal",function(){
$(this).remove();
});

});



//slider cho hình ảnh album-------------------------------------------
// KHỞI TẠO SLICK
$('.gallery-slider').slick({
  dots: true,
  arrows: true, // 👈 bật mũi tên
  infinite: true,
  speed: 500,
  fade: false, // 👉 nên tắt fade để chuyển mượt kiểu trượt
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,

  prevArrow: '<button class="slick-prev custom-arrow"></button>',
  nextArrow: '<button class="slick-next custom-arrow"></button>'
});

});

// hiệu ứng cuộn màn hình=============================================================
document.addEventListener("DOMContentLoaded", function () {

  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.2 // xuất hiện khi 20% phần tử vào màn hình
  });

  sections.forEach(section => {
    observer.observe(section);
  });

});

// Hiệu ứng cứng hoa đào rơi toàn màn hình ================================================
// const canvas = document.getElementById("petal-canvas");
// const ctx = canvas.getContext("2d");

// let petals = [];

// function resizeCanvas() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// }

// resizeCanvas();
// window.addEventListener("resize", resizeCanvas);

// // tạo cánh hoa
// function createPetal() {
//   return {
//     x: Math.random() * canvas.width,
//     y: Math.random() * canvas.height,
//     size: Math.random() * 6 + 4,
//     speedY: Math.random() * 1 + 0.5,
//     speedX: Math.random() * 0.5 - 0.25,
//     angle: Math.random() * Math.PI * 2
//   };
// }

// // tạo nhiều cánh hoa
// for (let i = 0; i < 25; i++) {
//   petals.push(createPetal());
// }

// // vẽ cánh hoa
// function drawPetal(p) {
//   ctx.beginPath();
//   ctx.fillStyle = "#f8c8dc";
//   ctx.moveTo(p.x, p.y);
//   ctx.ellipse(p.x, p.y, p.size, p.size / 2, p.angle, 0, Math.PI * 2);
//   ctx.fill();
// }

// // animate
// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   petals.forEach(p => {
//     p.y += p.speedY;
//     p.x += p.speedX;
//     p.angle += 0.01;

//     if (p.y > canvas.height) {
//       p.y = -10;
//       p.x = Math.random() * canvas.width;
//     }

//     drawPetal(p);
//   });

//   requestAnimationFrame(animate);
// }

// animate();
// =============

// Hiệu ứng cánh hoa rơi ở section đầu
const canvas = document.getElementById("petal-canvas-hero");
const ctx = canvas.getContext("2d");

let petals = [];

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// tạo cánh hoa
function createPetal() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 6 + 4,
    speedY: Math.random() * 0.6 + 0.3,
    speedX: Math.random() * 0.4 - 0.2,
    angle: Math.random() * Math.PI * 2
  };
}

// số lượng ít lại cho sang
for (let i = 0; i < 15; i++) {
  petals.push(createPetal());
}

// vẽ
function drawPetal(p) {
  ctx.beginPath();
  ctx.fillStyle = "#f8c8dc"; // hợp tone bạn
  ctx.ellipse(p.x, p.y, p.size, p.size / 2, p.angle, 0, Math.PI * 2);
  ctx.fill();
}

// animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach(p => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.angle += 0.01;

    // reset khi chạm đáy hero
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }

    drawPetal(p);
  });

  requestAnimationFrame(animate);
}

animate();
// ==================================

// Ảnh cô dâu chú rể hiện ra khi thanh cuộn đến hình chú rể---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {

  const parentBox = document.querySelector(".parents");

  const parentObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        parentBox.classList.add("show");

      }

    });

  }, {
    threshold: 0.7
  });

  parentObserver.observe(parentBox);

});
// const parentBox = document.querySelector(".parents");

// const parentObserver = new IntersectionObserver((entries) => {

//   entries.forEach(entry => {

//     if (entry.isIntersecting) {

//       parentBox.classList.add("show");

//     }

//   });

// }, {
//   threshold: 0.7
// });

// parentObserver.observe(parentBox);

