import { navigateTo,router } from "./index.js";
const loginOrEmail = checkLoginOrEmail(localStorage.getItem('login'));
export let student = {
    id: 0,
    login: localStorage.getItem('login'),
    totalXP: 0,
    level: 0,
    transactions: [],
    progresses: [],
    doneProjects: [],
    totalUp:0,
    totalDown:0,
    xp_view:[]

}

export function checkLoginOrEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(input)) {
        return 'email';
    } else {
        return 'login';
    }
}
const token = getToken();
console.log(token)

const fetchGraphQL = async (query, variables) => {
    if(loginOrEmail===null){
        navigateTo( router( "/signin" ) )
        return
     }
    const response = await fetch('https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' ,
        Authorization: 'Bearer ' + token},
        body: JSON.stringify({ query, variables }),
    })

    return await response.json()
}


export const parseUserLevel = async () => {

    const obj = await fetchGraphQL(`
        query ($loginOrEmail: String!) {
            event_user(where: {
      
                user: { ${loginOrEmail === 'login' ? 'login' : 'email'}: { _eq: $loginOrEmail } },
                event: { object: { name: { _eq: "Div 01" } } }
            }) {
                level
            }
        }`,
        {
            loginOrEmail: localStorage.getItem('login'),
        }
    );


    if (obj.data.event_user && obj.data.event_user.length > 0) {
        student.level = obj.data.event_user[0].level;
        console.log(obj);
    } else {
        console.error('No data found for the given criteria.');
    }
}

export const parseUserXp = async () => {
    
    const obj = await fetchGraphQL(`
    query ($loginOrEmail: String!) {
        transaction_aggregate(where:{user:{${loginOrEmail === 'login' ? 'login' : 'email'}:{_eq: $loginOrEmail}}
        type: {_eq: "xp"}, event: {object: {type: {_eq: "module"}}}}
        ) {
          aggregate{
            sum{
              amount
            }
          }
        }    
    }`,
        {
            loginOrEmail: localStorage.getItem('login'),
        }
    );

console.log(obj.data.transaction_aggregate.aggregate.sum.amount);
        student.totalXP = Math.round(obj.data.transaction_aggregate.aggregate.sum.amount*0.001);
        console.log(obj);

};


export const parseUserInfo = async () => {
    if(localStorage.getItem('login')==null){
        navigateTo( router( "/signin" ) )
        return
     }
    const obj = await fetchGraphQL(`
        query ($loginOrEmail: String!) {
            user(where: { ${loginOrEmail === 'login' ? 'login' : 'email'}: { _eq: $loginOrEmail } }) {
                id
                login
                firstName
                lastName
                totalUp
                totalDown
            }
        }`,
        {
            loginOrEmail: localStorage.getItem('login'),
        }
    );
    let reloaded = false;

    if (!obj.data || !obj.data.user || obj.data.user.length === 0) {
        // Vérifiez si la page n'a pas encore été rechargée
        if (!reloaded) {
            // Rechargez la page
            window.location.reload();
            
            // Mettez à jour la variable de contrôle pour éviter un rechargement supplémentaire
            reloaded = true;
        }
    }
    student.id = obj.data.user[0].id;
    student.login = obj.data.user[0].login;
    student.firstName = obj.data.user[0].firstName;
    student.lastName = obj.data.user[0].lastName;
    student.totalDown=obj.data.user[0].totalDown
    student.totalUp=obj.data.user[0].totalUp

    console.log("student: ");
    console.log(student);
};

export const parseTransactions = async () => {
    student.transactions=[]

    let offset = 0;

    while (true) {
        const obj = await fetchGraphQL(`
            query get_transactions($loginOrEmail: String!) {
                transaction(
                    where: {
                        user:  { ${loginOrEmail === 'login' ? 'login' : 'email'}: { _eq: $loginOrEmail } }
                        type: { _eq: "xp" }
                        path:{_like: "%div-01%", _nlike:"%piscine-js%", _nilike:"%checkpoint%" }                    }
                ) {
                 
                    amount
                    path
                }
            }`,
            {
                loginOrEmail: localStorage.getItem('login'),
            }
        );
        student.xp_view=obj.data.transaction
console.log(student.xp_view)
        student.transactions.push(...obj.data.transaction);
        console.log(student.transactions)

        offset += 50;

        if (obj.data.transaction.length < 50) {
            offset = 0;
            break;
        }
    }

    student.transactions.sort((a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
    );
};
export function getToken() {
    return document.cookie
        .split(';')
        .find((c) => c.startsWith('token'))
        ?.split('=')[1];
}
export function updateDom(){

    document.getElementById('login').innerText = `${student.login}`
    document.getElementById('id').innerText = `${student.id}`
    document.getElementById('total-xp').innerText = `${student.totalXP.toLocaleString()}`
    document.getElementById('level').innerText = `${student.level}`
    document.getElementById('lastname').innerText = `${student.lastName}`
    document.getElementById('firstname').innerText = `${student.firstName}`
    document.getElementById('total-up').innerText = `${student.totalUp}`
    document.getElementById('total-down').innerText = `${student.totalDown}`

}