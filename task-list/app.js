//Define UI variables

const form = document.querySelector("#task-form")
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-tasks")
const filter = document.querySelector("#filter")
const taskInput = document.querySelector("#task")


// Load all event listeners
loadEventListener();

function loadEventListener(e) {

    // load tasks on DOM loading
    document.addEventListener('DOMContentLoaded', getTasks); 
    // add task event
    form.addEventListener('submit', addTask)

    // remove task event
    taskList.addEventListener('click', removeTask)

    // clear tasks event
    clearBtn.addEventListener("click", clearTasks)

    // filter tasks event
    filter.addEventListener('keyup', filterTasks)
}

// Get Tasks from Localstorage

function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(task => {
          // create task item
    const li = document.createElement("li")
    // give a class name to task item
    li.className = 'collection-item';
    // add value from input to task item
    li.appendChild(document.createTextNode(task))
    // create new link element
    const link = document.createElement('a');
    // give a link class name
    link.className = 'delete-item secondary-content'
    // add icon to link
    link.innerHTML = '<i class="fa fa-remove"></i>' 
    // append the link to task item
    li.appendChild(link);
   
    // append task item to task list
    taskList.appendChild(li);
    })

}



// Add Task Event
function addTask(event) {
    if (taskInput.value === '') {
        alert("Add a task")
    }

    // create task item
    const li = document.createElement("li")
    // give a class name to task item
    li.className = 'collection-item';
    // add value from input to task item
    li.appendChild(document.createTextNode(taskInput.value))
    // create new link element
    const link = document.createElement('a');
    // give a link class name
    link.className = 'delete-item secondary-content'
    // add icon to link
    link.innerHTML = '<i class="fa fa-remove"></i>' 
    // append the link to task item
    li.appendChild(link);
   
    // append task item to task list
    if (taskInput.value !== '') {
        taskList.appendChild(li);
    }

    // add task into local storage
    storeTask(taskInput.value)

    // clear input
    taskInput.value = ""

    // remove default event action
    event.preventDefault()



}

// remove task function

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
            
            // remove task from local storage
            removeTaskFromLS(e.target.parentElement.parentElement)
        }
    }
}


// clear tasks function

function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
        clearStorage()
    }
}

// filters through tasks function

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll('.collection-item')
   
    listItem.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        if (itemText.indexOf(text) !== -1) {
            item.style.display = 'block'
        } else {
            item.style.display = 'none';    
        }
    })
}

// stores value inside local storage

function storeTask(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    if (task.length) {
        tasks.push(task)
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))

}

// removes item from local storage

function removeTaskFromLS(item) {
    const items = JSON.parse(localStorage.getItem('tasks'));
    items.forEach(task => {
        if (task == item.textContent) {
            localStorage.setItem('tasks', JSON.stringify(items.filter(tsk => tsk !== task)))
        }
    })
}

function clearStorage() {
    localStorage.clear()
}