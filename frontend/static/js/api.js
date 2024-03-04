import { SetError } from "./utils.js";
import { navigateTo,router } from "./index.js";
import { checkLoginOrEmail, student } from "./query.js";
import showError from "./error.js";
const API_BASE_URL = 'https://graphql-production-abc0.up.railway.app'


// Fonction générique pour effectuer des requêtes GET

function handleErr ( error ) {
    // Gérer les erreurs ou propager l'erreur
    showError( error.message )
    throw error;
}

async function get ( endpoint ) {
    try
    {
        const response = await fetch( `${ API_BASE_URL }${ endpoint }` );

        // Vérifier si la réponse indique une erreur (statut HTTP non dans la plage 200-299)
        const data = await response.json();

        if ( data.Code == "500" || data.Code == "404" )
        {
            SetError( data.Code,data.ErrorMessage,data.Message )
            navigateTo( router( "/error" ) )
            return
        } else if ( data.Code )
        {
            showError( data.ErrorMessage )
        }
        if ( data.ErrorMessage )
        {
            throw new Error( `${ data.ErrorMessage }` );
        }
        return data;
    } catch ( error )
    {
        if ( error.Code )
            console.log( Code,ErrorMessage,Message )
        // Afficher un message d'erreur dans un popup

        // Bloquer la navigation (vous pouvez choisir de ne pas bloquer la navigation en retirant cette ligne)
        throw error;
    }
}

// Fonction générique pour effectuer des requêtes POST
async function post ( endpoint,body ) {
    try
    {
        const response = await fetch( `${ API_BASE_URL }${ endpoint }`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( body ),
        } );

        // Vérifier si la réponse indique une erreur (statut HTTP non dans la plage 200-299)


        const data = await response.json();
        if ( data.Code == "500" || data.Code == "404" )
        {
            SetError( data.Code,data.Message,data.Message )
            navigateTo( router( "/error" ) )
            return
        } else if ( data.Code )
        {
            showError( data.ErrorMessage )
        }
        if ( data.ErrorMessage )
        {
            throw new Error( `${ data.ErrorMessage }` );
        }
        return data;
    } catch ( error )
    {
        console.log( error.code )
        // Afficher un message d'erreur dans un popup

        // Bloquer la navigation (vous pouvez choisir de ne pas bloquer la navigation en retirant cette ligne)
        throw error;
    }
}




export async function getHomeWithScroll ( endpoint,param ) {
    try
    {
        console.log( param )
        let response = await get( `${ endpoint }/${ !param.id ? "" : + param.id + "/" }${ param.page || "1" }` );
        let path = location.pathname == "" ? "/home" : location.pathname

        history.pushState( null,null,`/${ path.split( "/" )[ 1 ] }${ !param.id ? "" : "/" + param.id }` )

        return response
    } catch ( error )
    {
        handleErr( error )
    }
}

async function getHome ( endpoint,param ) {
    try
    {
        let response = await get( `${ endpoint }${ param.id == null ? "" : "/" + param.id }` );

        return response
    } catch ( error )
    {
        handleErr( error )
    }
}
async function getSignin ( endpoint,param ) {
    try
    {   
        let response = await get( `${ endpoint }${ param.id == null ? "" : "/" + param.id }` );
        return response
    } catch ( error )
    {
        handleErr( error )
    }
}
async function getSignout ( endpoint,param ) {
    try
    {
    localStorage.clear()
    student.totalXP=0
    student.level=0

    console.log(document.cookie)
        let response = await get( `${ endpoint }${ param.id == null ? "" : "/" + param.id }` );

        return response
    } catch ( error )
    {
        handleErr( error )
    }
    
}
async function getUserDetail ( endpoint,param ) {
    try
    {
        let response = await get( `${ endpoint }/${ param.id }/1` );
        return response

    } catch ( error )
    {
        handleErr( error )
    }
}

async function addPost ( endpoint,body,form ) {
    try
    {
        const formData = new FormData( form );
        console.log( endpoint )
        const response = await fetch( `${ API_BASE_URL }${ endpoint }`,{
            method: 'POST',
            body: formData,
        } )
        console.log( response )
        // Vérifier si la réponse indique une erreur (statut HTTP non dans la plage 200-299)


        const data = await response.json();
        if ( data.Code == "500" || data.Code == "404" )
        {
            SetError( data.Code,data.Message,data.Message )
            navigateTo( router( "/error" ) )
            return
        } else if ( data.Code )
        {
            showError( data.ErrorMessage )
            return
        }
        console.log( data )
        if ( data.ErrorMessage )
        {
            throw new Error( `${ data.ErrorMessage }` );
        }

        if ( !data.url )
            data.url = location.pathname
        return data;
    } catch ( error )
    {
        handleErr( error )
    }
}

let getPosts = getHome

let getSignup = getHome
let getPostDetail = getHome
let getFilterCat = getHomeWithScroll

let getFormData = ( e ) => {
    const formData = {}
    let submit_form = e.target.closest( "form" )
    if ( submit_form )
        submit_form.querySelectorAll( 'input, textarea, select' ).forEach( field => {
            // Ajoutez chaque champ au FormData
            formData[ field.name ] = field.value;
        } );
    return formData
}

let signout = async ( endpoint,data ) => {
    try
    {             let response = await post( endpoint,data )
        document.cookie = '';
        return response
    } catch ( error )
    {
        handleErr( error )
    }
}
let signin = async ( endpoint,data ) => {
    try
    {         
        console.log(document.cookie)
    
        let response = await post( endpoint,data )
        if ( response.url ){              

            const res = await fetch('https://learn.zone01dakar.sn/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + window.btoa(response.data.email + ':' + response.data.password),
                },
            });
        
            if (!res.ok) {
                const err = await res.json();
                showError("User does not exist or password incorrect")
                return;
            }
            const data = await res.json();
            
            document.cookie = `token=${data};`;  
            localStorage.setItem('login', response.data.email);
            const logout=document.querySelector(".logout")
            logout.style.display="block"
        }
        return response
    } catch ( error )
    {
        handleErr( error )
    }
}

let signup = addPost

// Exportez les fonctions que vous souhaitez utiliser ailleurs dans votre application
export {
    getHome,
    getPosts,
    getSignin,
    getSignup,
    getSignout,
    getPostDetail,
    getUserDetail,
    getFilterCat,

    signin,signout,addPost,signup
};
