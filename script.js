document.querySelector("[addButton]").addEventListener("click", () => {
    adicionar();
});
document.querySelector("body").addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        adicionar();
    }
});


const _localStorage = {
    add: (task) => {
        if (!localStorage.getItem("tasks")) {
            localStorage.setItem("tasks", JSON.stringify([]));
        }
        const newTask = { descripition: task, checked: false },
            taskStorage = localStorage.getItem("tasks"),
            tasks = JSON.parse(taskStorage);
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    delete: (deleteBox) => {
        const taskStorage = JSON.parse(localStorage.getItem("tasks")),
            taskId = deleteBox.parentElement.id.split("k")[1];
        taskStorage.splice(taskId, 1);
        localStorage.setItem("tasks", JSON.stringify(taskStorage));

    },
    checked: (checkBox, boolean) => {
        const taskStorage = JSON.parse(localStorage.getItem("tasks")),
            taskId = checkBox.parentElement.id.split("k")[1];
        taskStorage[taskId].checked = boolean;
        localStorage.setItem("tasks", JSON.stringify(taskStorage));

    },
    refresh: () => {
        if (!localStorage.getItem("tasks")) { return; }

        const taskStorage = JSON.parse(localStorage.getItem("tasks"));
        taskStorage.forEach((task, index) => {
            newElement(task.descripition);
            if (task.checked) {
                const checkBox = document.querySelector(`#task${index}>.checkBox`);
                check(checkBox);
            }
        });


    }
};

function updateId() {
    const taskList = Array.from(document.querySelectorAll(".task"));
    taskList.forEach((task, indice) => {
        task.id = `task${indice}`;
    });
}

function addEvents() {
    const deleteButton = document.querySelectorAll("[deleteButton]"),
        checkBox = document.querySelectorAll(".checkBox");

    deleteButton.forEach((e) => {
        e.addEventListener("click", () => {
            document.querySelector(".taskList").removeChild(e.parentElement);
            _localStorage.delete(e);
            updateId();
        });
    });
    checkBox.forEach((e) => {
        e.addEventListener("click", () => {
            check(e);
        });
    });
}

function adicionar() {
    const newTask = document.querySelector("input");
    if (newTask.value != "") {
        newElement(newTask.value);
        _localStorage.add(newTask.value);
        newTask.value = "";
        newTask.focus();
        addEvents();
    }
}

function newElement(text) {
    const idTasks = document.querySelectorAll(".task").length,
        taskList = document.querySelector(".taskList");
    taskList.innerHTML += `<div class="task" id="task${idTasks}">
    <div class="checkBox"></div>
    <p class="tasktext">${text}</p>
    <img src="imagens/delete.svg" alt="delete task" deleteButton>
    </div>`;
}


function check(checkBox) {
    const contain = checkBox.innerHTML;
    if (!contain) {
        checkBox.innerHTML += '<img src="imagens/check.svg" alt="delete task" check>';
        checkBox.parentElement.children[1].classList.add("checked");
        _localStorage.checked(checkBox, true);
    } else {
        checkBox.parentElement.children[1].classList.remove("checked");
        checkBox.innerHTML = "";
        _localStorage.checked(checkBox, false);
    }
}
_localStorage.refresh();
addEvents();