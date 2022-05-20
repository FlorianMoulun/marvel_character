function apiCall(offset) {
    let ts = 1;
    let apikey = 'd045aa1f2992237d85bf2c43b7a3378d';
    let hash = '7e112c8e7f740b99c72147e6fc40d5e6';
    let url = `http://gateway.marvel.com/v1/public/characters?limit=100&offset=${offset}&ts=${ts}&apikey=${apikey}&hash=${hash}`;

    fetch(url)
    .then((response) => response.json()
    .then((data) => {
        console.log(data);

        for (let i = 0; i < data.data.results.length; i++) {
            let parentElement = document.querySelector('#gallery');

            if (data.data.results[i].thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" 
            && data.data.results[i].thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" 
            && data.data.results[i].description !== "" 
            && data.data.results[i].description !== " "
            && data.data.results[i].name !== "Black Widow/Natasha Romanoff (MAA)") {

                let imgCharacter = newElem('img', {"class":"imgCharacter","src":data.data.results[i].thumbnail.path+'.'+data.data.results[i]. thumbnail.extension});
                let tapisImgCharacter = newElem("div", {"class":"tapisImgCharacter"});
                let nameCharacter = newElem('p', {"class":"nameCharacter"}, data.data.results[i].name);
                let containerCharacter = newElem("div", {"class":"containerCharacter"});

                tapisImgCharacter.insertBefore(imgCharacter, tapisImgCharacter.lastChild);
                containerCharacter.insertBefore(tapisImgCharacter, containerCharacter.lastChild);
                containerCharacter.insertBefore(nameCharacter, containerCharacter.lastChild);
                parentElement.insertBefore(containerCharacter, parentElement.lastChild);
            }
        }
    })
    )
}

let btnajax = document.querySelector('#btnajax')
let res = 0;
apiCall(res);
btnajax.addEventListener('click', function(){
    res += 100
    apiCall(res);
});






/* Fonction pour créer et placer des elements */
function newElem(el, attribut, content=""){
    const newElem = document.createElement(el);
    const newContent = document.createTextNode(content);
    newElem.appendChild(newContent);
    for(let key in attribut) {
        newElem.setAttribute(key, attribut[key]);
    }
    return newElem;
}
function placeElem(elem, ref, ou=null){
    ref.insertBefore(elem, ou);
}