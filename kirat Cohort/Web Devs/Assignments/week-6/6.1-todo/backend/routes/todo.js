let todos = []; // in memory space
let currentId = 0;

export async function getAllTodo (req, res, next){
    //  write here
    return res.status(200).json(todos)
}

export async function createTodo (req, res, next){
    //  write here
    const { task } = req.body;

    todos.push({
        id : currentId++,
        task,
        status : 'pending'
    })

    res.status(200).json({
        message : 'task added'
    })

}

export async function updateTodo(req, res) {
  const { id } = req.params;
  const { updatedTask } = req.body;

  const task = todos.find(t => t.id === Number(id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.task = updatedTask;

  res.json({ message: "Task updated successfully", task });
}


export async function searchTodo (req, res, next){
    //  write here

    if(todos.length === 0)
        return res.status(401).json({ message : 'No task exist'})

    const { taskId } = req.body;

    const task = todos.find(t => t.id === taskId)

    res.status(200).json({ message : 'Task Found successfully', task })
}

export async function deleteTodoById (req, res, next){
    //  write here

     if(todos.length === 0)
        return res.status(401).json({ message : 'No task exist'})

    const { taskId } = req.body;

    todos = todos.filter(t => t.id !== taskId)

    res.status(200).json({ message : 'Task Deleted successfully'})
}