/* =========================================================
   MOBILE OVERLAY – FADE IN ANIMATION (WITH MEMORY)
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const overlay = document.getElementById("deviceOverlay");
  const continueBtn = document.getElementById("continueBtn");

  if (!overlay) return;

  /* Show only on small screens */
  const isSmallScreen = window.innerWidth <= 900;

  /* Already accepted → never show */
  if (localStorage.getItem("deviceAccepted") === "true") {
    overlay.style.display = "none";
    return;
  }

  if (isSmallScreen) {

    continueBtn?.addEventListener("click", function () {

      overlay.classList.add("zoom-out");

      localStorage.setItem("deviceAccepted", "true");

      setTimeout(() => {
        overlay.style.display = "none";
      }, 900);

    });

  } else {
    overlay.style.display = "none";
  }

});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));


// Join button scroll
const joinBtn = document.querySelector('.nav-cta');
if(joinBtn){
  joinBtn.addEventListener('click', () => {
    document.querySelector('#join').scrollIntoView({ behavior: 'smooth' });
  });
}


/* ==========================
   GALLERY SWITCH FUNCTION
   ========================== */

function showGallery(id){

    document.querySelectorAll(".gallery-container").forEach(g=>{
        g.style.display="none";
    });

    const selected = document.getElementById(id);
    if(selected){
        selected.style.display="grid";
        selected.scrollIntoView({ behavior: "smooth" });
    }
}

/* =============================
   NETWORK PRELOADER ANIMATION
============================= */

const canvas = document.getElementById("networkCanvas");

if(canvas){

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let nodes = [];

  for(let i=0;i<50;i++){
    nodes.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      dx:(Math.random()-0.5)*0.7,
      dy:(Math.random()-0.5)*0.7
    });
  }

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    nodes.forEach(n=>{
      n.x+=n.dx;
      n.y+=n.dy;

      if(n.x<0||n.x>canvas.width) n.dx*=-1;
      if(n.y<0||n.y>canvas.height) n.dy*=-1;

      ctx.beginPath();
      ctx.arc(n.x,n.y,2,0,Math.PI*2);
      ctx.fillStyle="#00c8ff";
      ctx.fill();
    });

    for(let i=0;i<nodes.length;i++){
      for(let j=i;j<nodes.length;j++){
        let dist = Math.hypot(
          nodes[i].x-nodes[j].x,
          nodes[i].y-nodes[j].y
        );
        if(dist<120){
          ctx.beginPath();
          ctx.moveTo(nodes[i].x,nodes[i].y);
          ctx.lineTo(nodes[j].x,nodes[j].y);
          ctx.strokeStyle="rgba(0,200,255,0.2)";
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("load",()=>{
    setTimeout(()=>{
      document.querySelector(".preloader").classList.add("hide");
    },3500);
  });

}

