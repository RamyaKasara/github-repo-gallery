//PART 1
//div where profile info will be displayed
const overview = document.querySelector(".overview");

//PART 2
//unordered list to display repos
const repoList = document.querySelector(".repo-list"); 

//PART 3
// section where info of all repos appears
const repoSection = document.querySelector(".repos")
//section where individual repo data appears
const repoInfoSection = document.querySelector(".repo-data");

//PART 4
//back to repo gallery button
const backToRepoGallery = document.querySelector("button.view-repos");
//input to search by name
const filterInput = document.querySelector("input.filter-repos");

//PART 1
const username = "RamyaKasara";

const getGitHubInfo = async function(){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    //console.log(data);
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
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  overview.append(newDiv);
  getRepoList();
};

//PART 2
const getRepoList = async function(){
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRes.json();
    //console.log(repoData);
    showRepoList(repoData);
};

//getRepoList();

const showRepoList = function(repoData){
    //PART 4
    //show search bar
    filterInput.classList.remove("hide");
    for(let repo of repoData){
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML =`<h3>${repo.name}</h3>`;
        repoList.append(repoItem)
    } 
};

//PART 3
//adding an event listener on the whole repoList to see if any repo was clicked on
repoList.addEventListener("click", function(e){
    if(e.target.matches("h3")){
        const repoName = e.target.innerText;
        //console.log(repoName);
        getSpecificRepoInfo(repoName);
    }
});

const getSpecificRepoInfo = async function(repoName){
    const resRepoInfo = await fetch(` https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await resRepoInfo.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for(let key in languageData){
        if (!languages.includes(key))
            languages.push(key);
    }
    //console.log(languages);
    showSpecificRepoInfo(repoInfo, languages);
    
};

const showSpecificRepoInfo = function(repoInfo, languages){
    repoInfoSection.innerHTML = "";
    const repoDiv = document.createElement("div");
    const name = repoInfo.name;
    repoDiv.innerHTML = `<h3>Name: ${name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.svn_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoInfoSection.append(repoDiv);
    repoInfoSection.classList.remove("hide");
    repoSection.classList.add("hide");
    //PART 4
    backToRepoGallery.classList.remove("hide");
};

//PART 4
backToRepoGallery.addEventListener("click", function(){
    repoSection.classList.remove("hide");
    repoInfoSection.classList.add("hide");
    backToRepoGallery.classList.add("hide");
});

//dynamic search
filterInput.addEventListener("input", function(e){
    const val = e.target.value;
    //console.log(val);
    const repos = document.querySelectorAll(".repo");
    //Selects all that have the class "repo" ie selects all repo list items
    //console.log(repo);
    const lowerCaseSearchTerm = val.toLowerCase();
    for(let repo of repos){
        const repoName = repo.innerText.toLowerCase();
        if(repoName.includes(lowerCaseSearchTerm))
            repo.classList.remove("hide");
        else
            repo.classList.add("hide");

    }
});