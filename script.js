const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearBtn=document.getElementById('clear');
const itemFilter= document.getElementById('filter');
// const items=itemList.querySelectorAll('li');
const formBtn = itemForm.querySelector('button');
let isEditMode=false;

function displayItems(){
    const itemsFromStorage=getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}


function onAddItemSubmit(e){
    e.preventDefault();

    const newItem=itemInput.value;
    //validate Input
    if(newItem ===''){
        alert('please add an item');
        return;
    }

    if(isEditMode){
        const itemToEdit= itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode=false;
    } else{
        if(checkIfItemExists(newItem)){
            alert('item already exits');
            return ;
        }
    }

    addItemToDOM(newItem);
    addItemToStorage(newItem);

    checkUI();
    itemInput.value=''; 

}

function addItemToDOM(item)
{   //create list item
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button =createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //Add li to the dom

    itemList.appendChild(li);
}



function createButton(classes){
    const button=document.createElement('button');
    button.className=classes;
    const icon=createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
function createIcon(classes){
    const icon=document.createElement('i');
    icon.className=classes;
    return icon;
}
function addItemToStorage(item){
    const itemsFromStorage=getItemsFromStorage();

    
    itemsFromStorage.push(item);

    localStorage.setItem('items',JSON.stringify(itemsFromStorage));

}

    function getItemsFromStorage(){
        let itemsFromStorage;

        if(localStorage.getItem('items')===null)
        {
            itemsFromStorage=[];
        }else{
            itemsFromStorage=JSON.parse(localStorage.getItem('items'));
        }
        return itemsFromStorage;
    }

    function onClickItem(e){
        if(e.target.parentElement.classList.contains('remove-item')){
            removeItem(e.target.parentElement.parentElement);
        }else{
            //console.log(1);
            setItemToEdit(e.target);
        }
    }

    function checkIfItemExists(item){
        const itemsFromStorage=getItemsFromStorage();
        //itemsFromStorage is an array.

        if(itemsFromStorage.includes(item)){
            return true;
        }else{
            return false;
        }
    }

    function setItemToEdit(item){
        isEditMode=true;

        itemList.querySelectorAll('li').forEach((i)=> i.classList.remove('edit-mode'));

        //item.style.color='#ccc';
        item.classList.add('edit-mode');
        formBtn.innerHTML='<i class="fa-solid fa-pen"></i>Update Item';
        formBtn.style.backgroundColor='#228B22'
        itemInput.value=item.textContent;
    }


//event deligation
function removeItem(item){
    //console.log(item);
    if(confirm('Are you sure?'))
    {   // Remove item from DOM
        item.remove();

        //Remove item from storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
    // if(e.target.parentElement.classList.contains('remove-item')){
    //     if(confirm('Are you sure?')){
    //     e.target.parentElement.parentElement.remove();
    //     checkUI();
    //     }
    // }

}
function removeItemFromStorage(item){
    let itemsFromStorage=getItemsFromStorage();

    //console.log(itemsFromStorage);
    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i)=> i != item);

    //Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems(){
    //itemList.innerHTML='';(one way)
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
        
    }
    //clear from localStorage
    localStorage.removeItem('items');

    checkUI();
}

function filterItems(e){
    const items=itemList.querySelectorAll('li');
    const text=e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName=item.firstChild.textContent.toLowerCase();

        //console.log(itemName);
        if(itemName.indexOf(text) != -1){
            //console.log(true);
            item.style.display ='flex';
        }else{
            //console.log(false);
            item.style.display='none';
        }
    });


}

function checkUI(){
    itemInput.value='';
    const items=itemList.querySelectorAll('li');
    if(items.length===0)
    {
        clearBtn.style.display = 'none';
        itemFilter.style.display= 'none';
    }
    else{
        clearBtn.style.display = 'block';
        itemFilter.style.display= 'block';
    }
    formBtn.innerHTML='<i class="fa-solid fa-plus"></i>Add Item';
    formBtn.style.backgroundColor='#333';

    isEditMode=false;
}


//Initialize app
function init(){
//Event Listners
itemForm.addEventListener('submit',onAddItemSubmit);
itemList.addEventListener('click',onClickItem);
clearBtn.addEventListener('click',clearItems);
itemFilter.addEventListener('input',filterItems);

document.addEventListener('DOMContentLoaded',displayItems);

checkUI();
}

init();
// localStorage.setItem('name','Brad');
// console.log(localStorage.getItem('name'));
// //localStorage.removeItem('name');
// localStorage.clear();



