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
  board_main.innerHTML = `<h2>Here You can will find your tasks</h2>`;
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
    board_main.classList = "main";
    board_main.querySelector(
      "h2"
    ).innerHTML = `<h2>${user_projects[index].title}</h2>`;
    task_list.innerHTML = "";
    if (user_projects[index].tasks.length === 0) {
      const task_el = document.createElement("div");
      task_el.innerHTML = "No tasks";
      task_el.id = "no-tasks";
      const add_task_btn = document.createElement("button");
      add_task_btn.innerHTML = "Add Task";
      add_task_btn.id = "add-task";
      add_task_btn.addEventListener("click", () => {
        const title = prompt("Title");
        const description = prompt("Description");
        const author = prompt("Author");
        const status = prompt("Status");
        addTask(title, description, author, status, index);
      });
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
        task_el.appendChild(delete_task_btn);
        task_list.appendChild(task_el);
      });
      const add_task_btn = document.createElement("button");
      add_task_btn.innerHTML = "Add Task";
      add_task_btn.id = "add-task";
      add_task_btn.addEventListener("click", () => {
        const title = prompt("Title");
        const description = prompt("Description");
        const author = prompt("Author");
        const status = prompt("Status");
        addTask(title, description, author, status, index);
      });
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

  add_project_btn.addEventListener("click", () => {
    const title = prompt("Title");
    const description = prompt("Description");
    board.addProject(title, description);
  });

  board.getAside().appendChild(add_project_btn);
};

const program = asideManager();
