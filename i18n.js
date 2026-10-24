/* Representation Atlas — bilingual support, standalone and dependency-free.
   Existing research records and 3D layout are not modified. */
(function () {
  'use strict';
  const KEY = 'representation_atlas_lang';
  const translations = {
    'Atlas / 事例': {ja:'Atlas / 事例', en:'Atlas / Cases'},
    'Mechanisms / 原理': {ja:'Mechanisms / 原理', en:'Mechanisms / Principles'},
    '基盤層 / Evidence space': {ja:'基盤層 / Evidence space', en:'Evidence space / Base layer'},
    '従来の配置 / Original layout': {ja:'従来の配置 / Original layout', en:'Original layout'},
    '視野角 / Field of view': {ja:'視野角 / Field of view', en:'Field of view / 視野角'},
    '日本語': {ja:'日本語', en:'日本語'},
    'English': {ja:'English', en:'English'}
  };
  let lang = localStorage.getItem(KEY) === 'en' ? 'en' : 'ja';
  function translate() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(b => {
      const active=b.dataset.lang===lang;
      b.setAttribute('aria-pressed', String(active));
      b.classList.toggle('active',active);
    });
    // Only translate exact, known interface labels; do not alter research content.
    document.querySelectorAll('nav button, #spaceLabel, #fovTitle').forEach(el=>{
      const current=el.textContent.trim();
      for(const [key,variants] of Object.entries(translations)){
        if(current===key || current===variants.ja || current===variants.en){
          el.textContent=variants[lang];break;
        }
      }
    });
  }
  window.AtlasI18n = {
    prepare(data) {
      // Retain the existing original fields and all 124 records unchanged.
      // This hook exists for compatibility with both v28 HTML entry points.
      return data;
    },
    start() {
      document.querySelectorAll('[data-lang]').forEach(button => {
        button.addEventListener('click', () => {
          const next=button.dataset.lang;
          if(next!=='ja' && next!=='en') return;
          lang=next;
          try { localStorage.setItem(KEY,lang); } catch (_) {}
          translate();
          // Existing Data World components already read KEY on interaction.
          if(typeof window.updateModelInfo==='function') window.updateModelInfo();
        });
      });
      translate();
    },
    getLanguage() {return lang;}
  };
})();
