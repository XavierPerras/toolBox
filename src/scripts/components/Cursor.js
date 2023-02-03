export default class Cursor{
constructor(element){
    this.element = element;
   


    this.init();
    
}init(){
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', e =>{cursor.setAttribute("style","top: "+ (e.pageY - 5)+"px; left: "+(e.pageX- 5) +"px;" )
});
document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
});

     

    
}
}