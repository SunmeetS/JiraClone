let addButton = document.querySelector(".add")
let taskEditor = document.querySelector(".taskEditor")
let addTaskEditor = true;
let textArea = document.querySelector(".textArea");
let footer = document.querySelector('.footer');
let deleteBtn = document.querySelector(".dustbin")
let deletee = false
let ticketCont1;
let eachPriorityColor = 'black'


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

let priorityColor = document.querySelectorAll('.priorityColor')
for(let i = 0; i<priorityColor.length; i++){
    priorityColor[i].addEventListener('click',function(){        for(let j = 0; j<priorityColor.length; j++){
            priorityColor[j].classList.remove('active')
        }
        priorityColor[i].classList.add('active')
        eachPriorityColor = priorityColor[i].classList[1]
    })
}


taskEditor.addEventListener("keydown",function(e){
    let key = e.key;
    if(key == "Enter"){
        createTicket(eachPriorityColor,textArea.value);
        textArea.value = ""
        taskEditor.style.display = "none"
        addTaskEditor = !addTaskEditor
    }
})

function createTicket(eachPriorityColor,value){
 
    let ticketCont = document.createElement("div")
    ticketCont.setAttribute('class','ticketCont')
    ticketCont.innerHTML = `<div class="ticketColour ${eachPriorityColor}"></div>
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

    let ticketContainerDelete = document.querySelectorAll(".ticketId .dustbin")
    for(let i = 0; i<ticketContainerDelete.length; i++){
        ticketContainerDelete[i].addEventListener('click',function(){
            if(deletee)
                ticketCont1[i].remove()
        })
    }
    
}
