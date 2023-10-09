// let card = document.getElementById("card");
// localStorage.setItem("problems",[]);
let solutioncard = document.getElementById("card");
let history = document.getElementById("historycard");

let user = {};
let obj = {};
// let arr = [];
let problems = JSON.parse(localStorage.getItem("problems"))||[];

async function getSolution(event)
{
    event.preventDefault();
    obj = {};
   let operation = document.getElementById("cat").value;
   let expression = document.getElementById("input").value;
   
   const encodedExpression = encodeURI(expression);
   document.querySelector(".loading").style.display="block";
   let response = await fetch(`https://newton.now.sh/api/v2/${operation}/${encodedExpression}`);
   let u = await response.json();
   let s = {...u,id:randomId()};
   user = s;
   document.querySelector(".loading").style.display="none";
   solutioncard.style.display = "block";
   solutioncard.innerHTML = `${user.operation}: ${user.expression} \n
   result: ${user.result}`;

//    history.innerHTML = user.result;
   history.style.display = "none";
}
function storeData()
{
    if(Object.keys(user).length!=0)
    {
        obj.operation = user.operation;
        obj.expression = user.expression;
        obj.result = user.result;
        obj.id = user.id;
        
        problems.push(obj);
        console.log(problems);
        localStorage.setItem("problems",JSON.stringify(problems));
        
            

        alert("Data is saved to localstorage");
        window.location.reload();
    }
    
}
document.querySelector(".history").addEventListener("click",function(){
    let arr = JSON.parse(localStorage.getItem("problems"));
    showHistory(arr);
})
function showHistory(arr)
{
    
    console.log(arr);
    arr.map((object,i)=>{
        if(i==0)
        {
            console.log(object);
            history.innerHTML= `
            <table id="styledTable">
            <thead>
              <tr>
               <th>Operation</th>
               <th>Expression</th>
               <th>Result</th>
               <th>Delete</th>
              </tr>
            </thead>
             <tbody id="tbody">
               <tr>
                 <td>${object.operation}</td>
                 <td>${object.expression}</td>
                 <td>${object.result}</td>
                 <td><button id="delete" onclick= "deleteSingleData('${object.id}')"><i class="fa-solid fa-trash" style="color:red;"></i></button></td>
               </tr>
             </tbody>
           </table> `
        }
        else
        {
            const tbody = document.getElementById("tbody");
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");

            td1.textContent = object.operation;
            td2.textContent = object.expression;
            td3.textContent = object.result;
            td4.innerHTML = `<button id="delete" onclick="deleteSingleData('${object.id}')"><i class="fa-solid fa-trash" style="color:red;"></i></button>`

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tbody.appendChild(tr);
        }
        
    })
    
    history.style.display = "block";
    solutioncard.style.display = "none";
}
function deleteData()
{
    localStorage.removeItem("problems");
    window.location.reload();
}
function cutHistory()
{
    history.style.display = "none";
}

function randomId() 
{ 
    return Math.floor(Math. random()*2000)+"helloJs-g";
}

function deleteSingleData(id)
{
    let newArr = problems.filter((value)=>{
        return value.id!=id;
    });
    localStorage.setItem("problems",JSON.stringify(newArr));
    // showHistory(newArr);
    window.location.reload();
}