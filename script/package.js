const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const env = process.argv[2];

const zipArchive = async targetDir => {
    const zipPath = `${targetDir}.zip`;
    const output = fs.createWriteStream(path.join(__dirname, zipPath));
    const files = fs.readdirSync(targetDir);
  
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });
  
    archive.pipe(output);

    for(let f of files){
        console.log(f);
        archive.glob(f);
    }
  
    await archive.finalize();
  
    return;
}

(async() => {
await zipArchive('build', env);
})();
  