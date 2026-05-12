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



// Hiệu ứng cánh hoa rơi toàn màn hình--------------------------------------------

const canvas = document.getElementById("petal-canvas");
const ctx = canvas.getContext("2d");

let petals = [];

// resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// tạo cánh hoa
function createPetal() {

  return {

    x: Math.random() * canvas.width,

    y: Math.random() * canvas.height,

    size: Math.random() * 7 + 2,

    speedY: Math.random() * 1 + 0.4,

    speedX: Math.random() * 0.8 - 0.4,

    rotation: Math.random() * 360,

    rotationSpeed: Math.random() * 0.6 - 0.3,

    swing: Math.random() * 2

  };

}

// số lượng cánh hoa
for(let i = 0; i < 15; i++) {
  petals.push(createPetal());
}

// vẽ cánh hoa
function drawPetal(p){

  ctx.save();

  ctx.translate(p.x, p.y);

  ctx.rotate(p.rotation * Math.PI / 180);

  // gradient cho sang hơn
  const gradient = ctx.createLinearGradient(
    -p.size,
    0,
    p.size,
    0
  );

  gradient.addColorStop(0, "#fff0f5");
  gradient.addColorStop(0.5, "#f8c8dc");
  gradient.addColorStop(1, "#f4a7bb");

  ctx.fillStyle = gradient;

  ctx.beginPath();

  ctx.ellipse(
    0,
    0,
    p.size,
    p.size * 0.55,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();

}

// animation
function animate(){

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach((p, index) => {

    // rơi xuống
    p.y += p.speedY;

    // bay lắc nhẹ
    p.x += Math.sin(p.y * 0.01) * p.swing + p.speedX;

    // xoay
    p.rotation += p.rotationSpeed;

    // reset
    if(p.y > canvas.height + 20){

      petals[index] = {

        ...createPetal(),

        y: -20

      };

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