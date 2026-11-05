(()=>{
const d=document,r=d.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
r.classList.add('js');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
['section h2','.about p','.facts','.tl>li','.cols .card','.skills>div','.list li','.contact p','.contact .social'].forEach(g=>d.querySelectorAll(g).forEach((el,i)=>{el.classList.add('rv');el.style.setProperty('--d',(i%4)*.08+'s');io.observe(el)}));
const stacks=[],tl=d.querySelector('.tl'),h1=d.querySelector('.hero h1');
stacks.forEach(g=>g.forEach((c,i)=>c.style.setProperty('--i',i)));
const cl=(v)=>Math.min(1,Math.max(0,v));
function tick(){
 const y=scrollY,max=r.scrollHeight-innerHeight;
 r.style.setProperty('--sp',max>0?cl(y/max):0);
 if(tl){const t=tl.getBoundingClientRect();tl.style.setProperty('--p',cl((innerHeight*.6-t.top)/t.height))}
 if(rm)return;
 if(h1)h1.style.setProperty('--sy',Math.min(y,600));
 stacks.forEach(cards=>cards.forEach((c,i)=>{const n=cards[i+1],b=c.getBoundingClientRect(),k=n?cl((b.bottom-n.getBoundingClientRect().top)/b.height):0;c.style.transform='scale('+(1-.05*k).toFixed(3)+')'}));
}
let q=0;
addEventListener('scroll',()=>{if(!q){q=1;requestAnimationFrame(()=>{q=0;tick()})}},{passive:true});
addEventListener('resize',tick);tick();
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
d.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
 const h=a.getAttribute('href'),t=h==='#top'?null:d.querySelector(h);
 if(h!=='#top'&&!t)return;e.preventDefault();
 const to=t?t.getBoundingClientRect().top+scrollY-24:0,from=scrollY;
 if(rm){scrollTo(0,to);return}
 const T=1100,s=performance.now();
 (function f(n){const p=Math.min(1,(n-s)/T);scrollTo(0,from+(to-from)*ease(p));if(p<1)requestAnimationFrame(f)})(s);
}));
const links=[...d.querySelectorAll('.bar nav a')];
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>{const h=l.getAttribute('href');if(h&&h[0]==='#')l.classList.toggle('on',h==='#'+e.target.id)})}),{rootMargin:'-45% 0px -50% 0px'});
['about','journey','skills','work','publications','blogs','research','contact'].forEach(id=>{const el=d.getElementById(id);if(el)so.observe(el)});
const mb=d.querySelector('.burger'),mn=d.getElementById('menu');
const setMenu=o=>{r.classList.toggle('menu-open',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Close menu':'Open menu');if(o)mn.querySelector('a').focus({preventScroll:true})};
mb.addEventListener('click',()=>setMenu(!r.classList.contains('menu-open')));
mn.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape'&&r.classList.contains('menu-open')){setMenu(false);mb.focus()}});
})();

