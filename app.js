const pages=[...document.querySelectorAll('.page')];
const links=[...document.querySelectorAll('.nav a')];
const menu=document.querySelector('.nav');
const menuBtn=document.querySelector('.menu-btn');
const langBtn=document.querySelector('#lang-toggle');

function showPage(){
  const id=(location.hash||'#inicio').slice(1);
  const target=pages.some(p=>p.id===id)?id:'inicio';
  pages.forEach(p=>p.classList.toggle('active',p.id===target));
  links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+target));
  menu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'instant'});
}

function applyLanguage(lang){
  document.documentElement.lang=lang==='en'?'en':'pt-BR';
  document.querySelectorAll('[data-pt][data-en]').forEach(el=>{
    el.innerHTML=el.dataset[lang];
  });
  const isPt=lang==='pt';
  langBtn.textContent=isPt?'EN':'PT';
  langBtn.setAttribute('aria-label',isPt?'Switch to English':'Mudar para português');
  document.querySelector('.nav').setAttribute('aria-label',isPt?'Navegação principal':'Main navigation');
  menuBtn.setAttribute('aria-label',isPt?'Abrir menu':'Open menu');
  localStorage.setItem('site-language',lang);
}

window.addEventListener('hashchange',showPage);
menuBtn.addEventListener('click',()=>{
  menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',menu.classList.contains('open')?'true':'false');
});
langBtn.addEventListener('click',()=>{
  const current=document.documentElement.lang.startsWith('en')?'en':'pt';
  applyLanguage(current==='pt'?'en':'pt');
});
applyLanguage(localStorage.getItem('site-language')||'pt');
showPage();
