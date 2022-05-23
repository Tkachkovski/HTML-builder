const fs = require('fs');
const path = require('path');
const stylePath = path.join(__dirname, 'styles');
const copyPath = path.join(__dirname, 'project-dist', 'bundle.css');


(async function () {
    try{
    fs.readdir(path.join(__dirname , 'project-dist'), { withFileTypes: true } , (err,files) => {
        if (err) throw err;
        files.forEach(file => {
            if(path.extname(file.name) == ".css"){
                fs.unlink(path.join(path.join(__dirname,'project-dist'), file.name ), err => {
                    if (err) throw err;
                    });
            };
        });
    });
    fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err,files) => {
        if (err) throw err
        files.forEach(file => {
            if(path.extname(file.name) == ".css"){
                        fs.readFile(stylePath + '/' + file.name, "utf-8", (err,files) => {
                            if (err) {
                            throw err
                            } else {
                                let text = ""
                                text=files;
                                fs.appendFile(copyPath,text,(err) => {
                                    if (err) throw err
                                })
                            }
                        })
                    
            }
        })
    })

} catch (error) {
    console.error(error);
}
})(path.join(__dirname, 'files'));

