const form = document.querySelector('#form')
const list = document.querySelector('#list')
const required = document.querySelector('#required')
const textfield = document.querySelector('#textfield')
const editToDo = document.querySelector('#editToDo')

let toDos = [
    {
        "id": 1,
        "title": "Встать",
        "required": true
    },
    {
        "id": 2,
        "title": "По завтракать",
        "required": false
    },
    {
        "id": 3,
        "title": "Поспать",
        "required": true
    }
]
let editId = null;

const handleShow = (arr) => {
    list.innerHTML = arr.map(toDo => {
        return `
    <div class="todo-wrapper">
        <div class="todo-box">
            <div class="btn-wrapper">
                <div>
                    <h4>${toDo.title}</h4>
                </div>
                <div class="icon-urgent">
                    <h5 style="margin-right: 10px;">${toDo.required ? 'Required' : ''}</h5>
                    <div class="btns-wrap">
                        <button class="btn btn-success me-1" onclick="editToDoItem(${toDo.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteToDo(${toDo.id})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    }).join('')
}

const deleteToDo = (id) => {
    toDos = toDos.filter(toDo => toDo.id !== id)
    handleShow(toDos)
}


const editToDoItem = (id) => {
    const toDo = toDos.find(toDo => toDo.id === id)
    textfield.value = toDo.title
    required.checked = toDo.required
    editId = id
    console.log(toDos)
}

handleShow(toDos)


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const toDoData = {
        id: editId ? editId : Math.round(Math.random() * 100),
        required: required.checked,
        title: textfield.value,
    }

    if (editId) {
        toDos = toDos.map(toDo => toDo.id === editId ? toDoData : toDo)
        editId = null
    } else {
        toDos = [toDoData, ...toDos]
    }

    textfield.value = ''
    required.checked = false
    handleShow(toDos)
})