const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements={},stored={},downloads=[];let animation;
const context=new Proxy({}, {get:()=>()=>{}});
function element(){return {value:0,checked:false,style:{},children:[],append(...v){this.children.push(...v)},replaceChildren(...v){this.children=v},getContext(){return context},click(){},toBlob(cb){cb(new Blob(['png']))}}}
const sandbox={document:{getElementById(id){return elements[id]??=element()},createElement:element,createTextNode:t=>t},localStorage:{setItem(k,v){stored[k]=v},getItem(k){return stored[k]}},requestAnimationFrame(fn){animation=fn},performance:{now:()=>0},confirm:()=>true,structuredClone,Blob,URL:{createObjectURL(blob){downloads.push(blob);return 'blob:test'},revokeObjectURL(){}},setTimeout:()=>{},console};
vm.runInNewContext(fs.readFileSync(__dirname+'/app.js','utf8'),sandbox);
const project=()=>JSON.parse(stored['forja2d-project']);
assert.equal(elements.parts.children.length,10);
elements.add.onclick();assert.equal(project().frames.length,2);
elements.angle.value='45';elements.angle.oninput();assert.equal(project().frames[1].angles.body,45);assert.equal(project().frames[0].angles.body,0);
elements.demo.onclick();assert.equal(project().frames.length,8);assert.notEqual(project().frames[1].angles.legL,0);
elements.play.onclick();animation(150);assert.equal(elements.play.textContent,'■ Parar');elements.play.onclick();assert.equal(elements.play.textContent,'▶ Reproduzir');
elements.export.onclick();assert.equal(downloads.length,1);assert.match(elements.status.textContent,/8 colunas/);
elements.new.onclick();assert.equal(project().frames.length,1);assert.equal(elements.delete.disabled,true);
console.log('OK: hierarquia, poses independentes, caminhada, reprodução, exportação e novo projeto. Verificação com DOM/canvas simulados.');

const canvas=elements.canvas;
canvas.getBoundingClientRect=()=>({left:0,top:0,width:512,height:512});canvas.setPointerCapture=()=>{};
const event=(x,y)=>({button:0,pointerId:1,clientX:x,clientY:y,preventDefault(){}});
(async()=>{
 sandbox.document.getElementById('tool').value='move';
 canvas.onpointerdown(event(256,245));canvas.onpointermove(event(276,255));canvas.onpointerup();
 assert.equal(project().parts.body.x,20);assert.equal(project().parts.body.y,10);
 await elements.undo.onclick();assert.equal(project().parts.body.x,0);
 await elements.redo.onclick();assert.equal(project().parts.body.x,20);
 elements.new.onclick();elements.angle.value='90';elements.angle.oninput();
 canvas.onpointerdown(event(283,207));canvas.onpointermove(event(283,227));canvas.onpointerup();
 assert.equal(project().parts.armL.x,-18);assert.ok(Math.abs(project().parts.armL.y+27)<1e-8);
 elements.width.value='100';elements.width.onchange();assert.equal(project().parts.armL.w,100);
 elements.pivotX.value='20';elements.pivotX.onchange();assert.equal(project().parts.armL.pivotX,20);
 elements.front.onclick();assert.equal(project().order.indexOf('armL'),3);
 elements.back.onclick();assert.equal(project().order.indexOf('armL'),2);
 const old=project();old.version=1;delete old.order;for(const p of Object.values(old.parts))for(const k of ['x','y','w','h','pivotX','pivotY'])delete p[k];
 await elements.file.onchange({target:{files:[{size:100,text:async()=>JSON.stringify(old)}],value:''}});
 assert.equal(project().version,2);assert.equal(project().parts.armL.w,23);
 const invalid=project();invalid.parts.body.w=-1;
 await elements.file.onchange({target:{files:[{size:100,text:async()=>JSON.stringify(invalid)}],value:''}});
 assert.match(elements.status.textContent,/inválida/);assert.equal(project().parts.body.w,62);
 console.log('OK: arraste com pai girado, dimensões, pivô, camadas, desfazer/refazer, migração v1 e rejeição de geometria inválida.');
})().catch(e=>{console.error(e);process.exitCode=1});

