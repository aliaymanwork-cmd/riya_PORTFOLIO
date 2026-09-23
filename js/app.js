const menu=document.querySelector('.menu-btn');
const links=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
window.addEventListener('scroll',()=>document.getElementById('nav').style.background=scrollY>40?'rgba(5,5,5,.72)':'transparent');
