// Appending all notes in localStorage in Todos :
let notes = localStorage.getItem('notes');
let notesArray;
if(notes==null || notes=='[]'){
    notesArray=new Array();
}
else{
    notesArray=JSON.parse(notes);
    // append all notes in todo-div:
    for(let i=0;i<notesArray.length;i++){
        let div = document.createElement('div');
        div.className='search';
        // id of the div will be its index no: ie i.
        let showhide='none';
        if(notesArray[i][3]==true){
            showhide='block';
        }
        div.innerHTML=`<div id="${i+1}">
                            <div style="margin-bottom:14px;font-size:1rem;font-weight:700"> Notes ${i+1}: <br> <span style="font-size:1.4rem;font-weight:900;text-shadow:1px 1px grey;">  ${notesArray[i][0]}... </span></div> 
                            <div style="font-size:1rem;font-family:Cursive;"> ${notesArray[i][1]} </div>
                            <div style="position:absolute;top:1rem;right:1rem;display:${showhide};cursor:pointer;" onclick="removeFromImp(event,${i})">  <i class="fa-solid fa-star"></i>  </div>
                            <div class="showButton" style="display:flex;flex-direction:row;justify-content:space-between;margin-top:18px;">
                                <button class="todo-btn1" onclick="editNote(event,${i})"> <i class="fa-solid fa-pen-to-square"></i> Edit </button>
                                <button class="todo-btn1" onclick="deleteNote(event)"> <i class="fa-sharp fa-solid fa-trash"></i> Delete </button>
                                <button class="todo-btn2" onclick="markImportant(event,${i})"> <i class="fa-solid fa-star"></i> Mark as important </button>
                                <button class="todo-btn2" onclick="markDone(event,${i})"> <i class="fa-solid fa-square-check"></i> Mark as done </button>
                            </div>
                        </div>`;
        div.setAttribute('style','display:flex;flex-direction:column;position:relative;background-color:white;height:auto;width:75vw;padding:1.2rem;color:black;border-radius:12.5px;margin-bottom:1rem');

        // getting date in readable format:
        console.log(notesArray[i][2].toString());

        // append this div in todos: but clear it before appending:
        let todosDiv = document.getElementById('todos-div');
        todosDiv.appendChild(div);   
    }

    // make display of para (no notes added) none:
    document.getElementById('no-add-note').style.display='none';
}




// Appending all important notes from localStorage in Importants:
updateImportantSection();

// Appending all completed notes in localStorage in completed section:
updateCompletedSection();



