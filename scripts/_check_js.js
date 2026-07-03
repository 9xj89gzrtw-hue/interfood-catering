
/* Progress */
(function(){var p=document.getElementById('prog');if(!p)return;window.addEventListener('scroll',function(){var h=document.documentElement.scrollHeight-window.innerHeight;if(h>0)p.style.width=(window.scrollY/h)*100+'%';else p.style.width='0%'},{passive:true})})();

/* Nav */
(function(){var n=document.getElementById('nv');if(!n)return;var s=false;window.addEventListener('scroll',function(){var y=window.scrollY||window.pageYOffset||document.documentElement.scrollTop;if(y>80&&!s){n.classList.add('s');s=true}else if(y<=80&&s){n.classList.remove('s');s=false}},{passive:true})})();

/* Burger */
(function(){var b=document.getElementById('brg');var m=document.getElementById('mm');if(!b||!m)return;var o=false;b.onclick=function(){o=!o;if(o){b.classList.add('open');m.classList.add('open');document.body.style.overflow='hidden'}else{b.classList.remove('open');m.classList.remove('open');document.body.style.overflow=''}}})();
function cMob(){var b=document.getElementById('brg');var m=document.getElementById('mm');if(b)b.classList.remove('open');if(m)m.classList.remove('open');document.body.style.overflow=''}

/* Hero parallax */
(function(){var bg=document.querySelector('.hero-bg');var c=document.querySelector('.hero-in');if(!bg||!c)return;var tick=false;window.addEventListener('scroll',function(){if(tick)return;tick=true;var rAF=window.requestAnimationFrame||function(cb){setTimeout(cb,16)};rAF(function(){var s=window.scrollY||window.pageYOffset||0;if(s<window.innerHeight*1.2){bg.style.transform='translateY('+s*0.4+'px) scale('+(1+s*0.0003)+')';c.style.transform='translateY('+s*0.2+'px)';c.style.opacity=Math.max(0,1-s/(window.innerHeight*0.7))}tick=false})},{passive:true})})();

/* Animated counters (WebView-safe, scroll-based) */
(function(){
var nums=document.querySelectorAll('.trust-num[data-count]');
if(!nums||!nums.length)return;
var animated={};
function animCount(el,target){
  var dur=2000,start=0;
  var rAF=window.requestAnimationFrame||function(cb){setTimeout(cb,16)};
  function step(ts){
    if(!start)start=ts;
    var p=Math.min((ts-start)/dur,1);
    var eased=1-Math.pow(1-p,3);
    var val=Math.floor(eased*target);
    el.textContent=val.toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ');
    if(p<1)rAF(step);
    else el.textContent=target.toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ');
  }
  rAF(step);
}
function checkCounters(){
  var h=window.innerHeight;
  for(var i=0;i<nums.length;i++){
    if(animated[i])continue;
    var rect=nums[i].getBoundingClientRect();
    if(rect.top<h-40){
      animated[i]=true;
      var target=parseInt(nums[i].getAttribute('data-count'));
      if(!isNaN(target))animCount(nums[i],target);
    }
  }
}
window.addEventListener('scroll',checkCounters,{passive:true});
window.addEventListener('resize',checkCounters,{passive:true});
checkCounters();
setTimeout(checkCounters,500);
setTimeout(checkCounters,1500);
})();

/* Reveal (WebView-safe, scroll-based, no IntersectionObserver) */
(function(){
var els=document.querySelectorAll('.rv');
if(!els||!els.length)return;
function checkReveal(){
  var h=window.innerHeight;
  for(var i=0;i<els.length;i++){
    var rect=els[i].getBoundingClientRect();
    if(rect.top<h-50)els[i].classList.add('vis');
  }
}
window.addEventListener('scroll',checkReveal,{passive:true});
window.addEventListener('resize',checkReveal,{passive:true});
checkReveal();
setTimeout(checkReveal,300);
setTimeout(checkReveal,1000);
setTimeout(checkReveal,2500);
})();

/* Calc */
var PR={furshet:2450,banket:4470,coffee:950},EX={none:0,bar:1200,decor:800,both:2000};
function cP(){
  var fmtEl=document.getElementById('cFmt');
  var gstEl=document.getElementById('cGst');
  var extEl=document.getElementById('cExt');
  var gstVEl=document.getElementById('cGstV');
  var priceEl=document.getElementById('cPrice');
  if(!fmtEl||!gstEl||!priceEl)return;
  var f=fmtEl.value;
  var g=parseInt(gstEl.value)||50;
  var e=extEl?extEl.value:'none';
  if(gstVEl)gstVEl.textContent=g;
  var total=((PR[f]||0)+(EX[e]||0))*g;
  priceEl.textContent=total.toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' \u20BD';
}
var cFmtEl=document.getElementById('cFmt');
var cGstEl=document.getElementById('cGst');
var cExtEl=document.getElementById('cExt');
if(cFmtEl)cFmtEl.onchange=cP;
if(cGstEl)cGstEl.oninput=cP;
if(cExtEl)cExtEl.onchange=cP;
cP();
function selFmt(f){var el=document.getElementById('cFmt');if(el){el.value=f;cP()}var target=document.getElementById('calculator');if(target){var top=target.getBoundingClientRect().top+(window.pageYOffset||document.documentElement.scrollTop)-72;try{window.scrollTo({top:top,behavior:'smooth'})}catch(e){window.scrollTo(0,top)}}}

/* FAQ */
function tF(el){if(!el)return;var it=el.parentElement;if(!it)return;var w=it.classList.contains('open');var items=document.querySelectorAll('.fi');for(var i=0;i<items.length;i++)items[i].classList.remove('open');if(!w)it.classList.add('open')}

/* Lightbox */
function oLb(s){var l=document.getElementById('lb');var img=document.getElementById('lbI');if(!l||!img)return;img.src=s;l.style.display='flex';document.body.style.overflow='hidden';var rAF=window.requestAnimationFrame||function(cb){setTimeout(cb,16)};rAF(function(){l.classList.add('on')})}
function cLb(){var l=document.getElementById('lb');if(!l)return;l.classList.remove('on');setTimeout(function(){l.style.display='none'},300);document.body.style.overflow=''}

/* Form */
function sF(e){e.preventDefault();var t=document.getElementById('toast');if(t)t.classList.add('show');setTimeout(function(){if(t)t.classList.remove('show')},3500);e.target.reset()}

/* Smooth anchors (WebView-safe, no scrollIntoView options) */
(function(){
var anchors=document.querySelectorAll('a[href^="#"]');
if(!anchors||!anchors.length)return;
for(var i=0;i<anchors.length;i++){
  (function(a){
    a.addEventListener('click',function(e){
      var href=a.getAttribute('href');
      if(!href||href==='#')return;
      var id=href.substring(1);
      var target=document.getElementById(id);
      if(target){
        e.preventDefault();
        var top=target.getBoundingClientRect().top+(window.pageYOffset||document.documentElement.scrollTop)-72;
        try{window.scrollTo({top:top,behavior:'smooth'})}catch(err){window.scrollTo(0,top)}
      }
    });
  })(anchors[i]);
}
})();
