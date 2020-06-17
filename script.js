// Test

var addButton = document.querySelector(".add-btn");
var save = document.querySelector(".green-btn");
var modal = document.querySelector(".modal");

var taskPanel = document.querySelector(".tasks");
var SeeAllBtn = document.querySelector(".see-all");
var cmpBtn = document.querySelector(".cmp");
var allBtn = document.querySelector(".all");
var actBtn = document.querySelector(".act");
var radioValue = document.querySelectorAll(".radio");
var searchBtn = document.querySelector('.ip-search');
var popup = document.querySelector(".popup");

var taskList = [];
var taskFiltered = [];

// Modal
addButton.addEventListener('click', modelPop);
function modelPop() {
    modal.classList.remove("hidden");
    addAllView();
}

// Event Listeners
modal.addEventListener('click', function (e) {
    document.getElementById("alert-time").innerText = ""
    document.getElementById("alert-name").innerText = "";
    document.getElementById("alert-date").innerText = "";
    modal.classList.add("hidden");
});

//Exit modal
popup.addEventListener('click', function (e) {
    e.stopPropagation();
});

// Submit task 
save.addEventListener('click', function () {
    var inputs = document.querySelectorAll(".ip");
    var radioValue = document.querySelectorAll(".radio");
    var task = {}
    var indexBtn;

    for (var i = 0; i < radioValue.length; i++) {
        if (radioValue[i].checked == true) {
            indexBtn = i;
            break;
        }
    }

    if (indexBtn == 0) {
        task.type = "Personal"
    }
    else if (indexBtn == 1) {
        task.type = "Business"
    }
    else task.type = "Other";

    // console.table("i" + indexBtn);
    task.title = inputs[0].value;
    task.desc = inputs[1].value;
    task.date = inputs[2].value;
    task.time = inputs[3].value;
    task.status = "pending";
    document.getElementById("alert-time").innerText = ""
    document.getElementById("alert-name").innerText = "";
    document.getElementById("alert-date").innerText = "";
    //    --validation
    var valid = validateData(task);
    if (valid) {
        if (taskList.length == 0) {
            var tasks = document.querySelector(".to-do-list");
            var toDoBtn = document.querySelector(".to-do-btn");
            tasks.classList.remove("hidden");
            toDoBtn.classList.add("scale-out");
        }

        taskList.push(task);
        addAllView();
        inputs.forEach(x => x.value = null);
        //
        radioValue[0].checked = true;
        radioValue.forEach(x => x.removeAttribute('checked'));
        modal.classList.add("hidden");
    }
    else {
        return null;
    }
});

// Search Button
searchBtn.addEventListener('keyup', function (e) {
    taskFiltered = taskList.filter(x => x.title.toLowerCase().includes(e.target.value.toLowerCase()));
    createView(taskFiltered);
});

// See All Button
SeeAllBtn.addEventListener('click', function () {
    seeAllFunc()
    SeeAllBtn.classList.add("hidden");
});


// Utility functions
function validateData(data) {
    var postDate = new Date(data.date + " " + data.time);
    var currentDate = new Date();
    var diffDayInSec = postDate.getTime() - currentDate.getTime();
    var diffDays = Math.floor(diffDayInSec / (1000 * 3600 * 24));
    var flag = undefined;
    if (data.title.length < 1) {
        document.getElementById("alert-name").innerText = "Shouldn't this task have a name?"
        flag = false;
    }
    if (!data.date) {
        document.getElementById("alert-date").innerText = "Format! Enter Human Years."
        flag = false;
    }
    if (!data.time) {
        document.getElementById("alert-time").innerText = "Time is money!!"
        flag = false;
    }
    if (diffDays < 0) {
        document.getElementById("alert-date").innerText = "We only take upcoming events."
        document.getElementById("alert-time").innerText = "We only take upcoming events."
        flag = false;
    }

    if (flag == undefined) { return true; }
}

function timeRemaining(date, time, taskCard) {
    var postDate = new Date(date + " " + time);
    var currentDate = new Date();
    var timeDiff = Math.abs(postDate.getTime() - currentDate.getTime());
    var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    var milliseconds = (timeDiff % 1000) / 100;
    var seconds = Math.floor((timeDiff / 1000) % 60);
    var minutes = Math.floor((timeDiff / (1000 * 60) % 60));
    var hours = Math.floor(timeDiff / (1000 * 60 * 60) % 24);
    // console.log(diffDays + " " + hours + " " + minutes + " " + seconds);
    if (postDate.getTime() > currentDate.getTime()) {
        if (diffDays) {
            return `<div class="ctr-container"><span class="counter">${diffDays}</span> days, <span class="counter">${hours}</span> hours to go</div>`
        }
        else {
            if (hours < 10) { hours = "0" + hours };
            if (minutes < 10) { minutes = "0" + minutes };
            if (seconds < 10) { seconds = "0" + seconds };
            return ` <div class="ctr-containe"><div class="ctr-bold"><span class="counter">${hours}</span></div>hrs <div class="ctr-bold"><span class="counter">${minutes}</span></div>mins <div class="ctr-bold"><span class="counter">${seconds}</span></div>sec to go</div>`;
        }
    }
    else {
        if (hours < 10) { hours = "0" + hours };
        if (minutes < 10) { minutes = "0" + minutes };
        if (seconds < 10) { seconds = "0" + seconds };
        taskCard.style.opacity = 0.3;
        return ` <div class="ctr-containe"><div class="ctr-bold"><span class="counter">${hours}</span></div>hrs <div class="ctr-bold"><span class="counter">${minutes}</span></div>mins <div class="ctr-bold"><span class="counter">${seconds}</span></div>sec ago</div>`;
    }
}