// Adding notes on clicking add button:
let btn = document.getElementById('add-notes-btn');
btn.addEventListener('click',function(){
    let notes = localStorage.getItem('notes');
    let notesArray;
    if(notes==null){   // if no notes are there in local storage!
        notesArray=new Array();
    }
    else{
        notesArray=JSON.parse(notes);   // converting string to array.
    }
    
    // getting input value from textarea:
    let inputTitle = document.getElementById('text-area-title').value;
    let inputContent = document.getElementById('text-area-content').value;
    console.log(inputTitle);
    console.log(inputContent);

    // Show error message to enter correct input or showing success msg:
    let divSuccesError = document.getElementById('success-error');
    if(inputTitle.length<=1 || inputContent.length<=1){
        divSuccesError.innerText="Failure :    Enter correct input";
        divSuccesError.setAttribute('style','background-color:lightpink;color:black;font-size:1.2rem;height:2.7rem;width:100%;position:fixed;top:0px;box-sizing:border-box;z-index:1;padding:10px 50px');
    }
    else{
        divSuccesError.innerText="Notes saved successfully";
        divSuccesError.setAttribute('style','background-color:black;color:white;font-family:cursive;font-size:1.2rem;height:2.7rem;width:100%;position:fixed;top:0px;box-sizing:border-box;z-index:1;padding:10px 50px');
    }

    // After 4 seconds, deleting the error/success message & show nav-bar:
    setTimeout(function(){
        divSuccesError.style.display='none';
    },4000);

    //if error, nothing to be inserted: 
    if(inputTitle.length<=1 || inputContent.length<=1){
        return;
    }

    // saving the date on which note added.
    let date = new Date();

    // clear textareas:
    document.getElementById('text-area-title').value="";
    document.getElementById('text-area-content').value="";

    // pushing this value into notesArr & updating in local storage.
    notesArray.push([inputTitle,inputContent,date]);
    
    localStorage.setItem('notes',JSON.stringify(notesArray));  // adding notesArray to localStorage.

    console.log(notesArray);

    // appending this div in todos div:
    let div = document.createElement('div');
    div.className='search';
    // id of the div will be its index no: ie notesArray length-1.
    div.innerHTML=`<div id="${notesArray.length}">
                            <div style="margin-bottom:14px;font-size:1rem;font-weight:700"> Notes ${notesArray.length}: <br> <span style="font-size:1.4rem;font-weight:900;text-shadow:1px 1px grey;">  ${inputTitle}... </span></div> 
                            <div style="font-size:1rem;font-family:Cursive;"> ${inputContent} </div>
                            <div style="position:absolute;top:1rem;right:1rem;display:none;cursor:pointer;" onclick="removeFromImp(event,${notesArray.length-1})">  <i class="fa-solid fa-star"></i>  </div>
                            <div class="showButton" style="display:flex;flex-direction:row;justify-content:space-between;margin-top:18px;">
                                <button class="todo-btn1" onclick="editNote(event,${notesArray.length-1})"> <i class="fa-solid fa-pen-to-square"></i> Edit </button>
                                <button class="todo-btn1" onclick="deleteNote(event)"> <i class="fa-sharp fa-solid fa-trash"></i> Delete </button>
                                <button class="todo-btn2" onclick="markImportant(event,${notesArray.length-1})"> <i class="fa-solid fa-star"></i> Mark as important </button>
                                <button class="todo-btn2" onclick="markDone(event,${notesArray.length-1})"> <i class="fa-solid fa-square-check"></i> Mark as done </button>
                            </div>
                        </div>`;
    div.setAttribute('style','display:flex;flex-direction:column;position:relative;background-color:white;height:auto;width:75vw;padding:1.2rem;color:black;border-radius:12.5px;margin-bottom:1rem');

    // append this div in todos: but clear it before appending:
    let todosDiv = document.getElementById('todos-div');
    todosDiv.appendChild(div);

    // make display of para (no notes added) none:
    document.getElementById('no-add-note').style.display='none';
})



// // Show Buttons on mouse over to edit,delete,mark as important or :
// function showBtns(event){
//     let divToShow = event.target.querySelector('.showButton');
//     // console.log(divToShow);
//     divToShow.style.display='flex';
// }
// // Hide Buttons on mouse leave :
// function hideBtns(event){
//     let divToHide = event.target.querySelector('.showButton');
//     // console.log(divToShow);
//     divToHide.style.display='none';
// }




// Edit Notes:
function editNote(event,idx){
    let noteToBeEdited =  event.target.parentElement.parentElement;
    console.log(noteToBeEdited);
    let div = document.createElement('div');
    div.className='search';
    div.setAttribute('style','height:60vh;width:70vw;position:fixed;top:15vh;left:8vw;background-image:url("https://wallpaperaccess.com/full/5668725.jpg");background-size:cover;background-repeat:no-repeat;z-index:2;opacity:1;border-radius:20px;box-shadow: 2px 2px 5px 6px #888888;');
    document.body.appendChild(div);

    let inputTitle=noteToBeEdited.querySelector('div').querySelector('span').innerText;
    let inputContent=noteToBeEdited.querySelectorAll('div')[1].innerText;
    console.log(inputTitle);
    console.log(inputContent);

    div.innerHTML=`<div id="editNotes">
                        <div>
                        <div class="heading"> Edit Notes.. </div>
                        <div style="position:absolute;top:2vh;right:2vw;font-size:1.7rem;cursor:pointer;"> <i onclick="closeEdit(event)" class="fa-solid fa-square-xmark"></i> </div>
                        <div> Title </div>
                        <div> <textarea id="text-area-title" rows="3" cols="80"> ${inputTitle} </textarea> </div>
                        <div> Content </div> 
                        <div> <textarea id="text-area-content" rows="10" cols="80"> ${inputContent} </textarea> </div>
                        <div> <button id="edit-notes-btn" style="cursor:pointer;" onclick="edit(event,${idx})"> Edit </button> </div>
                        </div>
                    </div>`;
}

