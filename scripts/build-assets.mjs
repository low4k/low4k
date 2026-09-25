import { mkdir, writeFile } from 'node:fs/promises';

await mkdir(new URL('../assets/', import.meta.url), { recursive: true });
const ink = '#0d0f14', paper = '#eee9df', muted = '#a9a7a1', rust = '#d49a7d';
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x,y,s,size=16,color=paper,extra='') => `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" ${extra}>${esc(s)}</text>`;
const svg = (w,h,body,title) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>${esc(title)}</title><g font-family="'Cascadia Mono',Consolas,monospace">${body}</g></svg>\n`;
const save = (name,w,h,body,title=name) => writeFile(new URL(`../assets/${name}.svg`,import.meta.url),svg(w,h,body,title));
const panel = (w,h) => `<rect width="${w}" height="${h}" rx="10" fill="${ink}"/><rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="10" fill="none" stroke="#303037"/>`;

for (const [name,num,label,right] of [
  ['01-about','01','a little about me','~/law'],
  ['02-stack','02','things i use',''],
  ['03-build','03','what i like building',''],
  ['04-public','04','out in the open','public repos'],
  ['05-activity','05','contributions',''],
]) {
  await save(name,1000,58,`<rect width="1000" height="58" rx="6" fill="${ink}"/>${text(20,36,num,16,rust)}${text(66,37,label,22)}<path d="M 410 30 H 790" stroke="#303037"/>${text(977,35,right,13,muted,'text-anchor="end"')}`,label);
}

for (const [name,label,width,symbol] of [['discord','shizuku / discord',226,'#'],['tiktok','tiktok / manhwamc',226,'♪'],['github','my repos',158,'<>']]) {
  await save(name,width,38,`${panel(width,38)}${text(14,25,symbol,17,rust)}${text(44,25,label,14)}`,label);
}

await save('terminal',600,288,`${panel(600,288)}
<style>@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}@keyframes reveal{0%,8%{opacity:0}14%,100%{opacity:1}}.cursor{animation:blink 1.2s step-end infinite}.a{animation:reveal 8s infinite}.b{animation:reveal 8s .35s infinite}.c{animation:reveal 8s .7s infinite}@media(prefers-reduced-motion:reduce){.cursor,.a,.b,.c{animation:none}}</style>
<path d="M0 42H600" stroke="#303037"/><circle cx="21" cy="22" r="4" fill="${rust}"/><circle cx="37" cy="22" r="4" fill="#666368"/><circle cx="53" cy="22" r="4" fill="#45454c"/>
${text(578,27,'law@arch ~',12,muted,'text-anchor="end"')}
${text(24,78,'$ whoami',17,rust)}${text(24,107,'law / low4k',23)}
<g class="a">${text(24,147,'favorite',15,muted)}${text(165,147,'rust',16,rust)}</g>
<g class="b">${text(24,178,'home',15,muted)}${text(165,178,'linux + arch',16)}</g>
<g class="c">${text(24,209,'discord',15,muted)}${text(165,209,'manhwamc',16)}</g>
${text(24,259,'$ cargo run',16,rust)}<rect class="cursor" x="143" y="245" width="10" height="18" fill="${rust}"/>`, 'law at the terminal');

const skills = [
 ['rs','rust','favorite',rust], ['py','python','scripts','#d1be8b'],['js','javascript','web','#d1be8b'],['ts','typescript','web','#92acc7'],
 ['go','go','tools','#92b8be'],['λ','haskell','functional','#b5a1c7'],['ra','raku','scripts','#c4a0b5'],['<>','html','web','#cc9a83'],
 ['#','css','style','#9aaec9'],['~','linux','home','#cbc6a5'],['/\\','arch linux','home','#8bb1c7'],['+','git','history','#ca9b89']
];
let cards='';
for(let i=0;i<skills.length;i++) {
 const [mark,label,note,col]=skills[i], x=(i%4)*252,y=Math.floor(i/4)*101;
 cards+=`<g transform="translate(${x} ${y})"><rect x=".5" y=".5" width="243" height="91" rx="9" fill="${ink}" stroke="${i===0?'#986b56':'#303037'}"/><rect x="15" y="20" width="50" height="50" rx="9" fill="#202127"/>${text(40,53,mark,24,col,'text-anchor="middle"')}${text(80,41,label,17)}${text(80,65,note,12,muted)}</g>`;
}
await save('stack',1000,294,cards,'rust, python, javascript, typescript, go, haskell, raku, html, css, linux, arch linux, git');

for (const [file,title,tag,lines,lang] of [
 ['zzz','zzz','my project',['animated ascii art','from gifs in your terminal'],'python'],
 ['tako','tako-code','fork',['a coding agent fork','i keep here to play with.'],'typescript'],
]) {
 await save(file,490,191,`${panel(490,191)}${text(23,32,tag,12,rust)}${text(23,77,title,30)}${text(23,109,lines[0],15,muted)}${text(23,131,lines[1],15,muted)}<circle cx="27" cy="164" r="4" fill="${rust}"/>${text(40,169,lang,12,muted)}${text(464,42,'↗',27,rust,'text-anchor="end"')}`,`${title}: ${lines.join(' ')}`);
}

await save('footer',1000,80,`<style>@keyframes drift{to{stroke-dashoffset:-40}}.line{animation:drift 5s linear infinite}@media(prefers-reduced-motion:reduce){.line{animation:none}}</style><rect width="1000" height="80" rx="6" fill="${ink}"/><path class="line" d="M24 20H976" stroke="${rust}" stroke-dasharray="2 18"/>${text(976,58,'law',26,paper,'text-anchor="end" font-family="Georgia,serif" font-style="italic"')}`,'law');
console.log('built 13 profile assets');
