let card = document.getElementById("card");
let solutioncard = document.getElementById("solutioncard");
async function getSolution(event)
{
    event.preventDefault();
    alert("I am here")
   let operation = document.getElementById("cat").value;
   let expression = document.getElementById("input").value;
   
    const encodedExpression = encodeURI(expression);
   let response = await fetch(`https://newton.now.sh/api/v2/${operation}/${encodedExpression}`);
   let user = await response.json();

   solutioncard.textContent = `operation: expression`;
   solutioncard.textContent = user.result;
   card.style.display = "block";
   console.log(user);
//    localStorage.setItem("problems",user);
}
