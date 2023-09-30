// let card = document.getElementById("card");
let solutioncard = document.getElementById("card");
let history = document.getElementById("historycard");

let user = {};
let obj = {};
// console.log(localStorage.getItem("problems"));
let problems = JSON.parse(localStorage.getItem("problems"))||[];
// console.log(typeof problems); object
async function getSolution(event)
{
    event.preventDefault();
    alert("ok");
    obj = {};
   let operation = document.getElementById("cat").value;
   let expression = document.getElementById("input").value;
   
    const encodedExpression = encodeURI(expression);
   let response = await fetch(`https://newton.now.sh/api/v2/${operation}/${encodedExpression}`);
   user = await response.json();
   solutioncard.style.display = "block";
   solutioncard.innerHTML = `${user.operation}: ${user.expression} \n
   result: ${user.result}`;

//    history.innerHTML = user.result;
   
   history.style.display = "none";
}

function storeData()
{
    obj.operation = user.operation;
    obj.expression = user.expression;
    obj.result = user.result;
    // console.log(typeof problems);
    // if(problems&&)
    // {
        
    //     ]
    // }
    // else
    // {     
        problems.push(obj);
    //     console.log(problems);
        localStorage.setItem("problems",JSON.stringify(problems));
    // }
    alert("Data is saved to localstorage");
    window.location.reload();
}
function showHistory(e)
{
    // let div = document.createElement("div");
    // if(e.target.value ==="undefined");
    let arr = JSON.parse(localStorage.getItem("problems"));
    arr.map((object,i)=>{
        if(i==0)
        {
            history.innerHTML= `
            <table id="styledTable">
            <thead>
              <tr>
               <th>Operation</th>
               <th>Expression</th>
               <th>Result</th>

              </tr>
            </thead>
             <tbody id="tbody">
               <tr>
                 <td>${object.operation}</td>
                 <td>${object.expression}</td>
                 <td>${object.result}</td>
               </tr>
             </tbody>
           </table>
            
            `
            // problems={
            //     operation: ${object.operation},
            //     expression: ${object.expression},
            //     result: ${object.result}
            // }
        }
        else
        {
            const tbody = document.getElementById("tbody");
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            td1.textContent = object.operation;
            td2.textContent = object.expression;
            td3.textContent = object.result;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr);
            history.innerHTML+=tbody;
            //  `,{
            // operation: ${object.operation},
            // expression: ${object.expression},
            // result: ${object.result} }`
        }
        
    })
    
    // history.appendChild(div);
    // history.innerHTML = div;
    history.style.display = "block";
    solutioncard.style.display = "none";
}
function deleteData()
{
    // alert("I am deleting")
    localStorage.removeItem("problems");
    window.location.reload();
}
function cutHistory()
{
    history.style.display = "none";
}