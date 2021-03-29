(()=>{var m={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","\u2026":"&hellip;"};function g(a){return m[a]||a}function w(a){return a.replace(/[&<>"]/g,g)}function T(a){return a.replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&")}var s=class{constructor({form:e,input:r,list:i,resultTitle:n,resultTitleTemplate:t}){this.form=e,this.input=r,this.list=i,this.resultTitle=n,this.resultTitleTemplate=t,this.handleQueryString(),this.bindQueryStringChange(),this.bindSearchForm()}async searchKeywords(e){let r=await this.getData(),i=[];e.sort((n,t)=>t.length-n.length);for(let n of r){let t={...n,preview:"",matchCount:0},p=!1;for(let u of e){if(u==="")continue;let l=new RegExp(T(w(u)),"gi"),c=l.exec(t.content);l.lastIndex=0;let h=l.exec(t.title);if(l.lastIndex=0,h&&(t.title=t.title.replace(l,s.marker)),h||c){p=!0,++t.matchCount;let o=0,d=100;c&&(o=c.index-20,d=c.index+80,o<0&&(o=0)),t.preview.indexOf(u)!==-1?t.preview=t.preview.replace(l,s.marker):(o!==0&&(t.preview+="[...] "),t.preview+=`${t.content.slice(o,d).replace(l,s.marker)} `)}}p&&(t.preview+="[...]",i.push(t))}return i.sort((n,t)=>t.matchCount-n.matchCount)}static marker(e){return"<mark>"+e+"</mark>"}async doSearch(e){let r=performance.now(),i=await this.searchKeywords(e);this.clear();for(let t of i)this.list.append(s.render(t));let n=performance.now();this.resultTitle.innerText=this.generateResultTitle(i.length,((n-r)/1e3).toPrecision(1))}generateResultTitle(e,r){return this.resultTitleTemplate.replace("#PAGES_COUNT",e).replace("#TIME_SECONDS",r)}async getData(){if(!this.data){let e="https".concat(this.form.dataset.json.substr(4));console.log(e),this.data=await fetch(e,{mode:"no-cors"}).then(r=>r.json())}return this.data}bindSearchForm(){let e="",r=i=>{i.preventDefault();let n=this.input.value;if(s.updateQueryString(n,!0),n==="")return this.clear();if(e===n)return;e=n,this.doSearch(n.split(" "))};this.input.addEventListener("input",r),this.input.addEventListener("compositionend",r)}clear(){this.list.innerHTML="",this.resultTitle.innerText=""}bindQueryStringChange(){window.addEventListener("popstate",e=>{this.handleQueryString()})}handleQueryString(){let e=new URL(window.location.toString()),r=e.searchParams.get("keyword");this.input.value=r,r?this.doSearch(r.split(" ")):this.clear()}static updateQueryString(e,r=!1){let i=new URL(window.location.toString());e===""?i.searchParams.delete("keyword"):i.searchParams.set("keyword",e),r?window.history.replaceState("","",i.toString()):window.history.pushState("","",i.toString())}static render(e){return createElement("article",null,createElement("a",{href:e.permalink},createElement("div",{class:"article-details"},createElement("h2",{class:"article-title",dangerouslySetInnerHTML:{__html:e.title}}),createElement("secion",{class:"article-preview",dangerouslySetInnerHTML:{__html:e.preview}})),e.image&&createElement("div",{class:"article-image"},createElement("img",{src:e.image,loading:"lazy"}))))}};window.addEventListener("load",()=>{setTimeout(function(){let a=document.querySelector(".search-form"),e=a.querySelector("input"),r=document.querySelector(".search-result--list"),i=document.querySelector(".search-result--title");new s({form:a,input:e,list:r,resultTitle:i,resultTitleTemplate:window.searchResultTitleTemplate})},0)});var v=s;})();
