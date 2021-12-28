const addTaskBtn = document.querySelector('.add_task');
const deskTaskInput = document.querySelector('.text');
const todosWrapper = document.querySelector('.todos_wrapper');

const removeBtnHeader = document.querySelector('.remove');
const readyBtnHeader = document.querySelector('.ready');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

/////Tasks
function Task(description) {
    this.description = description;
    this.complited = false;

}

const createTemplate = (task, index) => {
    return `
        <div class="todo_item ${task.complited ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})" class="btn_complete" type="button" value="${task.complited ? 'UNREADY' : 'READY'}"}>
                <button onclick="deleteTask(${index})" class="btn_delete">DELETE</button>
            </div>
            <div class="circle ${task.complited ? 'checked' : ''}"></div>
        </div>
        `
}


const filterTasks = () => {
    const activeTasks = tasks.length &&  tasks.filter(item => item.complited == false);
    const completedTasks = tasks.length &&  tasks.filter(item => item.complited == true);
    tasks =[...activeTasks,...completedTasks];
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index); 
        })
        todoItemElems = document.querySelectorAll('.todo_item');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].complited = !tasks[index].complited;
    if(tasks[index].complited) {
        todoItemElems[index].classList.add('checked');   
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
} 

/////add task
addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value)); 
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = '';
})

/////delete task
const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    },500)
}

