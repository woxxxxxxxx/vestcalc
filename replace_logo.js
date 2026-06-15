const fs=require('fs'),path=require('path');
const BASE=path.resolve('C:/Users/Administrator/vestcalc');

const NEW_LOGO='<a href="/" class="logo"><img src="/logo.svg" alt="VestCalc" height="32"></a>';

// 匹配两种格式：<a href="/" class="logo">...logo-icon SVG...logo-name...</a>
// 用贪婪最短匹配，跨行
const LOGO_RE=/<a href="\/" class="logo">\s*<div class="logo-icon">[\s\S]*?<\/div>\s*<span class="logo-name">[\s\S]*?<\/span>\s*<\/a>/g;

const allFiles=[];
function collect(dir){
  fs.readdirSync(dir).forEach(function(f){
    const fp=path.join(dir,f);
    const s=fs.statSync(fp);
    if(s.isDirectory()&&f!=='node_modules'&&f!=='.git') collect(fp);
    else if(f.endsWith('.html')) allFiles.push(fp);
  });
}
collect(BASE);

let replaced=0,skipped=0,multiHit=0;
allFiles.forEach(function(fp){
  const rel=fp.slice(BASE.length+1).replace(/\\/g,'/');
  const html=fs.readFileSync(fp,'utf8');
  const matches=html.match(LOGO_RE);
  if(!matches){
    skipped++;
    return;
  }
  if(matches.length>1) multiHit++;
  const newHtml=html.replace(LOGO_RE,NEW_LOGO);
  fs.writeFileSync(fp,newHtml,'utf8');
  replaced++;
  console.log('✅ ('+matches.length+'处) '+rel);
});

console.log('\n替换: '+replaced+' 个  /  跳过: '+skipped+' 个'+(multiHit?' / 多处命中: '+multiHit:''));

// 验证
const withLogoSvg=allFiles.filter(fp=>fs.readFileSync(fp,'utf8').includes('/logo.svg')).length;
const withLogoIcon=allFiles.filter(fp=>fs.readFileSync(fp,'utf8').includes('logo-icon')).length;
const withLogoName=allFiles.filter(fp=>fs.readFileSync(fp,'utf8').includes('logo-name')).length;
console.log('含 /logo.svg:  '+withLogoSvg+' 个文件 ✅');
console.log('残留 logo-icon: '+withLogoIcon+' 个文件'+(withLogoIcon?' ⚠️':'  ✅'));
console.log('残留 logo-name: '+withLogoName+' 个文件'+(withLogoName?' ⚠️':'  ✅'));
