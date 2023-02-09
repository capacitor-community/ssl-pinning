const fs = require("fs");
const path = require("path");

function cleanDocs() {
  const pathsToClean = [
    path.join("./", "docs", "index.md"),
    path.join("./", "docs", "_category_.yml"),
  ];

  for (const pathToClean of pathsToClean) {
    if (
      fs.existsSync(pathToClean) &&
      !fs.lstatSync(pathToClean).isDirectory()
    ) {
      console.log("CLEAN UP -", pathToClean);
      fs.unlinkSync(pathToClean);
    } else if (
      fs.existsSync(pathToClean) &&
      fs.lstatSync(pathToClean).isDirectory()
    ) {
      console.log("CLEAN UP -", pathToClean);
      fs.rmSync(pathToClean, { recursive: true, force: true });
    }
  }
}

module.exports = {
  cleanDocs,
};
