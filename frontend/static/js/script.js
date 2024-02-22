function chooseDefaultImage(e) {
    if (e.currentTarget){
        e.currentTarget.src = "/static/img/no_img.jpg"
    }
}
// Default image for all images
document.querySelectorAll("img").forEach(elem => {
    elem.addEventListener("error",chooseDefaultImage)
    if (elem.src === "") {
        chooseDefaultImage(elem)
    }
    // elem.src === "" && chooseDefaultImage(elem)
})

function cleanInput(str ="") {
    str = str.replaceAll(" ","")
    str = str.replaceAll("\n","")
    str = str.replaceAll("\r","")
    str = str.replaceAll("\t","")
    return str
}

function verifyInput(e) {
    if(cleanInput(e.currentTarget.value)=== ""){
        e.currentTarget.value = ""
    }
}
// Verifie input values
console.log(document.querySelectorAll("input"));
document.querySelectorAll("input").forEach(elem => {
    elem.addEventListener("input",verifyInput)
})
document.querySelectorAll("textarea").forEach(elem => {
    elem.addEventListener("input",verifyInput)
})

