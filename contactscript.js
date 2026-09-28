const API_URL = "contact_management.php";

const contactForm = document.getElementById("contactForm");
const contactTableBody = document.getElementById("contactTableBody");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("search");
const clearSearch = document.getElementById("clearSearch");
const cancelButton = document.getElementById("cancelButton");
const messageBox = document.getElementById("message");

let currentSearch = "";

document.addEventListener("DOMContentLoaded", () => {
    loadContacts();
});

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("contactId").value;
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!validateForm(name, phone)) {
        return;
    }

    const action = id ? "update" : "add";

    const data = {
        action,
        id,
        name,
        phone,
        email,
        address
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showMessage(result.message, "success");
            resetForm();
            loadContacts();
        } else {
            showMessage(result.message, "error");
        }
    } catch (error) {
        showMessage("Unable to connect to the PHP server.", "error");
    }
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    currentSearch = searchInput.value.trim();
    loadContacts();
});

clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    currentSearch = "";
    loadContacts();
});

cancelButton.addEventListener("click", () => {
    resetForm();
});

async function loadContacts() {
    contactTableBody.innerHTML =
        '<tr><td colspan="6" class="empty">Loading contacts...</td></tr>';

    try {
        const url = currentSearch
            ? `${API_URL}?action=list&search=${encodeURIComponent(currentSearch)}`
            : `${API_URL}?action=list`;

        const response = await fetch(url);
        const result = await response.json();

        if (!result.success) {
            contactTableBody.innerHTML =
                `<tr><td colspan="6" class="empty">${escapeHtml(result.message)}</td></tr>`;
            return;
        }

        displayContacts(result.contacts);
    } catch (error) {
        contactTableBody.innerHTML =
            '<tr><td colspan="6" class="empty">Unable to load contacts.</td></tr>';
    }
}

function displayContacts(contacts) {
    if (contacts.length === 0) {
        contactTableBody.innerHTML =
            '<tr><td colspan="6" class="empty">No contacts found.</td></tr>';
        return;
    }

    contactTableBody.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.id}</td>
            <td>${escapeHtml(contact.name)}</td>
            <td>${escapeHtml(contact.phone)}</td>
            <td>${escapeHtml(contact.email || "")}</td>
            <td>${escapeHtml(contact.address || "")}</td>
            <td>
                <div class="actions">
                    <button class="btn btn-edit"
                        onclick='editContact(${JSON.stringify(contact)})'>
                        Edit
                    </button>
                    <button class="btn btn-delete"
                        onclick="deleteContact(${contact.id})">
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join("");
}

function editContact(contact) {
    document.getElementById("contactId").value = contact.id;
    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email || "";
    document.getElementById("address").value = contact.address || "";

    document.getElementById("formTitle").textContent = "Edit Contact";
    document.getElementById("submitButton").textContent = "Update Contact";
    document.getElementById("submitButton").className = "btn btn-update";
    cancelButton.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function deleteContact(id) {
    if (!confirm("Are you sure you want to delete this contact?")) {
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "delete",
                id
            })
        });

        const result = await response.json();

        if (result.success) {
            showMessage(result.message, "success");
            loadContacts();
        } else {
            showMessage(result.message, "error");
        }
    } catch (error) {
        showMessage("Unable to connect to the PHP server.", "error");
    }
}

function validateForm(name, phone) {
    if (name === "") {
        alert("Please enter the contact name.");
        return false;
    }

    if (phone === "") {
        alert("Please enter the phone number.");
        return false;
    }

    if (!/^[0-9+\-\s]{7,20}$/.test(phone)) {
        alert("Please enter a valid phone number.");
        return false;
    }

    return true;
}

function resetForm() {
    contactForm.reset();
    document.getElementById("contactId").value = "";
    document.getElementById("formTitle").textContent = "Add New Contact";
    document.getElementById("submitButton").textContent = "Add Contact";
    document.getElementById("submitButton").className = "btn btn-add";
    cancelButton.classList.add("hidden");
}

function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = `message ${type}`;

    setTimeout(() => {
        messageBox.classList.add("hidden");
    }, 3000);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
