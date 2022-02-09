//div where profile info will be displayed
const overview = document.querySelector(".overview");
//unordered list to display repos
const repoList = document.querySelector(".repo-list"); 
const username = "RamyaKasara";

const getGitHubInfo = async function(){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    //console.log(data.bio);
    showUserInfo(data);
}

getGitHubInfo();
const showUserInfo = function(data){
    newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.Login}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  overview.append(newDiv);
  getRepoInfo();
};

const getRepoInfo = async function(){
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRes.json();
    //console.log(repoData);
    showRepoInfo(repoData);
};

//getRepoInfo();

const showRepoInfo = function(repoData){
    for(let repo of repoData){
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML =`<h3>${repo.name}</h3>`;
        repoList.append(repoItem)
    } 
};

