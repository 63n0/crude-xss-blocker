const fs = require("fs");
const path = require("path");

const envList = ["firefox", "chrome"];
let env = process.argv[2];
if(!envList.includes(env)) throw env;

const src = path.resolve("./", "src");

fs.readdir(src, (err, files) => { build(src, err, files) });

function build(dir, err, files){
    if(err) throw err;
    //let fileList = [];
    for(let f of files){
        let fp = path.resolve(dir, f);
        if(fs.statSync(fp).isFile()){
            if (new RegExp(".*\." + env.toString() + "\..*$").test(f) || /.*\.common\..*$/.test(f)){
                console.log("build: ",f);
                //fileList.push(f);
                let dest = path.resolve(fp.replace("src", "build/"+env ).replace(".common", "").replace("."+env, ""));
                console.log("dest: " +dest);
                CopyFileRecursively(fp, dest)
            }
        }else if(fs.statSync(fp).isDirectory()){
            fs.readdir(dir, (err, files) => { build(dir, err, files); });
        }
    }
}


var CopyFileRecursively = ((srcpath, destpath) => {
    let destDir = path.dirname(destpath);
    if ( !fs.existsSync(destDir) ) {
        fs.mkdirSync(destpath,{ recursive: true } );
    }
    if (fs.existsSync(destpath)){
        fs.rmSync(destpath);
    }
    fs.copyFileSync(srcpath, destpath);
});