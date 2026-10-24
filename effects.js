/* Analog Image Processor PWA — independent browser implementations, not a pixel-exact Swift port. */
const names=['1-BIT DITHER','NIGHT VERSION','CRT','ATMOSPHERE','RISOGRAPH','BLOB TRACKING','DATAMOSH','ASCII ART','FILM CAMERA','LOW POLY','HALFTONE','VHS TAPE','FISHEYE LENS'];
const config=[
{threshold:[128,0,255],scale:[2,1,12],pattern:['BAYER','FLOYD STEINBERG']},
{color:['GREEN','MONOCHROME'],greenIntensity:[100,0,100],gain:[2.2,0.5,5,.1],contrast:[1.25,.4,3,.05],grain:[22,0,100],grainSize:[3,1,10],grainDensity:[65,0,100],glow:[22,0,100],scope:[1,0,1],scopeSize:[88,40,100],edgeSoftness:[8,0,30],crosshair:[1,0,1],zoom:[1,1,3,.1]},
{brightness:[0,-80,80],scanlines:[65,0,100],pixelGrid:[35,0,100],chromaticShift:[3,0,14],curvature:[15,0,100],bloom:[25,0,100],noise:[10,0,100],frame:[1,0,1]},
{exposure:[0,-80,80],contrast:[100,30,200],saturation:[85,0,200],temperature:[0,-100,100],bloom:[30,0,100],haze:[18,0,100],blur:[1,0,8,.5],fade:[15,0,100],grain:[14,0,100],vignette:[12,0,100],greenBoost:[20,0,100],skyBlue:[20,0,100],nostalgia:[20,0,100],fluorescent:[45,0,100],unevenLight:[45,0,100],yellowCast:[65,0,100],void:[45,0,100],unrealLight:[40,0,100]},
{palette:['FLUORO PINK / BLUE','RED / BLUE','GREEN / ORANGE','BLACK / RED','TEAL / CORAL','PURPLE / YELLOW','BLUE / YELLOW','PINK / GREEN','NAVY / GOLD','BURGUNDY / MINT','VIOLET / LIME','CYAN / MAGENTA','FOREST / PINK','BROWN / SKY BLUE','BLACK / YELLOW','INDIGO / ORANGE'],dotSize:[5,2,16],inkDensity:[80,0,100],misregistration:[3,0,12],grain:[15,0,100],paper:[90,50,100],contrast:[110,40,180]},
{threshold:[135,0,255],minimumArea:[18,1,200],lineWidth:[2,1,8],opacity:[90,0,100],glow:[35,0,100],monochrome:[35,0,100],showBoxes:[1,0,1],showCenters:[1,0,1],detectDark:[0,0,1],palette:['CYAN','NEON GREEN','ORANGE','WHITE','MAGENTA'],showCoordinates:[1,0,1],showEdges:[1,0,1],edgeDensity:[45,0,100]},
{intensity:[65,0,100],blockSize:[22,4,100],smear:[50,0,100],chromaticShift:[40,0,100],density:[45,0,100],noise:[20,0,100],seed:[7,0,999],waveDistortion:[30,0,100],waveScale:[40,0,100],verticalTrails:[35,0,100],blockScatter:[40,0,100],greenBleed:[30,0,100]},
{characterSet:['ALPHABET','KANJI','NUMBERS','SYMBOLS','BLOCKS'],color:['ORIGINAL COLOR','WHITE','NEON GREEN','AMBER'],background:['BLACK','WHITE'],characterSize:[10,5,28],density:[85,20,180],contrast:[110,40,200],brightness:[0,-80,80],fontWeight:[500,200,900,100],spacing:[100,60,160],invert:[0,0,1],saturation:[100,0,200],gamma:[100,30,240]},
{preset:['COLOR NEGATIVE','SLIDE FILM','EXPIRED FILM','BLACK & WHITE'],grain:[25,0,100],halation:[25,0,100],fade:[20,0,100],temperature:[15,-100,100],contrast:[110,40,200],vignette:[30,0,100],lightLeak:[18,0,100]},
{polygonSize:[26,8,90],edgeSensitivity:[60,0,100],irregularity:[40,0,100],colorSimplification:[30,0,100],outline:[0,0,100],seed:[5,0,999]},
{pattern:['DOT','LINE','CROSS','SQUARE'],colorMode:['MONO','CMYK','ORIGINAL'],dotSize:[8,3,22],frequency:[100,40,180],angle:[25,0,90],contrast:[110,40,200],inkSpread:[25,0,100],paperColor:[96,60,100]},
{tracking:[48,0,100],colorBleed:[50,0,100],tapeNoise:[35,0,100],dropout:[25,0,100],headSwitching:[35,0,100],softness:[25,0,100],tapeAge:[30,0,100],seed:[7,0,999]},
{projection:['FULL FRAME','CIRCULAR'],direction:['BULGE','PINCH'],curve:[70,0,100],distortion:[75,0,100],fieldOfView:[165,90,200],zoom:[100,70,180],centerX:[50,0,100],centerY:[50,0,100],edgeSoftness:[5,0,30],chromaticAberration:[8,0,100],vignette:[12,0,100],background:['BLACK','WHITE']}
];
const styles=['DREAMCORE','BACKROOMS','LIMINAL SPACE'];
const stylePresets={'DREAMCORE':['VIVID DREAM','PALE BLUE','WARM MEMORY','EERIE GREEN'],'BACKROOMS':['LEVEL 0','ABANDONED','POOLROOMS'],'LIMINAL SPACE':['EMPTY MALL','AFTER HOURS','PALE MEMORY','DAYLIGHT VOID']};
const clamp=v=>Math.max(0,Math.min(255,v));const rnd=(x,y,s=0)=>{let t=Math.sin(x*127.1+y*311.7+s*74.7)*43758.5453;return t-Math.floor(t)};
const lum=(r,g,b)=>r*.2126+g*.7152+b*.0722;
const make=(w,h)=>{let c=document.createElement('canvas');c.width=w;c.height=h;return c};
const pix=(d,w,x,y)=>{x=Math.max(0,Math.min(w-1,Math.round(x)));y=Math.max(0,Math.min(d.length/4/w-1,Math.round(y)));return(y*w+x)*4};
function tone(img,opt){let d=img.data,w=img.width,h=img.height;let {exposure=0,contrast=100,saturation=100,temperature=0,fade=0,grain=0,vignette=0,seed=0}=opt;for(let y=0;y<h;y++)for(let x=0;x<w;x++){let i=(y*w+x)*4,r=d[i],g=d[i+1],b=d[i+2],l=lum(r,g,b);r=l+(r-l)*saturation/100;g=l+(g-l)*saturation/100;b=l+(b-l)*saturation/100;let n=(rnd(x,y,seed)-.5)*grain*.95,vg=vignette/100*Math.pow(Math.hypot((x-w/2)/(w/2),(y-h/2)/(h/2))/1.414,1.7)*.65;for(let k=0;k<3;k++){let z=[r,g,b][k];z=(z-128)*contrast/100+128+exposure+n+(k===0?temperature*.35:k===2?-temperature*.35:0);z=z*(1-fade/250)+fade*.65;d[i+k]=clamp(z*(1-vg))}}}
function soft(canvas,r){if(r<=0)return;let t=make(canvas.width,canvas.height),c=t.getContext('2d');c.filter=`blur(${r}px)`;c.drawImage(canvas,0,0);canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);canvas.getContext('2d').drawImage(t,0,0)}
function bloom(canvas,v){if(v<=0)return;let t=make(canvas.width,canvas.height),tc=t.getContext('2d');tc.filter=`blur(${Math.max(2,canvas.width/150)}px) brightness(1.35)`;tc.drawImage(canvas,0,0);let c=canvas.getContext('2d');c.globalAlpha=v/260;c.globalCompositeOperation='screen';c.drawImage(t,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1}
function effect(canvas,e,v,sty='DREAMCORE',preset=''){const w=canvas.width,h=canvas.height,c=canvas.getContext('2d',{willReadFrequently:true}),base=c.getImageData(0,0,w,h),d=base.data;let out=make(w,h),o=out.getContext('2d',{willReadFrequently:true});
if(e===0){let bayer=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]],step=+v.scale,arr=new Float32Array(w*h);for(let i=0;i<w*h;i++)arr[i]=lum(d[i*4],d[i*4+1],d[i*4+2]);if(v.pattern==='FLOYD STEINBERG'){for(let y=0;y<h;y++)for(let x=0;x<w;x++){let p=y*w+x,old=arr[p],nv=old>=v.threshold?255:0,er=old-nv;arr[p]=nv;if(x+1<w)arr[p+1]+=er*7/16;if(y+1<h){if(x)arr[p+w-1]+=er*3/16;arr[p+w]+=er*5/16;if(x+1<w)arr[p+w+1]+=er/16}}}for(let y=0;y<h;y++)for(let x=0;x<w;x++){let xx=Math.floor(x/step)*step,yy=Math.floor(y/step)*step,p=yy*w+xx,z=v.pattern==='FLOYD STEINBERG'?arr[p]:(arr[p]+(bayer[yy%4][xx%4]-7.5)*9>=v.threshold?255:0),i=(y*w+x)*4;d[i]=d[i+1]=d[i+2]=z}o.putImageData(base,0,0);return out}
if(e===1){
  const zoom=Math.max(1,Number(v.zoom||1));
  if(zoom>1){let z=make(w,h),zc=z.getContext('2d');zc.drawImage(canvas,(w-w/zoom)/2,(h-h/zoom)/2,w/zoom,h/zoom,0,0,w,h);base.data.set(zc.getImageData(0,0,w,h).data)}
  tone(base,{contrast:v.contrast*100,grain:v.grain*(v.grainDensity/100),exposure:30});
  for(let i=0;i<d.length;i+=4){let l=lum(d[i],d[i+1],d[i+2]),z=clamp(Math.pow(l/255,.8)*255*v.gain),g=(v.greenIntensity||0)/100;d[i]=v.color==='GREEN'?z*(1-.87*g):z;d[i+1]=z;d[i+2]=v.color==='GREEN'?z*(1-.75*g):z}
  o.putImageData(base,0,0);bloom(out,v.glow);
  if(v.scope){let radius=Math.min(w,h)*v.scopeSize/200,feather=Math.min(radius*.95,radius*v.edgeSoftness/100*3),start=radius-feather,mask=o.getImageData(0,0,w,h),md=mask.data;for(let y=0;y<h;y++)for(let x=0;x<w;x++){let r=Math.hypot(x+.5-w/2,y+.5-h/2),alpha=r>=radius?0:r<=start||feather<.5?1:(()=>{let t=(radius-r)/feather;return t*t*(3-2*t)})();md[(y*w+x)*4+3]=Math.round(alpha*255)}o.putImageData(mask,0,0);o.save();o.globalCompositeOperation='destination-over';o.fillStyle='#000';o.fillRect(0,0,w,h);o.restore();
    if(v.crosshair){o.save();o.strokeStyle='rgba(125,255,140,.55)';o.lineWidth=Math.max(.7,w*.001);let cx=w/2,cy=h/2,rr=Math.min(radius*.16,w*.065);o.beginPath();o.moveTo(cx-rr,cy);o.lineTo(cx+rr,cy);o.moveTo(cx,cy-rr);o.lineTo(cx,cy+rr);o.stroke();o.restore()}
  }
  return out}