// Cross Edit:
function closeEdit(event){
    let divToBeClosed = event.target.parentElement.parentElement.parentElement.parentElement;
    console.log(divToBeClosed);
    divToBeClosed.style.display='none';
}

// Update the note at index idx:
function edit(event,idx){
    console.log(idx);
    let div = event.target.parentElement.parentElement.parentElement;
    let inputTitle=div.querySelectorAll('textarea')[0].value;
    let inputContent=div.querySelectorAll('textarea')[1].value;
    console.log(inputTitle);
    console.log(inputContent);
    let notesArray = JSON.parse(localStorage.getItem('notes'));
    notesArray[idx][0]=inputTitle;
    notesArray[idx][1]=inputContent;

    localStorage.setItem('notes',JSON.stringify(notesArray));
 
    document.getElementById('todos-div').innerHTML=``;
    for(let i=0;i<notesArray.length;i++){
        let div = document.createElement('div');
        div.className='search';
        // id of the div will be its index no: ie i.
        let showhide='none';
        if(notesArray[i][3]==true){
            showhide='block';
        }
        div.innerHTML=`<div id="${i+1}">
                            <div style="margin-bottom:14px;font-size:1rem;font-weight:700"> Notes ${i+1}: <br> <span style="font-size:1.4rem;font-weight:900;text-shadow:1px 1px grey;">  ${notesArray[i][0]}... </span></div> 
                            <div style="font-size:1rem;font-family:Cursive;"> ${notesArray[i][1]} </div>
                            <div style="position:absolute;top:1rem;right:1rem;display:${showhide};cursor:pointer;" onclick="removeFromImp(event,${i})">  <i class="fa-solid fa-star"></i>  </div>
                            <div class="showButton" style="display:flex;flex-direction:row;justify-content:space-between;margin-top:14px">
                                <button class="todo-btn1" onclick="editNote(event,${i})"> <i class="fa-solid fa-pen-to-square"></i> Edit </button>
                                <button class="todo-btn1" onclick="deleteNote(event)"> <i class="fa-sharp fa-solid fa-trash"></i> Delete </button>
                                <button class="todo-btn2" onclick="markImportant(event,${i})"> <i class="fa-solid fa-star"></i> Mark as important </button>
                                <button class="todo-btn2" onclick="markDone(event,${i})"> <i class="fa-solid fa-square-check"></i> Mark as done </button>
                            </div>
                        </div>`;
        div.setAttribute('style','display:flex;flex-direction:column;position:relative;background-color:white;height:auto;width:75vw;padding:1.2rem;color:black;border-radius:12.5px;margin-bottom:1rem');

        // getting date in readable format:
        console.log(notesArray[i][2].toString());

        // append this div in todos: but clear it before appending:
        let todosDiv = document.getElementById('todos-div');
        todosDiv.appendChild(div);   
    }  

    // hide the div:
    closeEdit(event);
}






