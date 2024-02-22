
let index = 0
function removeToast ( toastClass ) {
    setTimeout( () => {
        document.querySelector( "." + toastClass ).remove()
    },500 );
}

export function showToast ( msg,isError = false ) {
    let toastContainer = document.querySelector( ".toast-container" )
    if ( toastContainer )
    {
        let toastClass = "toast" + index
        let errorClass = isError ? " error" : ""
        let progressClass = "progress" + index
        let newToast = '<div class="toast ' + toastClass + errorClass + '">' +
            '<div class="body">' +
            '<p class="msg">' + msg + '</p>' +
            '<button onclick="removeToast(\'' + toastClass + '\')">X</button>' +
            '</div>' +
            '<div class="footer">' +
            '<div class="progress ' + progressClass + '"></div>' +
            '</div>' +
            '</div>'
        toastContainer.innerHTML = newToast
        setTimeout( () => {
            console.log( toastContainer );
            document.querySelector( "." + toastClass ).style.width = "350px"
            document.querySelector( "." + toastClass ).style.visibility = "visible"
            document.querySelector( "." + progressClass ).style.width = "0"
        },100 );
        setTimeout( () => {
            removeToast( toastClass )
        },4000 );
    }
    index++
}
// For the likes and comments buttons

// For the error messages


// For the form submit buttons
document.addEventListener( "DOMContentLoaded",() => {


    document.addEventListener( "click",( event ) => {
        document.querySelectorAll( ".require-connexion" ).forEach( ( elem => {
            elem.addEventListener( "click",( ev ) => {
                showToast( "You are not connected" )
            } )
        } ) )
    } )
} )
