const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'text.txt');

 

stdout.write('Здравствуйте! Введите текст:\n');

stdin.on('data', data => {

    let write = data.toString().trim();

    if (write == 'exit') {
        process.exit(process.on('exit', () => {
            stdout.write('Всего хорошего!\n');
        }));
    };

    fs.appendFile(filePath, write, err => {
        if (err) {
            throw err;
        }

    stdout.write('Введенный текст записан в созданный файл. Введите текст или завершите программу...\n');

    });
});
fs.unlink(filePath, (err) => {
    if (err) {
       console.log
    }
});

process.on('SIGINT', () => {
    process.exit(process.on('exit', () => {
        stdout.write('\nВсего хорошего!\n');
    }));
})