(()=>{
const d=document,r=d.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const btn=d.querySelector('.gs-btn'),pan=d.getElementById('gsearch'),q=d.getElementById('gq'),res=d.getElementById('gres'),burger=d.querySelector('.burger');
const clean=t=>t.replace(/\s+/g,' ').trim(),idx=[];
const add=(el,sec,title,text)=>{if(el&&title){title=clean(title);text=clean(text);idx.push({el,sec,title,text,tl:title.toLowerCase(),low:(title+' '+text).toLowerCase()})}};
const one=(sel,sec,title)=>{const e=d.querySelector(sel);if(e)add(e,sec,title,e.textContent)};
one('.hero .role','Home','Role');one('.hero .lead','Home','Intro');
d.querySelectorAll('.about p').forEach(p=>add(p,'About','About me',p.textContent));
d.querySelectorAll('.tl>li').forEach(li=>{const h=li.querySelector('h3');add(li,'Journey',h?h.textContent:'',li.textContent)});
d.querySelectorAll('.skills>div').forEach(c=>{const h=c.querySelector('h3');add(c,'Skills',h?h.textContent:'',[...c.querySelectorAll('.chips span')].map(x=>x.textContent).join(', '))});
d.querySelectorAll('#work .card').forEach(c=>{const h=c.querySelector('h3');add(c,'Projects',h?h.textContent:'',c.textContent)});
d.querySelectorAll('#blogs .card').forEach(c=>{const h=c.querySelector('h3');add(c,'Blogs',h?h.textContent:'',c.textContent)});
d.querySelectorAll('#research .card').forEach(c=>{const h=c.querySelector('h3');add(c,'Research',h?h.textContent:'',c.textContent)});
one('#contact','Contact','Contact');
const jumps=[...d.querySelectorAll('.bar nav a')].map(a=>[a.textContent.trim(),a.getAttribute('href')]);
const esc=t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const hl=(txt,terms)=>{const f=d.createDocumentFragment(),re=new RegExp('('+terms.map(esc).join('|')+')','ig');txt.split(re).forEach((p,i)=>{if(i%2){const m=d.createElement('mark');m.textContent=p;f.appendChild(m)}else f.appendChild(d.createTextNode(p))});return f};
const mk=(tag,cls,txt)=>{const e=d.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e};
let isOpen=false;
const setOpen=(o,refocus)=>{isOpen=o;pan.hidden=!o;btn.setAttribute('aria-expanded',o);if(o){if(r.classList.contains('menu-open'))burger.click();q.value='';show('');q.focus()}else if(refocus)btn.focus()};
const go=(el,hit)=>{setOpen(false,false);scrollTo({top:Math.max(0,el.getBoundingClientRect().top+scrollY-(hit?96:24)),behavior:rm?'auto':'smooth'});if(hit){el.classList.add('hit');setTimeout(()=>el.classList.remove('hit'),2400)}};
function show(v){
 res.textContent='';
 const terms=v.toLowerCase().split(/\s+/).filter(Boolean);
 if(!terms.length){
  res.appendChild(mk('p','gs-note','Jump to a section, or type a skill, company or project.'));
  const j=mk('div','gs-jump');
  jumps.forEach(([n,h])=>{const b=mk('button',null,n);b.type='button';b.onclick=()=>{if(h[0]==='#')go(d.getElementById(h.slice(1)),false);else location.href=h};j.appendChild(b)});
  res.appendChild(j);return;
 }
 const hits=idx.map(e=>terms.every(t=>e.low.includes(t))?{e,s:terms.reduce((a,t)=>a+(e.tl.includes(t)?3:1),0)}:null).filter(Boolean).sort((a,b)=>b.s-a.s).slice(0,8);
 if(!hits.length){res.appendChild(mk('p','gs-note','No match for “'+v.trim()+'”. Try a skill like Python, a company, or a project name.'));return}
 hits.forEach(({e})=>{
  const b=mk('button','gs-i');b.type='button';
  const t=mk('span','gs-t');t.appendChild(hl(e.title,terms));t.appendChild(mk('span','gs-s',e.sec));
  const low=e.text.toLowerCase();let k=Math.min(...terms.map(x=>{const i=low.indexOf(x);return i<0?1e9:i}));if(k===1e9)k=0;
  const st=Math.max(0,k-40),sn=(st>0?'…':'')+e.text.slice(st,st+120)+(st+120<e.text.length?'…':'');
  const p=mk('span','gs-p');p.appendChild(hl(sn,terms));
  b.append(t,p);b.onclick=()=>go(e.el,true);res.appendChild(b);
 });
}
btn.addEventListener('click',()=>setOpen(!isOpen,true));
burger.addEventListener('click',()=>{if(isOpen)setOpen(false,false)});
q.addEventListener('input',()=>show(q.value));
q.addEventListener('keydown',e=>{
 if(e.key==='Enter'){const f=res.querySelector('.gs-i');if(f)f.click()}
 if(e.key==='ArrowDown'){const f=res.querySelector('button');if(f){e.preventDefault();f.focus()}}
});
res.addEventListener('keydown',e=>{
 if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;
 const items=[...res.querySelectorAll('button')],i=items.indexOf(d.activeElement);
 e.preventDefault();
 if(e.key==='ArrowDown')(items[i+1]||items[i]).focus();
 else if(i<=0)q.focus();else items[i-1].focus();
});
d.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&isOpen){setOpen(false,true);return}
 const typing=/^(INPUT|TEXTAREA|SELECT)$/.test(d.activeElement.tagName);
 if(e.key==='/'&&!typing&&!e.metaKey&&!e.ctrlKey){e.preventDefault();setOpen(true)}
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setOpen(!isOpen,true)}
});
d.addEventListener('click',e=>{if(isOpen&&!e.target.closest('.gnav'))setOpen(false,false)});
})();

