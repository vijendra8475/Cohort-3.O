import { Command } from 'commander'
const program = new Command();
import fs from 'fs'

program
    .name('myCLI')
    .description('Simple CLI to read string input')
    .version('1.0.0')

program
    .command("countWords <text>")
    .action(text => {
        fs.readFile(text, (err, data) => {
            data = data.toString().split('').length;
            console.log('No. of words in file : ', data);     
        })
    })

program
    .command('countLines <file>')
    .action(file => {
        fs.readFile(file, (err, data) => {
            const lines = data.toString().split('\n').length;
            console.log('No. of lines in file : ', lines);
        })
    })

program.parse(process.argv);
