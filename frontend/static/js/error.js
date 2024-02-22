export default function showError(message){
  const error=document.querySelector(".error-connection")
  error.innerHTML=message
  error.style.display="block"
  
}