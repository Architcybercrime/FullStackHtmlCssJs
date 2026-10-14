const items = [];

function createItem(name, rating) {
    const item = {
        id: Date.now(),
        name,
        rating
    };

    items.push(item);
    return item;
}

function readItems() {
    return items;
}

function updateItem(id, name, rating) {
    const item = items.find(entry => entry.id === id);

    if (!item) {
        return null;
    }

    item.name = name;
    item.rating = rating;
    return item;
}

function deleteItem(id) {
    const index = items.findIndex(entry => entry.id === id);

    if (index === -1) {
        return null;
    }

    return items.splice(index, 1)[0];
}

function myFun() {
    const name = document.getElementById("v1").value;
    const rating = document.getElementById("v2").value;

    createItem(name, rating);
    console.log(readItems());
}