if(e===2){let shift=Math.round(v.chromaticShift),scan=v.scanlines/100,grid=v.pixelGrid/100;for(let y=0;y<h;y++)for(let x=0;x<w;x++){let i=(y*w+x)*4,l=pix(d,w,x-shift,y),r=pix(d,w,x+shift,y),line=1-(y%3===0?scan*.55:0),mask=1-(x%3===0?grid*.4:0),n=(rnd(x,y)-.5)*v.noise;d[i]=clamp((d[l]+v.brightness+n)*line*mask);d[i+1]=clamp((d[i+1]+v.brightness+n)*line*mask);d[i+2]=clamp((d[r+2]+v.brightness+n)*line*mask)}o.putImageData(base,0,0);bloom(out,v.bloom);if(v.frame){o.strokeStyle='#060606';o.lineWidth=Math.max(4,w*.02);o.strokeRect(0,0,w,h)}return out}
if(e===3){let back=sty==='BACKROOMS',lim=sty==='LIMINAL SPACE',exp=v.exposure+(back?7:lim?8:8),sat=v.saturation*(back?.88:lim?.73:1.04),temp=v.temperature+(back?v.yellowCast*.6:lim?-12:10),fade=v.fade+(lim?v.void*.15:0);tone(base,{exposure:exp,contrast:v.contrast,saturation:sat,temperature:temp,fade,grain:v.grain,vignette:v.vignette});for(let y=0;y<h;y++)for(let x=0;x<w;x++){let i=(y*w+x)*4,light=back?(Math.sin(y*.05)*v.unevenLight*.14+Math.sin(x*.012+y*.008)*v.fluorescent*.12):lim?(v.unrealLight*.09*Math.cos(x/w*5)):0;d[i]=clamp(d[i]+light+(back?v.yellowCast*.11:lim?v.void*.08:8+v.nostalgia*.06));d[i+1]=clamp(d[i+1]+light+(back?v.yellowCast*.08:lim?v.void*.08:v.greenBoost*.15));d[i+2]=clamp(d[i+2]+(back?-v.yellowCast*.25:lim?v.void*.12:v.skyBlue*.25))}o.putImageData(base,0,0);soft(out,v.blur);bloom(out,v.bloom);if(v.haze){o.fillStyle=`rgba(235,240,250,${v.haze/650})`;o.fillRect(0,0,w,h)}return out}
if(e===4){let pairs=[['#f92383','#1653b5'],['#df3434','#2446ad'],['#178e63','#ff8c34'],['#171717','#d52c3c'],['#169c9a','#e97469'],['#8643a6','#f2cb32'],['#236bd4','#e9c52e'],['#d7488c','#3b9448'],['#192d68','#d5a33b'],['#78364d','#70cbb3'],['#7045aa','#a4d943'],['#15b9d2','#c43a92'],['#216349','#df7194'],['#8a5b3a','#77b8e6'],['#171717','#edcb2f'],['#4234a4','#e38a2b']],pi=config[4].palette.indexOf(v.palette),pair=pairs[Math.max(0,pi)];o.fillStyle=`rgb(${v.paper*2.55},${v.paper*2.55},${v.paper*2.55})`;o.fillRect(0,0,w,h);let sz=v.dotSize,off=v.misregistration;for(let y=sz/2;y<h;y+=sz)for(let x=sz/2;x<w;x+=sz){let i=pix(d,w,x,y),l=lum(d[i],d[i+1],d[i+2]),a=Math.max(0,1-l/255)*v.inkDensity/100,r=sz*.56*Math.sqrt(a);o.fillStyle=pair[0];o.beginPath();o.arc(x,y,r,0,7);o.fill();o.globalAlpha=.55;o.fillStyle=pair[1];o.beginPath();o.arc(x+off,y-off,Math.max(0,r*.8),0,7);o.fill();o.globalAlpha=1}return out}
if(e===5){
  o.putImageData(base,0,0);
  // Connected-component detection, as in the Swift processor, rather than fixed grid squares.
  const ds=Math.min(1,260/Math.max(w,h)),dw=Math.max(1,Math.round(w*ds)),dh=Math.max(1,Math.round(h*ds)),dc=make(dw,dh),dx=dc.getContext('2d',{willReadFrequently:true});dx.drawImage(canvas,0,0,dw,dh);const src=dx.getImageData(0,0,dw,dh).data;
  const active=new Uint8Array(dw*dh),seen=new Uint8Array(dw*dh),minPixels=Math.max(5,Math.floor(dw*dh*(.00008+Math.pow(v.minimumArea/200,2)*.025))),maxPixels=dw*dh*.85;
  for(let i=0;i<active.length;i++){let j=i*4,l=lum(src[j],src[j+1],src[j+2]);active[i]=v.detectDark?+(l<v.threshold):+(l>v.threshold)}
  const regions=[],queue=new Int32Array(dw*dh);
  for(let start=0;start<active.length;start++){if(!active[start]||seen[start])continue;let head=0,tail=1;queue[0]=start;seen[start]=1;let minX=dw,minY=dh,maxX=0,maxY=0,sumX=0,sumY=0;while(head<tail){let p=queue[head++],x=p%dw,y=(p/dw)|0;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);sumX+=x;sumY+=y;let neighbors=[x>0?p-1:-1,x<dw-1?p+1:-1,y>0?p-dw:-1,y<dh-1?p+dw:-1];for(let n of neighbors)if(n>=0&&active[n]&&!seen[n]){seen[n]=1;queue[tail++]=n}}if(tail>=minPixels&&tail<=maxPixels)regions.push({minX,minY,maxX,maxY,count:tail,cx:sumX/tail,cy:sumY/tail})}
  regions.sort((a,b)=>b.count-a.count);regions.length=Math.min(regions.length,45);
  let colors={'CYAN':'#00efff','NEON GREEN':'#49ff4b','ORANGE':'#ff8b20','WHITE':'#ffffff','MAGENTA':'#ff43d0'},col=colors[v.palette]||'#00efff';
  if(v.monochrome){o.fillStyle=`rgba(0,0,0,${v.monochrome/300})`;o.fillRect(0,0,w,h)}
  o.save();o.strokeStyle=col;o.fillStyle=col;o.globalAlpha=v.opacity/100;o.lineWidth=Math.max(1,Math.min(w,h)*(.001+.006*v.lineWidth/8));o.shadowColor=col;o.shadowBlur=o.lineWidth*(1+v.glow/12);
  const fx=w/dw,fy=h/dh;
  if(v.showEdges&&v.edgeDensity&&regions.length>1){let maxDist=Math.hypot(w,h)*(.12+v.edgeDensity/250),pairs=new Set();for(let i=0;i<regions.length;i++){let r=regions[i],near=regions.map((q,j)=>({j,dist:Math.hypot((q.cx-r.cx)*fx,(q.cy-r.cy)*fy)})).filter(q=>q.j!==i&&q.dist<maxDist).sort((a,b)=>a.dist-b.dist).slice(0,1+Math.floor(v.edgeDensity/25));for(let q of near){let key=[Math.min(i,q.j),Math.max(i,q.j)].join('-');if(pairs.has(key))continue;pairs.add(key);o.beginPath();o.moveTo(r.cx*fx,r.cy*fy);o.lineTo(regions[q.j].cx*fx,regions[q.j].cy*fy);o.stroke()}}}
  regions.forEach((r,i)=>{let x=r.minX*fx,y=r.minY*fy,bw=(r.maxX-r.minX+1)*fx,bh=(r.maxY-r.minY+1)*fy,cx=r.cx*fx,cy=r.cy*fy;if(v.showBoxes)o.strokeRect(x,y,bw,bh);if(v.showCenters){let rad=Math.max(2,o.lineWidth*3);o.beginPath();o.arc(cx,cy,rad,0,Math.PI*2);o.stroke();o.beginPath();o.moveTo(cx-rad*1.8,cy);o.lineTo(cx+rad*1.8,cy);o.moveTo(cx,cy-rad*1.8);o.lineTo(cx,cy+rad*1.8);o.stroke()}if(v.showBoxes||v.showCoordinates){o.shadowBlur=0;let fontSize=Math.max(9,Math.min(w,h)*.018);o.font=`bold ${fontSize}px monospace`;let label=v.showCoordinates?`#${String(i+1).padStart(2,'0')} X:${Math.round(r.minX/dw*w)} Y:${Math.round(r.minY/dh*h)} W:${Math.round(bw)} H:${Math.round(bh)}`:`ID ${String(i+1).padStart(2,'0')}`;o.fillText(label,Math.max(2,Math.min(x+2,w-o.measureText(label).width-2)),Math.max(fontSize,y-3));o.shadowBlur=o.lineWidth*(1+v.glow/12)}});o.restore();return out}
