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

