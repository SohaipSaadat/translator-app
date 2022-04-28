const selectElem = document.querySelectorAll('select');
const toText = document.querySelector('.to-text');
const fromText = document.querySelector('.from-text');
const translatedBtn = document.querySelector('.container button');
const exchangeBtn = document.querySelector('.exchange');
const iconsElem = document.querySelectorAll('.icons');
let selected;
translatedBtn.addEventListener('click', apiData)
exchangeBtn.addEventListener('click' , exchange);
iconsElem.onclick =  copyAndSpeechcCheck()
for (const country in countries) {
    createCptionTag(country , countries[country])
}
// create option tag
function createCptionTag(country , countries) {
    selectElem.forEach((tag , id)=>{
        let option = document.createElement('option');
        option.setAttribute('value', country);
        if (id == 0 && country == 'en-GB') {
            option.setAttribute('selected', selected)
        }
        if (id == 1 && country == 'ar-SA') {
            option.setAttribute('selected', selected)
        }
        option.append(document.createTextNode(countries))
        tag.appendChild(option)
    })
};
// get data form API
function apiData() {
    let text = fromText.value
    let translateFrom = selectElem[0].value
    let translateTo = selectElem[1].value 
    if(!text)return;
    toText.setAttribute('placeholder', 'Traslating.....')
    let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiURL).then(respons => respons.json()).then(data =>{
        toText.setAttribute('placeholder', 'Traslating.....')
        toText.value = data.responseData.translatedText
    })
};
// exchange langauge selector
function exchange() {
    let tempText = fromText.value;
    tempTag = selectElem[0].value;
    fromText.value = toText.value;
    selectElem[0].value = selectElem[1].value;
    toText.value = tempText;
    selectElem[1].value = tempTag
}
// copyAndSpeech
function copyAndSpeechcCheck() {
    iconsElem.forEach(icon =>{
        icon.addEventListener('click', ({target})=>{
            // copyAndSpeechcCheck(target)
            if(target.classList.contains('fa-copy')){
                if (target.id === 'from') {
                    navigator.clipboard.writeText(fromText.value)
                }else{
                    navigator.clipboard.writeText(toText.value)  
                }
            }else{
                let ulterance;
                if (target.id == "from") {
                    ulterance = new SpeechSynthesisUtterance(fromText.value);
                    ulterance.lang = selectElem[0]
                }else{
                    ulterance = new SpeechSynthesisUtterance(toText.value);
                    ulterance.lang = selectElem[1]
                }
                speechSynthesis.speak(ulterance)
            }
        })
    })
}

// 


