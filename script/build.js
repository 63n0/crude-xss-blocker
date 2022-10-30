const fs = require("fs");
const path = require("path");

const envList = ["firefox", "chrome"];
let env = process.argv[2];
if(!envList.includes(env)) throw env;

const src = path.resolve("./", "src");

CleanDirectory(path.resolve("build", env))
fs.readdir(src, (err, files) => { build(src, err, files) });

function build(dir, err, files){
    if(err) throw err;
    //let fileList = [];
    for(let f of files){
        let fp = path.resolve(dir, f);
        if(fs.statSync(fp).isFile()){
            if (new RegExp(".*\." + env.toString() + "\..*$").test(f) || /.*\.common\..*$/.test(f)){
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


function CopyFileRecursively(srcpath, destpath){
    let destDir = getParentDirectory(destpath);
    if ( !fs.existsSync(destDir) ) {
        console.log("not exist");
        fs.mkdirSync(destDir,{ recursive: true } );
    }
    if (fs.existsSync(destpath)){
        fs.rmSync(destpath);
    }
    fs.copyFileSync(srcpath, destpath);
};

function getParentDirectory(filepath){
    let splited = filepath.split("\\");
    let res = "";
    for(i=0; i<splited.length-1; i++){
        res += splited[i] + "\\";
    }
    return path.resolve(res);
}

function CleanDirectory(dir){
    if(!fs.existsSync(dir)) return;
    let files = fs.readdirSync(dir);
    files.forEach((f)=>{
        fp = path.resolve(dir, f)
        if(fs.statSync(fp).isFile()){
            fs.rmSync(fp);
        } else if(fs.statSync(fp).isDirectory()){
            fs.rmdirSync(fp, { recursive:true, force:true})
        }
    })
}