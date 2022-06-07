const feedDisplay = document.querySelector('#feed');
const input = document.querySelector("[myInput]");

input.addEventListener('input', show_user_names);

function show_user_names(){
    const checkID = input.value;
    const render = (user) => {
        feedDisplay.innerHTML = `
        <p><img class="avatar_img" src=${user.avatarUrl}></p>

        First Name: ${user.first_name} 
        <br> 
        Last Name: ${user.last_name}               
        `;
    };
    fetch('http://localhost:3000/user')
        .then(response => response.json())
        .then(data => {

            const user = data.find(user => user.id === checkID);
            
            console.log(checkID);
            console.log(user);

            render(user);
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    
};
