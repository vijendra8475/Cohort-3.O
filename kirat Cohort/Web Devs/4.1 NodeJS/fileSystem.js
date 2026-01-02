import fs from 'fs'

fs.readFile('e.txt', (_, data) => {
    console.log(data.toString());
})