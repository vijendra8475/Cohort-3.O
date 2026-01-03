import { Command } from 'commander'
import path from 'path';
import fs, { readFile } from 'fs'
import { fileURLToPath } from "url";

const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// helper
const readTodo = () => {
    if(!fs.existsSync(__dirname))
        return [];
    return JSON.parse(fs.readFile(__dirname, 'utf8'))
}

const saveFile = (todos) => fs.writeFile(JSON.stringify(todos,  null, 2))



// ---------- CLI ----------
program
  .name("todo")
  .description("Simple Todo CLI")
  .version("1.0.0");

program
    .command('addTask <task>')
    .action(task => {
        const todos = readTodo()
        todos.push({
            task : task,
            status : 'pending'
        })

        saveFile(todos);
        console.log("✅ Added:", task);
    })

program
    .command('list')
    .action(() => {
        const todo = readFile();
        if(todo.length === 0)
            return console.log('todo is empty');

        console.log('todo : ', todo);
    })

program
    .command('complete <index>')
    .action(index => {
        const todo = readFile();

        if(!todo[index-1]) {
            console.log('Invalid Operation');
            return
        }
        
        todo[index-1].status = 'compllete';
        saveFile(todo);
        console.log('Todo updated');
    })

program
    .command('delete <index>')
    .action(index => {
        const todo = readFile();
        
        if(!todo[index-1]){
            console.log("❌ Invalid todo number");
            return
        }

        const removed = todo.splice(index-1, 1)
        saveFile(todo)
        console.log("🗑 Deleted:", removed[0].task);
    })


program.parse(process.argv);
