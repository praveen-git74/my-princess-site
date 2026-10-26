const dialog=document.getElementById('surpriseDialog');
document.getElementById('surpriseBtn').addEventListener('click',()=>{if(dialog.showModal)dialog.showModal();else alert('Happy Birthday, My Princess! You deserve the whole universe. 💗');sprinkle(24)});
document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.getElementById('confettiBtn').addEventListener('click',()=>{sprinkle(70);showToast('A little birthday magic, just for you! ✨')});
document.getElementById('wishBtn').addEventListener('click',e=>{document.getElementById('wishResponse').textContent='Wish made! May something beautiful find its way to you. 💗';sprinkle(36);e.currentTarget.textContent='Your wish is on its way ✨';e.currentTarget.disabled=true});
function sprinkle(n){const symbols=['💗','💕','♡','✨','🌸','🎀','✦'];for(let i=0;i<n;i++){const el=document.createElement('span');el.className='particle';el.textContent=symbols[Math.floor(Math.random()*symbols.length)];el.style.left=Math.random()*100+'vw';el.style.fontSize=14+Math.random()*18+'px';el.style.animationDuration=2.5+Math.random()*3.5+'s';el.style.animationDelay=Math.random()*.8+'s';document.body.appendChild(el);setTimeout(()=>el.remove(),7000)}}
let timer;function showToast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>el.classList.remove('show'),2800)}
