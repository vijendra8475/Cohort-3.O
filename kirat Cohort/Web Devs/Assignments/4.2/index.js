import {Command} from 'commander'
const program = new Command();

let todo = []


program
    .name('todo')
    .description('Simple Todo Cli')
    .version('1.0.0')

program
    .command('add <task>')
    .action(task => {
        todo.push({
            task : task,
            status : 'pending'
        })
        console.log("✅ Added:", task);
    })

program 
    .command('read')
    .action(() => {
        console.log(todo);
    })

program.parse(process.argv);
