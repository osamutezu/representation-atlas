/* H31: explainable positions — observational inspector, not causal attribution. */
(function(){
'use strict';
const fmt=x=>Number.isFinite(x)?x.toFixed(2):'—';
const esc=x=>String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const getTags=n=>new Set(n.c.mechanism_ids||[]);
function jaccard(a,b){
 const A=getTags(a),B=getTags(b);
 const union=new Set([...A,...B]);
 if(!union.size)return {distance:0,shared:[],union:0};
 const shared=[...A].filter(t=>B.has(t));
 return {distance:1-shared.length/union.size,shared,union:union.size};
}
function dist(p,q){return Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2]);}
function explain(id){
 const node=nodeById[id],body=document.getElementById('detailBody');
 if(!node||!body)return;
 body.querySelector('#h31Inspector')?.remove();
 const evidence=spatialMode==='evidence';
 const coordinates=evidence?EVIDENCE_POSITIONS:originalPositions;
 const pos=coordinates[id];
 const rows=nodes.filter(n=>n.id!==id).map(n=>{
   const sim=jaccard(node,n),d=dist(pos,coordinates[n.id]);
   return {n,sim,d};
 });
 const closest=[...rows].sort((a,b)=>a.d-b.d).slice(0,5);
 const semantic=[...rows].sort((a,b)=>a.sim.distance-b.sim.distance||a.d-b.d).slice(0,5);
 const sharedLabel=t=>DATA.taxonomy.mechanisms.find(m=>m.id===t)?.label_ja||t;
 const title=n=>n.c.name_ja||n.c.name||n.id;
 function table(items){
  return items.map((r,i)=>`<button class="h31-item" type="button" data-h31-node="${esc(r.n.id)}"><b>${i+1}. ${esc(title(r.n))}</b><small>3D distance ${fmt(r.d)} · Jaccard ${fmt(r.sim.distance)} · shared tags ${r.sim.shared.length}/${r.sim.union}</small></button>`).join('');
 }
 const el=document.createElement('section');
 el.id='h31Inspector';el.className='h31';
 el.innerHTML=`<h3>H31 · 説明可能な座標 / Explainable Coordinates</h3>
 <p>現在の空間：<b>${evidence?'Evidence · タグ類似度（MDS）':'Original · 探索的配置'}</b></p>
 <p class="h31-note">座標：X ${fmt(pos[0])} / Y ${fmt(pos[1])} / Z ${fmt(pos[2])}（表示用の任意単位。地理・時間などの実測値ではありません）</p>
 <p>${evidence?'この配置は既存の編集タグのJaccard非類似度を古典的MDSで3次元へ近似したものです。':'この配置はタグ・系譜・アイデア共起を考慮した探索用の配置です。個別座標に対する寄与率を算出したものではありません。'}</p>
 <p class="h31-note">Jaccard非類似度 = 1 − 共通タグ数 / 和集合タグ数。0はタグ集合が同じ、1は共通タグなし。これは検証済みの歴史的類似性ではありません。</p>
 <details><summary>現在の3D空間で近い5事例</summary>${table(closest)}</details>
 <details><summary>タグ集合が近い5事例</summary>${table(semantic)}</details>
 <details><summary>タグの比較を詳しく見る</summary><label for="h31Compare">比較対象</label><select id="h31Compare">${rows.sort((a,b)=>a.d-b.d).map(r=>`<option value="${esc(r.n.id)}">${esc(title(r.n))}</option>`).join('')}</select><div id="h31Comparison"></div></details>
 <p class="h31-note">注意：2つのランキングが異なることは、3Dへの次元圧縮や別の配置規則によって生じ得ます。各軸の意味、各タグの座標寄与、MDSの局所誤差はこの段階では算出していません。</p>`;
 body.appendChild(el);
 const compare=el.querySelector('#h31Compare'),output=el.querySelector('#h31Comparison');
 function update(){
  const other=nodeById[compare.value];if(!other)return;
  const sim=jaccard(node,other);
  const A=getTags(node),B=getTags(other);
  const both=[...A].filter(t=>B.has(t)),onlyA=[...A].filter(t=>!B.has(t)),onlyB=[...B].filter(t=>!A.has(t));
  const labels=a=>a.length?a.map(sharedLabel).map(esc).join(' / '):'なし';
  output.innerHTML=`<p><b>Jaccard ${fmt(sim.distance)}</b> / 3D距離 ${fmt(dist(pos,coordinates[other.id]))}</p><p>共通：${labels(both)}</p><p>選択事例のみ：${labels(onlyA)}</p><p>比較対象のみ：${labels(onlyB)}</p>`;
 }
 compare.addEventListener('change',update);update();
 el.querySelectorAll('[data-h31-node]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.h31Node)));
}
const previousSelect=select;
select=function(id){previousSelect(id);explain(id);};
const previousChangeSpace=changeSpace;
changeSpace=function(mode){previousChangeSpace(mode);if(selected)explain(selected.id);};
if(selected)explain(selected.id);
})();
