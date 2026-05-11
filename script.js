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



});

// Dành cho album ảnh===========================================
function initGallery(){

  $('.gallery-main').slick({

    slidesToShow:1,
    slidesToScroll:1,

    arrows:false,
    fade:true,

    asNavFor:'.gallery-thumb'

  });

  $('.gallery-thumb').slick({

    slidesToShow:5,
    slidesToScroll:1,

    asNavFor:'.gallery-main',

    focusOnSelect:true,

    arrows:false,
    dots:false

  });

  // CLICK ẢNH -> MỞ MODAL
$(".gallery-main img").click(function(){

  let src=$(this).attr("src");

  let modal=`

  <div class="modal fade" id="photoModal">

    <div class="modal-dialog modal-dialog-centered">

      <div class="modal-content border-0 bg-transparent">

        <img src="${src}"
        style="width:100%;border-radius:5px;">

      </div>

    </div>

  </div>`;

  $("body").append(modal);

  $("#photoModal").modal("show");

  $("#photoModal").on("hidden.bs.modal",function(){

    $(this).remove();

  });

});

};



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


// Hình ảnh bìa =============================================================
const openingScreen = document.getElementById("opening-screen");
const mainContent = document.getElementById("main-content");

let opened = false;

// function mở thiệp
function openInvitation(){

  // tránh chạy nhiều lần
  if(opened) return;

  opened = true;

  openingScreen.style.opacity = "0";

  setTimeout(() => {

    openingScreen.style.display = "none";

    mainContent.style.display = "block";

    //KHỞI TẠO GALLERY SAU KHI CONTENT HIỆN RA

    setTimeout(() => {

      initGallery();

    }, 100);
    // =======

    // bật nhạc
    const music = document.getElementById("bg-music");

    if(music){

      music.muted = false;

      music.play();

    }

  }, 1200);

}

// click mở
openingScreen.addEventListener("click", openInvitation);

// vuốt / lướt mở trên điện thoại
window.addEventListener("touchmove", openInvitation, { once:true });

// cuộn chuột trên máy tính
window.addEventListener("wheel", openInvitation, { once:true });


// Phong bì ===============================================
const envelope = document.getElementById("envelope");

function openEnvelope() {
  envelope.classList.add("open");
}

function closeEnvelope() {
  envelope.classList.remove("open");
}

/* 🔁 vòng lặp tự động */
function autoAnimation() {
  openEnvelope();

  setTimeout(() => {
    closeEnvelope();
  }, 1000); // giữ mở 2 giây
}

/* chạy lần đầu */
autoAnimation();

/* lặp vô hạn */
setInterval(autoAnimation, 3000);