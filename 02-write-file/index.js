const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const create = fs.createWriteStream(
    path.join(__dirname, 'text.txt'), (err) => {
        if (err) throw err 
    } , 'utf-8'
);

stdout.write('Здравствуйте! Введите текст:\n');

stdin.on('data', data => {
    let write = data.toString().trim();

    if (write != 'exit') {
        create.write(data)
    }else{
        process.exit(process.on('exit', () => {
            stdout.write('Всего хорошего!\n');
        }));
    }
});

process.on('SIGINT', () => {
    process.exit(process.on('exit', () => {
        stdout.write('\nВсего хорошего!\n');
    }));
})




