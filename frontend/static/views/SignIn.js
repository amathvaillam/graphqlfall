import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor( params ) {
    super( params );
    this.setTitle( "Signin" );

    const logout=document.querySelector(".logout")
    logout.style.display="none"

  }


getHtml ( url,vr ) {
    return `

    <h1 id="welcome" class="welcome" >
      Welcome to <span class="zone01">Zone01</span> Dakar !
    </h1>
    <div class="auth"> 
      


    <div class="signin form-container"> 
 
     <div class="content form"> 
 
      <h2>Sign In</h2> 
 
      <div class="form login-form-container"> 

      <form class="form login-form" id="signinForm" data-form="signin">
 
       <div class="inputBox "> 
 
        <input type="text" required placeholder="Username or email" name="email" class="form-control" aria-describedby="emailHelp">  
 
       </div> 
 
       <div class="inputBox input-container"> 
 
        <input type="password" required placeholder="Password" name="password" class="form-control" id="exampleInputPassword1">
 
       </div> 
 
       <div class="error-connection"> <p>ERROR</p> 
 
       </div> 
 
       <div class="inputBox btn-container"> 
 
        <input type="submit" value="Login" class="btn submit-form auth-btn" id="loginButton"> 
 
       </div> 
       </form>
 
      </div> 
 
     </div> 
 
    </div> 
 
   </div>
 
    `;
  }
}