function seeAllFunc() {
    SeeAllBtn.classList.remove("hidden");
    var taskContainer = document.querySelector(".tasks-container");
    var tasks = document.querySelector(".to-do-list");
    taskContainer.classList.toggle("see-all-active");
    var toDoBtn = document.querySelector(".to-do-btn");
    toDoBtn.classList.toggle("hidden");
    var navBtns = document.querySelector(".nav-btn");
    navBtns.classList.toggle('hidden')
}

function dropdown(e) {
    document.querySelector(".list-panel").classList.toggle("overflow-hide");
}

function dropFilter(typeValue) {
    document.querySelector(".sel-item").innerHTML = typeValue;
    if (typeValue == undefined) {
        taskPanel.classList.remove("hidden");
        document.querySelector(".sel-item").innerHTML = "All Tasks";
        document.querySelector(".list-panel").classList.add("overflow-hide");
        addAllView();
        return;
    }
    taskFiltered = taskList.filter(x => x.type == typeValue);
    createView(taskFiltered);
    document.querySelector(".list-panel").classList.add("overflow-hide");
}

function addAllView() {
    allBtn.classList.add("m-active");
    cmpBtn.classList.remove("m-active");
    actBtn.classList.remove("m-active");
    taskPanel.classList.remove("hidden");
    if (taskList.length > 0) {
        var taskFiltered = [...taskList];
        console.log(taskFiltered);
        createView(taskFiltered);
    } else {
        var tasks = document.querySelector(".to-do-list");
        tasks.classList.add("hidden");
        return null
    }
}

function completed() {
    allBtn.classList.remove("m-active");
    cmpBtn.classList.add("m-active");
    actBtn.classList.remove("m-active");

    if (taskList.length > 0) {
        taskFiltered = taskList.filter(x => x.status == "completed");
        createView(taskFiltered);
    }
    else return null;
}

function active() {
    allBtn.classList.remove("m-active");
    cmpBtn.classList.remove("m-active");
    actBtn.classList.add("m-active");
    if (taskList.length > 0) {
        taskFiltered = taskList.filter(x => x.status == "pending");
        createView(taskFiltered);
    } else return null
}

function clearComplete() {
    taskList = taskList.filter(x => x.status == "pending");
    document.querySelector(".item-left").innerText = `${taskList.length} item left`;
}

function createView(taskArray) {
    if (taskPanel.hasChildNodes()) {
        var ele = document.querySelectorAll(".task-card");
        ele.forEach(x => {
            x.remove()
        });
    }
    taskArray.length > 0 && taskArray.map(x => {
        var taskCard = document.createElement('div');
        var taskImg = document.createElement('div');
        var taskBox = document.createElement('div');
        var taskTitle = document.createElement('div');
        var taskDesc = document.createElement('div');
        var taskRemainder = document.createElement('div');
        var closeBtn = document.createElement('div');
        var taskClose = document.createElement('div');

        var titleIcon = x.title.split(" ");
        var title = [];
        titleIcon.forEach(x =>
            title.push(x[0]));
        var title = title.join("");

        if (title.length > 1) {
            finalTitle = title[0] + title[1]
        } else finalTitle = title[0];

        taskCard.className = "flexed task-card";
        taskImg.className = "task-img";
        taskBox.className = "flexed-col task-box"
        taskTitle.className = "task-name"
        taskDesc.className = "task-desc"
        taskRemainder.className = "task-rem"
        closeBtn.className = "close";
        taskClose.className = "close-tag"

        taskImg.innerText = finalTitle
        taskTitle.innerText = x.title;
        taskDesc.innerText = x.desc;
        //CountDown
        setInterval(function () { taskRemainder.innerHTML = timeRemaining(x.date, x.time, taskCard); }, 1000);

        taskClose.appendChild(closeBtn);
        taskCard.appendChild(taskImg);
        taskCard.appendChild(taskBox);
        taskBox.appendChild(taskTitle);
        taskBox.appendChild(taskDesc);
        taskCard.appendChild(taskRemainder);
        taskCard.appendChild(taskClose);
        taskPanel.appendChild(taskCard);

        if (x.status == "completed") {
            taskTitle.style.textDecoration = "line-through 1px #756283";
            taskDesc.style.textDecoration = "line-through";
            var tick = document.createElement('div');
            taskImg.innerText = ""
            tick.className = "tick"
            taskImg.style.backgroundColor = "#353a44"
            taskImg.appendChild(tick);
        }
        document.querySelector(".item-left").innerText = `${taskList.length} item left`;
        taskImg.addEventListener('click', function () {
            if (x.status != "completed") {
                taskTitle.style.textDecoration = "line-through";
                taskDesc.style.textDecoration = "line-through";
                taskImg.innerText = ""
                taskImg.style.backgroundColor = "#353a44";
                var tick = document.createElement('div');
                tick.className = "tick"
                taskImg.appendChild(tick);
                x.status = "completed";
                // console.log(taskList);
            }
            else {
                x.status = "pending";
                taskTitle.style.textDecoration = "none";
                taskDesc.style.textDecoration = "none";
                taskImg.innerText = finalTitle;
                taskImg.style.backgroundColor = "#353a44"
                var tick = document.createElement('div');
                tick.className = "tick"
            }
        });

        taskClose.addEventListener('click', function () {
            taskList = taskList.filter(y => y.title != x.title);
            // console.table(taskList);
            taskCard.remove(x);
            document.querySelector(".item-left").innerText = `${taskList.length} item left`;
        });
    });
}