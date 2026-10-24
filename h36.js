/* H36 Invisible Editor: evidence/algorithm/interpretation audit.
   Non-destructive enhancement of the existing detail inspector. */
(function(){
'use strict';
const verification={nodes:{},edges:{}};
fetch('h36-provenance.json').then(r=>{if(!r.ok)throw Error(r.status);return r.json()}).then(d=>{verification.nodes=d.nodes||{};verification.edges=d.edges||{};if(selected)render(selected.id)}).catch(()=>{if(selected)render(selected.id)});
function safe(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const typeInfo={mechanism:['Mechanism / 共有原理','タグの共通性に基づく候補関係。歴史的影響の証拠ではありません。'],humboldt:['Humboldt / 研究系譜','研究上の系譜として編集された候補関係。直接の影響関係を示しません。'],idea:['Idea / アイデア共起','設計アイデア上の共起として編集された関係。因果関係を示しません。']};
function render(id){
 const body=document.querySelector('#detailBody');if(!body)return;
 const existing=body.querySelector('#h36Inspector');if(existing)existing.remove();
 const n=nodeById[id];if(!n)return;
 const c=n.c,p=verification.nodes[id]||{};
 const mechanisms=(c.mechanism_ids||[]).map(tag=>{const label=DATA.taxonomy.mechanisms.find(m=>m.id===tag)?.label_ja||tag;return `<div class="h36-row"><b>${safe(label)}</b> <code>(${safe(tag)})</code><div class="h36-note">既存の編集タグ。個別の出典・判定理由は未記録です。</div></div>`}).join('');
 const incident=edges.filter(e=>e.a===id||e.b===id);
 const counts={};incident.forEach(e=>counts[e.type]=(counts[e.type]||0)+1);
 const examples=incident.slice(0,10).map(e=>{const other=e.a===id?e.b:e.a;const [name,explanation]=typeInfo[e.type]||[e.type,'関係の根拠は未検証'];const key=[e.a,e.b,e.type].join('|');const reverse=[e.b,e.a,e.type].join('|');const audit=verification.edges[key]||verification.edges[reverse]||{};return `<div class="h36-row"><b>${safe(byId[other]?.name_ja||byId[other]?.name||other)}</b><div>${safe(name)}</div><div class="h36-note">${safe(explanation)}</div><div class="h36-note">出典：${audit.source_urls?.length?safe(audit.source_urls.join(', ')):'未記録'} ／ 個別検証：未完了</div></div>`}).join('');
 const panel=document.createElement('section');panel.id='h36Inspector';panel.className='h36';panel.setAttribute('aria-label','H36 Invisible Editor / 編集判断の監査');
 panel.innerHTML=`<h3>H36 · 見えない編集者 / Invisible Editor</h3><p>このノードがどのような編集判断・計算・解釈によって表示されているかを区別します。</p><h4>1. Evidence / 証拠</h4><span class="h36-state">${safe(p.verification_status||'unverified')} · 未検証</span><p>出典URL：${p.source_urls?.length?safe(p.source_urls.join(', ')):'未登録'}</p><p>監査：${safe(p.review_status||'pending')} ／ 編集者：${safe(p.editor||'不明')}</p><p class="h36-note">「未登録」は出典が存在しないことを意味しません。現行データに記録がない状態です。</p><h4>2. Inference / 計算・編集</h4><p>ジャンル：${safe(CATS[n.cat].label_ja)}（既存の編集分類）</p><p>タグ：${(c.mechanism_ids||[]).length}件。Evidence spaceはタグ集合のJaccard非類似度と古典的MDSに基づく既存の座標です。Original layoutはタグ・系譜・アイデア共起を用いた既存の配置です。</p><details><summary>タグと判断の記録を表示</summary>${mechanisms||'<p>タグなし</p>'}</details><h4>3. Interpretation / 解釈</h4><p>Interpretive cloudsは既存タグに基づく仮説的なテーマ群です。雲の境界・重なりは実証された分類ではありません。</p><p>このノードに接続する既存エッジ：${incident.length}件（${Object.entries(counts).map(([k,v])=>`${safe(k)} ${v}`).join(' / ')||'なし'}）。</p><details><summary>接続の根拠を確認（最大10件）</summary>${examples||'<p>接続なし</p>'}</details><p class="h36-note">本機能は出典や検証結果を生成しません。現状の欠落を明示する監査用プロトタイプです。位置や関係は変更していません。</p>`;
 body.appendChild(panel);
}
const baseSelect=select;
select=function(id){baseSelect(id);if(selected)render(selected.id)};
if(selected)render(selected.id);
})();