let card = document.getElementById("card");
let solutioncard1 = document.getElementsByClassName("solutioncard")[0];
let solutioncard2 = document.getElementsByClassName("solutioncard")[1];

let user;
let problems = [];
let obj = {};
async function getSolution(event)
{
    event.preventDefault();
   let operation = document.getElementById("cat").value;
   let expression = document.getElementById("input").value;
   
    const encodedExpression = encodeURI(expression);
   let response = await fetch(`https://newton.now.sh/api/v2/${operation}/${encodedExpression}`);
   user = await response.json();
    
   solutioncard1.innerHTML = `${user.operation}: ${user.expression}`;

   solutioncard2.innerHTML = user.result;
   card.style.display = "block";
}

function storeData()
{
    alert("i am storing")
    obj.operation = user.operation,
    obj.expression = user.expression,
    obj.result = user.result
    problems.push(obj);
    localStorage.setItem("problems",JSON.stringify(problems));

}
function showData()
{
    let div = document.createElement("div");
    let object = JSON.parse(localStorage.getItem("problems"));
    div.innerHTML = `problems={
        operation: ${object.operation},
        expression: ${object.expression},
        result: ${object.result}
    }`
    card.innerHTML ="";
    card.appendChild(div);
}
function deleteData()
{
    alert("I am deleting")
    localStorage.removeItem("problems");
}
