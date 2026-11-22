const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const loader=$("#loader"),enter=$("#enterBtn");
const enterWorld=()=>{loader.classList.add("done");document.documentElement.classList.remove("is-booting");document.documentElement.classList.add("is-entered");};
enter.addEventListener("click",enterWorld);
window.addEventListener("load",()=>{setTimeout(()=>enter.hidden=false,700);});
setTimeout(()=>{if(!loader.classList.contains("done"))enter.hidden=false;},1800);
const menuBtn=$("#menuBtn"),nav=$("#nav");
menuBtn.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",String(open));});
$$("a",nav).forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuBtn.setAttribute("aria-expanded","false");}));
$("#year").textContent=new Date().getFullYear();
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObserver.unobserve(e.target);}}),{threshold:.12});
$$(".timeline-item,.education-list article,.field-card,.beyond-list p,.manifesto-heading,.journey-head,.field-head").forEach(el=>{el.classList.add("reveal");revealObserver.observe(el);});
const canvas=$("#starfield"),ctx=canvas.getContext("2d");let w=0,h=0,dpr=1,stars=[];
function resize(){dpr=Math.min(devicePixelRatio||1,2);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(170,Math.floor(w*h/6500))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.25+.2,a:Math.random()*.65+.12,s:Math.random()*.35+.06,p:Math.random()*6.28}));}
function draw(t){ctx.clearRect(0,0,w,h);for(const s of stars){const pulse=.55+.45*Math.sin(t*.0006+s.p);ctx.beginPath();ctx.fillStyle="rgba(230,190,168,"+(s.a*pulse)+")";ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();s.y-=s.s*.12;if(s.y<0)s.y=h;}requestAnimationFrame(draw);}
resize();window.addEventListener("resize",resize);requestAnimationFrame(draw);
const hero=$("#home");window.addEventListener("pointermove",e=>{if(innerWidth<800)return;const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);$(".hero-portrait-wrap").style.transform="translate("+(-x*12)+"px,"+(-y*9)+"px)";$(".hero-copy").style.transform="translate("+(-x*3)+"px,"+(-y*2)+"px)";},{passive:true});
const topbar=$("#header");window.addEventListener("scroll",()=>{topbar.style.background=scrollY>50?"rgba(5,5,5,.88)":"transparent";topbar.style.backdropFilter=scrollY>50?"blur(16px)":"none";},{passive:true});