// Delete Notes:
function deleteNote(event){
    let noteToBeDel =  event.target.parentElement.parentElement;
    console.log(noteToBeDel);
    console.log(noteToBeDel.id);

    let id = noteToBeDel.id; // id/index of the note to be deleted

    let notes = localStorage.getItem('notes');
    let notesArray = JSON.parse(notes); // notes can't be null here

    // Using splice function of arry to delete value at an index:
    notesArray.splice(parseInt(id-1),1);  // remove 1 element from index id-1.

    // now update in local Storage:
    localStorage.setItem('notes',JSON.stringify(notesArray));

    let todosDiv = document.getElementById('todos-div');
    todosDiv.innerHTML=``;

    // if arrayLength becomes zero, add para(no note added) tag:
    if(notesArray.length==0){
        todosDiv.innerHTML=`<div id="no-add-note"> <p> Nothing to show!! <br> Use "Add a note" section to add notes  </p> </div>`;
    }

    // show updated items in todo-div:
    for(let i=0;i<notesArray.length;i++){
        let div = document.createElement('div');
        div.className='search';
        // id of the div will be its index no: ie i.
        let showhide='none';
        if(notesArray[i][3]==true){
            showhide='block';
        }
        div.innerHTML=`<div id="${i+1}">
                            <div style="margin-bottom:14px;font-size:1rem;font-weight:700"> Notes ${i+1}: <br> <span style="font-size:1.4rem;font-weight:900;text-shadow:1px 1px grey;">  ${notesArray[i][0]}... </span></div> 
                            <div style="font-size:1rem;font-family:Cursive;"> ${notesArray[i][1]} </div>
                            <div style="position:absolute;top:1rem;right:1rem;display:${showhide};cursor:pointer;" onclick="removeFromImp(event,${i})">  <i class="fa-solid fa-star"></i>  </div>
                            <div class="showButton" style="display:flex;flex-direction:row;justify-content:space-between;margin-top:14px">
                                <button class="todo-btn1" onclick="editNote(event,${i})"> <i class="fa-solid fa-pen-to-square"></i> Edit </button>
                                <button class="todo-btn1" onclick="deleteNote(event)"> <i class="fa-sharp fa-solid fa-trash"></i> Delete </button>
                                <button class="todo-btn2" onclick="markImportant(event,${i})"> <i class="fa-solid fa-star"></i> Mark as important </button>
                                <button class="todo-btn2" onclick="markDone(event,${i})"> <i class="fa-solid fa-square-check"></i> Mark as done </button>
                            </div>
                        </div>`;
        div.setAttribute('style','display:flex;flex-direction:column;position:relative;background-color:white;height:auto;width:75vw;padding:1.2rem;color:black;border-radius:12.5px;margin-bottom:1rem');

        // getting date in readable format:
        console.log(notesArray[i][2].toString());

        // append this div in todos: but clear it before appending:
        let todosDiv = document.getElementById('todos-div');
        todosDiv.appendChild(div);   
    }

    // show success msg : Notes deleted successfully.
    let divSuccesError = document.getElementById('success-error');
    
    divSuccesError.innerText="Notes deleted successfully !! ";
    divSuccesError.setAttribute('style','background-color:black;color:white;font-family:cursive;font-size:1.2rem;height:2.7rem;width:100%;position:fixed;top:0px;box-sizing:border-box;z-index:1;padding:10px 50px');

    // After 4 seconds, deleting the error/success message & show nav-bar:
    setTimeout(function(){
        divSuccesError.style.display='none';
    },4000);

    updateImportantSection();
}





