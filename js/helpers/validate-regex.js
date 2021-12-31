class Contact {
    constructor(name, phone, email, company) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.company = company;
    }
}

const inputs = document.querySelectorAll('input[type="text"]');
const button = document.getElementById('buttonSubmit');
const form = document.getElementById('formSchedule');

let contacts = [];
const validateStorage = () => {
    if (localStorage.getItem('contacts') === null) {
        contacts = [];
    } else {
        contacts = JSON.parse(localStorage.getItem('contacts'));
    }
}
validateStorage();

const regex = {
    name: /^[a-zA-Z ]{2,}$/,
    company: /^[a-zA-Z ]{2,}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/,
    phone: /^[0-9]{10}$/,
}

let isValid = {
    name: false,
    company: false,
    email: false,
    phone: false,
}

const validateForm = (e) => {
    switch (e.target.id) {
        case "input-name":
            if (regex.name.test(e.target.value)) {
                e.target.classList.remove('is-invalid');
                e.target.classList.add('is-valid');
                isValid.name = true;
            } else {
                e.target.classList.add('is-invalid');
                isValid.name = false;
            }
            break;
        case "input-company":
            if (regex.company.test(e.target.value)) {
                e.target.classList.remove('is-invalid');
                e.target.classList.add('is-valid');
                isValid.company = true;
            } else {
                e.target.classList.add('is-invalid');
                isValid.company = false;
            }
            break;
        case "input-email":
            if (regex.email.test(e.target.value)) {
                e.target.classList.remove('is-invalid');
                e.target.classList.add('is-valid');
                isValid.email = true;
            } else {
                e.target.classList.add('is-invalid');
                isValid.email = false;
            }
            break;
        case "input-phone":
            if (regex.phone.test(e.target.value)) {
                e.target.classList.remove('is-invalid');
                e.target.classList.add('is-valid');
                isValid.phone = true;
            } else {
                e.target.classList.add('is-invalid');
                isValid.phone = false;
            }
            break;
    }
}


inputs.forEach(input => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

button.addEventListener('click', (e) => {
    e.preventDefault();
    if (isValid.name && isValid.company && isValid.email && isValid.phone) {
        const contact = new Contact(
            document.getElementById('input-name').value,
            document.getElementById('input-phone').value,
            document.getElementById('input-email').value,
            document.getElementById('input-company').value
        );
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        validateStorage();
        document.getElementById('input-name').classList.remove('is-valid');
        document.getElementById('input-phone').classList.remove('is-valid');
        document.getElementById('input-email').classList.remove('is-valid');
        document.getElementById('input-company').classList.remove('is-valid');
        form.reset();
        renderContacts();
    } else {
        alert('Formulario incompleto');
    }
});


// *render contacts
const contactsList = document.getElementById('contacts');
const renderContacts = () => {
    contactsList.innerHTML = '';
    if (contacts.length > 0) {
        contacts.forEach(contact => {
            contactsList.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title mb-2">${contact.name}</h5>
                    <h6 class="card-subtitle mb-1 text-muted">${contact.company}</h6>
                    <p class="card-text">${contact.email}</p>
                    <p class="card-text">${contact.phone}</p>
                    <button class="btn btn-danger" onclick="deleteContact(${contacts.indexOf(contact)})">Delete</button>
                </div>
            </div>
            `;
        });
    } else {
        contactsList.innerHTML = `
        <div class="alert alert-info w-50 mx-auto" role="alert">
            <h4 class="alert-heading">Nothing here!</h4>
            <p>please, add a new contact.</p>
        </div>
        `;
    }
}
renderContacts();

const deleteContact = (index) => {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    validateStorage();
    renderContacts();
}