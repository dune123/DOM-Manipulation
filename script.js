document.addEventListener('DOMContentLoaded',loadTodos);

function addItem(){
    const taskName=document.getElementById("taskName").value;
    const deadline=document.getElementById("deadline").value;
    const priority=document.getElementById("priority").value;

    if(taskName && deadline && priority){
        const todo={ taskName, deadline, priority,completed: false};

        let todos=JSON.parse(localStorage.getItem("todos"))||[];

        todos.push(todo);

        localStorage.setItem("todos",JSON.stringify(todos));

        displayTodos();
        document.getElementById("todoForm").reset();
    }
    else{
        alert("please fill in all the field")
    }
}

function displayTodos(){
    const todos=JSON.parse(localStorage.getItem("todos"))||[];
    const todayListContainer=document.querySelector(".TodayListContainer")
    const futureListContainer=document.querySelector('.FutureListContainer')
    const completedListContainer=document.querySelector('.completedListContainer')

    todayListContainer.innerHTML="";

    futureListContainer.innerHTML="";

    completedListContainer.innerHTML="";

    const today=new Date().toISOString().split("T")[0];

    todos.forEach((todo,index)=>{
        const todoElement=document.createElement("div");

        todoElement.className=`todo-item ${todo.priority.toLowerCase()}`;

        todoElement.innerHTML=`<span>${todo.taskName} - ${todo.deadline} - ${todo.priority}</span>
        <button onclick="deleteItem(${index})">Delete</button>
        <button onclick="toggleComplete(${index})">${todo.completed ? "Undo" : "Complete"}</button>`

        if(todo.completed){
            completedListContainer.appendChild(todoElement);
        }
        else if(todo.deadline===today){
            todayListContainer.appendChild(todoElement);
        }
        else{
            futureListContainer.appendChild(todoElement);
        }
    })
}


function deleteItem(index) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodos();
}

function toggleComplete(index) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos[index].completed = !todos[index].completed;
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodos();
}

function loadTodos() {
    displayTodos();
}