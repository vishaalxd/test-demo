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

var taskList = [];
var taskFiltered = [];

// Modal
addButton.addEventListener('click', modelPop);
function modelPop() {
    modal.classList.remove("hidden");
    addAllView();
}
modal.addEventListener('click', function (e) {
    modal.classList.add("hidden");
});

//exit modal
var popup = document.querySelector(".popup");
popup.addEventListener('click', function (e) {
    e.stopPropagation();
});

// Submit task 
save.addEventListener('click', function () {
    var inputs = document.querySelectorAll(".ip");
    var radioValue = document.querySelectorAll(".radio");
    // console.log(radioValue);
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
        // console.log(taskList);
        addAllView();
        inputs.forEach(x => x.value = null);
        document.getElementById("alert-time").innerText = ""
        document.getElementById("alert-name").innerText = "";
        document.getElementById("alert-date").innerText = "";
        radioValue.forEach(x => x.removeAttribute('checked'));
        modal.classList.add("hidden");
    }
    else {
        return null;
    }
});


function validateData(data) {
    // console.log(data);
    var postDate = new Date(data.date);
    var timeUnits = data.time.split(":");
    var currentDate = new Date();
    var diffDayInSec = postDate.getTime() - currentDate.getTime();
    var diffDays = Math.ceil(diffDayInSec / (1000 * 3600 * 24));
    if (data.title.length) {
        if (data.date && diffDays > -1) {
            if (timeUnits[0] < 24 && timeUnits[1] < 60 && timeUnits[2] < 60) {
                // console.log("Hurray")
                return true;
            }
            else {
                document.getElementById("alert-time").innerText = "Validate time format!"
                return false;
            }
        }
        else {
            document.getElementById("alert-date").innerText = "Past Date wont be considered"
            return false;
        }
    } else {
        document.getElementById("alert-name").innerText = "Title Required!"
        return false;
    }

}

function timeRemaining(date, time, taskCard) {
    var postDate = new Date(date + " " + time);
    // console.log(postDate);
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


SeeAllBtn.addEventListener('click', function () {
    seeAllFunc()
    SeeAllBtn.classList.add("hidden");
})


function seeAllFunc() {
    SeeAllBtn.classList.remove("hidden");
    var taskContainer = document.querySelector(".tasks-container");
    var tasks = document.querySelector(".to-do-list");
    tasks.style.marginTop = "60px";
    taskContainer.classList.toggle("see-all-active");
    // taskContainer.classList.toggle("see");
    var toDoBtn = document.querySelector(".to-do-btn");
    toDoBtn.classList.toggle("hidden");
    var navBtns = document.querySelector(".nav-btn");
    navBtns.classList.toggle('hidden')
};


function completed() {
    allBtn.classList.remove("m-active");
    cmpBtn.classList.add("m-active");
    actBtn.classList.remove("m-active");

    if (taskList.length > 0) {
        taskFiltered = taskList.filter(x => x.status == "completed");
        // console.log(taskFiltered);

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


function addAllView() {
    allBtn.classList.add("m-active");
    cmpBtn.classList.remove("m-active");
    actBtn.classList.remove("m-active");
    taskPanel.classList.remove("hidden");
    if (taskList.length > 0) {
        var taskFiltered = [...taskList];
        console.log(taskFiltered);
        createView(taskFiltered);
    } else return null
}

// Search Button
searchBtn.addEventListener('keyup', function (e) {
    taskFiltered = taskList.filter(x => x.title.toLowerCase().includes(e.target.value.toLowerCase()));
    createView(taskFiltered);
});


function clearComplete() {
    console.log("clear");
    taskList = taskList.filter(x => x.status == "pending");
    document.querySelector(".item-left").innerText = `${taskList.length} item left`;

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


function createView(taskArray) {
    // console.log(taskArray);
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
        setInterval(function () { taskRemainder.innerHTML = timeRemaining(x.date, x.time, taskCard); }, 1000);
        // timeRemains;

        taskClose.appendChild(closeBtn);
        taskCard.appendChild(taskImg);
        taskCard.appendChild(taskBox);
        taskBox.appendChild(taskTitle);
        taskBox.appendChild(taskDesc);
        taskCard.appendChild(taskRemainder);
        taskCard.appendChild(taskClose);
        taskPanel.appendChild(taskCard);

        if (x.status == "completed") {
            taskTitle.style.textDecoration = "line-through";
            taskDesc.style.textDecoration = "line-through";
        }
        document.querySelector(".item-left").innerText = `${taskList.length} item left`;

        taskImg.addEventListener('click', function () {
            taskTitle.style.textDecoration = "line-through";
            taskDesc.style.textDecoration = "line-through";
            taskImg.innerText = "";
            var tick = document.createElement('div');
            tick.className = "tick"

            taskImg.classList.add = "bg-green";
            taskImg.appendChild(tick);

            x.status = "completed";
            // console.log(taskList);
        });

        taskClose.addEventListener('click', function () {
            taskList = taskList.filter(y => y.title != x.title)
            // console.table(taskList);
            taskCard.remove(x);
            document.querySelector(".item-left").innerText = `${taskList.length} item left`;
        });
    });
}