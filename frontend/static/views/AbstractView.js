

export default class {
  constructor( params ) {
    this.params = params
    this.CurrentPage = 1
    this.NumPost = 0
    this.Limit = 0
    this.id = ""
  }
  setTitle ( title ) {
    document.title = title
  }
  // Utilisez cette fonction à la place de votre fetchJson
  // Utilisation de la fonction fetchJson
  // Vous pouvez l'appeler comme suit :
  // const responseData = await fetchJson('/votre-endpoint', { em: 'valeur', pass: 'valeur' });

  getHtmlWithScroll ( homeDataJson ) {
  console.log(homeDataJson)
  }

 
  
}