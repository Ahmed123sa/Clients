let input = document.querySelector('input');
let inputW=document.querySelector('.weight')
let insert = document.getElementById('ins');
let containDiv = document.querySelector('.details');

let RenewD='create'
let namesArray;
if(localStorage.data != null){
  namesArray = JSON.parse(localStorage.data) 
}else{
  namesArray= []
}



insert.onclick=(function(e){
  if(input.value == ""){
    e.target.preventDefault();
  }
 
  const data = {
    name: input.value,
    date: new Date().toLocaleString(), 
    weight: inputW.value
    
  }
  namesArray.push(data);
  localStorage.setItem('data',JSON.stringify(namesArray));
  
  clearData();
  addToPage();
  


})
addToPage();
//cleardata
function clearData(){
  input.value='';
}
//read
function addToPage(){
  let botDiv = '';
  for(let i=0; i<namesArray.length; i++){
    
    botDiv += `
        <div class="bot">
          <span></span><div class="name">${namesArray[i].name}
          <div class="date">${namesArray[i].date}</div>
          <div>${namesArray[i].weight}</div>
          </div>
           <button onclick="deletData(${i})" class="btn btn-danger" id="del">Delete</button>
           <button onclick="Renew(${i})" id="Ren" class="btn btn-primary">Renew</button>
        </div>
    `
  }
  containDiv.innerHTML=botDiv;
  
  
  for(let i=0; i<namesArray.length; i++){
    
    let theDate = new Date (namesArray[i].date);
    let newDate = new Date();
    if(theDate.getDate() <= newDate.getDate() && theDate.getMonth() < newDate.getMonth()){
      $('.name').css('background','red')
      $('.name').css('color','white')
    }
  }
}
//delet
function deletData(i){
  let del = JSON.stringify(namesArray.splice(i,1));
  
  namesArray.splice(i,0);
 localStorage.data= JSON.stringify(namesArray);
addToPage()
}
//////
//renew
function Renew(i){
  input.value=namesArray[i].name;
  RenewD= 'update';
  namesArray.splice(i,1);
  localStorage.data= JSON.stringify(namesArray);
  
}
///////////////
//search
let searchf= document.getElementById('search-in');
function searchNames(value)
{
  let botDiv="";
  if(searchf.hasAttribute('id','search-in')){
    for(let i=0; i< namesArray.length; i++){
      if(namesArray[i].name.includes(value)){
        botDiv += `
         <div class="bot">
        <div class="name">${namesArray[i].name}<div class="date">${namesArray[i].date} </div></div>
        
       
         <button onclick="deletData(${i})" class="btn btn-danger" id="del">Delete</button>
         <button onclick="Renew(${i})" id="Ren" class="btn btn-primary">Renew</button>
     </div>
    `
      }
    }
  } 
  containDiv.innerHTML=botDiv;
}
