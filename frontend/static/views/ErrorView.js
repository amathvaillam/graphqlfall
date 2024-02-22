import AbstractView from "./AbstractView.js";
import { navigateTo, router } from "../js/index.js";
export default class extends AbstractView {
  constructor( params ) {
    super( params );
    this.setTitle( "Signin" );

    const logout=document.querySelector(".logout")
    logout.style.display="none"
  }


  getHtml ( url ) {
  
    let error = JSON.parse( localStorage.getItem( "user_error" ) )
    console.log(error)
    if ( !error ){
      navigateTo( router( "/home" ) )
      return
    }

    const containerElement = document.body.querySelector(".container");

if (containerElement) {
    containerElement.innerHTML = "";
    }
    console.log(error)
    return `
    <div class="container-error">
    <h1 >${error.code}</h1>
    <p >Opps!</span> ${error.errorMessage}</p>
    <p >
        ${error.Message ? error.Message : "The page you're looking for doesn't exist." }
    </p>
    <div>
        <a class="btn" href="/" data-link >Go Home</a>
    </div>
</div>
<div class="footer">
    
</div>
    `;
  }
}
