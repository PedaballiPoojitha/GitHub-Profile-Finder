const btn = document.getElementById("searchBtn");
const input = document.getElementById("username");
const result = document.getElementById("result");

btn.addEventListener("click", searchUser);
input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        searchUser();
    }
});

function searchUser(){

    const username = input.value.trim();

    if(username === ""){
        result.innerHTML = "<p class='error'>Please enter a username</p>";
        return;
    }

    result.innerHTML = "Loading...";

    fetch("https://api.github.com/users/" + username)
    .then(response => {

        if(response.status === 404){
            throw new Error("User not found");
        }

        return response.json();
    })
    .then(data => {

        result.innerHTML = `
            <img src="${data.avatar_url}">
            <h3>${data.name || data.login}</h3>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <p>Public Repos: ${data.public_repos}</p>
        `;
    })
    .catch(error => {
        result.innerHTML = "<p class='error'>User not found or API limit reached</p>";
    });
}
