//** 1. Gestión de Proyectos y Tareas
//interfaz
type TaskStatus = "pending" | "in progress" | "completed";

interface Task{
  idTask: number;
  description: string;
  status: TaskStatus;
  deliveryDate: string
}

interface Project
{
  idProject: number;
  name: string;
  startDate: string;
  tasks: Task[]
}

//1.1 estrucuturas de datos
const projects = [
  {
    idProject: 1,
    name: "Project One",
    startDate: "2024-10-01",
    tasks: [
      { idTask: 1,
        description: "Set up development environment",
        status: "completed",
        deliveryDate: "2024-11-01"
      },
      { idTask: 2,
        description: "Design database schema",
        status: "in progress",
        deliveryDate: "2024-11-19"
      },
      { idTask: 3,
        description: "Develop API",
        status: "pending",
        deliveryDate: "2024-11-20"
      },
      { idTask: 4,
        description: "Develop Interface",
        status: "pending",
        deliveryDate: "2024-12-15"
      },
      { idTask: 4,
        description: "UI/UX integration",
        status: "in progress",
        deliveryDate: "2024-12-30"
      }
    ]
  },
  { 
    idProject: 2, 
    name: "Project Beta", 
    startDate: "2024-11-01", 
    tasks: [ 
      { 
        idTask: 10, 
        description: "Gather client requirements", 
        status: "completed", 
        deliveryDate: "2024-11-05" 
      } 
    ] 
  }
];

//funcion para obtener un proyecto por id
const getProject = (idProject:number) => {
  const project = projects.find(proj => proj.idProject === idProject);
  return project;
}

//1.2 funcion para agregar tareas
const addTask = (idProject:number, idTask:number, description: string, status:TaskStatus, deliveryDate:string) => {
  
  //arma la estructura de la tarea y se asigna a una variable
  const newTask: Task = { 
    idTask: idTask, 
    description: description, 
    status: status, 
    deliveryDate: deliveryDate 
  }; 
    
  // busca el proyecto para agregar la tarea
  const project = getProject(idProject);

  //si el proyecto existe agrega la nueva tarea
  project?.tasks.push(newTask);
};

//1.3 funcion para resumir las tareas por status
const resumeStatusTasks = (idProject:number) => {
  const project = getProject(idProject);
  if(project)
  {
    //mappear para obtener el status de las tareas
    const taskStatuses = project.tasks.map(task => task.status);

    //deja el resumen de status en un array
    const arrayResumeStatus = taskStatuses.reduce((acc, status) => {
      //se acumula el tipo de status y su cantidad
      acc[status as TaskStatus] = (acc[status as TaskStatus] || 0) + 1;
      return acc;
    }, {} as Record<TaskStatus, number>);
    return arrayResumeStatus;
  }
  return null;
  
}

//1.4 ordenar tareas por fecha limite
const orderTasksbyLimitDate = (idProject:number) => {
  const project = getProject(idProject);
  if(project)  
  {
    // ordena las tareas del proyecto por fecha limite ascendente
    const sortTasks = project.tasks.sort((a, b) => new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime());
    return sortTasks;
  }
  return null;
}

//** 2. Análisis Avanzado de Tareas

//2.1 función de filtro de orden superior
const filterPojectTasks = (idProject:number, filterFunction: (task: Task) => boolean) =>
{
  const project = getProject(idProject);
  if(project)
  {
    const filter = project.tasks.filter(filterFunction);
    return filter;
  }
  return null;
}
 
//2.2 funcion para calcular cuantos días le quedan a las tareas pendientes de un proyecto
const calculateRemainingTime = (idProject: number, status:string) => {
  const project = getProject(idProject);
  const currentDate = new Date();

  if (project) {
    const filterCondition = (task:Task) => task.status === status;
    const tasks = filterPojectTasks(project.idProject, filterCondition); 
    
    if(tasks) {
    const remainingDaysArray = tasks.reduce((acc: number[], task) => {
      const taskDate = new Date(task.deliveryDate);
      const remainingDays = Math.ceil((taskDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      acc.push(remainingDays);
      return acc;
    }, []);

      return remainingDaysArray;
    }else
    {
      return null;
    }
  }

  return null;
}

//funcion para obtener tareas criticas
const getCriticsTask = (idProject:number) => {
  const project = getProject(idProject);
  const currentDate = new Date();
  const criticsTasks: Array<{ idTask: number; description: string; status: string; deliveryDate: string; remainingDays: number }> = [];
  if(project)
  {
    const filterCondition = (task:Task) => task.status != 'completed';
    const tasks = filterPojectTasks(project.idProject, filterCondition); 
    
    if(tasks)
    {
      tasks.forEach(task => {
        const taskDate = new Date(task.deliveryDate);
        const remainingDays = Math.ceil((taskDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        if(remainingDays <= 3)
        {
          criticsTasks.push({...task, remainingDays});
        }
      });
    }
  }
  return criticsTasks;
}

//3. simulacion de llamada asíncrona
// funcion que simula llamar datos con delay
const getProjectPromise = (id: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const project = getProject(id);
      if (project) {
        resolve(project);
      } else {
        reject(new Error("Project not found"));
      }
    }, 1500);
  });
};

//3.1 Función para obtener los datos de un proyecto con async y await
const getProjectDetails = async (id: number) => {
  try {
    const project = await getProjectPromise(id);
    console.log(project);
  } catch (error) {
    console.error("Error al obtener el proyecto:", error.message);
  }
};

/** Ejemplos de las funciones */
//crear una nueva tarea al proyecto numero 2
addTask(2, 11, 'lorem ipsum dolor', 'completed', '2024-11-16');
//console log para ver que se ha agregado la nueva tarea
console.table(projects);

// resumen del proyecto mostrando el número de tareas en cada estado
console.log(resumeStatusTasks(1));

//ordenar tareas por status
console.log(orderTasksbyLimitDate(1));

// Ejemplo de función de filtrado
const filterpendingTasks = (task:Task) => task.status === 'pending';
console.log(filterPojectTasks(1, filterpendingTasks)); 

// calcular el número total de días que faltan para completar todas las tareas pendientes de un proyecto.
console.log(calculateRemainingTime(1, 'pending'));

// retorna  tareas que están a menos de 3 días de su fecha límite y aún no están completadas.
console.log(getCriticsTask(1));

// obtener detalle de un proyecto usando async/await
getProjectDetails(1);

