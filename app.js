var Task = function(task_name, id, father){
    this.task_name = task_name;
    this.father = father;
    this.id = id;
    this.check = this.createCheckBtn();
    this.remove = this.createRemoveBtn();
    this.task_container = this.createTask();
    father.appendChild(this.task_container);
    this.addListeners();
}

Task.prototype.createTask = function(){
    var list_element = document.createElement("li");
    var list_element_content = document.createElement("div");
    var list_element_content_margin = document.createElement("div")
    var text = document.createElement("p");
    text.setAttribute("class", "d-inline-flex mb-0");
    text.setAttribute("id", "text" + this.id)
    list_element_content.setAttribute("class", "d-flex justify-content-between")
    text.innerHTML = this.task_name;
    var check_btn = this.check;
    check_btn.setAttribute("class", "d-inline-flex mr-4");
    var remove = this.remove;
    remove.setAttribute("class", "d-inline-flex")
    list_element_content_margin.appendChild(check_btn);
    list_element_content_margin.appendChild(text);
    list_element_content.appendChild(list_element_content_margin)
    list_element_content.appendChild(remove);
    list_element.appendChild(list_element_content);  
    list_element.setAttribute("id", this.id); 
    return list_element;
}

Task.prototype.createCheckBtn = function(){
    var checkbox = document.createElement("input");
    checkbox.setAttribute("id", "CB" + this.id)
    checkbox.setAttribute("type", "checkbox");
    return checkbox;
}

Task.prototype.createRemoveBtn = function(){
    var remove = document.createElement("button");
    remove.setAttribute("id", "R" + this.id);
    remove.innerHTML = "<i class='fa fa-trash fa-2x' aria-hidden='true'></i>";
    remove.style.background = "none";
    remove.style.border = "none";
    return remove;
}

Task.prototype.cross = function(){
    var text = document.getElementById("text" + this.parentNode.parentNode.parentNode.id);
    var checkbox = document.getElementById("CB" + this.parentNode.parentNode.parentNode.id);
    if (checkbox.checked){
        text.style.textDecoration = "line-through";
    }else{
        text.style.textDecoration = "none";
    }
}

Task.prototype.remove = function(){
    var list_element = document.getElementById(this.parentNode.parentNode.id);
    list_element.remove();
}

Task.prototype.addListeners = function(){
    var remove = document.getElementById("R" + this.id);
    var checkbox = document.getElementById("CB" + this.id);
    remove.addEventListener("click", Task.prototype.remove);
    checkbox.addEventListener("click", Task.prototype.cross);
}

var ToDoList = function(){
    this.app = document.getElementById("app");
    this.title = "ToDoList App";
    this.counter = 0;
    this.input = this.createInput();
    this.skeleton = this.skeleton();
    this.app.appendChild(this.skeleton);
    this.addBtnListener();
}

ToDoList.prototype.addBtnListener = function(){
    var button = document.getElementById("addTaskBtn");
    var self = this;
    button.addEventListener("click", function(){
        var text_input = document.getElementById("text_input");
        var text = text_input.value;
        if (text.length > 0){
            text_input.value = "";
            var list_box = document.getElementById("listUl");
            new Task(text, self.counter, list_box);
            self.counter += 1;
        }else{
            alert("No has introducido ningún valor")
        }
    });
}

ToDoList.prototype.createInput = function (){
    var form = document.createElement("form");
    var text_input = document.createElement("input");
    text_input.setAttribute("id", "text_input");
    text_input.setAttribute("class", "border")
    text_input.setAttribute("type", "text");
    text_input.setAttribute("placeholder", "New Task...")
    var button = document.createElement("button");
    button.setAttribute("id", "addTaskBtn")
    button.setAttribute("class", "border")
    button.style.borderRadius = "6px"
    button.setAttribute("type", "button")
    button.setAttribute("class", "ml-2")
    button.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>';
    button.style.background = "none";
    form.appendChild(text_input);
    form.appendChild(button);
    return form;
}


ToDoList.prototype.skeleton = function(){
    var container = document.createElement("div");
    var title_box = document.createElement("div");
    var input_box = document.createElement("div");
    var list_box = document.createElement("div");
    var title = document.createElement("img");
    var list = document.createElement("ul");
    title.setAttribute("class", "w-25");
    title.setAttribute("src", "logo.png")
    input_box.setAttribute("class", "d-flex justify-content-end px-3");
    list.setAttribute("id", "listUl")
    list.setAttribute("class", "mb-0")
    container.setAttribute("id", "container");
    title_box.setAttribute("id", "title_box");
    title_box.setAttribute("class", "d-flex justify-content-center")
    input_box.setAttribute("id", "input_box");
    list_box.setAttribute("id", "list_box");
    list_box.setAttribute("class", "border m-3 p-3")
    list_box.style.borderRadius = "8px"
    container.setAttribute("class", "m-5")
    title_box.appendChild(title);
    list_box.appendChild(list);
    input_box.appendChild(this.input);
    container.appendChild(title_box);
    container.appendChild(list_box);
    container.appendChild(input_box);
    return container
}


var toDoList = new ToDoList();