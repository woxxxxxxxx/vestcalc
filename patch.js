const fs=require('fs'),path=require('path');
const BASE=path.resolve('C:/Users/Administrator/vestcalc');

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

let favReplaced=0, logoReplaced=0, skipped=0;

const OLD_FAV='<link rel="icon" href="/favicon.ico" sizes="any">';
const NEW_FAV='<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico" sizes="any">';
const OLD_LOGO='src="/logo.svg" alt="VestCalc" height="32"';
const NEW_LOGO='src="/logo.svg" alt="VestCalc" height="40"';

allFiles.forEach(function(fp){
  let html=fs.readFileSync(fp,'utf8');
  let changed=false;
  if(html.includes(OLD_FAV)){ html=html.replaceAll(OLD_FAV,NEW_FAV); favReplaced++; changed=true; }
  if(html.includes(OLD_LOGO)){ html=html.replaceAll(OLD_LOGO,NEW_LOGO); logoReplaced++; changed=true; }
  if(changed) fs.writeFileSync(fp,html,'utf8');
  else skipped++;
});

console.log('favicon 升级: '+favReplaced+' 个');
console.log('logo height 32→40: '+logoReplaced+' 个');
console.log('未改动: '+skipped+' 个');

// 验证
const withSvgFav=allFiles.filter(fp=>fs.readFileSync(fp,'utf8').includes('favicon.svg')).length;
const withH40=allFiles.filter(fp=>fs.readFileSync(fp,'utf8').includes('height="40"')).length;
const withH32=allFiles.filter(fp=>fs.readFileSync(fp,'utf8').includes('height="32"')).length;
console.log('\n验证:');
console.log('  含 favicon.svg: '+withSvgFav+' 个 '+(withSvgFav===allFiles.length?'✅':'⚠️'));
console.log('  含 height="40": '+withH40+' 个');
console.log('  残留 height="32": '+withH32+' 个'+(withH32?' ⚠️':'  ✅'));
