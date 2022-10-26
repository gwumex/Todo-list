let createTaskForm = document.querySelector("#create-task");
let textBox = document.querySelector(".text-box");
let newTaskBox = document.querySelector(".new-task-box");
let createNewTaskBtn = document.querySelector(".create-new-task");
console.log(textBox);
let ids = 0;

// check if todo title inputed is valid-----------------------------
const CheckForValidTitle = (text) => {
    if (text.length > 1 && text !== null) {
        return true;
    }
    return false;
}

//get todo list title from local storage
const GetTaskFromLocalST = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        return false;
    } else {
        return tasks;
    }
}
// Add todo list title to local storage is non exist before

const SetNewTodoTask = (createTaskForm) => {
    let task = {
        id: ids,
        title: createTaskForm.title.value
    }
    localStorage.setItem('tasks', JSON.stringify([task]));
}

// Add todo list title to local storage is it already exit
const AddTaskToExisting = (tasks, createTaskForm) => {
    // get the last object in localstorage array id number

    ids = tasks[tasks.length - 1].id + 1;
    console.log("i am the in set new task", tasks);
    let task = {
        id: ids,
        title: createTaskForm.title.value
    }
    tasks = [...tasks, task];
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//main function to add todo list
const AddTodoTask = (tasks, createTaskForm) => {
    if (tasks === false) {
        SetNewTodoTask(createTaskForm)
    }
    AddTaskToExisting(tasks, createTaskForm);
}

//function that execute if input is valid
const IfIputIsValid = (validTitle, createTaskForm) => {
    if (validTitle) {
        let tasks = GetTaskFromLocalST();
        AddTodoTask(tasks, createTaskForm);
        // if(AddStatus){
        // }
    } else {
        // add error message here
        console.log("your title must be more than 1 character");
        return false;
    }
}
//function to hide
const hide = (x) => {
    x.classList.remove('show');
}

//function to show
const show = (x) => {
    x.classList.add('show');
}

//event listenser for 
createTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = createTaskForm.title.value;
    let validTitle = CheckForValidTitle(title);
    let IfIfIputIsValidStatus = IfIputIsValid(validTitle, createTaskForm);
    if(IfIfIputIsValidStatus !== false ){
        textBox.value = " ";
        console.log("task completed");
        hide(newTaskBox);
    }
})


createNewTaskBtn.addEventListener('click', () => {
    show(newTaskBox);
})