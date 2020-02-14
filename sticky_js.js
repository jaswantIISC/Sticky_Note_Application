function invokeSearchtext(){
   var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        alert(" enter pressed! ");
        searchtext(); 
      }
} 

function searchtext(){
  var parList  = document.getElementsByClassName("card-text");
  var inputList = document.getElementById("searchString").value.trim();
  //initializeTextString(globalString,parList); // Maintaining fresh copy of paragraph list  
  removeHighlightsClass();
  if(inputList.length==0){
    displayAll(parList);
 }
 else{
    initiateSearching(parList, inputList);
   } 
}


function initiateSearching(parList, inputList){    
  var filterInput = inputList.toLowerCase();
  for(var i=0; i<parList.length; i++){ 
    var resultHtml ="", start=0 ;       
    var str = parList[i].innerText;
    var filterStr =str.toLowerCase();
    var nextIndex= filterStr.indexOf(filterInput, 0);   
    while(nextIndex > -1){
      var lastIndex = nextIndex + filterInput.length;      
      var subStr = str.slice(nextIndex, lastIndex);       
      var htmlString =  '<span class="highlight" style="background-color:black; color:white">'+subStr+'</span>';         
      resultHtml += str.slice(start, nextIndex)+ htmlString;      
     // console.log("paragraph no. "+i+ " first Index : "+nextIndex +" LastIndex: "+lastIndex+ " str : "+inputList+ " subStr : "+subStr);
      start = lastIndex;// Updating the variable start
      nextIndex = filterStr.indexOf(filterInput, lastIndex);// Updating the variable nextIndex
      if(nextIndex <= -1 ){
          resultHtml += str.slice(lastIndex) ; 
          parList[i].innerHTML = resultHtml;   
          parList[i].closest('.card').style.display="";  
      }
    }
    if(filterStr.indexOf(filterInput,0) <=-1){
       //console.log(" input string "+filterInput+" Not available in this card .Now find the child of this card to find the matching string if any ");
       var TargetCard = parList[i].closest('.card');
       if(!isStringMatchedToAnyChildCard(TargetCard, filterInput)){
           parList[i].closest('.card').style.display="none";  
       }
      }
   } 
}

function isStringMatchedToAnyChildCard(card, filterInput){
  var isfound= false;
  var cardList = card.querySelectorAll('.card');  
  //console.log(" cardlist length :: "+ cardList.length);
  for(var i=0; i< cardList.length; i++){
    var paragraphs = cardList[i].querySelectorAll('.card-text');
    for(var j=0; j< paragraphs.length; j++){ 
     var sentence= paragraphs[j].innerText
     // console.log(" paragraph sentence at position :: "+ i+" "+sentence);
      if(sentence!=undefined || sentence!=null || sentence!=""){
          var filterStr = sentence.toLowerCase();
      //   console.log(" filterStr sentence :: "+ filterStr);
      }     
      if(filterStr.indexOf(filterInput,0) > -1){
        //  console.log("************ " +filterInput +" found in child card ***** ");
        isfound = true;
        break;
       }
    }
  }
  return isfound;
}

function displayAll(parList){
 console.log("input empty 1");
 for(var i=0; i<parList.length; i++){
    parList[i].closest('.card').style.display="";
     //parList[i].style.display="";
     parList[i].closest('.card').style.color="";
     parList[i].style.color="";
     
 }
}

function removeHighlightsClass(){
  var spanList = document.getElementsByClassName("highlight");   
  for(var i=0; i<spanList.length ; i++){    
  console.log("Removing  highlight !");   
      spanList[i].style.backgroundColor="";
      spanList[i].style.color="";
   } 
}

function editNote(event){
  console.log("inside editNote...");
  var parent =event.target.closest('.card');
  var p =parent.getElementsByClassName('card-text')[0];
  p.style.backgroundColor = "white";
}

function saveNote(event){
  console.log("inside saveNote...");
  var parent =event.target.closest('.card');
  var p =parent.getElementsByClassName('card-text')[0];
  p.style.backgroundColor = "";
}

 function setColor(){
  var value = document.getElementsByClassName('myColor')[0].value;
  event.target.closest('.card').classList.remove("bg-olive");
  event.target.closest('.card').style.backgroundColor = "";
  event.target.closest('.card').style.backgroundColor = value;
 }

/*function deleteNote(event){
	var targetCard = event.target.closest('.card')//.remove();
  var cardContainer = event.target.closest('.card-container');
  var cardList = JSON.parse(localStorage.getItem('cardList'));
  for(var i in cardList){
    console.log(" about to remove data and targetcard id:  "+ targetCard.id+" and cardList[i].id: "+ cardList[i].id);
    if(targetCard.id == cardList[i].id){
      console.log(" about to remove data ")
       cardList[i]="";// cardList.remove(i);
        break; 
    }

  }
   localStorage.setItem("cardList",JSON.stringify(cardList));
	targetCard.remove();
	var divs = cardContainer.querySelectorAll('.card');	
	if(divs==null|| divs.length < 1){
    cardContainer.remove();
	}
}*/
function deleteNote(event){
  var targetCard = event.target.closest('.card')//.remove();
  var cardContainer = event.target.closest('.card-container');
  targetCard.remove();
  var divs = cardContainer.querySelectorAll('.card'); 
  if(divs==null|| divs.length < 1){
    cardContainer.remove();
  }
}

