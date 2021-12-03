const form = document.querySelector('#github_form')
const userList = document.querySelector("#user-list")
const repoList = document.querySelector("#repos-list")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e.target.children[0].value)
    fetch("https://api.github.com/search/users?q=" + e.target.children[0].value)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        if(json.total_count === 0)alert("Error: could not find any matches.")
        else{
            for(const user of json.items){
                let p = document.createElement('p')
                p.textContent = `${user.login}: ${user.html_url}`
                let img = document.createElement("img")
                img.src = user.avatar_url
                img.style.width = "35%"
                let div = document.createElement('div')
                div.classList.add('hover')
                div.style.width = '275px'
                div.style.height = '150px'
                div.style.margin = 'auto'
                div.style.float = 'left'
                div.appendChild(img)
                div.appendChild(p)
                div.addEventListener('click', () => {
                    fetch(`https://api.github.com/users/${user.login}/repos`)
                    .then(res => res.json())
                    .then(json => {
                        console.log(json)
                        userList.innerHTML = ''
                        userList.appendChild(div)
                        div.classList.remove('hover')
                        for(const repo of json){
                            let name = document.createElement("a")
                            name.href = repo.url
                            name.textContent = repo.name
                            name.style.margin = '25px'
                            name.style.padding = '25px'
                            name.style.float = 'left'
                            name.style.borderStyle = 'solid'
                            name.style.color = 'black'
                            repoList.appendChild(name)
                        }
                    })
                })
                userList.appendChild(div)
            }
        }
    })
})