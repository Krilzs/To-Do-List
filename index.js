const user_projects = [];
const add_project_btn = document.getElementById("add-project-btn");
const dialog = document.querySelector("#project-modal");
const dialog_form = document.querySelector("#project-form");

class task {
  constructor(title, author, description, priority) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.priority = priority;
  }
}

class project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.project_tasks = [];
  }

  addTask(title, author, description, priority) {
    const newTask = new task(title, author, description, priority);
    this.project_tasks.push(newTask);
  }

  getTasks() {
    return this.project_tasks;
  }
}

function displayTasks(project) {
  const tasks_list = document.querySelector(".tasks-list");
  tasks_list.innerHTML = "";
  let tasks_array = [...project.getTasks()];
  if (tasks_array.length == 0) {
    const div = document.createElement("div");
    div.className += "task";
    div.innerHTML = `
    <p>No Se encontraron Tareas</p>`;
    tasks_list.appendChild(div);
    console.log(tasks_array.lenght);
  } else {
    tasks_array.forEach((task) => {
      const div = document.createElement("div");
      div.className += "task";
      div.innerHTML = `
      <h2>${task.title}</h2>
      <p>${task.description}</p>
      <p>${task.author}</p>
      <p>Nivel de prioridad = ${task.priority}</p>`;
      tasks_list.appendChild(div);
    });
  }
}

function createProject(title, description) {
  const newProject = new project(title, description);
  user_projects.push(newProject);
  console.log("hola");
  showProjects();
}

function showProjects() {
  const list = document.querySelector(".projects-list");
  list.innerHTML = "";
  user_projects.forEach((project, i) => {
    const li = document.createElement("div");
    li.id = i;
    li.onclick = function () {
      displayTasks(user_projects[this.id]);
    };
    li.innerHTML = `${project.title} indice ${i}`;
    list.appendChild(li);
  });
}

add_project_btn.addEventListener("click", () => {
  dialog.showModal();
});

dialog_form.addEventListener("submit", (e) => {
  e.preventDefault;
  const title = document.getElementById("project-title").value;
  const description = document.getElementById("project-description").value;
  createProject(title, description);
  dialog.close();
});

//Carga de Proyectos
/*
createProject("Projecto de Test", "Projecto de prueba");
createProject("Projecto de Test", "Projecto de prueba");
createProject("Projecto de Test", "Projecto de prueba");
createProject("Projecto de Test", "Projecto de prueba");
createProject("Projecto de Test", "Projecto de prueba");
createProject("Projecto de Test", "Projecto de prueba");

//Carga de Tareas
user_projects[0].addTask(
  "Aprender JavaScript",
  "Pedro",
  "Estudiar los fundamentos del lenguaje",
  2
);
user_projects[0].addTask(
  "Diseñar interfaz",
  "María",
  "Crear prototipos en Figma",
  3
);
user_projects[0].addTask(
  "Configurar servidor",
  "Luis",
  "Implementar un servidor en Node.js",
  4
);
user_projects[0].addTask(
  "Optimizar base de datos",
  "Ana",
  "Mejorar consultas en MySQL",
  5
);
user_projects[0].addTask(
  "Escribir documentación",
  "Javier",
  "Redactar guías para usuarios",
  1
);
user_projects[0].addTask(
  "Realizar pruebas",
  "Sofía",
  "Testear funcionalidades críticas",
  2
);

*/
