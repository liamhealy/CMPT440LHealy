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

// function replace(regex, str) {
//     for (var i = 0; i < str.length; i++) {
//         if (str.charAt(i) == regex) {
//             str.charAt(i) = "";
//         }
//     }
// }

function trim(str) {
    // Use a regular expression to remove leading and trailing spaces.

    // for (var i = 0; i < str.length; i++) {
    //     str = str.replace(" ", "");
    // }
    // return str;

    return str.replace(/^\s+ | \s+$/g, "");
	/* 
	Huh?  Take a breath.  Here we go:
	- The "|" separates this into two expressions, as in A or B.
	- "^\s+" matches a sequence of one or more whitespace characters at the beginning of a string.
    - "\s+$" is the same thing, but at the end of the string.
    - "g" makes is global, so we get all the whitespace.
    - "" is nothing, which is what we replace the whitespace with.
	*/
	
}

function grepyOutput(msg) {
    document.getElementById("shell").value += msg;
}