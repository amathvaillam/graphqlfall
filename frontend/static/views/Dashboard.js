import AbstractView from "./AbstractView.js";



export default class extends AbstractView {
  constructor( params ) {
    super( params );
    this.setTitle( "Dashboard" );

    const logout=document.querySelector(".logout")
    logout.style.display="block"
  }



  getHtml ( homeDa,vr ) {

    
      return `
      <div id="content" class="col-12 container m-3 d-none" style="background-color: black;">
        <h1 id="welcome" class="welcome" >
          Welcome, 
          <span id="firstname"></span>
          <span id="lastname"></span> !
        </h1>
      </div>  


      <div class="user-infos">
        <div class="current-level">
          <h2 >CURRENT LEVEL</h2>
          <p id="level"></p>
        </div>

        <div class="amount-xp">
          <h2>AMOUT XP</h2>
          <p class="amout"> <span id="total-xp"></span> KB</p>

        </div>
        <div class="audi">
          <h2 >AUDITS RATIO</h2 >
          <h3 >DONE</h3>
          <p id="total-up"></p>
          <h3 >RECEIVED</h3>
          <p id="total-down"></p>

          <div class="ratio">
            <svg id="ratio" width="400" height="400" xmlns="http://www.w3.org/2000/svg"></svg>
          </div>
        
        </div>
        <div class="identification">
          <h2 >USER IDENTIFICATION</h2>
          <h3 >LOGIN</h3>
          <p id="login"></p>
          <h3>ID</h3>
            <p id="id"></p>
        </div>

        <div class="project-done">
          <h2 >PROJECT DONE</h2>
          <div class="xp">
            <svg id="xp" width="800" height="400" xmlns="http://www.w3.org/2000/svg"></svg>
          </div>
        </div>

      </div>  

      <div id="user-info">

      </div>
      <div class="xp">
      <svg id="xp" width="800" height="400" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
    <div class="ratio">
      <svg id="ratio" width="300" height="300" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
      `;
    
   
  }
}