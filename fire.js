const cafeList = document.querySelector('#todo-list');
const form = document.querySelector('#add-todo');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let title = document.createElement('span');
    let disc = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    disc.textContent = doc.data().disc;
    cross.textContent = 'x';

    li.appendChild(title);
    li.appendChild(disc);
    li.appendChild(cross);

    cafeList.appendChild(li);
  // deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('todos').doc(id).delete();
});
}

// // getting data
// db.collection('Cofee_hotel').where('city', '==', 'Faisalabad').orderBy(name).get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('todos').add({
        title: form.title_todo.value,
        disc: form.todo_des.value
    });
    form.title.value = '';
    form.disc.value = '';
});

// real-time listener

db.collection('todos').orderBy('title').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});