if(e===6){
  const bs=Math.max(1,Math.round(v.blockSize)),seed=v.seed,intensity=v.intensity/100,density=v.density/100;
  if(!intensity||!density){o.putImageData(base,0,0);return out}
  const input=new Uint8ClampedArray(d),output=new Uint8ClampedArray(d),cols=Math.ceil(w/bs),rows=Math.ceil(h/bs),smear=v.smear/100,scatter=v.blockScatter/100;
  for(let by=0;by<rows;by++){let stripe=rnd(0,Math.floor(by/3),seed+91)<density,dir=rnd(1,by,seed)>.5?1:-1;for(let bx=0;bx<cols;bx++){let chance=rnd(bx,by,seed);if(chance>density*(stripe?.9:.24))continue;let shiftX=Math.round(dir*w*(.015+smear*.48)*intensity*(.45+.55*rnd(bx,by,seed+4))),shiftY=Math.round((rnd(bx,by,seed+8)-.5)*h*.15*scatter),scatterX=Math.round((rnd(bx,by,seed+13)-.5)*w*.44*scatter),x0=bx*bs,y0=by*bs;for(let y=y0;y<Math.min(h,y0+bs);y++)for(let x=x0;x<Math.min(w,x0+bs);x++){let sx=x-shiftX+scatterX-Math.round((x-x0)*smear*.94),sy=y+shiftY,i=(y*w+x)*4,src=pix(input,w,sx,sy),rs=pix(input,w,sx+v.chromaticShift*.15,sy),bl=pix(input,w,sx-v.chromaticShift*.15,sy),noise=(rnd(x,y,seed)-.5)*v.noise*2;output[i]=clamp(input[i]*(1-intensity)+(input[rs]+noise)*intensity);output[i+1]=clamp(input[i+1]*(1-intensity)+(input[src+1]+noise)*intensity);output[i+2]=clamp(input[i+2]*(1-intensity)+(input[bl+2]+noise)*intensity)}}}
  // Tall, vertically stretched source columns, with seeded irregular placement.
  const trail=v.verticalTrails/100;if(trail){let before=new Uint8ClampedArray(output),tw=Math.max(1,Math.round(bs*(.5+trail*1.8)));for(let x0=0,col=0;x0<w;x0+=tw,col++){let r=rnd(col,709,seed+718);if(r>density*trail)continue;let start=Math.floor(h*rnd(col,710,seed)),end=Math.min(h,start+Math.round(h*(.1+trail*.7))),sourceY=Math.max(0,start-Math.round(h*(.08+trail*.35)));for(let y=start;y<end;y++){let sy=Math.min(h-1,sourceY+Math.floor((y-start)*(1-trail*.96)));for(let x=x0;x<Math.min(w,x0+tw);x++){let i=(y*w+x)*4,j=(sy*w+x)*4,blend=intensity*trail;for(let k=0;k<3;k++)output[i+k]=clamp(before[i+k]*(1-blend)+before[j+k]*blend)}}}}
  if(v.greenBleed){for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(rnd(Math.floor(x/Math.max(1,bs*2)),Math.floor(y/Math.max(1,bs*2)),seed+24)>density*.85)continue;let i=(y*w+x)*4,g=v.greenBleed/100*intensity;output[i]=clamp(output[i]*(1-g*.34));output[i+1]=clamp(output[i+1]+55*g);output[i+2]=clamp(output[i+2]+22*g)}}
  if(v.waveDistortion){let prior=new Uint8ClampedArray(output),scale=v.waveScale/100,frequency=1.2+scale*12,amp=w*.19*v.waveDistortion/100*intensity,bands=3+Math.floor(scale*8);for(let y=0;y<h;y++){let ny=y/h,env=0;for(let b=0;b<bands;b++){let center=rnd(b,49,seed),width=.025+(1-scale)*.085,z=(ny-center)/width;env=Math.max(env,Math.exp(-z*z*1.6))}let phase=seed*.018,offset=Math.round(amp*env*(Math.sin(ny*frequency*Math.PI*2+phase)+.34*Math.sin(ny*frequency*Math.PI*3.3-phase*.7)));if(!offset)continue;for(let x=0;x<w;x++){let i=(y*w+x)*4,j=pix(prior,w,x+offset,y);output[i]=prior[j];output[i+1]=prior[j+1];output[i+2]=prior[j+2]}}}
  o.putImageData(new ImageData(output,w,h),0,0);return out}
