import { useState } from 'react'
import {Toaster , toast} from 'react-hot-toast'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle === ""){
      //toast.error("Insira o nome da task!"); //Testes não gostam do Toaster
      return
    }
    const date = new Date;
    const newId = date.getTime();
    //Usando Date com milissegundos porque existe a remota possibilidade de Math.random gerar um numero igual
    const task : Task = {
      id : newId,
      title : newTaskTitle,
      isComplete : false
    }
    //toast.success("Task criada!") //Testes não gostam do Toaster
    setTasks( [...tasks, task] )
    setNewTaskTitle('');

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    for ( let i = 0 ; i < tasks.length; i++){
      if (tasks[i].id === id ){

        let newTasks = [...tasks]
        newTasks[i].isComplete = !newTasks[i].isComplete

        setTasks(newTasks);

/*         if (newTasks[i].isComplete){
          toast('Bom trabalho!', {
            icon: '👏',
          });
        } */ //Testes não gostam do Toaster

        break;
      } 
    }
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    let index = tasks.findIndex( task =>{
      if (task.id === id){
        return true
      }
    })
    
    if (index > -1){
      let newTasks = [...tasks]
      newTasks.splice(index , 1)
      //toast.error("Task removida...") //Testes não gostam do Toaster
      setTasks(newTasks)
    }

  }

  return (
    <>
      <section className="task-list container">
        <header>
          <h2>Minhas tasks</h2>

          <div className="input-group">
            <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff"/>
            </button>
          </div>
        </header>

        <main>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                  <label className="checkbox-container">
                    <input 
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>

                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash size={16}/>
                </button>
              </li>
            ))}
            
          </ul>
        </main>
      </section>
      <Toaster />
    </>
  )
}