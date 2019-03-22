/* directory.js */

const selectedFile = document.getElementById("upload").addEventListener('change', getFile);
var fileReader = new FileReader();

//  The File Reader API https://developer.mozilla.org/en-US/docs/Web/API/FileReader
function getFile(event) {
    // fileReader.onload = 
    const uploadedFile = event.target;
    if ('files' in uploadedFile && uploadedFile.files.length > 0) {
        insertContent(document.getElementById("shell"), uploadedFile.files[0])
    }
}

function insertContent(target, file) {
    readContent(file).then(content => { target.value = content}).catch(error => console.log,log(error))
}

function readContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
    })
}