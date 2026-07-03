#!/usr/bin/env python3
"""
Build nilov_catering_v19.html — world-class catering website
Fully self-contained, Safari + Telegram WebView + iMessage Quick Look safe

KEY FIXES in v19:
1. Calculator: native <select> appearance, "Рассчитать" button, works in WebKit
2. Calculator: static <noscript> price table for iMessage (no-JS)
3. .js class pattern: WITHOUT JS, all elements visible (opacity:1 default)
4. FAQ: visible without JS (no max-height:0 without .js class)
5. All interactive elements min-height:44px for touch
6. -webkit-tap-highlight-color on clickable elements
7. No -webkit-appearance:none on <select> (breaks iOS native picker)
8. touchstart+touchend for calculator button (WebKit fix)
9. onclick on selects as fallback for change event
"""

import os

B64_DIR = '/home/z/my-project/images_v11_b64/'
IMG_DIR = '/home/z/my-project/images/'
OUTPUT = '/home/z/my-project/download/nilov_catering_v21.html'

def load_b64(name, directory=B64_DIR):
    path = os.path.join(directory, name)
    if os.path.exists(path):
        with open(path, 'r') as f:
            data = f.read().strip()
        if data.startswith('data:'):
            return data
        return 'data:image/jpeg;base64,' + data
    return ''

hero_img = load_b64('hero.b64')
furshet_img = load_b64('furshet.b64')
banket_img = load_b64('banket.b64')
coffee_img = load_b64('coffee.b64')
wedding_img = load_b64('wedding.b64')
about_img = load_b64('about.b64')
press_bg_img = load_b64('press_bg.b64')
gallery_imgs = [load_b64(f'gallery_{i}.b64') for i in range(1, 7)]
logo_img = load_b64('logo.b64', IMG_DIR)

loaded = {k: bool(v) for k, v in {
    'hero': hero_img, 'furshet': furshet_img, 'banket': banket_img,
    'coffee': coffee_img, 'wedding': wedding_img, 'about': about_img,
    'press_bg': press_bg_img, 'logo': logo_img, 'gallery_1': gallery_imgs[0]
}.items()}
print("Images loaded:", loaded)

