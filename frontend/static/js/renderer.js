import { navigateTo,router } from "./index.js";
import { init } from "./profil.js";
import { getToken } from "./query.js";
export const renderer = async ( match ) => {
    try
    {

        let params = ""

        let data = ""
console.log(match)
        if ( match.route.get )
        {
            data = await match.route.api( match.route.endpoint,params )
            if(document.cookie=="token=" || getToken()==undefined){
                navigateTo( router( "/signin" ) )
                return
            }
            if ( data && data.url )
            {
                navigateTo( router( data.url ) )
                return
            }
           

        }


        let view = new match.route.view( params )
        let div = document.querySelector( "#app" )
          div.innerHTML = view.getHtml ( data,true )
          if(getToken()!=undefined || data.url=="/signout" ){
               init()
          }



    } catch ( error )
    {

        console.error( 'Error fetching JSON:',error );
        // Handle the error appropriately
        return '<p>Error fetching JSON</p>';
    }

  


}

