var addButton = document.querySelector(".add-btn");
var save = document.querySelector(".green-btn");
var modal = document.querySelector(".modal");

var completeTasks = document.querySelector(".tasks-cmp");
var taskPanel = document.querySelector(".tasks");
var activeTasks = document.querySelector(".tasks-act");

var cmpBtn = document.querySelector(".cmp");
var allBtn = document.querySelector(".all");
var actBtn = document.querySelector(".act");
// var cmp = document.querySelector(".cmp");

var taskList = [];
var taskFiltered = [];

// add task
addButton.addEventListener('click', function () {
    modal.classList.remove("hidden");
    AllTasksController();
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


        // console.log(taskList);

        if(taskPanel.hasChildNodes()){
            var ele = document.querySelectorAll(".task-card");
            ele.forEach(x => taskPanel.removeChild(x)); 
          }
        
          addAllView();
          inputs.forEach(x => x.value = null);
        modal.classList.add("hidden");
    }

    else {
        return null;
    }
});

function validateData(data) {
    // console.log(data);
    var timeUnits = data.time.split(":");


    if (data.title.length) {
        if (timeUnits[0] < 24 && timeUnits[1] < 60) {
            // console.log("Hurray")
            return true;
        }
        else {
            // console.log("alert-time")
            document.getElementById("alert-time").innerText = "Validate time format!"
            return false;
        }

    } else {
        // console.log("alert-name")
        document.getElementById("alert-name").innerText = "Title Required!"
        return false;
    }

}

