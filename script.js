let addButton = document.querySelector(".add")
let taskEditor = document.querySelector(".taskEditor")
let addTaskEditor = true;
let textArea = document.querySelector(".textArea");
let footer = document.querySelector('.footer');
let deleteBtn = document.querySelector(".dustbin")
let deletee = false
let ticketCont1;

deleteBtn.addEventListener('click',function(){
    deletee =! deletee
})

addButton.addEventListener("click",function(){
    if(addTaskEditor){
        taskEditor.style.display = "flex"
    }
    else{
        taskEditor.style.display = "none"
    }
    addTaskEditor =!addTaskEditor
    
})



taskEditor.addEventListener("keydown",function(e){
    let key = e.key;
    if(key == "Enter"){
        createTicket(textArea.value);
        textArea.value = ""
        taskEditor.style.display = "none"
        addTaskEditor = !addTaskEditor
    }
})



function createTicket(value){
 
    let ticketCont = document.createElement("div")
    ticketCont.setAttribute('class','ticketCont')
    ticketCont.innerHTML = `<div class="ticketColour"></div>
                            <div class = "ticketDiv">
                                <div class="ticketId"> #abc12 
                                    <div class="dustbin">
                                    <i class="fa fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="taskArea">${value}</div>`
    footer.appendChild(ticketCont)
    ticketCont1 = document.querySelectorAll(".ticketCont");
    
    for(let i = 0; i<ticketCont1.length; i++){
        deleteBtn.addEventListener('click',function(){
            if(deletee == true){
                ticketCont1[i].style.boxShadow = '10px 10px 1rem red, -10px 10px 1rem red'
            }
            else{
                ticketCont1[i].style.boxShadow = 'none'
            }
        })
        
    }

}
if(deletee){
    
}