const menu=document.querySelector('.menu-btn');
const links=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
window.addEventListener('scroll',()=>document.getElementById('nav').style.background=scrollY>40?'rgba(5,5,5,.72)':'transparent');

/* Particle loader: scattered points assemble into RIYA FATHIMA, then disperse. */
(() => {
  const loader = document.getElementById('siteLoader');
  const canvas = document.getElementById('loaderCanvas');
  if (!loader || !canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [], targets = [], w, h, start = performance.now();

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w*dpr; canvas.height = h*dpr;
    canvas.style.width = w+'px'; canvas.style.height = h+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    buildTargets();
  }
  function buildTargets() {
    const off = document.createElement('canvas'), oc = off.getContext('2d');
    off.width = Math.min(1100,w); off.height = 220;
    const size = Math.min(125, off.width/9);
    oc.fillStyle='#fff'; oc.font=`700 ${size}px DM Sans, sans-serif`;
    oc.textAlign='center'; oc.textBaseline='middle';
    oc.fillText('RIYA FATHIMA',off.width/2,off.height/2);
    const data=oc.getImageData(0,0,off.width,off.height).data;
    targets=[];
    const step=w<600?5:6;
    for(let y=0;y<off.height;y+=step) for(let x=0;x<off.width;x+=step){
      if(data[(y*off.width+x)*4+3]>120) targets.push({x:x+(w-off.width)/2,y:y+(h-off.height)/2});
    }
    particles=targets.map((t,i)=>({
      x:Math.random()*w,y:Math.random()*h,tx:t.x,ty:t.y,
      size:Math.random()*1.8+.5,speed:.018+Math.random()*.025,phase:Math.random()*Math.PI*2
    }));
  }
  function frame(now){
    const elapsed=now-start, assemble=Math.min(1,Math.max(0,(elapsed-250)/1400));
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      const ease=1-Math.pow(1-assemble,3);
      p.x+=(p.tx-p.x)*p.speed*1.8*ease;
      p.y+=(p.ty-p.y)*p.speed*1.8*ease;
      const shimmer=Math.sin(now*.004+p.phase)*.45+.55;
      ctx.fillStyle=`rgba(243,240,237,${shimmer*.75})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();
    });
    if(elapsed<2900) requestAnimationFrame(frame);
    else {
      loader.classList.add('done');
      setTimeout(()=>loader.remove(),900);
    }
  }
  window.addEventListener('resize',resize);
  resize(); requestAnimationFrame(frame);
})();
