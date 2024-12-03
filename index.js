 import Modal from "./modal.js";
class project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.tasks = [];
  }
}

class Task {
  constructor(title, description, author, status) {
    this.title = title;
    this.description = description;
    this.author = author;
    this.status = status;
  }
}

const createBoard = () => {
  const app = document.getElementById("root");
  const user_projects = [];

  const board_aside = document.createElement("section");
  board_aside.classList += "aside";
  app.appendChild(board_aside);

  const project_list = document.createElement("div");
  project_list.classList += "project-list";
  board_aside.appendChild(project_list);

  const board_main = document.createElement("section");
  board_main.classList += "main-base";
  board_main.innerHTML = `<div id='project-info'><h2>Here You can will find your tasks</h2></div>`;
  app.appendChild(board_main);

  const task_list = document.createElement("div");
  task_list.classList += "task-list";
  board_main.appendChild(task_list);

  const addProject = (title, description) => {
    const newProject = new project(title, description);
    user_projects.push(newProject);
    displayProjects();
  };

  const addTask = (title, description, author, status, index) => {
    const newTask = new Task(title, description, author, status);
    user_projects[index].tasks.push(newTask);
    displayTasks(index);
  };

  const editTask = (index, task_index, title, description, author, status) => {
    user_projects[index].tasks[task_index].title = title;
    user_projects[index].tasks[task_index].description = description;
    user_projects[index].tasks[task_index].author = author;
    user_projects[index].tasks[task_index].status = status;
    displayTasks(index);
  };

  const deleteTask = (index, task_index) => {
    user_projects[index].tasks.splice(task_index, 1);
    displayTasks(index);
  };

  const displayProjects = () => {
    project_list.innerHTML = "<h2>My Projects</h2>";
    if (user_projects.length === 0) {
      const project_el = document.createElement("div");
      project_el.innerHTML = "No projects";
      project_el.id = "no-projects";
      project_list.appendChild(project_el);
    }
    user_projects.forEach((project, index) => {
      const project_el = document.createElement("div");
      project_el.innerHTML = project.title;
      project_el.id = `${index}`;
      project_el.classList += "project";
      project_el.addEventListener("click", () => {
        displayTasks(index);
      });
      project_list.appendChild(project_el);
    });
  };

  const displayTasks = (index) => {
    
    let description;
    if (!user_projects[index].description) {
      description = 'No Description yet';
    }
    else description = user_projects[index].description;
    
    board_main.classList = "main";
    board_main.querySelector("#project-info ").innerHTML = `
      <h2>${user_projects[index].title}</h2>
      <h4>Description</h4> 
      <p>${description}</p>`;
    board_main.querySelector("#project-info p").style.color = "rgba(128, 128, 128, 0.5)";
    task_list.innerHTML = "";
    debugger;
    if (user_projects[index].tasks.length === 0) {
      
      //Create No Tasks Div
      const task_el = document.createElement("div");
      task_el.innerHTML = "No tasks";
      task_el.id = "no-tasks";  


      const add_task_btn = document.createElement("button");
      add_task_btn.innerHTML = "Add Task";
      add_task_btn.id = "add-task";
      add_task_btn.addEventListener("click", () => {
        Modal.showModal(
          `<h2>Create New Task</h2>
          <form id='modal-task-form'>
            <input id='title-input-modal' required type='text' placeholder='Title'>
            <textarea id='description-input-modal' type='text' placeholder='Description'></textarea>
            <input id='author-input-modal' type='text' placeholder='Author'>
            <input id='status-input-modal' required type='text' placeholder='Status'>
            <button id='submit-modal'>Submit</button>
          </form>`
        );

        document.querySelector("#modal-task-form").addEventListener("submit", (e) => {  
          e.preventDefault();
          const title = document.querySelector("#title-input-modal").value;
          const description = document.querySelector("#description-input-modal").value;
          const author = document.querySelector("#author-input-modal").value;
          const status = document.querySelector("#status-input-modal").value;
          addTask(title, description, author, status, index);
          Modal.closeModal();
        });
      });

      //Append Elements
      task_list.appendChild(task_el);
      task_list.appendChild(add_task_btn);

    } else {
      user_projects[index].tasks.forEach((task, task_index) => {
        const delete_task_btn = document.createElement("button");
        const task_el = document.createElement("div");
        task_el.innerHTML = ` 
        <h3>${task.title}</h3>
        <p>${task.status}</p>
        `;
        task_el.classList += "task";

        task_el.addEventListener("click", () => {
          Modal.showModal(
            `<h2>Edit Task</h2>
            <form id='modal-task-form'>
              <input id='title-input-modal' type='text' value="${task.title}" placeholder='Title'>
              <textarea id='description-input-modal' placeholder='Description'>${task.description}</textarea>
              <input id='author-input-modal' type='text' value="${task.author}" placeholder='Author'>
              <input id='status-input-modal' type='text' value="${task.status}" placeholder='Status'>
              <button id='submit-modal'>Submit</button>
            </form>`
          );

          document.querySelector("#modal-task-form").addEventListener("submit", (e) => {  
            e.preventDefault();
            const title = document.querySelector("#title-input-modal").value;
            const description = document.querySelector("#description-input-modal").value;
            const author = document.querySelector("#author-input-modal").value;
            const status = document.querySelector("#status-input-modal").value;
            editTask(index, task_index, title, description, author, status);
            Modal.closeModal();
          });
        })


       // task_el.appendChild(delete_task_btn);
        task_list.appendChild(task_el);
      });
      
      const add_task_btn = document.createElement("button");
      add_task_btn.innerHTML = "Add Task";
      add_task_btn.id = "add-task";
      add_task_btn.addEventListener("click", () => {
        Modal.showModal(
          `<h2>Create New Task</h2>
          <form id='modal-task-form'>
            <input id='title-input-modal' type='text' placeholder='Title'>
            <textarea id='description-input-modal'  placeholder='Description'></textarea>
            <input id='author-input-modal' type='text' placeholder='Author'>
            <input id='status-input-modal' type='text' placeholder='Status'>
            <button id='submit-modal'>Submit</button>
          </form>`
        );

      document.querySelector("#modal-task-form").addEventListener("submit", (e) => {  
        e.preventDefault();
        debugger;
        const title = document.querySelector("#title-input-modal").value;
        const description = document.querySelector("#description-input-modal").value;
        const author = document.querySelector("#author-input-modal").value;
        const status = document.querySelector("#status-input-modal").value;
        addTask(title, description, author, status, index);
        Modal.closeModal();
      });
    });

    //Append Elements
      task_list.appendChild(add_task_btn);
    }
  };



  const getAside = () => {
    return board_aside;
  };

  const getMain = () => {
    return board_main;
  };

  return { addProject, getAside, displayProjects, addTask };
};

const asideManager = () => {
  const board = createBoard();

  board.displayProjects();

  const add_project_btn = document.createElement("button");
  add_project_btn.innerHTML = "Add";

  //Open Modal for Projects
  add_project_btn.addEventListener("click", () => {
    
    Modal.showModal
    (`
      <h2>Create New Project</h2>
      <form id='modal-project-form'>
        <input id='title-input-modal' type='text' placeholder='Title'>
        <textarea id='description-input-modal'  placeholder='Description'></textarea>
        <button id='submit-modal'>Submit</button>
      </form>`
    ); 
    
    document.querySelector("#modal-project-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.querySelector("#title-input-modal").value;
      const description = document.querySelector("#description-input-modal").value;
      board.addProject(title, description);
      Modal.closeModal();
    })


  });

  board.getAside().appendChild(add_project_btn);
};

const program = asideManager();
