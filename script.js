var addButton = document.querySelector(".add-btn");
var save = document.querySelector(".green-btn");
var modal = document.querySelector(".modal");
var taskList = [];
var taskActive =[];
var taskCompleted = [];

// add task
addButton.addEventListener('click', function () {
    modal.classList.remove("hidden");
});

modal.addEventListener('click', function (e) {
    modal.classList.add("hidden");

});


//exit task
var popup = document.querySelector(".popup");

popup.addEventListener('click', function (e) {
    e.stopPropagation();
});



// Submit task 
save.addEventListener('click', function () {
    var inputs = document.querySelectorAll(".ip");
    var task = {}

    task.title = inputs[0].value;
    task.desc = inputs[1].value;
    task.date = inputs[2].value;
    task.time = inputs[3].value;
    task.status = "pending";
    // var radioValues = document.querySelector('radio');
    // console.log(task);


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
        taskActive.push(task);
        console.log(taskList);

        var taskPanel = document.querySelector(".tasks");
        var taskCard = document.createElement('div');
        var taskImg = document.createElement('div');
        var taskBox = document.createElement('div');
        var taskTitle = document.createElement('div');
        var taskDesc = document.createElement('div');
        var taskRemainder = document.createElement('div');


        taskCard.className = "flexed task-card";
        taskImg.className = "task-img";
        taskBox.className = "flexed-col task-box"
        taskTitle.className = "task-name"
        taskDesc.className = "task-desc"
        taskRemainder.className = "task-rem"


        taskImg.innerText = "T";
        taskTitle.innerText = task.title;
        taskDesc.innerText = task.desc;
        taskRemainder.innerText = timeRemaining(task.date, task.time);;
        // timeRemains;


        taskCard.appendChild(taskImg);
        taskCard.appendChild(taskBox);
        taskBox.appendChild(taskTitle);
        taskBox.appendChild(taskDesc);
        taskCard.appendChild(taskRemainder);
        taskPanel.appendChild(taskCard);

        document.querySelector(".item-left").innerText = `${taskList.length} item left`;

        taskImg.addEventListener('click', function () {
            taskTitle.style.textDecoration = "line-through";
            taskDesc.style.textDecoration = "line-through";
            taskActive.pop(task);

            taskCompleted.push(task);
            console.log(taskActive);
            console.log(taskCompleted);
            document.querySelector(".item-left").innerText = `${taskList.length} item left`;
        });

        inputs.forEach(x => x.value = null);
        modal.classList.add("hidden");
    }

    else {
        return null;
    }
});

function validateData(data) {
    console.log(data);
    var timeUnits = data.time.split(":");
    console.log(" ");


    if (data.title.length) {
        if (timeUnits[0] < 24 && timeUnits[1] < 60) {
            console.log("Hurray")
            return true;
        }
        else {
            console.log("alert-time")
            document.getElementById("alert-time").innerText = "Validate time format!"
            return false;
        }

    } else {
        console.log("alert-name")
        document.getElementById("alert-name").innerText = "Title Required!"
        return false;
    }

}

function timeRemaining(date, time) {
    var postDate = new Date(date);
    console.log(currentDate);
    var currentDate = new Date();
    var timeDiff = Math.abs(currentDate.getTime() - postDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    var currentHour = new Date().getUTCHours();
    var timezies = time.split(":");

    var timeChange = Math.abs(currentHour - timezies[0]);
    console.log(timeChange);

    if (!diffDays) { 
        console.log(diffDays);
        return `${timeChange} hours ago`;
     }
    else {
        return `${diffDays} days and ${timeChange} hours ago`;
    }
}