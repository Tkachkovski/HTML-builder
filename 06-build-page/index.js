const fs = require('fs');
const path = require('path');
const { mkdir } = require('fs/promises');
const assets = path.join(__dirname, 'assets',)
const fonts = path.join(__dirname, 'fonts')
const copyStyles = path.join(__dirname, 'project-dist', 'style.css');
const Styles = path.join(__dirname, 'styles');
const project = path.join(__dirname, 'project-dist');

(async function () {

    try {

        await mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
            
            if (err) {
                
                throw err;
                
            }

        });

        mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (err) => {
            
            if (err) {
                
                throw err;
                
            }

        });


        fs.readdir(path.join(__dirname , 'project-dist'), { withFileTypes: true } , (err, files) => {
        
            if (err) {
                
                throw err;
            }
    
            files.forEach(file => {
                
                if(path.extname(file.name) == '.css'){
    
                    fs.unlink(path.join(path.join(__dirname, 'project-dist'), file.name), err => {
                        
                        if (err) {
                            
                            throw err;
    
                        }    
    
                    });
    
                };
    
            });
    
        });
    
    
        fs.readdir(Styles, { withFileTypes: true }, (err, files) => {
            
            if (err) {
                
                throw err;
    
            }
    
            files.forEach(file => {
    
                if(path.extname(file.name) == '.css') {
                    
                    fs.readFile(Styles + '/' + file.name, "utf-8", (err, files) => {
                        
                        if (err) {
    
                            throw err;
    
                        } else {
                            
                            let text = '';
                            text = files;
                            
                            fs.appendFile(copyStyles, text, (err) => {
                                
                                if (err) {
                                    
                                    throw err;
                                
                                }
                                
                            })
                        
                          }
                    
                    })
                        
                }
    
            })
        })


        fs.readdir(assets, (err,files) => {

            if (err) {

                throw err;

            }
           
                files.forEach(file => {

                    fs.copyFile(path.join(__dirname, "assets", file), path.join(project, file) , err => {
    
                        if (err) {
    
                            throw err;
    
                        }
                    })
                })

        })



    } catch (error) {

        console.error(error);

    }

})(path.join(__dirname, 'files'));