if(e===7){o.fillStyle=v.background==='WHITE'?'#fff':'#050505';o.fillRect(0,0,w,h);let sets={'ALPHABET':'@%#*+=-:. ','KANJI':'鬱夢森雨空山水人一　','NUMBERS':'9876543210 ','SYMBOLS':'█▓▒░◆●+·  ','BLOCKS':'█▓▒░ '},chars=sets[v.characterSet],sz=v.characterSize,stepX=Math.max(3,sz*.64*v.spacing/100),stepY=Math.max(4,sz*1.1);o.font=`${v.fontWeight} ${sz}px monospace`;o.textBaseline='top';for(let y=0;y<h;y+=stepY)for(let x=0;x<w;x+=stepX){let i=pix(d,w,x,y),l=clamp((lum(d[i],d[i+1],d[i+2])-128)*v.contrast/100+128+v.brightness),p=v.invert?l/255:1-l/255,k=Math.min(chars.length-1,Math.floor(p*chars.length));if(v.color==='ORIGINAL COLOR')o.fillStyle=`rgb(${d[i]},${d[i+1]},${d[i+2]})`;else o.fillStyle=({'WHITE':'#f8f8f8','NEON GREEN':'#4dff71','AMBER':'#ffbd55'})[v.color];o.fillText(chars[k],x,y)}return out}
if(e===8){let mono=v.preset==='BLACK & WHITE',expired=v.preset==='EXPIRED FILM',slide=v.preset==='SLIDE FILM';tone(base,{contrast:v.contrast+(slide?18:0),saturation:mono?0:expired?70:slide?125:103,temperature:v.temperature+(expired?20:0),fade:v.fade+(expired?25:0),grain:v.grain,vignette:v.vignette});o.putImageData(base,0,0);bloom(out,v.halation);if(v.lightLeak){let g=o.createLinearGradient(0,0,w*.6,h);g.addColorStop(0,`rgba(255,99,33,${v.lightLeak/240})`);g.addColorStop(1,'rgba(255,99,33,0)');o.fillStyle=g;o.fillRect(0,0,w,h)}return out}
if(e===9){o.fillStyle='#111';o.fillRect(0,0,w,h);let step=v.polygonSize,seed=v.seed,points=[];for(let y=-step;y<h+step;y+=step){let row=[];for(let x=-step;x<w+step;x+=step){let jitter=step*v.irregularity/200;row.push([x+(rnd(x,y,seed)-.5)*jitter*2,y+(rnd(x+2,y,seed)-.5)*jitter*2])}points.push(row)}function tri(a,b,z){let cx=(a[0]+b[0]+z[0])/3,cy=(a[1]+b[1]+z[1])/3,i=pix(d,w,cx,cy),q=Math.max(1,Math.round(v.colorSimplification/8));o.fillStyle=`rgb(${Math.round(d[i]/q)*q},${Math.round(d[i+1]/q)*q},${Math.round(d[i+2]/q)*q})`;o.beginPath();o.moveTo(...a);o.lineTo(...b);o.lineTo(...z);o.closePath();o.fill();if(v.outline){o.strokeStyle=`rgba(0,0,0,${v.outline/160})`;o.lineWidth=.6;o.stroke()}}for(let y=0;y<points.length-1;y++)for(let x=0;x<points[y].length-1;x++){let a=points[y][x],b=points[y][x+1],cc=points[y+1][x],dd=points[y+1][x+1];tri(a,b,cc);tri(b,dd,cc)}return out}
if(e===10){let sz=v.dotSize*100/v.frequency,paper=Math.round(v.paperColor*2.55),contrast=v.contrast/100,pattern=v.pattern,mode=v.colorMode;o.fillStyle=`rgb(${paper},${paper},${paper})`;o.fillRect(0,0,w,h);for(let y=sz/2;y<h;y+=sz)for(let x=sz/2;x<w;x+=sz){let i=pix(d,w,x,y),l=clamp((lum(d[i],d[i+1],d[i+2])-128)*contrast+128),radius=sz*.68*Math.sqrt(1-l/255)*(1+v.inkSpread/250);o.fillStyle=mode==='ORIGINAL'?`rgb(${d[i]},${d[i+1]},${d[i+2]})`:mode==='CMYK'?`rgb(${Math.round(d[i]*.5)},${Math.round(d[i+1]*.5)},${Math.round(d[i+2]*.5)})`:'#181818';o.save();o.translate(x,y);o.rotate(v.angle*Math.PI/180);if(pattern==='DOT'){o.beginPath();o.arc(0,0,radius,0,7);o.fill()}else if(pattern==='SQUARE')o.fillRect(-radius,-radius,radius*2,radius*2);else{o.fillRect(-sz*.5,-radius,sz,radius*2);if(pattern==='CROSS')o.fillRect(-radius,-sz*.5,radius*2,sz)}o.restore()}return out}
if(e===11){let orig=new Uint8ClampedArray(d),seed=v.seed;for(let y=0;y<h;y++)for(let x=0;x<w;x++){let band=Math.floor(y/7),offset=(rnd(band,0,seed)<v.tracking/280)?Math.round((rnd(band,1,seed)-.5)*v.tracking*2):0;if(y>h*.94)offset+=Math.sin(y*.6)*v.headSwitching*.6;let i=(y*w+x)*4,s=pix(orig,w,x+offset,y),r=pix(orig,w,x+offset+v.colorBleed*.12,y),b=pix(orig,w,x+offset-v.colorBleed*.12,y),n=(rnd(x,y,seed)-.5)*v.tapeNoise*1.3;d[i]=clamp(orig[r]*(1-v.tapeAge/550)+n+v.tapeAge*.12);d[i+1]=clamp(orig[s+1]*(1-v.tapeAge/650)+n);d[i+2]=clamp(orig[b+2]*(1-v.tapeAge/350)+n);if(rnd(Math.floor(y/2),0,seed)<v.dropout/1100&&rnd(x,y,seed)>.2){d[i]=d[i+1]=d[i+2]=clamp(170+n)}}o.putImageData(base,0,0);soft(out,v.softness/18);return out}
if(e===12){
  // Inverse radial mapping: center magnification with progressively compressed periphery.
  // Circular projection masks to a physical circular image; full-frame fills the rectangle.
  const src=d, dst=o.createImageData(w,h), dd=dst.data;
  const cx=w*v.centerX/100,cy=h*v.centerY/100;
  const radius=Math.min(w,h)*.5;
  const strength=v.distortion/100, zoom=v.zoom/100;
  const fovFactor=Math.max(.6,Math.min(1.45,v.fieldOfView/165));
  const circle=v.projection==='CIRCULAR';
  const maxR=circle?radius:Math.hypot(Math.max(cx,w-cx),Math.max(cy,h-cy));
  const softPx=radius*v.edgeSoftness/100;
  const bg=v.background==='WHITE'?255:0;
  const ca=v.chromaticAberration/100;
  const vig=v.vignette/100;
  function sample(x,y,channel){
    x=Math.max(0,Math.min(w-1,x));y=Math.max(0,Math.min(h-1,y));
    let x0=Math.floor(x),y0=Math.floor(y),x1=Math.min(w-1,x0+1),y1=Math.min(h-1,y0+1);
    let fx=x-x0,fy=y-y0;
    let a=src[(y0*w+x0)*4+channel],b=src[(y0*w+x1)*4+channel],c=src[(y1*w+x0)*4+channel],d=src[(y1*w+x1)*4+channel];
    return (a*(1-fx)+b*fx)*(1-fy)+(c*(1-fx)+d*fx)*fy;
  }
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const dx=x-cx,dy=y-cy,dist=Math.hypot(dx,dy),nr=dist/maxR;
    let alpha=1;
    if(circle){alpha=softPx>0?Math.max(0,Math.min(1,(radius-dist)/softPx)):+(dist<=radius)}
    // Curved radial lens mapping: normalized atan / tan profiles are inverses.
    // BULGE magnifies the center; PINCH reverses the radial direction.
    // CURVE blends the lens profile with a gentler polynomial profile.
    const r=Math.min(1,Math.max(0,nr)),k=1.1+strength*2.9;
    const curvedBulge=Math.atan(r*k)/Math.atan(k);
    const curvedPinch=Math.tan(r*Math.atan(k))/k;
    const gentleBulge=r*(1-.55*strength*(1-r*r));
    const gentlePinch=r*(1+.55*strength*(1-r*r));
    const curved=v.direction==='PINCH'?curvedPinch:curvedBulge;
    const gentle=v.direction==='PINCH'?gentlePinch:gentleBulge;
    const bend=(v.curve??70)/100;
    const radial=r*(1-strength)+strength*(gentle*(1-bend)+curved*bend);
    const mapped=r>1e-7?radial/r:1;
    const scale=mapped*fovFactor/zoom;
    const sx=cx+dx*scale,sy=cy+dy*scale;
    const shift=ca*dist*.018;
    const idx=(y*w+x)*4;
    const shade=Math.max(0,1-vig*Math.pow(Math.min(1,nr),2)*.85);
    for(let ch=0;ch<3;ch++){
      const off=ch===0?shift:ch===2?-shift:0;
      const val=sample(sx+(dist?dx/dist*off:0),sy+(dist?dy/dist*off:0),ch)*shade;
      dd[idx+ch]=clamp(val*alpha+bg*(1-alpha));
    }
    dd[idx+3]=255;
  }
  o.putImageData(dst,0,0);return out;
}
o.putImageData(base,0,0);return out}
