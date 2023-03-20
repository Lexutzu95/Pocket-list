const itemsInput = document.querySelector(".input-items");
const addBtn = document.querySelector(".add-btn");
const itemsList = document.querySelector(".items-list");
const itemsFilter = document.querySelector(".filter-items");

document.addEventListener("DOMContentLoaded", getItems);
addBtn.addEventListener("click", addItem);
itemsList.addEventListener("click", removeCheck);
itemsFilter.addEventListener("click", filterListItems);

function addItem(event) {
  event.preventDefault();
  const listItemsDiv = document.createElement("div");
  listItemsDiv.classList.add("li-div");

  const listItem = document.createElement("li");
  listItem.innerText = itemsInput.value;
  listItem.classList.add("list-item");
  listItemsDiv.appendChild(listItem);

  saveToLocalStorage(itemsInput.value);

  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check-btn");
  checkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  listItemsDiv.appendChild(checkBtn);

  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  removeBtn.classList.add("remove-btn");
  listItemsDiv.appendChild(removeBtn);

  itemsList.appendChild(listItemsDiv);

  itemsInput.value = "";
}

function removeCheck(e) {
  const item = e.target;
  if (item.classList[0] === "remove-btn") {
    const listItemsDiv = item.parentElement;
    removeFromLocalStorage(listItemsDiv);
    listItemsDiv.remove();
  }
  if (item.classList[0] === "check-btn") {
    const listItemsDiv = item.parentElement;
    listItemsDiv.classList.toggle("completed");
  }
}

function filterListItems(e) {
  const filterItems = itemsList.childNodes;
  filterItems.forEach(function (filterItems) {
    switch (e.target.value) {
      case "all":
        filterItems.style.display = "flex";
        break;
      case "completed":
        if (filterItems.classList.contains("completed")) {
          filterItems.style.display = "flex";
        } else {
          filterItems.style.display = "none";
        }
        break;
      case "not-completed":
        if (!filterItems.classList.contains("completed")) {
          filterItems.style.display = "flex";
        } else {
          filterItems.style.display = "none";
        }
        break;
    }
  });
}

function saveToLocalStorage(listItemsDiv) {
  let storedItems;
  if (localStorage.getItem("storedItems") === null) {
    storedItems = [];
  } else {
    storedItems = JSON.parse(localStorage.getItem("storedItems"));
  }
  storedItems.push(listItemsDiv);
  localStorage.setItem("storedItems", JSON.stringify(storedItems));
}

function getItems() {
  let storedItems;
  if (localStorage.getItem("storedItems") === null) {
    storedItems = [];
  } else {
    storedItems = JSON.parse(localStorage.getItem("storedItems"));
  }
  storedItems.forEach(function (item) {
    const listItemsDiv = document.createElement("div");
    listItemsDiv.classList.add("li-div");

    const listItem = document.createElement("li");
    listItem.innerText = item;
    listItem.classList.add("list-item");
    listItemsDiv.appendChild(listItem);

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    checkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    listItemsDiv.appendChild(checkBtn);

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    removeBtn.classList.add("remove-btn");
    listItemsDiv.appendChild(removeBtn);

    itemsList.appendChild(listItemsDiv);
  });
}

function removeFromLocalStorage(listItemsDiv) {
  let storedItems;
  if (localStorage.getItem("storedItems") === null) {
    storedItems = [];
  } else {
    storedItems = JSON.parse(localStorage.getItem("storedItems"));
  }
  const itemIndex = listItemsDiv.children[0].innerText;
  storedItems.splice(storedItems.indexOf(itemIndex), 1);
  localStorage.setItem("storedItems", JSON.stringify(storedItems));
}
