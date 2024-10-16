const view=document.getElementById('scnd');
view.style.display='none'
document.getElementById('view-more').addEventListener('click',function(){
    const btn=this
    if(view.style.display==='none'){
        view.style.display='flex'
        btn.textContent='View Less Service'
    }
    else{
        view.style.display='none'
        btn.textContent="View More Service"
    }
})