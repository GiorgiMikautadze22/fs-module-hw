const fs = require("fs").promises;
const path = require("path");

async function readFolderStructure(folder, depth = 0) {
  try {
    const folderNames = await fs.readdir(folder);

    for (const file of folderNames) {
      const filePath = path.join(folder, file);
      const stats = await fs.lstat(filePath);

      if (stats.isFile()) {
        await fs.appendFile(
          "./output.txt",
          `${"  ".repeat(depth)}FILE: ${file}\n`
        );
      } else {
        await fs.appendFile(
          "./output.txt",
          `${"  ".repeat(depth)}DIR: ${file}\n`
        );
        await readFolderStructure(filePath, depth + 1);
      }
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

readFolderStructure(__dirname);

//-----------------

// function readFolderStructure(folder) {
//   fs.readdir(folder).then((folderNames) => {

//     folderNames.forEach((file) => {
//       const filePath = path.join(folder, file);

//       fs.lstat(filePath).then((el) => {
//         if (el.isFile()) {
//           fs.appendFile("./output.txt", `FILE: ${file}\n`).then(() => {});
//         } else {
//           fs.appendFile("./output.txt", `DIR: ${file}\n`).then(() => {
//             readFolderStructure(filePath);
//           });
//         }
//       });
//     });
//   });
// }

// readFolderStructure(__dirname);
