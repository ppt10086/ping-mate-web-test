'use strict';
const frame=document.getElementById('lab-frame'),status=document.getElementById('lab-status');
let raw='',generation=0;
const scenes=new Set(['splash','new','login','home','history','replay','fog','photos','activity','theme','mate','settings']);
const storageShim=()=>{
 const storage=()=>{const values=new Map();return {get length(){return values.size;},key:i=>[...values.keys()][i]??null,getItem:k=>values.get(String(k))??null,setItem:(k,v)=>values.set(String(k),String(v)),removeItem:k=>values.delete(String(k)),clear:()=>values.clear()};};
 Object.defineProperty(window,'localStorage',{value:storage()});Object.defineProperty(window,'sessionStorage',{value:storage()});
 window.alert=()=>{};window.confirm=()=>false;window.prompt=()=>null;
};
async function start(scene='new'){
 const own=++generation;status.textContent='正在准备…';
 try{
  if(!raw){const response=await fetch('runtime.txt',{cache:'no-store'});if(!response.ok)throw Error('演示资源未就绪');raw=await response.text();}
  if(own!==generation)return;
  const base=new URL('../',location.href).href;
  const shim='<base href="'+base+'"><script>('+storageShim.toString()+')();window.PM_LAB_MODE='+JSON.stringify(scene)+';<\/script>';
  frame.srcdoc=raw.replace('<head>','<head>'+shim);
  document.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.scene===scene)));
 }catch(e){status.textContent=e.message+'，请刷新重试';}
}
document.querySelectorAll('[data-scene]').forEach(b=>b.addEventListener('click',()=>start(b.dataset.scene)));
document.getElementById('lab-reset').onclick=()=>start('new');
document.getElementById('lab-expand').onclick=()=>document.body.classList.add('expanded');
const collapse=document.createElement('button');collapse.textContent='收起';collapse.onclick=()=>document.body.classList.remove('expanded');document.querySelector('.lab-caption').appendChild(collapse);
window.addEventListener('message',e=>{if(e.source!==frame.contentWindow||e.origin!=='null'||e.data?.type!=='ping-lab-status')return;status.textContent=String(e.data.message||'').slice(0,100);});
start(new URL(location.href).searchParams.get('scene')&&scenes.has(new URL(location.href).searchParams.get('scene'))?new URL(location.href).searchParams.get('scene'):'new');