// Mark as important function:
// notesArr[0]: title, [1]:content, [2]:date, [3]:imp, completed:done in localStorage.
function markImportant(event,idx){
    let div = event.target.parentElement.parentElement.parentElement;
    console.log(div);
    let notesArray = JSON.parse(localStorage.getItem('notes'));

    if(notesArray[idx][3]==true){ // already marked as important..
        let divSuccesError = document.getElementById('success-error');
    
        divSuccesError.innerHTML=`<div> Notes were already marked as important !!  <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i>  <i class="fa-solid fa-star"></i>  </div>`;
        divSuccesError.setAttribute('style','background-color:black;color:white;font-family:cursive;font-size:1.2rem;height:2.7rem;width:100%;position:fixed;top:0px;box-sizing:border-box;z-index:1;padding:10px 50px');

        // After 4 seconds, deleting the error/success message & show nav-bar:
        setTimeout(function(){
            divSuccesError.style.display='none';
        },4000);
        return;
    }

    notesArray[idx][3]=true;
    localStorage.setItem('notes',JSON.stringify(notesArray));

    updateImportantSection();

    // show success msg : Notes marked as important successfully.
    let divSuccesError = document.getElementById('success-error');
    
    divSuccesError.innerHTML=`<div> Notes marked as important !!  <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i>  <i class="fa-solid fa-star"></i>  </div>`;
    divSuccesError.setAttribute('style','background-color:black;color:white;font-family:cursive;font-size:1.2rem;height:2.7rem;width:100%;position:fixed;top:0px;box-sizing:border-box;z-index:1;padding:10px 50px');

    // After 4 seconds, deleting the error/success message & show nav-bar:
    setTimeout(function(){
        divSuccesError.style.display='none';
    },5000);

    // Show star on right side of div:
    div.innerHTML+=`<div style="position:absolute;top:1rem;right:1rem;cursor:pointer" onclick="removeFromImp(event,${idx})">  <i class="fa-solid fa-star"></i>  </div>`;
    console.log(div);
}

function removeFromImp(event,idx){
    let div = event.target.parentElement;
    console.log(div);
    
    let notesArray = JSON.parse(localStorage.getItem('notes'));
    notesArray[idx][3]=false;

    localStorage.setItem('notes',JSON.stringify(notesArray));

    // show success msg : Notes removed from important.
    let divSuccesError = document.getElementById('success-error');
    
    divSuccesError.innerHTML=`<div> Notes removed from important !!  </div>`;
    divSuccesError.setAttribute('style','background-color:black;color:white;font-family:cursive;font-size:1.2rem;height:2.7rem;width:100%;position:fixed;top:0px;box-sizing:border-box;z-index:1;padding:10px 50px');

    // After 4 seconds, deleting the error/success message & show nav-bar:
    setTimeout(function(){
        divSuccesError.style.display='none';
    },4000);

    // Hide star on right side of div:
    div.style.display='none';

    updateImportantSection();
}

function updateImportantSection(){
    let notesObj=localStorage.getItem('notes');
    let notesArray;
    if(notesObj==null || notesObj=='[]'){
        notesArray=new Array();
    }
    else{
        notesArray=JSON.parse(notesObj);
    }

    let impDiv = document.getElementById('imps-div');

    // show completed items in imp-div:
    impDiv.innerHTML=``;

    
    let flag=false;
    for(let i=0;i<notesArray.length;i++){
        if(notesArray[i][3]==true){
            flag=true;
            let div = document.createElement('div');
            div.className='search';
            // id of the div will be its index no: ie i.
            let showhide='block';
            div.innerHTML=`<div id="${i+1}">
                                <div style="margin-bottom:14px;font-size:1rem;font-weight:700"> Notes ${i+1}: <br> <span style="font-size:1.4rem;font-weight:900;text-shadow:1px 1px grey;">  ${notesArray[i][0]}... </span></div> 
                                <div style="font-size:1rem;font-family:Cursive;"> ${notesArray[i][1]} </div>
                                <div style="position:absolute;top:1rem;right:1rem;display:${showhide};cursor:pointer;">  <i class="fa-solid fa-star"></i>  </div>
                        </div>`;
            div.setAttribute('style','display:flex;flex-direction:column;position:relative;background-color:white;height:auto;width:75vw;padding:1.2rem;color:black;border-radius:12.5px;margin-bottom:1rem');

            // append this div in todos: but clear it before appending:
            let impDiv = document.getElementById('imps-div');
            impDiv.appendChild(div);   
        }   
    }

    if(flag==false){  
        impDiv.innerHTML=`<div id="no-imp-note"> <p> Nothing to show!! <br> "Mark note as important" to add notes here.  </p> </div>`;
    }
}




