let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveTodoButton = document.getElementById("saveTodoButton");
let addTodoButton = document.getElementById("todoAddButton");

// let todoList = [{
//         text: "Learn HTML",
//         uniqueId: 1
//     },
//     {
//         text: "Learn CSS",
//         uniqueId: 2
//     },
//     {
//         text: "Learn JavaScript",
//         uniqueId: 3
//     }
// ];

function getTodoListFromLocalStorage() {



    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];

    } else {


        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();

let todoCount = todoList.length;


saveTodoButton.onclick = function() {

    localStorage.setItem("todoList", JSON.stringify(todoList));


}

function onAddTodo() {
    let userInputValue = document.getElementById("todoUserInput");

    let userEnteredValue = userInputValue.value;

    if (userEnteredValue === "") {
        alert("Please enter input")
        return;
    }

    todoCount = todoCount + 1;

    let newTodo = {
        text: userEnteredValue,
        uniqueId: todoCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputValue.value = "";



}

addTodoButton.onclick = function() {

    onAddTodo();
};






function onTodoStatusChange(checkboxId, labelId, todoId) {

    let checkBoxElement = document.getElementById(checkboxId);
    console.log(checkBoxElement.checked);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    //prathi todos object index find chesii...adhi check aithey false istham...
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachtodoId = "todo" + eachTodo.uniqueId

        if (eachtodoId === todoId) {
            return true
        } else {
            return false
        }
    });

    let todoObject = todoList[todoObjectIndex]

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false


    } else {
        todoObject.isChecked = true
    }

    // if (checkBoxElement.checked === true) {

    //     labelElement.classList.add("checked")
    // }
    // else{
    //     labelElement.classList.remove("checked")

    // }




}

function onTodoDelete(todoId) {

    let todoElement = document.getElementById(todoId);

    todoItemsContainer.removeChild(todoElement);
    // prathi todos index find  hesii..aa particulr todos ni delete chesthunnam
    let todoIndex = todoList.findIndex(function(eachTodo) {
        let todoIndexId = "todo" + eachTodo.uniqueId
        if (todoIndexId === todoId) {
            return true;
        } else {

            return false;
        }

    });

    todoList.splice(todoIndex, 1)

}

function createAndAppendTodo(todo) {



    let todoList = document.createElement("li");
    let todoId = "todo" + todo.uniqueId
    todoList.id = todoId
    todoList.classList.add("todo-item-container", "d-flex", "flex-row");

    todoItemsContainer.appendChild(todoList);



    let inputElement = document.createElement("input")

    let checkboxId = "checkbox" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId;

    inputElement.type = "checkbox"
    inputElement.id = checkboxId;
    // mana data lo unna is checked ni batti...box check avthuu untundhii...
    inputElement.checked = todo.isChecked;


    inputElement.classList.add("checkbox-input");
    todoList.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoList.appendChild(labelContainer);


    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    // idhi checked true aithey..mark line through...
    if (todo.isChecked === true) {
        labelElement.classList.add("checked")
    }



    inputElement.onclick = function() {

        onTodoStatusChange(checkboxId, labelId, todoId);

    }


    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);


    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {

        onTodoDelete(todoId);


    }
    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}