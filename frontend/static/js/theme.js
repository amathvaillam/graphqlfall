var isDarkTheme = false
if (localStorage.getItem("isDarkTheme") === "true"){
    changeThemeMod()
}
function changeThemeMod() {
    let style = document.documentElement.style
    if(isDarkTheme){
        isDarkTheme = !isDarkTheme
        style.setProperty("--primary-color","white")
        style.setProperty("--selection-color","rgba(18, 46, 69,0.5)")
        style.setProperty("--secondary-color","gainsboro")
        style.setProperty("--text-dark-color","black")
        style.setProperty("--black-shadow","black")
        style.setProperty("--shadow-color-sm","rgba(100, 100, 100, 0.2)")
        style.setProperty("--shadow-color-lg","rgba(100, 100, 100, 0.4)")
        style.setProperty("--input-backgroud","white")
        style.setProperty("--searchbar-backgroud","gainsboro")
        style.setProperty("--input-border","rgba(100, 100, 100, 0.2)")
        style.setProperty("--input-border-filter","rgba(100, 100, 100, 0.2)")
        style.setProperty("--input-text","black")
        document.querySelector(".navbar input").style.setProperty("border","none")
    }else{
        isDarkTheme = !isDarkTheme
        style.setProperty("--primary-color","#0d1924")
        style.setProperty("--selection-color","rgba(200 , 200, 200,0.5)")
        style.setProperty("--secondary-color","#060c12")
        style.setProperty("--text-dark-color","white")
        style.setProperty("--black-shadow","#060c12")
        style.setProperty("--shadow-color-sm","#060c12")
        style.setProperty("--shadow-color-lg","black")
        style.setProperty("--input-backgroud","rgba(18, 46, 69,0.8)")
        style.setProperty("--searchbar-backgroud","rgba(18, 46, 69,0.8)")
        style.setProperty("--input-border","white")
        style.setProperty("--input-border-filter","#060c12")
        style.setProperty("--input-text","white")
        // document.querySelector(".navbar input").style.setProperty("border","2px solid var(--input-border)")
    }
    localStorage.setItem("isDarkTheme",isDarkTheme)
}
// changeThemeMod()