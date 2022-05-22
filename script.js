let addButton = document.querySelector(".add")
let taskEditor = document.querySelector(".taskEditor")
let addTaskEditor = true;
let textArea = document.querySelector(".textArea");
let footer = document.querySelector('.footer');
let deleteBtn = document.querySelector(".dustbin")
let deletee = false
let ticketCont1;
let eachPriorityColor = 'white'
let toolboxColors = document.querySelectorAll('.color')
console.log(toolboxColors)
let colors = ["pink","blue","green","white"]
var uid = new ShortUniqueId();

let ticketArr  = [];

if(localStorage.getItem("tickets")){
    let str = localStorage.getItem("tickets")
    let arr = JSON.parse(str);
    ticketArr = arr;
    for(let i = 0; i<arr.length; i++){
        let ticketObj = arr[i];
        createTicket(ticketObj.color, ticketObj.task,ticketObj.id)
    }
}

for (let i = 0; i<toolboxColors.length; i++){
    toolboxColors[i].addEventListener('click',function(){
        let currentColor = toolboxColors[i].classList[1];
        let filteredArr = [];
        for(let i = 0; i<ticketArr.length; i++){
            console.log(ticketArr[i])
            if(ticketArr[i].color == currentColor){
                filteredArr.push(ticketArr[i])
            }
        }
        console.log("Hello"+filteredArr+currentColor)
        let allTickets = document.querySelectorAll('.ticketCont')
        for(let j = 0; j<allTickets.length; j++){
            allTickets[j].remove();
        }
        for(let j = 0; j<filteredArr.length; j++){
            let ticket = filteredArr[j]
            console.log(ticket)
            createTicket(ticket.color,ticket.task,ticket.id)
        }
    })
        toolboxColors[i].addEventListener("dblclick",function(){
        let allTickets = document.querySelectorAll('.ticketCont')
        for(let i = 0; i<allTickets.length; i++){
            allTickets[i].remove();
        } 
        for(let j = 0; j<ticketArr.length; j++){
            ticket = ticketArr[j]
            createTicket(ticket.color,ticket.task,ticket.id)
        }
    })
}
  

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
    priorityColor[i].addEventListener('click',function(){       
         for(let j = 0; j<priorityColor.length; j++){
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

function createTicket(eachPriorityColor,value,ticketId){
    let id;
    if(ticketId == undefined){
        id = uid();
    }
    else{
        id = ticketId;
    }
    let ticketCont = document.createElement("div")
    ticketCont.setAttribute('class','ticketCont')
    ticketCont.innerHTML = `<div class="ticketColour ${eachPriorityColor}"></div>
                            <div class = "ticketDiv">
                                <div class="ticketId"> #${id} 
                                    <div class="dustbin">
                                    <i class="fa fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="taskArea" >${value}</div>
                            <div class="lock-unlock"><i class="fa fa-lock"></i></div>`
    footer.appendChild(ticketCont)

    let lockUnlock = ticketCont.querySelector('.lock-unlock i');
    let ticketTaskArea = ticketCont.querySelector('.taskArea')
    lockUnlock.addEventListener('click',function(){
        if(lockUnlock.classList.contains('fa-lock')){
            lockUnlock.classList.remove('fa-lock');
            lockUnlock.classList.add('fa-unlock')
            ticketTaskArea.setAttribute('contenteditable','true')
        }
        else{
            lockUnlock.classList.add('fa-lock');
            lockUnlock.classList.remove('fa-unlock')
            ticketTaskArea.setAttribute('contenteditable','false')
        }
        let ticketIdx = getTicketIdx(id);
        ticketArr[ticketIdx].task = ticketTaskArea.textContent;
        updateLocalStorage();
    })

    ticketCont1 = document.querySelectorAll(".ticketCont");
    
    for(let i = 0; i<ticketCont1.length; i++){
        deleteBtn.addEventListener('click',function(){
            if(deletee == true){
                ticketCont1[i].style.boxShadow = '10px 10px 1rem red, -10px 10px 1rem red'
            }
            else{
                ticketCont1[i].style.boxShadow = 'none'
            }

            let ticketContainerDelete = document.querySelectorAll(".ticketId .dustbin")
            for(let i = 0; i<ticketContainerDelete.length; i++){
                ticketContainerDelete[i].addEventListener('click',function(){
                if(deletee){
                    ticketCont1[i].remove()
                    let ticketIdx = getTicketIdx(id);
                    ticketArr.splice(ticketIdx,1)
                    updateLocalStorage();
                    }
                })
            }
        })       
    }

    console.log('Arr => '+ticketArr)        

    let ticketColorBand = ticketCont.querySelector(".ticketColour");
    ticketColorBand.addEventListener("click",function(){
        let currentTicketColor = ticketColorBand.classList[1];
        let currentTicketIndex = -1;
        for(let i = 0; i< colors.length; i++){
            if(currentTicketColor == colors[i]){
                currentTicketIndex = i;
                break;
            }
        }
        let nextColorIndex = (currentTicketIndex+1)%colors.length;
        let nextColor = colors[nextColorIndex];
        ticketColorBand.classList.remove(currentTicketColor);
        ticketColorBand.classList.add(nextColor);

        let ticketIdx = getTicketIdx(id);
        ticketArr[ticketIdx].color = nextColor;
        updateLocalStorage();
    })


    if(ticketId == undefined){
        ticketArr.push ({"color": eachPriorityColor, "task": value, "id": id})
        updateLocalStorage();
    }
}

function getTicketIdx(id){
    for(let i = 0; i<ticketArr.length; i++){
        if(ticketArr[i].id == id){
            return i;
        }
    }
} 

function updateLocalStorage(){
    let stringifyArr = JSON.stringify(ticketArr);
    localStorage.setItem("tickets",stringifyArr);
}