// mark as done:
// remove from notesArray & add it in doneArray...
function markDone(event,idx){
    let div=event.target.parentElement.parentElement;
    console.log(div);

    let notesArray = JSON.parse(localStorage.getItem('notes')); 

    // show success msg : Notes removed from important.
    let divSuccesError = document.getElementById('success-error');
    
    divSuccesError.innerHTML=`<div> Awesome, You completed your work!!  <i class="far fa-smile"></i> <i class="far fa-smile"></i>  </div>`;
    divSuccesError.setAttribute('style','background-color:black;color:white;font-family:cursive;font-size:1.2rem;height:2.7rem;width:100%;position:fixed;top:0px;box-sizing:border-box;z-index:1;padding:10px 50px');

    // After 4 seconds, deleting the error/success message & show nav-bar:
    setTimeout(function(){
        divSuccesError.style.display='none';
    },4000);

    let doneObj = localStorage.getItem('done');
    let doneArray;
    if(doneObj==null || doneObj=='[]'){
        doneArray=new Array();
    }
    else{
        doneArray=JSON.parse(doneObj);
    }

    doneArray.push([notesArray[idx][0],notesArray[idx][1],notesArray[idx][2],notesArray[idx][3]]);
    // update done in local storage:
    localStorage.setItem('done',JSON.stringify(doneArray));
    console.log(doneArray);

    // delete idx from notesArr:
    // Using splice function of arry to delete value at an index:
    notesArray.splice(idx,1);  // remove 1 element from index id-1.

    // now update in local Storage:
    localStorage.setItem('notes',JSON.stringify(notesArray));
    console.log(notesArray);

    updateCompletedSection();

    let todosDiv = document.getElementById('todos-div');
    todosDiv.innerHTML=``;

    // if arrayLength becomes zero, add para(no note added) tag:
    if(notesArray.length==0){
        todosDiv.innerHTML=`<div id="no-add-note"> <p> Nothing to show!! <br> Use "Add a note" section to add notes  </p> </div>`;
    }

    // show updated items in todo-div:
    for(let i=0;i<notesArray.length;i++){
        let div = document.createElement('div');
        div.className='search';
        // id of the div will be its index no: ie i.
        let showhide='none';
        if(notesArray[i][3]==true){
            showhide='block';
        }
        div.innerHTML=`<div id="${i+1}">
                            <div style="margin-bottom:14px;font-size:1rem;font-weight:700"> Notes ${i+1}: <br> <span style="font-size:1.4rem;font-weight:900;text-shadow:1px 1px grey;">  ${notesArray[i][0]}... </span></div> 
                            <div style="font-size:1rem;font-family:Cursive;"> ${notesArray[i][1]} </div>
                            <div style="position:absolute;top:1rem;right:1rem;display:${showhide};cursor:pointer;" onclick="removeFromImp(event,${i})">  <i class="fa-solid fa-star"></i>  </div>
                            <div class="showButton" style="display:flex;flex-direction:row;justify-content:space-between;margin-top:14px">
                                <button class="todo-btn1" onclick="editNote(event,${i})"> <i class="fa-solid fa-pen-to-square"></i> Edit </button>
                                <button class="todo-btn1" onclick="deleteNote(event)"> <i class="fa-sharp fa-solid fa-trash"></i> Delete </button>
                                <button class="todo-btn2" onclick="markImportant(event,${i})"> <i class="fa-solid fa-star"></i> Mark as important </button>
                                <button class="todo-btn2" onclick="markDone(event,${i})"> <i class="fa-solid fa-square-check"></i> Mark as done </button>
                            </div>
                        </div>`;
        div.setAttribute('style','display:flex;flex-direction:column;position:relative;background-color:white;height:auto;width:75vw;padding:1.2rem;color:black;border-radius:12.5px;margin-bottom:1rem');

        // append this div in todos: but clear it before appending:
        let todosDiv = document.getElementById('todos-div');
        todosDiv.appendChild(div);   
    }
}