/* horizontal rows: same constant speed for Skills, Blogs and Research; drag, swipe or wheel to scroll; hover or touch pauses */
(()=>{
const d=document,SPEED=40,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
d.querySelectorAll('.skills>div').forEach(c=>c.classList.add('in'));
d.querySelectorAll('.skills,.posts').forEach(el=>{
 let items=[...el.children];
 items.forEach((c,i)=>c.dataset.alt=i%2);
 if(rm)return;
 const mk=c=>{const k=c.cloneNode(true);k.setAttribute('aria-hidden','true');k.classList.remove('rv');k.classList.add('in');k.dataset.alt=el.children.length%2;el.appendChild(k);return k};
 if(items.length%2)items=items.concat(items.map(mk));
 const gap=()=>parseFloat(getComputedStyle(el).columnGap)||0;
 const period=()=>{const l=items[items.length-1];return l.offsetLeft+l.offsetWidth+gap()-items[0].offsetLeft};
 let P=period(),sets=1;
 const build=()=>{
  P=period();const need=Math.ceil(innerWidth/P)+3;
  while(sets<need){items.forEach(mk);sets++}
 };
 build();
 el.scrollLeft=P;let pos=P,hover=false,until=0,vis=true,last=performance.now(),drag=null;
 new IntersectionObserver(es=>es.forEach(e=>vis=e.isIntersecting)).observe(el);
 addEventListener('resize',()=>{build()});
 const hold=ms=>{until=performance.now()+ms};
 el.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hover=true});
 el.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')hover=false});
 el.addEventListener('touchstart',()=>hold(2500),{passive:true});
 el.addEventListener('touchmove',()=>hold(2500),{passive:true});
 el.addEventListener('touchend',()=>hold(1500),{passive:true});
 el.addEventListener('wheel',()=>hold(1500),{passive:true});
 el.addEventListener('focusin',()=>hold(4000));
 el.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;drag={x:e.clientX,s:el.scrollLeft};el.classList.add('drag');el.setPointerCapture(e.pointerId)});
 el.addEventListener('pointermove',e=>{if(!drag)return;el.scrollLeft=drag.s-(e.clientX-drag.x);pos=el.scrollLeft});
 const end=()=>{if(!drag)return;drag=null;el.classList.remove('drag');hold(1200)};
 el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
 (function frame(t){
  const dt=Math.min(.05,(t-last)/1000);last=t;
  if(vis){
   const run=!hover&&!drag&&performance.now()>=until&&!d.hidden;
   if(Math.abs(el.scrollLeft-pos)>2)pos=el.scrollLeft;
   if(run){pos+=SPEED*dt;el.scrollLeft=pos}else pos=el.scrollLeft;
   if(el.scrollLeft>=2*P){el.scrollLeft-=P;pos=el.scrollLeft}
   else if(el.scrollLeft<P*.5){el.scrollLeft+=P;pos=el.scrollLeft}
  }
  requestAnimationFrame(frame);
 })(last);
});
})();