html = '''<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=5,viewport-fit=cover">
<meta name="theme-color" content="#0A0A0A">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<title>Nilov Catering — Кейтеринг в Санкт-Петербурге</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
/* ===== RESET & BASE ===== */
*,*::before,*::after{margin:0;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
body{font-family:'Raleway','Segoe UI',Tahoma,sans-serif;font-weight:400;color:#1A1A1A;background:#FAFAFA;line-height:1.7;overflow-x:hidden;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom);padding-left:env(safe-area-inset-left);padding-right:env(safe-area-inset-right)}
img{max-width:100%;height:auto;display:block}
a{color:inherit;text-decoration:none}
ul,ol{list-style:none}
button{cursor:pointer;border:none;background:none;font-family:inherit}
input,textarea,select{font-family:inherit;font-size:inherit}

/* ===== TYPOGRAPHY ===== */
.font-serif{font-family:'Cormorant Garamond','Georgia',serif}
h1,h2,h3{font-family:'Cormorant Garamond','Georgia',serif;font-weight:600;line-height:1.2}
h1{font-size:2.4rem;font-size:clamp(2.4rem,6vw,5rem)}
h2{font-size:1.8rem;font-size:clamp(1.8rem,4vw,3.2rem);margin-bottom:1rem}
h3{font-size:1.2rem;font-size:clamp(1.2rem,2.5vw,1.6rem)}
em{font-style:italic;color:#C8A96E}
.ln{display:block}.ln-i{display:inline-block}

/* ===== UTILITY ===== */
.container{max-width:1200px;margin:0 auto;padding:0 1rem;padding:0 clamp(1rem,4vw,3rem)}
.section{padding:4rem 0;padding:clamp(4rem,10vw,8rem) 0}
.section--dark{background:#0A0A0A;color:#F5F0E8}
.section--cream{background:#F5F0E8}
.btn{display:inline-block;padding:1rem 2.5rem;font-family:'Raleway',sans-serif;font-weight:600;font-size:0.85rem;letter-spacing:0.15em;text-transform:uppercase;-webkit-transition:all 0.3s ease;transition:all 0.3s ease;position:relative;overflow:hidden;min-height:44px;-webkit-tap-highlight-color:transparent}
.btn--gold{background:#C8A96E;color:#0A0A0A;border:2px solid #C8A96E}
.btn--outline{background:transparent;color:#C8A96E;border:2px solid #C8A96E}
.btn--light{background:transparent;color:#F5F0E8;border:2px solid rgba(245,240,232,0.4)}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}

/* ===== HOVER ONLY ON DEVICES WITH HOVER ===== */
@media(hover:hover){
  .btn--gold:hover{background:transparent;color:#C8A96E}
  .btn--outline:hover{background:#C8A96E;color:#0A0A0A}
  .btn--light:hover{background:#F5F0E8;color:#0A0A0A}
  .nav__link:hover{color:#C8A96E}
  .nav__link:hover::after{width:100%}
  .philosophy__img:hover img{-webkit-transform:scale(1.05);transform:scale(1.05)}
  .format-card:hover .format-card__bg{-webkit-transform:scale(1.08);transform:scale(1.08)}
  .format-card:hover .format-card__overlay{background:linear-gradient(0deg,rgba(10,10,10,0.9) 0%,rgba(10,10,10,0.3) 60%)}
  .gallery__item:hover img{-webkit-transform:scale(1.05);transform:scale(1.05)}
  .gallery__item:hover::after{background:rgba(10,10,10,0.3)}
  .about__photo:hover img{-webkit-filter:grayscale(0);filter:grayscale(0)}
  .wa-float:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}
  .footer__links a:hover{color:#C8A96E}
  .contact__info-value a:hover{opacity:0.8}
}

/* ===== NAV ===== */
.nav{position:fixed;top:0;left:0;right:0;z-index:10001;padding:1.2rem 0;-webkit-transition:all 0.4s ease;transition:all 0.4s ease}
.nav--solid{background:rgba(10,10,10,0.97);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);padding:0.7rem 0;-webkit-box-shadow:0 2px 30px rgba(0,0,0,0.3);box-shadow:0 2px 30px rgba(0,0,0,0.3)}
.nav__inner{display:-webkit-flex;display:flex;-webkit-justify-content:space-between;justify-content:space-between;-webkit-align-items:center;align-items:center;max-width:1200px;margin:0 auto;padding:0 1rem;padding:0 clamp(1rem,4vw,3rem)}
.nav__logo{height:40px;width:auto;-webkit-transition:height 0.3s ease;transition:height 0.3s ease}
.nav--solid .nav__logo{height:34px}
.nav__links{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center}
.nav__link{color:#F5F0E8;font-size:0.78rem;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;-webkit-transition:color 0.3s ease;transition:color 0.3s ease;position:relative;margin-left:2rem;min-height:44px;display:-webkit-inline-flex;display:inline-flex;-webkit-align-items:center;align-items:center;-webkit-tap-highlight-color:transparent}
.nav__link:first-child{margin-left:0}
.nav__link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:#C8A96E;-webkit-transition:width 0.3s ease;transition:width 0.3s ease}
.nav__burger{display:none;-webkit-flex-direction:column;flex-direction:column;padding:8px;cursor:pointer;min-height:44px;min-width:44px;-webkit-tap-highlight-color:transparent}
.nav__burger span{display:block;width:24px;height:2px;background:#F5F0E8;-webkit-transition:all 0.3s ease;transition:all 0.3s ease;margin-top:5px}
.nav__burger span:first-child{margin-top:0}
.nav__burger.open span:nth-child(1){-webkit-transform:rotate(45deg) translate(5px,5px);transform:rotate(45deg) translate(5px,5px)}
.nav__burger.open span:nth-child(2){opacity:0}
.nav__burger.open span:nth-child(3){-webkit-transform:rotate(-45deg) translate(5px,-5px);transform:rotate(-45deg) translate(5px,-5px)}

/* Mobile menu */
.mobile-menu{position:fixed;top:0;right:-100%;width:100%;height:100vh;height:100dvh;background:rgba(10,10,10,0.98);z-index:10000;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:center;justify-content:center;-webkit-align-items:center;align-items:center;-webkit-transition:right 0.4s ease;transition:right 0.4s ease}
.mobile-menu.open{right:0}
.mobile-menu__link{color:#F5F0E8;font-size:1.4rem;font-family:'Cormorant Garamond',serif;padding:1rem 0;letter-spacing:0.1em;-webkit-transition:color 0.3s ease;transition:color 0.3s ease;min-height:44px;display:-webkit-inline-flex;display:inline-flex;-webkit-align-items:center;align-items:center;-webkit-tap-highlight-color:transparent}

/* ===== HERO ===== */
.hero{position:relative;min-height:100vh;min-height:100dvh;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;overflow:hidden;background:#0A0A0A}
.hero__bg{position:absolute;top:0;right:0;bottom:0;left:0;z-index:0}
.hero__bg img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-transform:scale(1.1);transform:scale(1.1);-webkit-transition:opacity 1s ease;transition:opacity 1s ease;opacity:0}
.hero__bg img.loaded{opacity:1}
.hero__overlay{position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(180deg,rgba(10,10,10,0.4) 0%,rgba(10,10,10,0.7) 100%);z-index:1}
.hero__content{position:relative;z-index:2;text-align:center;color:#F5F0E8;padding:0 2rem;max-width:900px}
.hero__title{font-size:2.8rem;font-size:clamp(2.8rem,7vw,5.5rem);font-weight:700;margin-bottom:1.5rem}
.js .hero__title{opacity:0;-webkit-transform:translateY(30px);transform:translateY(30px);-webkit-animation:heroFadeUp 1s 0.3s forwards;animation:heroFadeUp 1s 0.3s forwards}
.hero__subtitle{font-size:1rem;font-size:clamp(1rem,2vw,1.3rem);font-weight:300;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:2.5rem}
.js .hero__subtitle{opacity:0;-webkit-animation:heroFadeUp 1s 0.6s forwards;animation:heroFadeUp 1s 0.6s forwards}
.hero__cta{}
.js .hero__cta{opacity:0;-webkit-animation:heroFadeUp 1s 0.9s forwards;animation:heroFadeUp 1s 0.9s forwards}
.hero__scroll{position:absolute;bottom:2rem;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);z-index:2;color:#F5F0E8;font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;text-align:center}
.js .hero__scroll{opacity:0;-webkit-animation:heroFadeUp 1s 1.2s forwards;animation:heroFadeUp 1s 1.2s forwards}
.hero__scroll-line{width:1px;height:40px;background:rgba(245,240,232,0.4);margin:0.5rem auto 0;-webkit-animation:scrollLine 2s infinite;animation:scrollLine 2s infinite}

@-webkit-keyframes heroFadeUp{0%{opacity:0;-webkit-transform:translateY(30px);transform:translateY(30px)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}
@keyframes heroFadeUp{0%{opacity:0;-webkit-transform:translateY(30px);transform:translateY(30px)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}
@-webkit-keyframes scrollLine{0%{-webkit-transform:scaleY(0);transform:scaleY(0);-webkit-transform-origin:top;transform-origin:top}50%{-webkit-transform:scaleY(1);transform:scaleY(1);-webkit-transform-origin:top;transform-origin:top}51%{-webkit-transform:scaleY(1);transform:scaleY(1);-webkit-transform-origin:bottom;transform-origin:bottom}100%{-webkit-transform:scaleY(0);transform:scaleY(0);-webkit-transform-origin:bottom;transform-origin:bottom}}
@keyframes scrollLine{0%{-webkit-transform:scaleY(0);transform:scaleY(0);-webkit-transform-origin:top;transform-origin:top}50%{-webkit-transform:scaleY(1);transform:scaleY(1);-webkit-transform-origin:top;transform-origin:top}51%{-webkit-transform:scaleY(1);transform:scaleY(1);-webkit-transform-origin:bottom;transform-origin:bottom}100%{-webkit-transform:scaleY(0);transform:scaleY(0);-webkit-transform-origin:bottom;transform-origin:bottom}}

/* ===== PHILOSOPHY ===== */
.philosophy__grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;gap:clamp(2rem,5vw,5rem);-webkit-align-items:center;align-items:center}
.philosophy__text{font-size:1rem;font-size:clamp(1rem,1.8vw,1.15rem);line-height:1.9}
.philosophy__text p+p{margin-top:1.5rem}
.philosophy__img{position:relative;overflow:hidden}
.philosophy__img img{-webkit-transition:-webkit-transform 0.6s ease;transition:transform 0.6s ease}
.philosophy__img::after{content:'';position:absolute;top:8px;right:8px;bottom:8px;left:8px;border:1px solid rgba(200,169,110,0.3);pointer-events:none}
.philosophy__stat{display:-webkit-flex;display:flex;margin-top:2.5rem}
.philosophy__stat-item{text-align:center;margin-left:3rem}
.philosophy__stat-item:first-child{margin-left:0}
.philosophy__stat-num{font-family:'Cormorant Garamond',serif;font-size:2.5rem;font-weight:700;color:#C8A96E}
.philosophy__stat-label{font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;margin-top:0.25rem;color:#666}

/* ===== FORMATS ===== */
.formats__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.format-card{position:relative;overflow:hidden;cursor:pointer;-webkit-tap-highlight-color:transparent}
.format-card::before{content:'';display:block;padding-top:133.33%}
.format-card__bg{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transition:-webkit-transform 0.6s ease;transition:transform 0.6s ease}
.format-card__bg img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}
.format-card__overlay{position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(0deg,rgba(10,10,10,0.8) 0%,rgba(10,10,10,0.1) 60%);-webkit-transition:background 0.4s ease;transition:background 0.4s ease}
.format-card__content{position:absolute;bottom:0;left:0;right:0;padding:2rem;color:#F5F0E8}
.format-card__title{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;margin-bottom:0.5rem}
.format-card__desc{font-size:0.85rem;opacity:0.8;line-height:1.5}
.format-card__price{margin-top:0.75rem;font-size:0.8rem;color:#C8A96E;font-weight:600;letter-spacing:0.1em}

/* ===== WEDDING ===== */
.wedding{position:relative;overflow:hidden}
.wedding__bg{position:absolute;top:0;right:0;bottom:0;left:0}
.wedding__bg img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}
.wedding__overlay{position:absolute;top:0;right:0;bottom:0;left:0;background:rgba(10,10,10,0.7)}
.wedding__content{position:relative;z-index:1;text-align:center;color:#F5F0E8;max-width:700px;margin:0 auto}
.wedding__badge{display:inline-block;padding:0.5rem 1.5rem;border:1px solid #C8A96E;color:#C8A96E;font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:2rem}
.wedding__features{display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center;flex-wrap:-webkit-wrap;flex-wrap:wrap;margin:2rem 0}
.wedding__feature{text-align:center;font-size:0.85rem;opacity:0.9;margin:0 1.25rem}
.wedding__feature-icon{font-size:1.5rem;margin-bottom:0.5rem}

/* ===== REVIEWS / PRESS ===== */
.reviews{position:relative;overflow:hidden}
.reviews__bg{position:absolute;top:0;right:0;bottom:0;left:0;opacity:0.08}
.reviews__bg img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}
.reviews__content{position:relative;z-index:1}
.reviews__list{max-width:800px;margin:3rem auto 0}
.review{padding:2rem 0;border-bottom:1px solid rgba(200,169,110,0.2)}
.review:last-child{border-bottom:none}
.review__stars{color:#C8A96E;font-size:0.9rem;letter-spacing:0.15em;margin-bottom:0.75rem}
.review__text{font-size:1.05rem;font-style:italic;line-height:1.8;margin-bottom:1rem;color:#F5F0E8}
.review__author{font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;color:#C8A96E}

/* ===== ABOUT ===== */
.about__grid{display:grid;grid-template-columns:1fr 1.2fr;gap:2rem;gap:clamp(2rem,5vw,5rem);-webkit-align-items:center;align-items:center}
.about__photo{position:relative}
.about__photo img{width:100%;-webkit-filter:grayscale(20%);filter:grayscale(20%);-webkit-transition:-webkit-filter 0.6s ease;transition:filter 0.6s ease}
.about__photo::before{content:'';position:absolute;top:-15px;left:-15px;width:100px;height:100px;border-top:2px solid #C8A96E;border-left:2px solid #C8A96E;pointer-events:none}
.about__photo::after{content:'';position:absolute;bottom:-15px;right:-15px;width:100px;height:100px;border-bottom:2px solid #C8A96E;border-right:2px solid #C8A96E;pointer-events:none}
.about__text{font-size:0.95rem;line-height:1.9;color:#999}
.about__text p+p{margin-top:1rem}
.about__quote{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-style:italic;color:#C8A96E;margin:2rem 0;padding-left:1.5rem;border-left:2px solid #C8A96E;line-height:1.7}

/* ===== GALLERY ===== */
.gallery__grid{-webkit-column-count:3;-moz-column-count:3;column-count:3;-webkit-column-gap:1rem;-moz-column-gap:1rem;column-gap:1rem;margin-top:2rem}
.gallery__item{-webkit-column-break-inside:avoid;break-inside:avoid;margin-bottom:1rem;overflow:hidden;cursor:pointer;position:relative;-webkit-tap-highlight-color:transparent}
.gallery__item img{width:100%;-webkit-transition:-webkit-transform 0.5s ease;transition:transform 0.5s ease}
.gallery__item::after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background:rgba(10,10,10,0);-webkit-transition:background 0.4s ease;transition:background 0.4s ease;pointer-events:none}

/* ===== CALCULATOR ===== */
.calc{background:linear-gradient(135deg,#0A0A0A 0%,#1A1A1A 100%);border:1px solid rgba(200,169,110,0.2);padding:2rem;padding:clamp(2rem,5vw,3.5rem);margin-top:3rem}
.calc__title{text-align:center;margin-bottom:2rem}
.calc__grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem 2rem}
.calc__field{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;margin-bottom:0.5rem}
.calc__field:last-child{margin-bottom:0}
.calc__label{font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:#999;margin-bottom:0.5rem}
/* INPUT: custom styled (no native picker needed) */
.calc__input{background:rgba(255,255,255,0.05);border:1px solid rgba(200,169,110,0.3);color:#F5F0E8;padding:0.9rem 1rem;font-size:0.9rem;-webkit-transition:border-color 0.3s ease;transition:border-color 0.3s ease;outline:none;min-height:44px}
/* SELECT: KEEP native appearance for iOS WKWebView picker */
.calc__select{background:rgba(255,255,255,0.05);border:1px solid rgba(200,169,110,0.3);color:#F5F0E8;padding:0.9rem 1rem;font-size:0.9rem;-webkit-transition:border-color 0.3s ease;transition:border-color 0.3s ease;outline:none;min-height:44px;-webkit-appearance:menulist;appearance:menulist;border-radius:0}
.calc__select:focus,.calc__input:focus{border-color:#C8A96E}
.calc__select option{background:#1A1A1A;color:#F5F0E8}
/* CALCULATE BUTTON */
.calc__btn-calc{display:inline-block;padding:0.9rem 2rem;font-family:'Raleway',sans-serif;font-weight:600;font-size:0.85rem;letter-spacing:0.15em;text-transform:uppercase;background:#C8A96E;color:#0A0A0A;border:2px solid #C8A96E;min-height:44px;cursor:pointer;-webkit-tap-highlight-color:transparent;-webkit-transition:all 0.3s ease;transition:all 0.3s ease}
.calc__btn-row{grid-column:1/-1;text-align:center;margin-top:0.5rem}
.calc__result{grid-column:1/-1;text-align:center;padding:2rem 0 0;border-top:1px solid rgba(200,169,110,0.2);margin-top:1rem}
.calc__price{font-family:'Cormorant Garamond',serif;font-size:2.5rem;font-weight:700;color:#C8A96E}
.calc__note{font-size:0.8rem;color:#666;margin-top:0.5rem}
/* STATIC PRICE TABLE (shown in <noscript>/no-JS) */
.calc__static{margin-top:2rem;padding:1.5rem;border:1px solid rgba(200,169,110,0.15);background:rgba(255,255,255,0.02)}
.calc__static-title{font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:#C8A96E;margin-bottom:1rem;text-align:center}
.calc__static table{width:100%;border-collapse:collapse;font-size:0.85rem;color:#999}
.calc__static td{padding:0.5rem 0.5rem;border-bottom:1px solid rgba(200,169,110,0.1)}
.calc__static td:last-child{text-align:right;color:#F5F0E8;white-space:nowrap}
/* Hide static table when JS works (js class present) */
.js .calc__static{display:none}

/* ===== FAQ ===== */
.faq__list{max-width:800px;margin:2rem auto 0}
.faq-item{border-bottom:1px solid rgba(200,169,110,0.15)}
.faq-item__q{display:-webkit-flex;display:flex;-webkit-justify-content:space-between;justify-content:space-between;-webkit-align-items:center;align-items:center;padding:1.2rem 0;cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;-webkit-transition:color 0.3s ease;transition:color 0.3s ease;width:100%;text-align:left;background:none;border:none;min-height:44px;-webkit-tap-highlight-color:transparent}
.faq-item__icon{font-size:1.2rem;color:#C8A96E;-webkit-transition:-webkit-transform 0.3s ease;transition:transform 0.3s ease;-webkit-flex-shrink:0;flex-shrink:0;margin-left:1rem}
.faq-item.open .faq-item__icon{-webkit-transform:rotate(45deg);transform:rotate(45deg)}
.faq-item__a{overflow:hidden;font-size:0.95rem;line-height:1.8;color:#666;padding:0 0 1.2rem;-webkit-transition:max-height 0.4s ease;transition:max-height 0.4s ease}
/* ONLY hide FAQ answers when JS is present (accordion mode) */
.js .faq-item__a{max-height:0;padding:0}
.faq-item.open .faq-item__a{max-height:300px;padding:0 0 1.2rem}

/* ===== CONTACT ===== */
.contact__grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;gap:clamp(2rem,5vw,4rem)}
.contact__info{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column}
.contact__info-item{font-size:0.9rem;line-height:1.8;margin-bottom:2rem}
.contact__info-item:last-child{margin-bottom:0}
.contact__info-label{font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:#999;margin-bottom:0.25rem}
.contact__info-value{font-size:1.05rem;color:#F5F0E8}
.contact__info-value a{color:#C8A96E;-webkit-transition:opacity 0.3s ease;transition:opacity 0.3s ease}
.contact__form{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column}
.contact__input,.contact__textarea{background:rgba(255,255,255,0.05);border:1px solid rgba(200,169,110,0.3);color:#F5F0E8;padding:1rem;font-size:0.9rem;-webkit-transition:border-color 0.3s ease;transition:border-color 0.3s ease;outline:none;width:100%;margin-bottom:1.2rem;min-height:44px}
.contact__input:last-child,.contact__textarea:last-child{margin-bottom:0}
.contact__textarea{min-height:120px;resize:vertical}
.contact__input::-webkit-input-placeholder,.contact__textarea::-webkit-input-placeholder{color:#666}
.contact__input::placeholder,.contact__textarea::placeholder{color:#666}

/* ===== TOAST ===== */
.toast{position:fixed;bottom:2rem;left:50%;-webkit-transform:translateX(-50%) translateY(100px);transform:translateX(-50%) translateY(100px);background:#C8A96E;color:#0A0A0A;padding:1rem 2rem;font-weight:600;font-size:0.9rem;z-index:10003;-webkit-transition:-webkit-transform 0.4s ease;transition:transform 0.4s ease;border-radius:2px}
.toast.show{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0)}

/* ===== LIGHTBOX ===== */
.lightbox{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,0.95);z-index:10002;display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center;-webkit-align-items:center;align-items:center;opacity:0;pointer-events:none;-webkit-transition:opacity 0.3s ease;transition:opacity 0.3s ease}
.lightbox.open{opacity:1;pointer-events:all}
.lightbox__img{max-width:90vw;max-height:85vh;-o-object-fit:contain;object-fit:contain}
.lightbox__close{position:absolute;top:1.5rem;right:1.5rem;color:#F5F0E8;font-size:2rem;cursor:pointer;width:44px;height:44px;display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center;-webkit-align-items:center;align-items:center;-webkit-tap-highlight-color:transparent}

/* ===== WHATSAPP FLOAT ===== */
.wa-float{position:fixed;bottom:2rem;right:2rem;z-index:10001;width:56px;height:56px;border-radius:50%;background:#25D366;display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center;-webkit-align-items:center;align-items:center;-webkit-box-shadow:0 4px 20px rgba(37,211,102,0.4);box-shadow:0 4px 20px rgba(37,211,102,0.4);-webkit-transition:-webkit-transform 0.3s ease;transition:transform 0.3s ease;-webkit-tap-highlight-color:transparent}
.wa-float svg{width:28px;height:28px;fill:#fff}

/* ===== REVEAL ANIMATION ===== */
/* Default: visible. Only hidden when .js class is on <html> */
.rv,.rv-left,.rv-right,.rv-scale,.rv-clip{-webkit-transition:opacity 0.8s ease,-webkit-transform 0.8s ease;transition:opacity 0.8s ease,transform 0.8s ease}
.js .rv{opacity:0;-webkit-transform:translateY(40px);transform:translateY(40px)}
.js .rv-left{opacity:0;-webkit-transform:translateX(-40px);transform:translateX(-40px)}
.js .rv-right{opacity:0;-webkit-transform:translateX(40px);transform:translateX(40px)}
.js .rv-scale{opacity:0;-webkit-transform:scale(0.9);transform:scale(0.9)}
.js .rv-clip{opacity:0;-webkit-clip-path:inset(0 100% 0 0);clip-path:inset(0 100% 0 0)}
.rv.revealed,.rv-left.revealed,.rv-right.revealed,.rv-scale.revealed,.rv-clip.revealed{opacity:1;-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1);-webkit-clip-path:inset(0);clip-path:inset(0)}

/* ===== FOOTER ===== */
.footer{background:#0A0A0A;color:#666;padding:3rem 0 1.5rem;border-top:1px solid rgba(200,169,110,0.1)}
.footer__inner{display:-webkit-flex;display:flex;-webkit-justify-content:space-between;justify-content:space-between;-webkit-align-items:center;align-items:center;flex-wrap:-webkit-wrap;flex-wrap:wrap}
.footer__copy{font-size:0.8rem;margin-bottom:1rem}
.footer__links{display:-webkit-flex;display:flex}
.footer__links a{font-size:0.8rem;color:#999;-webkit-transition:color 0.3s ease;transition:color 0.3s ease;margin-left:1.5rem}
.footer__links a:first-child{margin-left:0}

/* ===== RESPONSIVE ===== */
@media(max-width:1024px){
  .formats__grid{grid-template-columns:1fr 1fr}
  .gallery__grid{-webkit-column-count:2;-moz-column-count:2;column-count:2}
}
@media(max-width:768px){
  .nav__links{display:none}
  .nav__burger{display:-webkit-flex;display:flex}
  .philosophy__grid,.about__grid,.contact__grid{grid-template-columns:1fr}
  .philosophy__img{order:-1}
  .formats__grid{grid-template-columns:1fr}
  .format-card::before{padding-top:75%}
  .gallery__grid{-webkit-column-count:2;-moz-column-count:2;column-count:2}
  .calc__grid{grid-template-columns:1fr}
  .philosophy__stat{-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center}
  .philosophy__stat-item{margin-left:0;margin-bottom:1.5rem}
  .philosophy__stat-item:last-child{margin-bottom:0}
  .wedding__feature{margin:0.75rem}
}
@media(max-width:480px){
  .gallery__grid{-webkit-column-count:1;-moz-column-count:1;column-count:1}
  .footer__inner{-webkit-flex-direction:column;flex-direction:column;text-align:center}
  .footer__links a{margin-left:0.75rem}
  .footer__links a:first-child{margin-left:0}
}

/* Lightbox fallback without JS — use :target */
.lightbox:target{opacity:1;pointer-events:all}
.lightbox:target .lightbox__close{display:-webkit-flex;display:flex}
</style>

<!-- NOSCRIPT: visibility fallback for environments without JS (iMessage Quick Look) -->
<noscript>
<style>
.js .rv,.js .rv-left,.js .rv-right,.js .rv-scale,.js .rv-clip{opacity:1!important;-webkit-transform:none!important;transform:none!important;-webkit-clip-path:none!important;clip-path:none!important}
.js .hero__title,.js .hero__subtitle,.js .hero__cta,.js .hero__scroll{opacity:1!important;-webkit-transform:none!important;transform:none!important}
.js .faq-item__a{max-height:none!important;padding:0 0 1.2rem!important}
.js .calc__static{display:block!important}
</style>
</noscript>
<script>document.documentElement.className='js';</script>
</head>
<body>

<!-- NAV -->
<nav class="nav" id="nav">
  <div class="nav__inner">
    <a href="#hero"><img src="''' + logo_img + '''" alt="Nilov Catering" class="nav__logo"></a>
    <div class="nav__links">
      <a href="#philosophy" class="nav__link">Подход</a>
      <a href="#formats" class="nav__link">Форматы</a>
      <a href="#calculator" class="nav__link">Стоимость</a>
      <a href="#gallery" class="nav__link">Галерея</a>
      <a href="#contact" class="nav__link">Контакты</a>
    </div>
    <div class="nav__burger" id="navBurger">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>

<!-- MOBILE MENU -->
<div class="mobile-menu" id="mobileMenu">
  <a href="#philosophy" class="mobile-menu__link">Подход</a>
  <a href="#formats" class="mobile-menu__link">Форматы</a>
  <a href="#calculator" class="mobile-menu__link">Стоимость</a>
  <a href="#gallery" class="mobile-menu__link">Галерея</a>
  <a href="#contact" class="mobile-menu__link">Контакты</a>
</div>

<!-- HERO -->
<section class="hero" id="hero">
  <div class="hero__bg">
    <img src="''' + hero_img + '''" alt="Кейтеринг Nilov" id="heroImg">
  </div>
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <h1 class="hero__title"><span class="ln">Кейтеринг</span> <span class="ln"><em>в стиле</em></span> <span class="ln">Nilov</span></h1>
    <p class="hero__subtitle">Индивидуальный подход к каждому событию</p>
    <div class="hero__cta"><a href="#calculator" class="btn btn--gold">Рассчитать стоимость</a></div>
  </div>
  <div class="hero__scroll">
    <span>Scroll</span>
    <div class="hero__scroll-line"></div>
  </div>
</section>

<!-- PHILOSOPHY -->
<section class="section section--cream" id="philosophy">
  <div class="container">
    <div class="philosophy__grid">
      <div class="philosophy__text rv-left">
        <h2>Наш <em>подход</em></h2>
        <p>Мы создаём не просто еду — мы создаём атмосферу. Каждый проект для нас — это возможность рассказать историю через вкус, текстуру и визуальную эстетику блюд. Наша команда шеф-поваров подходит к каждому мероприятию как к уникальному произведению кулинарного искусства.</p>
        <p>От первого контакта до последнего гостя — мы контролируем каждую деталь, чтобы ваш праздник стал незабываемым. Мы используем только свежие сезонные ингредиенты от проверенных поставщиков.</p>
        <div class="philosophy__stat">
          <div class="philosophy__stat-item">
            <div class="philosophy__stat-num" data-count="12">12</div>
            <div class="philosophy__stat-label">Лет опыта</div>
          </div>
          <div class="philosophy__stat-item">
            <div class="philosophy__stat-num" data-count="850">850</div>
            <div class="philosophy__stat-label">Мероприятий</div>
          </div>
          <div class="philosophy__stat-item">
            <div class="philosophy__stat-num" data-count="98">98</div>
            <div class="philosophy__stat-label">% довольных</div>
          </div>
        </div>
      </div>
      <div class="philosophy__img rv-right">
        <img src="''' + furshet_img + '''" alt="Фуршет Nilov Catering">
      </div>
    </div>
  </div>
</section>

<!-- FORMATS -->
<section class="section section--dark" id="formats">
  <div class="container">
    <h2 class="rv" style="text-align:center">Форматы <em>обслуживания</em></h2>
    <div class="formats__grid">
      <div class="format-card rv">
        <div class="format-card__bg"><img src="''' + furshet_img + '''" alt="Фуршет"></div>
        <div class="format-card__overlay"></div>
        <div class="format-card__content">
          <div class="format-card__title">Фуршет</div>
          <div class="format-card__desc">Изысканные закуски и канапе для динамичного общения</div>
          <div class="format-card__price">от 2 500 &#8381;/гость</div>
        </div>
      </div>
      <div class="format-card rv">
        <div class="format-card__bg"><img src="''' + banket_img + '''" alt="Банкет"></div>
        <div class="format-card__overlay"></div>
        <div class="format-card__content">
          <div class="format-card__title">Банкет</div>
          <div class="format-card__desc">Полноценный ужин с мног-course меню и сервисом</div>
          <div class="format-card__price">от 4 500 &#8381;/гость</div>
        </div>
      </div>
      <div class="format-card rv">
        <div class="format-card__bg"><img src="''' + coffee_img + '''" alt="Кофе-брейк"></div>
        <div class="format-card__overlay"></div>
        <div class="format-card__content">
          <div class="format-card__title">Кофе-брейк</div>
          <div class="format-card__desc">Кофе, выпечка и лёгкие закуски для деловых встреч</div>
          <div class="format-card__price">от 1 200 &#8381;/гость</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WEDDING -->
<section class="section wedding" id="wedding">
  <div class="wedding__bg"><img src="''' + wedding_img + '''" alt="Свадебный ужин"></div>
  <div class="wedding__overlay"></div>
  <div class="container">
    <div class="wedding__content rv">
      <div class="wedding__badge">Эксклюзив</div>
      <h2 style="color:#F5F0E8">Свадебный <em>ужин</em></h2>
      <p style="color:rgba(245,240,232,0.8);margin:1rem 0;line-height:1.8">Ваш особенный день заслуживает исключительного меню. Мы создадим индивидуальное свадебное меню, которое отразит вашу историю любви и порадует каждого гостя.</p>
      <div class="wedding__features">
        <div class="wedding__feature">
          <div class="wedding__feature-icon">&#127870;</div>
          <div>Коктейльный час</div>
        </div>
        <div class="wedding__feature">
          <div class="wedding__feature-icon">&#127869;</div>
          <div>Авторское меню</div>
        </div>
        <div class="wedding__feature">
          <div class="wedding__feature-icon">&#127871;</div>
          <div>Торт и десерты</div>
        </div>
      </div>
      <a href="#calculator" class="btn btn--light">Рассчитать стоимость</a>
    </div>
  </div>
</section>

<!-- REVIEWS -->
<section class="section section--dark reviews" id="reviews">
  <div class="reviews__bg"><img src="''' + press_bg_img + '''" alt=""></div>
  <div class="container">
    <div class="reviews__content">
      <h2 class="rv" style="text-align:center">Отзывы <em>клиентов</em></h2>
      <div class="reviews__list">
        <div class="review rv">
          <div class="review__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <div class="review__text">Невероятный уровень сервиса и вкуса! Гости до сих пор вспоминают наш корпоративный вечер. Команда Nilov превзошла все ожидания — от презентации до вкуса каждого блюда.</div>
          <div class="review__author">Анна К., СберБанк</div>
        </div>
        <div class="review rv">
          <div class="review__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <div class="review__text">Свадьба мечты во многом благодаря кейтерингу Nilov. Меню было безупречным, а официанты — настоящие профессионалы. Каждый гость нашёл блюдо по вкусу.</div>
          <div class="review__author">Мария и Дмитрий, свадьба</div>
        </div>
        <div class="review rv">
          <div class="review__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <div class="review__text">Организовали кофе-брейк на конференцию 300+ человек — всё было вовремя, красиво и вкусно. Теперь работаем только с Nilov для всех корпоративных мероприятий.</div>
          <div class="review__author">Игорь В., Яндекс</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- GALLERY -->
<section class="section section--cream" id="gallery">
  <div class="container">
    <h2 class="rv" style="text-align:center">Наши <em>работы</em></h2>
    <div class="gallery__grid">
      <div class="gallery__item rv" data-lightbox><img src="''' + gallery_imgs[0] + '''" alt="Галерея 1"></div>
      <div class="gallery__item rv" data-lightbox><img src="''' + gallery_imgs[1] + '''" alt="Галерея 2"></div>
      <div class="gallery__item rv" data-lightbox><img src="''' + gallery_imgs[2] + '''" alt="Галерея 3"></div>
      <div class="gallery__item rv" data-lightbox><img src="''' + gallery_imgs[3] + '''" alt="Галерея 4"></div>
      <div class="gallery__item rv" data-lightbox><img src="''' + gallery_imgs[4] + '''" alt="Галерея 5"></div>
      <div class="gallery__item rv" data-lightbox><img src="''' + gallery_imgs[5] + '''" alt="Галерея 6"></div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<section class="section section--dark" id="about">
  <div class="container">
    <div class="about__grid">
      <div class="about__photo rv-left">
        <img src="''' + about_img + '''" alt="Шеф-повар Nilov Catering">
      </div>
      <div class="rv-right">
        <h2>О <em>Nilov</em></h2>
        <div class="about__text">
          <p>Nilov Catering — это команда профессионалов, объединённых страстью к гастрономии и вниманием к деталям. Основанный в Санкт-Петербурге, мы за 12 лет обслужили более 850 мероприятий — от камерных семейных ужинов до масштабных корпоративных праздников.</p>
          <p>Наш шеф-повар Алексей Нилов обучался у лучших мастеров Европы и привносит в каждое блюдо авторский подход, сочетающий классические техники с современными трендами.</p>
        </div>
        <div class="about__quote">&#171;Еда — это язык, на котором мы говорим с вашими гостями&#187;</div>
        <div style="font-size:0.85rem;color:#C8A96E;letter-spacing:0.1em;text-transform:uppercase">Алексей Нилов, основатель</div>
      </div>
    </div>
  </div>
</section>

<!-- CALCULATOR -->
<section class="section section--dark" id="calculator">
  <div class="container">
    <div class="calc">
      <div class="calc__title rv">
        <h2 style="margin:0">Рассчитайте <em>стоимость</em></h2>
        <p style="color:#999;font-size:0.9rem;margin-top:0.5rem">Приблизительный расчёт — точную стоимость уточнит менеджер</p>
      </div>
      <div class="calc__grid rv">
        <div class="calc__field">
          <label class="calc__label" for="calcFormat">Формат</label>
          <select class="calc__select" id="calcFormat">
            <option value="furshet">Фуршет</option>
            <option value="banket">Банкет</option>
            <option value="coffee">Кофе-брейк</option>
            <option value="wedding">Свадебный ужин</option>
          </select>
        </div>
        <div class="calc__field">
          <label class="calc__label" for="calcGuests">Количество гостей</label>
          <input type="text" inputmode="numeric" pattern="[0-9]*" class="calc__input" id="calcGuests" value="50">
        </div>
        <div class="calc__field">
          <label class="calc__label" for="calcExtra">Дополнительные услуги</label>
          <select class="calc__select" id="calcExtra">
            <option value="none">Без доп. услуг</option>
            <option value="bar">Коктейль-бар (+30%)</option>
            <option value="decor">Декор и флористика (+20%)</option>
            <option value="full">Полный пакет (+45%)</option>
          </select>
        </div>
        <div class="calc__field">
          <label class="calc__label" for="calcDate">Дата</label>
          <input type="text" class="calc__input" id="calcDate" placeholder="ДД.ММ.ГГГГ">
        </div>
        <div class="calc__btn-row">
          <button type="button" class="calc__btn-calc" id="calcBtn">Рассчитать</button>
        </div>
        <div class="calc__result">
          <div class="calc__note">Приблизительная стоимость</div>
          <div class="calc__price" id="calcPrice">от 125 000 &#8381;</div>
          <div class="calc__note">Точная стоимость после консультации</div>
        </div>
        <div class="calc__btn-row">
          <a href="#contact" class="btn btn--gold">Получить точный расчёт</a>
        </div>
      </div>
      <!-- Static price table for no-JS environments (iMessage Quick Look) -->
      <div class="calc__static">
        <div class="calc__static-title">Ориентировочные цены</div>
        <table>
          <tr><td>Фуршет</td><td>от 2 500 &#8381;/гость</td></tr>
          <tr><td>Банкет</td><td>от 4 500 &#8381;/гость</td></tr>
          <tr><td>Кофе-брейк</td><td>от 1 200 &#8381;/гость</td></tr>
          <tr><td>Свадебный ужин</td><td>от 6 000 &#8381;/гость</td></tr>
          <tr><td>Коктейль-бар</td><td>+30% к стоимости</td></tr>
          <tr><td>Декор и флористика</td><td>+20% к стоимости</td></tr>
          <tr><td>Полный пакет</td><td>+45% к стоимости</td></tr>
        </table>
        <p style="color:#666;font-size:0.8rem;margin-top:1rem;text-align:center">Для точного расчёта свяжитесь с нами</p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section section--cream" id="faq">
  <div class="container">
    <h2 class="rv" style="text-align:center">Частые <em>вопросы</em></h2>
    <div class="faq__list">
      <div class="faq-item rv">
        <button class="faq-item__q">За какое время нужно заказывать кейтеринг?<span class="faq-item__icon">+</span></button>
        <div class="faq-item__a">Рекомендуем обращаться за 2-4 недели до мероприятия. Это позволяет тщательно проработать меню, согласовать все детали и гарантировать наличие продуктов. В экстренных случаях мы готовы организовать мероприятие за 3-5 дней, но выбор блюд может быть ограничен.</div>
      </div>
      <div class="faq-item rv">
        <button class="faq-item__q">Работаете ли вы за пределами Санкт-Петербурга?<span class="faq-item__icon">+</span></button>
        <div class="faq-item__a">Да, мы выезжаем на мероприятия по всей Ленинградской области и в соседние регионы. Для выездных мероприятий за 100+ км от города добавляется транспортная надбавка, которую мы рассчитываем индивидуально.</div>
      </div>
      <div class="faq-item rv">
        <button class="faq-item__q">Можно ли составить веганское / халяльное меню?<span class="faq-item__icon">+</span></button>
        <div class="faq-item__a">Безусловно! Мы специализируемся на диетических, веганских, вегетарианских, халяльных и кошерных меню. Шеф-повар подберёт ингредиенты и подготовит блюда с полным соблюдением требований. Просто укажите предпочтения при заказе.</div>
      </div>
      <div class="faq-item rv">
        <button class="faq-item__q">Что входит в стоимость?<span class="faq-item__icon">+</span></button>
        <div class="faq-item__a">В базовую стоимость входит: разработка меню, приготовление блюд, доставка, сервировка, одноразовая посуда и приборы, работа официантов (1 официант на 10-15 гостей), уборка после мероприятия. Премиальная посуда, декор и бар — оплачиваются дополнительно.</div>
      </div>
      <div class="faq-item rv">
        <button class="faq-item__q">Как происходит оплата?<span class="faq-item__icon">+</span></button>
        <div class="faq-item__a">Предоплата составляет 50% от суммы, остаток — после мероприятия. Для корпоративных клиентов возможна постоплата по договору. Принимаем банковские карты, переводы и наличные.</div>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section class="section section--dark" id="contact">
  <div class="container">
    <h2 class="rv" style="text-align:center">Свяжитесь <em>с нами</em></h2>
    <div class="contact__grid" style="margin-top:2rem">
      <div class="contact__info rv-left">
        <div class="contact__info-item">
          <div class="contact__info-label">Телефон</div>
          <div class="contact__info-value"><a href="tel:+78121234567">+7 (812) 123-45-67</a></div>
        </div>
        <div class="contact__info-item">
          <div class="contact__info-label">Email</div>
          <div class="contact__info-value">info@nilov-catering.ru</div>
        </div>
        <div class="contact__info-item">
          <div class="contact__info-label">Адрес</div>
          <div class="contact__info-value">Санкт-Петербург, наб. Фонтанки, 42</div>
        </div>
        <div class="contact__info-item">
          <div class="contact__info-label">Время работы</div>
          <div class="contact__info-value">Пн-Вс: 09:00 — 22:00</div>
        </div>
      </div>
      <form class="contact__form rv-right" id="contactForm" action="#contact" method="GET">
        <input type="text" class="contact__input" name="name" placeholder="Ваше имя" required>
        <input type="text" inputmode="tel" class="contact__input" name="phone" placeholder="Телефон" required>
        <input type="text" inputmode="email" class="contact__input" name="email" placeholder="Email">
        <textarea class="contact__textarea" name="message" placeholder="Расскажите о вашем мероприятии" rows="4"></textarea>
        <button type="submit" class="btn btn--gold">Отправить заявку</button>
      </form>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer__inner">
      <div class="footer__copy">&copy; 2024 Nilov Catering. Все права защищены.</div>
      <div class="footer__links">
        <a href="#philosophy">О нас</a>
        <a href="#calculator">Стоимость</a>
        <a href="#contact">Контакты</a>
      </div>
    </div>
  </div>
</footer>

<!-- TOAST -->
<div class="toast" id="toast">Заявка отправлена! Мы свяжемся с вами.</div>

<!-- LIGHTBOX -->
<div class="lightbox" id="lightbox">
  <img class="lightbox__img" id="lightboxImg" src="" alt="Увеличенное фото">
  <div class="lightbox__close" id="lightboxClose">&times;</div>
</div>

<!-- WHATSAPP FLOAT -->
<a href="https://wa.me/78121234567" class="wa-float">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<script>
(function(){
  /* ===== RAF with webkit fallback ===== */
  var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(cb){return setTimeout(cb,16)};

  /* ===== HERO IMAGE LOAD ===== */
  var heroImg = document.getElementById('heroImg');
  if (heroImg) {
    if (heroImg.complete && heroImg.naturalWidth > 0) {
      heroImg.classList.add('loaded');
    } else {
      heroImg.addEventListener('load', function(){ heroImg.classList.add('loaded'); });
      heroImg.addEventListener('error', function(){ heroImg.style.opacity='1'; });
    }
  }

  /* ===== NAV ===== */
  var nav = document.getElementById('nav');
  var navBurger = document.getElementById('navBurger');
  var mobileMenu = document.getElementById('mobileMenu');
  function checkNav() {
    if (!nav) return;
    if (window.pageYOffset > 80) {
      nav.classList.add('nav--solid');
    } else {
      nav.classList.remove('nav--solid');
    }
  }
  if (navBurger && mobileMenu) {
    navBurger.addEventListener('click', function(){
      navBurger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      if (mobileMenu.classList.contains('open')) {
        lockScroll();
      } else {
        unlockScroll();
      }
    });
    var mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener('click', function(){
        navBurger.classList.remove('open');
        mobileMenu.classList.remove('open');
        unlockScroll();
      });
    }
  }

  /* ===== SCROLL LOCK (iOS safe) ===== */
  var scrollPos = 0;
  function lockScroll() {
    scrollPos = window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollPos + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.documentElement.style.overflow = 'hidden';
  }
  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.documentElement.style.overflow = '';
    window.scrollTo(0, scrollPos);
  }

  /* ===== SMOOTH ANCHOR SCROLL ===== */
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && href.length > 1) {
        var target = document.getElementById(href.substring(1));
        if (target) {
          e.preventDefault();
          var offset = nav ? nav.offsetHeight : 0;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          try { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch(err) {}
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      }
    });
  }

  /* ===== SCROLL REVEAL ===== */
  var revealEls = document.querySelectorAll('.rv,.rv-left,.rv-right,.rv-scale,.rv-clip');

  function checkReveal() {
    for (var i = 0; i < revealEls.length; i++) {
      if (revealEls[i].classList.contains('revealed')) continue;
      var rect = revealEls[i].getBoundingClientRect();
      var windowH = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowH - 60) {
        revealEls[i].classList.add('revealed');
      }
    }
  }

  /* ===== COUNTER ANIMATION ===== */
  var counters = document.querySelectorAll('[data-count]');
  var countersAnimated = {};

  function checkCounters() {
    for (var i = 0; i < counters.length; i++) {
      if (countersAnimated[i]) continue;
      var rect = counters[i].getBoundingClientRect();
      var windowH = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowH - 50) {
        countersAnimated[i] = true;
        animateCounter(counters[i]);
      }
    }
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var current = parseInt(el.textContent, 10);
    if (isNaN(current) || current === target) { el.textContent = target; return; }
    el.textContent = '0';
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        raf(step);
      }
    }
    raf(step);
  }

  /* ===== PARALLAX HERO ===== */
  var heroBg = document.querySelector('.hero__bg');
  function parallaxHero() {
    if (!heroBg) return;
    var scrollY = window.pageYOffset;
    if (scrollY < window.innerHeight) {
      var translate = scrollY * 0.3;
      heroBg.style.webkitTransform = 'translateY(' + translate + 'px)';
      heroBg.style.transform = 'translateY(' + translate + 'px)';
    }
  }

  /* ===== SINGLE SCROLL HANDLER (merged) ===== */
  var scrollTicking = false;
  window.addEventListener('scroll', function() {
    if (!scrollTicking) {
      scrollTicking = true;
      raf(function() {
        checkNav();
        checkReveal();
        checkCounters();
        parallaxHero();
        scrollTicking = false;
      });
    }
  }, { passive: true });

  /* Initial check */
  checkNav();
  checkReveal();
  checkCounters();

  /* ===== CALCULATOR ===== */
  var calcFormat = document.getElementById('calcFormat');
  var calcGuests = document.getElementById('calcGuests');
  var calcExtra = document.getElementById('calcExtra');
  var calcPrice = document.getElementById('calcPrice');
  var calcBtn = document.getElementById('calcBtn');

  var prices = { furshet: 2500, banket: 4500, coffee: 1200, wedding: 6000 };
  var extras = { none: 1, bar: 1.3, decor: 1.2, full: 1.45 };

  function calcTotal() {
    if (!calcFormat || !calcGuests || !calcExtra || !calcPrice) return;
    var format = calcFormat.value;
    var guests = parseInt(calcGuests.value, 10) || 50;
    var extra = calcExtra.value;
    if (guests < 10) guests = 10;
    if (guests > 1000) guests = 1000;
    var total = Math.round(prices[format] * guests * extras[extra]);
    var formatted = total.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ' ');
    calcPrice.textContent = '\\u043E\\u0442 ' + formatted + ' \\u20BD';
  }

  /* Auto-calculate on change/input */
  if (calcFormat) calcFormat.addEventListener('change', calcTotal);
  if (calcGuests) calcGuests.addEventListener('input', calcTotal);
  if (calcExtra) calcExtra.addEventListener('change', calcTotal);

  /* Calculate button — works with click and touch in WKWebView */
  if (calcBtn) {
    calcBtn.addEventListener('click', function(e) {
      e.preventDefault();
      calcTotal();
    });
    /* Touch support for WKWebView where click may not fire */
    calcBtn.addEventListener('touchend', function(e) {
      e.preventDefault();
      calcTotal();
    }, { passive: false });
  }

  /* Also calc on select blur (fallback for WKWebView where change doesn't fire) */
  if (calcFormat) calcFormat.addEventListener('blur', calcTotal);
  if (calcExtra) calcExtra.addEventListener('blur', calcTotal);

  /* Initial calculation */
  calcTotal();

  /* ===== FAQ ACCORDION ===== */
  var faqItems = document.querySelectorAll('.faq-item');
  for (var i = 0; i < faqItems.length; i++) {
    (function(item) {
      var btn = item.querySelector('.faq-item__q');
      if (btn) {
        btn.addEventListener('click', function() {
          var wasOpen = item.classList.contains('open');
          for (var j = 0; j < faqItems.length; j++) {
            faqItems[j].classList.remove('open');
          }
          if (!wasOpen) {
            item.classList.add('open');
          }
        });
      }
    })(faqItems[i]);
  }

  /* ===== LIGHTBOX ===== */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var galleryItems = document.querySelectorAll('[data-lightbox]');

  for (var i = 0; i < galleryItems.length; i++) {
    (function(item) {
      item.addEventListener('click', function() {
        var img = item.querySelector('img');
        if (img && lightbox && lightboxImg) {
          lightboxImg.src = img.src;
          lightbox.classList.add('open');
          lockScroll();
        }
      });
    })(galleryItems[i]);
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('open');
      unlockScroll();
    }
  }

  /* ===== CONTACT FORM ===== */
  var contactForm = document.getElementById('contactForm');
  var toast = document.getElementById('toast');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (toast) {
        toast.classList.add('show');
        setTimeout(function() { toast.classList.remove('show'); }, 4000);
      }
      contactForm.reset();
    });
  }
  /* Make form submittable without JS */
  if (contactForm && !contactForm.getAttribute('action')) {
    contactForm.setAttribute('action', '#contact');
    contactForm.setAttribute('method', 'GET');
  }

  /* ===== RESIZE: re-check reveals ===== */
  var resizeTicking = false;
  window.addEventListener('resize', function() {
    if (!resizeTicking) {
      resizeTicking = true;
      setTimeout(function() {
        checkReveal();
        checkCounters();
        resizeTicking = false;
      }, 200);
    }
  });

})();
</script>
</body>
</html>'''

# Write output
with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Written to {OUTPUT}")
print(f"Size: {os.path.getsize(OUTPUT)} bytes")