// update Completed section:
function updateCompletedSection(){

    let doneObj=localStorage.getItem('done');
    let doneArray;
    if(doneObj==null || doneObj=='[]'){
        doneArray=new Array();
    }
    else{
        doneArray=JSON.parse(doneObj);
    }

    let compDiv = document.getElementById('comp-div');

    // show completed items in comp-div:
    document.getElementById('comp-div').innerHTML=``;

      // if arrayLength becomes zero, add para(no note added) tag:
    if(doneArray.length==0){
        compDiv.innerHTML=`<div id="no-comp-note"> <p> Nothing to show!! <br> "Mark note as important" to add notes here.  </p> </div>`;
    }
    for(let i=0;i<doneArray.length;i++){
        let div = document.createElement('div');
        div.className='search';
        // id of the div will be its index no: ie i.
        let showhide='none';
        if(doneArray[i][3]==true){
            showhide='block';
        }
        div.innerHTML=`<div id="${i+1}">
                            <div style="margin-bottom:14px;font-size:1rem;font-weight:700"> Notes ${i+1}: <br> <span style="font-size:1.4rem;font-weight:900;text-shadow:1px 1px grey;">  ${doneArray[i][0]}... </span></div> 
                            <div style="font-size:1rem;font-family:Cursive;"> ${doneArray[i][1]} </div>
                            <div style="position:absolute;top:1rem;right:1rem;display:${showhide};cursor:pointer;">  <i class="fa-solid fa-star"></i>  </div>
                            <div> <button class="comp-del-btn" onclick="deleteFromDone(event)"> <i class="fa-sharp fa-solid fa-trash"></i> Delete </button> </div>
                       </div>`;
        div.setAttribute('style','display:flex;flex-direction:column;position:relative;background-color:white;height:auto;width:75vw;padding:1.2rem;color:black;border-radius:12.5px;margin-bottom:1rem');

        // append this div in todos: but clear it before appending:
        let compDiv = document.getElementById('comp-div');
        compDiv.appendChild(div);   
    }

    updateImportantSection();
}

function deleteFromDone(event){
    let noteToBeDel =  event.target.parentElement.parentElement;
    let id = noteToBeDel.id;
    let doneObj = localStorage.getItem('done');
    let doneArray = JSON.parse(doneObj); // notes can't be null here

    // Using splice function of arry to delete value at an index:
    doneArray.splice(parseInt(id-1),1);  // remove 1 element from index id-1.

    // now update in local Storage:
    localStorage.setItem('done',JSON.stringify(doneArray));
    updateCompletedSection();

    // show success msg : Notes deleted successfully.
    let divSuccesError = document.getElementById('success-error');
    
    divSuccesError.innerText="Notes deleted successfully !! ";
    divSuccesError.setAttribute('style','background-color:black;color:white;font-family:cursive;font-size:1.2rem;height:2.7rem;width:100%;position:fixed;top:0px;box-sizing:border-box;z-index:1;padding:10px 50px');

    // After 4 seconds, deleting the error/success message & show nav-bar:
    setTimeout(function(){
        divSuccesError.style.display='none';
    },4000);
}











// Search :
let searchBtn = document.getElementById('search-div').querySelector('div');
searchBtn.addEventListener('click',function(){
    console.log('Search done: ');
    let searchInput = document.getElementById('search-input').value;
    console.log(searchInput);

    let divs = document.getElementsByClassName('search');
    
    for(let i=0;i<divs.length;i++){
        console.log(divs[i]);
        let inputTitle=divs[i].querySelector('span').innerText;
        console.log(inputTitle);
        let inputContent=divs[i].querySelectorAll('div')[2].innerText;
        console.log(inputContent);

        if(searchInput.length<=0){
            divs[i].style.boxShadow="0px 0px 2px 2px lightgrey";
        }
        else if(inputTitle.includes(searchInput)){
            divs[i].style.boxShadow="0px 0px 4px 4px grey";
        }
        else if(inputContent.includes(searchInput)){
            divs[i].style.boxShadow="0px 0px 4px 4px grey";
        }
    }

    document.getElementById('search-input').value='';
})