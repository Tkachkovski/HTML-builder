const fs = require('fs');
const path = require('path');
const { mkdir } = require('fs/promises');
const fsPromises = require('fs/promises');

const copyStyles = path.join(__dirname, 'project-dist', 'style.css');
const Styles = path.join(__dirname, 'styles');
const template = path.join(__dirname);

const htmlPath = path.join(__dirname, 'components');
const indexHtml = path.join(__dirname, 'project-dist', 'index.html');

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
        mkdir(path.join(path.join(__dirname, 'project-dist', 'assets'), 'fonts'), {recursive: true}, (err) => {
            if (err) {
                throw err;
            }
        });
        fs.readdir(path.join(path.join(__dirname, 'project-dist', 'assets'), 'fonts'), { withFileTypes: true } , (err, files) => {
            if (err) {     
                throw err;
            }
            files.forEach(file => {   
                if(path.extname(file.name) == '.woff2'){
                    fs.unlink(path.join(path.join(__dirname, 'project-dist', 'assets', 'fonts'), file.name), err => {
                        if (err) {
                            throw err;
                        }    
                    });
                };
            });
        });
        mkdir(path.join(path.join(__dirname, 'project-dist', 'assets'), 'img'), {recursive: true}, (err) => { 
            if (err) {
                throw err;
            }
        });
        fs.readdir(path.join(path.join(__dirname, 'project-dist', 'assets'), 'img'), { withFileTypes: true } , (err, files) => {
            if (err) {
                throw err;
            }
            files.forEach(file => {   
                if(path.extname(file.name) == '.jpg'){
                    fs.unlink(path.join(path.join(__dirname, 'project-dist', 'assets', 'img'), file.name), err => {
                        if (err) {
                            throw err;
                        }    
                    });
                };
            });
        });
        mkdir(path.join(path.join(__dirname, 'project-dist', 'assets'), 'svg'), {recursive: true}, (err) => { 
            if (err) {
                throw err;
            }
        });
        fs.readdir(path.join(path.join(__dirname, 'project-dist', 'assets'), 'svg'), { withFileTypes: true } , (err, files) => {
            if (err) {
                throw err;
            }
            files.forEach(file => {   
                if(path.extname(file.name) == '.svg'){
                    fs.unlink(path.join(path.join(__dirname, 'project-dist', 'assets', 'svg'), file.name), err => {
                        if (err) {
                            throw err;
                        }    
                    });
                };
            });
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
                            });
                          }
                    });
                }
            });
        });


        fs.readdir(path.join(__dirname, 'assets', 'fonts'), (err, files) => {
            if (err) {
                throw err;
            }
            files.forEach(file => {
                fs.copyFile(path.join(path.join(__dirname, 'assets', 'fonts'), file), path.join(path.join(__dirname, 'project-dist', 'assets', 'fonts'), file), err => {
                    if (err) {
                        throw err;
                    }
                });
            });
        });

        fs.readdir(path.join(__dirname, 'assets', 'img'), (err, files) => {
            if (err) {
                throw err;
            }
            files.forEach(file => {
                fs.copyFile(path.join(path.join(__dirname, 'assets', 'img'), file), path.join(path.join(__dirname, 'project-dist', 'assets', 'img'), file), err => {
                    if (err) {
                        throw err;
                    }
                });
            });
        });

        fs.readdir(path.join(__dirname, 'assets', 'svg'), (err, files) => {
            if (err) {
                throw err;
            }
            files.forEach(file => {
                fs.copyFile(path.join(path.join(__dirname, 'assets', 'svg'), file), path.join(path.join(__dirname, 'project-dist', 'assets', 'svg'), file), err => {
                    if (err) {
                        throw err;
                    }
                });
            });
        });

        fs.readdir(template, { withFileTypes: true }, (err, files) => {
            if (err) {
                throw err;
            }
            files.forEach(file => {
                if(path.extname(file.name) == '.html') {
                    fs.readFile(template + '/' + file.name, "utf-8", (err, files) => {
                        if (err) {
                            throw err;
                        } else {
                            let text = '';
                            text = files;
                            fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), text, (err) => {
                                if (err) {
                                    throw err;
                                }
                            });
                          }
                    }); 
                }
            });
        });

        const allFiles = await fsPromises.readdir(htmlPath, { withFileTypes: true });
        for (let i = 0; i < allFiles.length; i++) {
            const extFileName = path.extname(allFiles[i].name);
            if (extFileName === '.html') {
                if (allFiles[i].isFile()) {
                    const fileName = path.basename(allFiles[i].name, path.extname(allFiles[i].name));
                    const search = `{{${fileName}}}`;
                    const filePath = path.join(htmlPath, allFiles[i].name);
                    const data = await fsPromises.readFile(filePath, 'utf-8');
                    let textIndexHtml = await fsPromises.readFile(indexHtml, 'utf-8');
                    textIndexHtml = textIndexHtml.replace(search, data);
                    fs.writeFile(indexHtml, textIndexHtml, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
})(path.join(__dirname, 'files'));