function timeRemaining(date, time) {
    var postDate = new Date(date);
    // console.log(currentDate);
    var currentDate = new Date();
    var timeDiff = Math.abs(currentDate.getTime() - postDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    var currentHour = new Date().getUTCHours();
    var timezies = time.split(":");

    var timeChange = Math.abs(currentHour - timezies[0]);
    // console.log(timeChange);

    if (!diffDays) {
        // console.log(diffDays);
        return `${timeChange - 3} hours ago`;
    }
    else {
        return `${diffDays} days and ${timeChange} hours ago`;
    }
}




var SeeAllBtn = document.querySelector(".see-all");
SeeAllBtn.addEventListener('click', function () {
    var taskContainer = document.querySelector(".tasks-container");
    taskContainer.classList.toggle("see-all-active");
    var main = document.querySelector("main");
    main.classList.toggle("max-vh");
});


function completed() {
    allBtn.classList.remove("m-active");
    cmpBtn.classList.add("m-active");
    actBtn.classList.remove("m-active");
    completeTasks.classList.remove("hidden");
    taskPanel.classList.add("hidden");
    activeTasks.classList.add("hidden");
    // console.log(cmpBtn);
    cmpBtn.disabled = true;
    
    
    if (taskList.length > 0) {
        taskFiltered = taskList.filter(x => x.status == "completed");
        console.log(taskFiltered);


        taskFiltered.map(x => {
            console.log(taskList);
            var taskCard = document.createElement('div');
            var taskImg = document.createElement('div');
            var taskBox = document.createElement('div');
            var taskTitle = document.createElement('div');
            var taskDesc = document.createElement('div');
            var taskRemainder = document.createElement('div');
            var taskClose = document.createElement('div')
            var closeBtn = document.createElement('div');


            taskCard.className = "flexed task-card";
            taskImg.className = "task-img";
            taskBox.className = "flexed-col task-box"
            taskTitle.className = "task-name"
            taskDesc.className = "task-desc"
            taskRemainder.className = "task-rem"
            closeBtn.className = "close";
            taskClose.className = "close-tag"

            taskImg.innerText = "T";
            taskTitle.innerText = x.title;
            taskDesc.innerText = x.desc;
            taskRemainder.innerText = "Completed";
            // timeRemains;


            taskClose.appendChild(closeBtn);
            taskCard.appendChild(taskImg);
            taskCard.appendChild(taskBox);
            taskBox.appendChild(taskTitle);
            taskBox.appendChild(taskDesc);
            taskCard.appendChild(taskRemainder);
            taskCard.appendChild(taskClose);
            completeTasks.appendChild(taskCard);

            taskClose.addEventListener('click', function(){
                taskList.pop(x);
                completeTasks.removeChild(taskCard);
                console.log(taskList);
            });
            
            // var allTasks = document.querySelector(".all");
            allBtn.addEventListener('click', function(){
                if(completeTasks.hasChildNodes()){
                completeTasks.removeChild(taskCard);
                }
                cmpBtn.disabled = false;
                actBtn.disabled = false;
            });

            cmpBtn.addEventListener('click', function(){
                if(completeTasks.hasChildNodes()){
                    completeTasks.removeChild(taskCard);
                    }
                allBtn.disabled = false;
                actBtn.disabled = false;
            });


            actBtn.addEventListener('click', function(){
                if(completeTasks.hasChildNodes()){
                    completeTasks.removeChild(taskCard);
                    }
                cmpBtn.disabled = false;
                allBtn.disabled = false;
            });


        });
    }
    else return null;

}


function AllTasksController() {
    allBtn.classList.add("m-active");
    cmpBtn.classList.remove("m-active");
    actBtn.classList.remove("m-active");
    taskPanel.classList.remove("hidden");
    completeTasks.classList.add("hidden");
    activeTasks.classList.add("hidden");
    if(taskPanel.hasChildNodes()){
        var ele = document.querySelectorAll(".task-card");
        console.log(ele);
        ele.forEach(x => {taskPanel.removeChild(x)
            console.log(x);
      });

}
addAllView();
}




function active() {
    // allBtn.classList.remove("m-active");
    // cmpBtn.classList.remove("m-active");
    // actBtn.classList.add("m-active");
    // activeTasks.classList.remove("hidden");
    // completeTasks.classList.add("hidden");
    // taskPanel.classList.add("hidden");
    // console.log(actBtn);
    // actBtn.disabled = true;
    
    
    // if (taskList.length > 0) {
    //     taskFiltered = taskList.filter(x => x.status == "pending");
    //     console.log(taskFiltered);


    //     taskFiltered.map(x => {
    //         console.log(taskList);
    //         var taskCard = document.createElement('div');
    //         var taskImg = document.createElement('div');
    //         var taskBox = document.createElement('div');
    //         var taskTitle = document.createElement('div');
    //         var taskDesc = document.createElement('div');
    //         var taskRemainder = document.createElement('div');
    //         var taskClose = document.createElement('div')
    //         var closeBtn = document.createElement('div');


    //         taskCard.className = "flexed task-card";
    //         taskImg.className = "task-img";
    //         taskBox.className = "flexed-col task-box"
    //         taskTitle.className = "task-name"
    //         taskDesc.className = "task-desc"
    //         taskRemainder.className = "task-rem"
    //         closeBtn.className = "close";
    //         taskClose.className = "close-tag"

    //         taskImg.innerText = "T";
    //         taskTitle.innerText = x.title;
    //         taskDesc.innerText = x.desc;
    //         taskRemainder.innerText = timeRemaining(x.date, x.time);
    //         // timeRemains;


    //         taskClose.appendChild(closeBtn);
    //         taskCard.appendChild(taskImg);
    //         taskCard.appendChild(taskBox);
    //         taskBox.appendChild(taskTitle);
    //         taskBox.appendChild(taskDesc);
    //         taskCard.appendChild(taskRemainder);
    //         taskCard.appendChild(taskClose);
    //         activeTasks.appendChild(taskCard);

    //         // taskClose.addEventListener('click', function(){
    //         //     taskList.pop(x);
    //         //     console.log(x);
    //         //     completeTasks.removeChild(taskCard);
    //         // });
            
    //         allBtn.addEventListener('click', function(){
    //             activeTasks.removeChild(taskCard);
    //             cmpBtn.disabled = false;
    //             actBtn.disabled = false;
    //         });

    //         cmpBtn.addEventListener('click', function(){
    //             activeTasks.removeChild(taskCard);
    //             allBtn.disabled = false;
    //             actBtn.disabled = false;
    //         });


    //         actBtn.addEventListener('click', function(){
    //             activeTasks.removeChild(taskCard);
    //             cmpBtn.disabled = false;
    //             allBtn.disabled = false;
    //         });




    //     });
    // }
    // else
     return null;

}

function addAllView(){
    taskList.length >0 && taskList.map( x => {
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
        taskTitle.innerText = x.title;
        taskDesc.innerText = x.desc;
        taskRemainder.innerText = timeRemaining(x.date, x.time);
        // timeRemains;


        taskCard.appendChild(taskImg);
        taskCard.appendChild(taskBox);
        taskBox.appendChild(taskTitle);
        taskBox.appendChild(taskDesc);
        taskCard.appendChild(taskRemainder);
        taskPanel.appendChild(taskCard);

        if(x.status == "completed"){
            taskTitle.style.textDecoration = "line-through";
            taskDesc.style.textDecoration = "line-through";
        }

        document.querySelector(".item-left").innerText = `${taskList.length} item left`;

        taskImg.addEventListener('click', function () {
            taskTitle.style.textDecoration = "line-through";
            taskDesc.style.textDecoration = "line-through";
            x.status = "completed";
            document.querySelector(".item-left").innerText = `${taskList.length} item left`;
            console.log(taskList);
        });

    });
}