// new update
function createCardContainer(textContent){
  var cardList = document.getElementById('card-area');
  var cardContainer  = document.createElement("div");
  cardContainer.setAttribute('class','card-container bg-olive');
  cardContainer.setAttribute('id','');
  var card = getCard(textContent);
 // console.log('mainContent :: '+ textContent);
  cardContainer.appendChild(card);
  cardList.prepend(cardContainer);
  return cardContainer;
}


function createNewNote(){
  var noteText = prompt("Please enter text:", "");
  if (noteText == null || noteText == "") {
    alert(" Please enter text to create note !")
  } else {
      var newCard = getCard(noteText);
      var carBody = event.target.closest('.card-body');
      carBody.appendChild(newCard);
      storeChildCard(newCard,noteText)
  }
 }

// new update
function createStickyNote(){
  var mainContent = document.getElementById('main-content').value;
  if(mainContent==null|| mainContent==""){
    alert("Please enter text note to proceed !")
  }else{
    var cardContainer= createCardContainer(mainContent);
    document.getElementById('main-content').value="";
    storeParentCard(cardContainer.getElementsByClassName('card')[0],mainContent); 

  }
}

function invokeCreateStickyNote(event){
   var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        createStickyNote(); 
      }
 }

function getCard(noteText){
  var cardWrapper = document.createElement('div');
    var htmlString = '<div class="card bg-olive">\
    <div class="card-body">\
      <p contenteditable="true" data-placeholder="Insert text here..." class="card-text">'+noteText+'</p>\
      <a href="javascript:void(0);" class="btn btn-sm btn-success" onclick="deleteNote(event)">Delete</a>\
      <a href="javascript:void(0);" class="btn btn-sm  btn-success" onclick="editNote(event)">Edit</a>\
      <a href="javascript:void(0);" class="btn btn-sm  btn-success" onclick="saveNote(event)">Save</a>\
       <a href="javascript:void(0);" class="btn btn-sm  btn-success" onclick="createNewNote(event)">New Notes</a>\
      </div>\
   </div>';
   var cardWrapper = new DOMParser().parseFromString(htmlString, "text/html");
   var card = cardWrapper.getElementsByClassName('card')[0]; // var card = cardWrapper.firstChild;
  return card;
}

function resetAndDisplayAll(){
  var inputList=document.getElementById('searchString').value;
  inputList="";
  var parList  = document.getElementsByClassName("card-text");
 // initializeTextString(globalString,parList);
  removeHighlightsClass();
  if(inputList==""){
    displayAll(parList);
 }
  document.getElementById('searchString').value="";
}


//**************funcitons related to storing and laoding sticky notes data to local storage**********************
//****************************************************************************************************************
function storeParentCard(card,textContent){
  var cardList=[], cardObject;
  if(localStorage.getItem("cardList")!=null){
    cardList = JSON.parse(localStorage.getItem("cardList"));
    cardObject ={"id":cardList.length,"childId":"", "parentId":"","content":textContent};
  card.setAttribute("id",cardList.length);// card.id= cardList.length;//  
  }else{
   cardObject ={"id":0,"childId":"", "parentId":"","content":textContent};
  card.setAttribute("id","0");// card.id= "0";// card.setAttribute("id","0");
  }
  cardList.push(cardObject);
  localStorage.setItem("cardList",JSON.stringify(cardList));
 // console.log(localStorage.getItem("cardList"));
 }


// new update
 function storeChildCard(card,textContent){
  console.log("inside storeChildCard");
  var cardList = JSON.parse(localStorage.getItem("cardList"));
  var parent = card.closest('.card-body').closest('.card');
  //searchTargetCard(parent, textContent, cardlist);
  card.setAttribute('id',cardList.length);
  console.log(" parentId parent.id: "+ parent.id);
    console.log(" parentId parent.id: "+ parent.getAttribute('id'));
  cardObject ={"id":cardList.length,"childId":"", "parentId":parent.id,"content":textContent};
  cardList.push(cardObject);
  localStorage.setItem("cardList",JSON.stringify(cardList));
  console.log("JSON.stringify(cardList): "+ localStorage.getItem("cardList"));
 }


// new update
function loadCardFromLocalStorage(){
  var cardList =JSON.parse(localStorage.getItem("cardList"));
  console.log(" cardlist is loading.."+ JSON.stringify(cardList));
  if(cardList!=null && cardList!=""){
    console.log('cardList is not empty');
        loadCards(cardList);
      }
}


// new update
function loadCards(cardList){
  for(var i=0 ;i<cardList.length; i++){
    if(cardList[i].parentId ==""){
      var cardContainer= createCardContainer(cardList[i].content);// creating first card for sticky note under card container.
      var targetCard = cardContainer.getElementsByClassName('card')[0]; 
      targetCard.setAttribute("id",cardList[i].id);
    }else{
      var card = getCard(cardList[i].content);
      card.setAttribute('id',cardList[i].id);
      console.log(" card details : "+ JSON.stringify(cardList[i]));
      var parent =document.getElementById(cardList[i].parentId);
      parent.getElementsByClassName('card-body')[0].appendChild(card);
    }    
  }
}
