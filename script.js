const itemForm   = document.getElementById('item-form')
const itemInput  = document.getElementById('item-input')
const itemList   = document.getElementById('item-list')
const clearBtn   = document.getElementById('clear')
const filter_con = document.getElementById('filter-container')
const filter     = document.getElementById('filter')

function addItem(e) {
    e.preventDefault();

    // validate input
    if (itemInput.value === '') {
        alert('please add an item')
        return;
    }

    // creating the list-item 
    const newListItem = document.createElement('li');
    // container.id = 'item-list';
    // container.className = 'container'; 
    newListItem.innerHTML = `
        ${itemInput.value}
        <button class="remove-item btn-link text-red">
        <i class="fa-solid fa-xmark"></i>
        </button>
    `; 

    // adding the list-item into list 
    itemList.appendChild(newListItem); 


    // const list_item = createListItem(itemInput.value)
    // itemList.appendChild(list_item)

    updateFunctionalityVisibility()
    console.log('list item added successfully')
}

// or you can do the long way
function createListItem(item_name) {
    const newListItem = document.createElement('li');
    const item_name_node = document.createTextNode(item_name);
    newListItem.appendChild(item_name_node);

    const newButton = document.createElement('button');
    newButton.className = "remove-item btn-link text-red";

    const newIcon = document.createElement('i');
    newIcon.className = "fa-solid fa-xmark";

    newButton.appendChild(newIcon);
    newListItem.appendChild(newButton);
    return newListItem;
}

function removeItem(e) {
    // i have to remove the li
    // when i only click the icon in it
    console.log(e.target)
    // e.target can be anytihing in the ul
    const targetClicked = e.target
    
    // checking if the clicked element is the icon
    // or something else element like ul or li
    if (targetClicked.classList.contains('fa-xmark')) {
        // remove the ul
        const removeListItem = targetClicked.closest('li')
        if (removeListItem) {
            removeListItem.remove()
        }
    }
    if (itemList.firstChild) {
        updateFunctionalityVisibility()
    }
}

function clearAllItems(e) {
    // firstChild and parentNode can be used
    while (itemList.firstChild) {
        const firstchild = itemList.firstChild
        // proformance wise use anything to remove
        // there is no such difference
        // itemList.removeChild(firstchild);
        firstchild.remove() // using it cause consice
    }

    updateFunctionalityVisibility()
}

function updateFunctionalityVisibility() {
    // counts number of buttons
    // const list_items = itemList.getElementsByClassName(remove-item)
    const list_items = itemList.getElementsByTagName('li')

    if (list_items.length === 0) {
        // hide the items
        clearBtn.style.display = 'none'
        filter_con.style.display = 'none'
    }
    else {
        clearBtn.style.display = 'block'
        filter_con.style.display = 'block'
    }
}

function filterItems(){
    // filter
    // const filter_input = filter.value.toLowerCase
    const filter_input = filter.value.toLowerCase()
    const list_items = itemList.getElementsByTagName('li')

    // iterating over all the list items and checking 
    // if filter_input is their substring
    // then keep that list item, o/w remove it
    for (const item of list_items) {
        const text = item.textContent.toLowerCase()
        const visibility = text.includes(filter_input)
        item.style.display = visibility ? 'block' : 'none'
    }
}


// event lisners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click' , removeItem)
clearBtn.addEventListener('click' , clearAllItems)
filter.addEventListener('input', filterItems)

updateFunctionalityVisibility()
