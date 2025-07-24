const API_BASE_URL = "http://localhost:3001";
let allCategories = []; 

async function fetchCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    allCategories = await response.json(); 
    renderCategories(allCategories);
}

function renderCategories(categories) {
    const categoriesSection = document.getElementById("categories");
    categoriesSection.innerHTML = "<h2>Catégories</h2>";

    categories.forEach(category => {
        const categoryElement = document.createElement("div");
        categoryElement.style.display = "flex";
        categoryElement.style.alignItems = "center";
        categoryElement.style.gap = "10px";

        const categoryNameButton = document.createElement("button");
        categoryNameButton.textContent = category.name;
        
        categoryNameButton.onclick = () => renderNotes(category);

        const editButton = document.createElement("button");
        editButton.textContent = "✏️";
        editButton.onclick = () => editCategory(category._id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";
        deleteButton.onclick = () => deleteCategory(category._id);

        categoryElement.appendChild(categoryNameButton);
        categoryElement.appendChild(editButton);
        categoryElement.appendChild(deleteButton);

        categoriesSection.appendChild(categoryElement);
    });
}

async function editCategory(categoryId) {
    const newName = prompt("Nom de la catégorie modifié :");

    if (newName) {
        await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
        });
        fetchCategories(); 
    }
}

async function deleteCategory(categoryId) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");

    if (confirmation) {
        await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
            method: 'DELETE'
        });
        fetchCategories(); 
    }
}

async function renderNotes(categoryToRender) {
    const cheatSheetSection = document.getElementById("cheat-sheet");

    const currentCategory = allCategories.find(cat => cat._id === categoryToRender._id);

    if (!currentCategory) {
        cheatSheetSection.innerHTML = `<h2>Catégorie introuvable</h2><p>La catégorie sélectionnée n'a pas pu être chargée.</p>`;
        return;
    }

    cheatSheetSection.innerHTML = `<h2>${currentCategory.name}</h2>`;

    currentCategory.items.forEach((note, index) => {
        const noteElement = document.createElement("div");
        noteElement.style.display = "flex";
        noteElement.style.alignItems = "center";
        noteElement.style.gap = "10px";

        const noteText = document.createElement("p");
        noteText.textContent = `${index + 1}. ${note}`;

        const editButton = document.createElement("button");
        editButton.textContent = "✏️";
        editButton.onclick = async () => {
            const response = await editNote(currentCategory._id, index);
            if (response && response.ok) { 
                await fetchCategories(); 
                renderNotes(currentCategory); 
            }
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";
        deleteButton.onclick = async () => {
            const response = await deleteNote(currentCategory._id, index);
            if (response && response.ok) { 
                await fetchCategories(); 
                renderNotes(currentCategory); 
            }
        };

        noteElement.appendChild(noteText);
        noteElement.appendChild(editButton);
        noteElement.appendChild(deleteButton);

        cheatSheetSection.appendChild(noteElement);
    });

    const addNoteButton = document.createElement("button");
    addNoteButton.textContent = "Ajouter une note";
    addNoteButton.onclick = async () => {
        const response = await addNote(currentCategory._id);
        if (response && response.ok) { 
            await fetchCategories();
            renderNotes(currentCategory); 
        }
    };

    cheatSheetSection.appendChild(addNoteButton);
}

async function editNote(categoryId, noteIndex) {
    const newNote = prompt("Modifier la note :");
    if (newNote) {
        return await fetch(`${API_BASE_URL}/categories/${categoryId}/notes/${noteIndex}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note: newNote })
        });
    }
    return null; 
}

async function deleteNote(categoryId, noteIndex) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette note ?");
    if (confirmation) {
        return await fetch(`${API_BASE_URL}/categories/${categoryId}/notes/${noteIndex}`, {
            method: 'DELETE'
        });
    }
    return null; 
}

document.getElementById("add-category").onclick = async () => {
    const categoryName = prompt("Nom de la catégorie :");
    if (categoryName) {
        await fetch(`${API_BASE_URL}/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: categoryName, items: [] })
        });
        fetchCategories(); 
    }
};

async function addNote(categoryId) {
    const note = prompt("Ajouter une note :");
    if (note) {
        return await fetch(`${API_BASE_URL}/categories/${categoryId}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note })
        });
    }
    return null; 
}

fetchCategories(); 