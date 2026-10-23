const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const nodes={},stored={};const ctx=new Proxy({}, {get:()=>()=>{}});
const element=()=>({value:'',checked:false,disabled:false,children:[],append(v){this.children.push(v)},getContext(){return ctx},getBoundingClientRect(){return{left:0,top:0,width:this.width,height:this.height}},setPointerCapture(){},toDataURL(){return 'data:image/png;base64,AAAA'}});
const sandbox={document:{getElementById(id){return nodes[id]??=element()},createElement:element},Image:class{width=200;height=400;async decode(){}},URL:{createObjectURL(){return 'blob:test'},revokeObjectURL(){}},sessionStorage:{setItem(k,v){stored[k]=v}},location:{href:''},console};
const script=fs.readFileSync(__dirname+'/personagem.js','utf8');
vm.runInNewContext(script,sandbox);
(async()=>{
 nodes.jointX.value=50;nodes.jointY.value=50;
 await nodes.sourceFile.onchange({target:{files:[{type:'image/png',size:500}],value:''}});
 assert.equal(nodes.setup.disabled,false);assert.equal(nodes.createCharacter.disabled,true);
 const point=(x,y)=>({button:0,pointerId:1,clientX:x,clientY:y,preventDefault(){}});
 for(let i=0;i<10;i++){nodes.cropCanvas.onpointerdown(point(20+i*10,20+i*25));nodes.cropCanvas.onpointermove(point(40+i*10,60+i*25));nodes.cropCanvas.onpointerup();nodes.useCrop.onclick();}
 assert.equal(nodes.createCharacter.disabled,false);nodes.createCharacter.onclick();
 const rig=JSON.parse(stored['forja2d-image-rig']);assert.equal(Object.keys(rig).length,10);assert.equal(sandbox.location.href,'index.html');
 for(const p of Object.values(rig)){assert.ok(p.w>=4&&p.w<=400);assert.ok(p.h>=4&&p.h<=400);assert.ok(p.pivotX>=0&&p.pivotX<=p.w);assert.ok(p.pivotY>=0&&p.pivotY<=p.h);assert.match(p.image,/^data:image\/png/);}
 // Root + relative child offsets reconstruct the original source anchors.
 assert.ok(Math.abs(256+rig.body.x+rig.head.x-(40*.95+161))<1e-8);
 console.log('OK: importação, recorte das dez peças, articulações, geometria relativa e transferência ao editor.');
})().catch(e=>{console.error(e);process.exitCode=1});

