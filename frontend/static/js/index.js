import Dashboard from "../views/Dashboard.js";

import SignIn from "../views/SignIn.js";
import ErrorView from "../views/ErrorView.js";
import { renderer } from "./renderer.js";
import { getSignin,getSignout,getHome} from "./api.js";
import { signin } from "./api.js";
import { showToast } from "./toast.js";
import { SetError } from "./utils.js";
import { getToken} from "./query.js";
const pathToRegex = path => new RegExp( "^" + path.replace( /\//g,"\\/" ).replace( /:\w+/g,"(.+)" ) + "$" )


const routes = [
    { path: "/error",view: ErrorView,endpoint: null,api: null,get: false,scroll: false,params: 0 },
    { path: "/",view: Dashboard,endpoint: `/api/home`,api: getHome,get: true,scroll:false,params: 0 },
    { path: "/home",view: Dashboard,endpoint: `/api/home`,api: getHome,get: true,scroll: false,params: 0 },
    { path: "/signin",view: SignIn,endpoint: `/api/signin`,api: getSignin,get: false,scroll: false,params: 0 },
    { path: "/signout",view: SignIn,endpoint: `/api/signout`,api: getSignout,get: true,scroll: false,params: 0 },
];

const post_routes = [
    { path: "signin",endpoint: "/api/signin",api: signin,check: true,scroll: false },
]

export const navigateTo = async ( match ) => {
    history.pushState( null,null,match.pathname )
    await renderer( match )


}

export const router = ( path ) => {
    let searcher = path === undefined ?
        location.pathname : ( path.includes( ":" ) ?
            new URL( path ).pathname : path )
console.log(searcher)
    const potentielMatches = routes.map( route => {
        return {
            route,
            result: searcher.match( pathToRegex( route.path ) ),
            pathname: searcher
        };
    } );
console.log(potentielMatches);
    let match = potentielMatches.find( potentielMatch => potentielMatch.result !== null )
console.log(match)
    if ( !match )
    {
        SetError( "404","Page Not Found" )
        match = {
            route: routes[ 0 ],
            result: [ location.pathname ],
            pathname: location.pathname,
        }
    } else if ( match.route.get && getToken() == null )
    {
        match = {
            route: routes[1] ,
            result: [ location.pathname ],
            pathname: location.pathname,
        }
    }
    console.log(match)
    return match
};

window.addEventListener( "popstate",() => {
    let route = router()
    renderer( route )
} )

document.addEventListener( "DOMContentLoaded",() => {
   
    document.body.addEventListener( "click",async e => {
        let data_link = e.target.closest( "[data-link]" )
        if ( data_link )
        {

            await getFunction( data_link,e );
            return
        }

        let form = e.target.closest( "form" )
    

        if ( form && e.target.matches( ".submit-form" ) )
        {
            await postFunction( e,form )
            return
        }

       


    } )
    renderer( router() )
} );

async function getFunction ( data_link,e ) {
    if ( data_link.matches( "[data-link]" ) )
    {
        e.preventDefault();
        navigateTo( router( data_link.href ) );
    }
}

async function postFunction ( e,form ) {
    e.preventDefault()
    let formData = {}
    const dataFormValue = form.getAttribute( 'data-form' );
    let match = post_routes.find( route => route.path === dataFormValue )
    if ( match )
    {

        form.querySelectorAll( 'input, textarea, select' ).forEach( field => {
            // Ajoutez chaque champ au FormData
            if ( field.name )
                formData[ field.name ] = field.value;
        } );

        let data = await match.api( match.endpoint,formData,form )
console.log("----------->",data);
        if ( data.Code )
        {
            if ( data.Code == 500 || data.Code == 404 )
            {
                SetError( data.Code,data.Message,data.Message )
                navigateTo( router( "/error" ) )
                return
            } else if ( data.Code !== 200 )
            {
                showToast( `${ data.Message }`,true )
                return
            }
        }
        if ( data.url )
        { 
            navigateTo( router( data.url ) )
            
            return
        }
    } else
    {
        showToast( "fields cannot be empty" )
    }

}


