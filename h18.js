/* H18 — editable similarity assumptions, non-destructive counterfactual rankings. */
(function(){
'use strict';
const tags=DATA.taxonomy.mechanisms.map(m=>({id:m.id,label:m.label_ja||m.label_en||m.id}));
const weights=Object.fromEntries(tags.map(t=>[t.id,1]));
let anchor='001';
const safe=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const title=n=>n.c.name_ja||n.c.name||n.id;
const tagSet=n=>new Set(n.c.mechanism_ids||[]);
function distance(a,b,w){
 const A=tagSet(a),B=tagSet(b),all=new Set([...A,...B]);
 let union=0,intersect=0;
 for(const t of all){const weight=w[t]??1;union+=weight;if(A.has(t)&&B.has(t))intersect+=weight;}
 return union===0?0:1-intersect/union;
}
function ranking(a,w){return nodes.filter(n=>n.id!==a.id).map(n=>({n,d:distance(a,n,w)})).sort((x,y)=>x.d-y.d||x.n.id.localeCompare(y.n.id));}
const section=document.createElement('section');section.id='h18Panel';section.className='h18';
section.innerHTML=`<h2>H18 · 類似性の反転</h2><p>編集タグの重みを変え、同じ事例の「近い相手」がどう入れ替わるかを比較します。</p><label for="h18Anchor">基準事例 / Anchor</label><select id="h18Anchor"></select><div class="h18-toolbar"><button type="button" id="h18Reset">重みをリセット</button><button type="button" id="h18AllZero">すべて無効</button></div><details><summary>タグの重みを編集（0–3）</summary><div id="h18Weights"></div></details><div id="h18Results" aria-live="polite"></div><p class="h18-caveat">実験上のタグ類似度です。3D座標・349本の既存エッジ・雲・元データは変更しません。重みを変えた場合の3D再配置は未実装です。</p>`;
const side=document.getElementById('side');const stat=document.getElementById('stat');
if(!side||!stat)return;
stat.insertAdjacentElement('afterend',section);
const selectAnchor=section.querySelector('#h18Anchor');
selectAnchor.innerHTML=nodes.map(n=>`<option value="${safe(n.id)}">${safe(title(n))}</option>`).join('');
selectAnchor.value=anchor;
const container=section.querySelector('#h18Weights');
container.innerHTML=tags.map(t=>`<label class="h18-weight"><span>${safe(t.label)} <small>${safe(t.id)}</small></span><input data-h18-tag="${safe(t.id)}" type="range" min="0" max="3" step="0.25" value="1"><output>1.00</output></label>`).join('');
function render(){
 const a=nodeById[anchor];if(!a)return;
 const baseline=ranking(a,Object.fromEntries(tags.map(t=>[t.id,1])));
 const modified=ranking(a,weights);
 const baselineRank=Object.fromEntries(baseline.map((r,i)=>[r.n.id,i+1]));
 const zero=tags.every(t=>weights[t.id]===0);
 const result=section.querySelector('#h18Results');
 const top=modified.slice(0,8);
 result.innerHTML=`<h3>重み変更後の上位8件</h3>${zero?'<p class="h18-warn">全タグが無効です。全事例の距離が0となり、ランキングに意味はありません。</p>':''}<div class="h18-list">${top.map((r,i)=>{const before=baselineRank[r.n.id];const delta=before-(i+1);return `<button type="button" data-h18-open="${safe(r.n.id)}"><b>${i+1}. ${safe(title(r.n))}</b><small>重み付き距離 ${r.d.toFixed(3)} · 変更前 ${before}位 ${delta>0?'↑'+delta:delta<0?'↓'+(-delta):'—'}</small></button>`}).join('')}</div><p class="h18-caveat">順位変化は基準事例に対するタグ集合の比較であり、科学的な近さを証明しません。距離が同じ場合は事例ID順です。</p>`;
 result.querySelectorAll('[data-h18-open]').forEach(btn=>btn.addEventListener('click',()=>select(btn.dataset.h18Open)));
}
container.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{weights[input.dataset.h18Tag]=Number(input.value);input.nextElementSibling.textContent=Number(input.value).toFixed(2);render();}));
selectAnchor.addEventListener('change',()=>{anchor=selectAnchor.value;render();});
section.querySelector('#h18Reset').addEventListener('click',()=>{for(const t of tags)weights[t.id]=1;container.querySelectorAll('input').forEach(i=>{i.value=1;i.nextElementSibling.textContent='1.00'});render();});
section.querySelector('#h18AllZero').addEventListener('click',()=>{for(const t of tags)weights[t.id]=0;container.querySelectorAll('input').forEach(i=>{i.value=0;i.nextElementSibling.textContent='0.00'});render();});
const oldSelect=select;
select=function(id){oldSelect(id);if(nodeById[id]){anchor=id;selectAnchor.value=id;render();}};
render();
})();
