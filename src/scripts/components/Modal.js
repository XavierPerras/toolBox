export default class Modal{
    constructor(element){
        this.element = element;
        this.modalId = this.element.dataset.modalId;

        this.init();
    }
    init(){
        this.element.addEventListener('click',this.open.bind(this));
        this.close = this.close.bind(this);


    }
    open(event){
        event.preventDefault();
        
        this.appendModal();
    }
    close(event){
        document.documentElement.classList.remove('modal-is-active');
        this.closeButton.removeEventListener("click", this.close);
        
        setTimeout(this.destroy.bind(this), 1000);
        
       

    }destroy(){
         this.modalElement.parentElement.removeChild(this.modalElement);
    }
    appendModal(){
        const template = document.querySelector(`#${this.modalId}`);
        if(template){
           this.modalElement = template.content.firstElementChild.cloneNode(true); 
            document.body.appendChild(this.modalElement);

            this.element.getBoundingClientRect();
            document.documentElement.classList.add('modal-is-active'); 


            this.closeButton = this.modalElement.querySelector('.js-close ');
            this.closeButton.addEventListener("click", this.close);

        }else{
            console.log(`le template avec le id ${this.modalId} n'existe pas`);
        }

    }
}