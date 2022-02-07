const toutesLesDivDePads = document.querySelectorAll(".pads");
const typeDeSample = document.querySelectorAll('.type')
const menuPourChangerDeSample = document.querySelector(".overlay");
const fermerMenuChangerDeSample = document.querySelector(".close-overlay");
const typeDeSampleButton = document.querySelectorAll(".type");
const choisirSample = document.querySelector(".choose-sample");
const boutonMenuResetPads = document.querySelector('.reset-pads');
const sampleTypeMenu = document.querySelector('.sample-type-explorer');
const boutonsCouleursMenu = document.querySelectorAll('.colors-menu');
const boutonDeResetDansMenu = document.querySelector('.reset-button-menu')
const boutonDeSauvegardeDansMenu = document.querySelector('.save-button-menu')
const boutonDeChargementDansMenu = document.querySelector('.charge-button-menu')
const overlay = document.querySelector('.overlay')

let pads = [];
let sauvegardeDePreset = []
overlay.style.display="none"
//////////////////////
//                  //
//  Initialisation  //
//                  //
//////////////////////



// arraylisteDeSampleCreator()


//////////////////// initialisation des Couleurs de dossier ////////////////////////////////


boutonsCouleursMenu.forEach((bouton, i)=> {
    bouton.style.backgroundColor= samples[i].couleurDossier
    let input = document.createElement('input')
    input.innerHTML=`<input class=input-color-menu type="color" id="color${i}" name="head" value="${samples[i].couleurDossier}">`
    
    boutonsCouleursMenu[i].appendChild(input)
    
})

const inputsColor = document.querySelectorAll('.input-color-menu')
inputsColor.forEach((input, i)=>{
    input.addEventListener('input', (e)=>{
        samples[i].couleurDossier = e.target.value;
        
        updateColorMenu()
        pads.forEach((pad, i)=>{
            pad.updateInfo(i)
        })
        typeDeSample.forEach((type, i)=>{
            type.style.backgroundColor = samples[i].couleurDossier
        })
    }, false)
})

function updateColorMenu() {
    
    inputsColor.forEach((input, i)=>{
        input.innerHTML=`<input class=input-color-menu type="color" id="color${i}" name="head" value="${samples[i].couleurDossier}">`
    })
    
    boutonsCouleursMenu.forEach((bouton, i)=> {
        bouton.style.backgroundColor= samples[i].couleurDossier
    })
}

updateColorMenu()

////////////////////////////////////
//                                //
//  Creation des PADS en Objets   //
//                                //
////////////////////////////////////

class Pad {
    constructor(
        padCharge,
        toucheAssigne,
        numeroDuTypeDeSample = 11,
        numeroDeSample = 0
    ) {
        this.padCharge              = padCharge
        this.toucheAssigne          = toucheAssigne;
        this.numeroDuTypeDeSample   = numeroDuTypeDeSample;
        this.sampleTypeName         = samples[numeroDuTypeDeSample].nomDossier;
        this.numeroDeSample         = numeroDeSample;
        this.nomDeSample            = this.nomDeSample;
        this.listeDeSample          = samples[numeroDuTypeDeSample].liste;
        this.fichierAudio           = new Audio(samples[numeroDuTypeDeSample].liste[numeroDeSample]);
        this.couleurDuTypeDeSample  = samples[numeroDuTypeDeSample].couleurDossier;
    }
    padActive(numeroDePad) {
        if(this.padCharge){
        toutesLesDivDePads[numeroDePad].style.boxShadow = `0 0 42px ${this.couleurDuTypeDeSample}`
        toutesLesDivDePads[numeroDePad].style.opacity = `1`
    
        this.fichierAudio.currentTime = 0;
        this.fichierAudio.play();
    
        setTimeout(() => toutesLesDivDePads[numeroDePad].classList.remove(`.active`), this.fichierAudio.duration * 1000);
        toutesLesDivDePads[numeroDePad].classList.add("active");
        setTimeout(() => {
            toutesLesDivDePads[numeroDePad].style.boxShadow = ''
            toutesLesDivDePads[numeroDePad].style.opacity = `0.7`
        }, this.fichierAudio.duration * 1000);
        }
    }

    changeSample(numeroDePad) {
        overlay.style.display="flex"
        sampleTypeMenu.style.opacity="1"
        sampleTypeMenu.style.color="#f1f1f1"
        choisirSample.style.opacity="0"
        let choisirSampleInnerHTML
        let arrCleannomDeSample = [];
        let ancienNumeroDuTypeDeSample = this.numeroDuTypeDeSample

        typeDeSampleButton.forEach((button, i) => {
            button.style.textDecoration= ""
            button.style.backgroundColor=samples[i].couleurDossier
            if (button.classList.contains(`type${this.numeroDuTypeDeSample}`)){
                button.style.textDecoration= "underline"
            }
            button.addEventListener("click", (e) => {

                typeDeSampleButton.forEach(button=>button.style.textDecoration= "")
                button.style.textDecoration= "underline"
                if (button.classList.contains(`type${i}`)) {
    
                    
    
                    if (i === samples.length-1) {
                        menuPourChangerDeSample.classList.remove("context-menu");
                        this.padCharge = false
                        this.fichierAudio = ""
                        this.updateInfo(numeroDePad)
                        return
                    }
                    
                    this.numeroDuTypeDeSample = i;
                    this.sampleTypeName = samples[this.numeroDuTypeDeSample].nomDossier;
                    this.listeDeSample = samples[i].liste

                    choisirSampleInnerHTML = "<ul>\n";
                    arrCleannomDeSample = [];
    
                    this.listeDeSample.forEach((file, i) => {
                        let cleannomDeSample = file.split("/");
                        cleannomDeSample = cleannomDeSample[cleannomDeSample.length - 1];
                        choisirSampleInnerHTML += `<li class= "li-liste-samples" data-id="${i}"">${cleannomDeSample}</li>\n`;
                        arrCleannomDeSample[i] = cleannomDeSample;
                        
                    });
                    choisirSampleInnerHTML += "</ul>\n";
                    choisirSample.innerHTML = choisirSampleInnerHTML;
                    sampleTypeMenu.style.opacity="0"
                    choisirSample.style.opacity="1"
                    
                }
                
                const lis = document.querySelectorAll(".li-liste-samples");
                lis.forEach((li) => {
                   
                    li.style.color = samples[this.numeroDuTypeDeSample].couleurDossier
                    let dataAttr = li.getAttribute("data-id");
                    if((button.classList.contains(`type${ancienNumeroDuTypeDeSample}`)) && dataAttr == this.numeroDeSample){
                        li.style.textDecoration = "underline"
                        }
                    
                    li.addEventListener("click", (e) => {
    
                        let sampleID = li.getAttribute("data-id");
                        this.numeroDeSample = parseInt(sampleID, 10);
                        this.sampleTypeName = samples[this.numeroDuTypeDeSample].nomDossier;
                        this.nomDeSample = samples[this.numeroDuTypeDeSample].liste[this.numeroDeSample]
                        this.padCharge = true
                        this.fichierAudio = new Audio(this.listeDeSample[this.numeroDeSample]);
                        this.couleurDuTypeDeSample = samples[this.numeroDuTypeDeSample].couleurDossier
                        this.listeDeSample = samples[this.numeroDuTypeDeSample].liste;
                        this.updateInfo(numeroDePad)
                        ancienNumeroDuTypeDeSample = this.numeroDuTypeDeSample
                        menuPourChangerDeSample.classList.toggle("context-menu");
                        button.style.textDecoration= ""
                        choisirSample.innerHTML = "";
                        overlay.style.display="none"
                    });
                });

            });
        })
    }
    
    updateInfo(numeroDePad) {
        if (this.padCharge === true) {
            
            this.couleurDuTypeDeSample = samples[this.numeroDuTypeDeSample].couleurDossier
            toutesLesDivDePads[numeroDePad].style.backgroundColor = this.couleurDuTypeDeSample
            this.nomDeSample = samples[this.numeroDuTypeDeSample].liste[this.numeroDeSample].slice(samples[this.numeroDuTypeDeSample].liste[this.numeroDeSample].lastIndexOf('/') + 1).replace('.wav', '')
            toutesLesDivDePads[numeroDePad].innerHTML = `
                    <div class="name-type-sample">${this.sampleTypeName}</div>
                    <div class="name-active-sample">${this.nomDeSample}</div>
                    <br>
                    <div class="track-number">${this.numeroDeSample + 1}/${samples[this.numeroDuTypeDeSample].liste.length}</div>`;
            toutesLesDivDePads[numeroDePad].classList.add(`passive-color`)
        }
        if (this.padCharge === false) {
            toutesLesDivDePads[numeroDePad].innerHTML = `
                    <div class="name-type-sample">Empty</div>
                    <div class="name-active-sample">Empty</div>
                    <br>
                    
                    <div class="track-number"></div>`;
            toutesLesDivDePads[numeroDePad].style.backgroundColor = 'rgb(80, 80, 80, 0.94)';
            toutesLesDivDePads[numeroDePad].classList.remove(`passive-color`)
            toutesLesDivDePads[numeroDePad].classList.add(`empty-pad`)
        }
    }
}

///////////////////////////////////////////
//                                       //
//  Mise en place des ADDEVENTLISTENER   //
//                                       //
///////////////////////////////////////////


toutesLesDivDePads.forEach((pad, i) => {
    pads.push(
        new Pad(i > samples.length - 2 ? false : true, arrayKeyboard[i], i > samples.length - 1 ? undefined : i, 0)
    );
    pads[i].updateInfo(i)
    pad.addEventListener("mousedown", () => {
        pads[i].padActive(i);
    });
    document.addEventListener("mouseup", () => {
        pad.classList.remove("active");
    });
    pad.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        menuPourChangerDeSample.classList.toggle("context-menu");
        pads[i].changeSample(i)
    });
});

document.addEventListener("keypress", (e) => {
    arrayKeyboard.forEach((key, i) => {
        if (e.code === arrayKeyboard[i]) {
            pads[i].padActive(i);
        }
    });
});

document.addEventListener("keyup", (e) => {
    arrayKeyboard.forEach((key, i) => {
        if (e.code === arrayKeyboard[i]) {

            toutesLesDivDePads[i].classList.remove("active");
        }
    });
});

boutonDeResetDansMenu.addEventListener('click', ()=>{
    
    resetPads();
})

boutonDeSauvegardeDansMenu.addEventListener('click', ()=>{
    sauvegardeDePreset = []
    pads.forEach(pad=>{
        sauvegardeDePreset.push(deepClone(pad))
    })
})

boutonDeChargementDansMenu.addEventListener('click', ()=>{
    pads.forEach((pad, i)=>{
        pad.padCharge = sauvegardeDePreset[i].padCharge
        pad.numeroDuTypeDeSample = sauvegardeDePreset[i].numeroDuTypeDeSample
        pad.sampleTypeName = sauvegardeDePreset[i].sampleTypeName
        pad.toucheAssigne = sauvegardeDePreset[i].toucheAssigne
        pad.numeroDeSample = sauvegardeDePreset[i].numeroDeSample
        pad.nomDeSample = sauvegardeDePreset[i].nomDeSample
        pad.listeDeSample = sauvegardeDePreset[i].listeDeSample
        pad.fichierAudio = new Audio(sauvegardeDePreset[i].listeDeSample[sauvegardeDePreset[i].numeroDeSample]);
        pad.couleurDuTypeDeSample = sauvegardeDePreset[i].couleurDuTypeDeSample
        pad.updateInfo(i)
    })
})

fermerMenuChangerDeSample.addEventListener("click", () => {
    menuPourChangerDeSample.classList.toggle("context-menu");
});

/////////////////////////////
//                         //
//     Autres FonctionS    //
//                         //
/////////////////////////////

function resetPads() {
    pads.length = 0
    for (let i = 0; i < 16; i++) {
        pads.push(
            new Pad(false, arrayKeyboard[i], 11)
        );
        toutesLesDivDePads[i].style.opacity = `0.7`
        pads[i].updateInfo(i)
    }
}

function updateColorMenu() {
    
    inputsColor.forEach((input, i)=>{
        input.innerHTML=`<input class=input-color-menu type="color" id="color${i}" name="head" value="${samples[i].couleurDossier}">`
    })
    
    boutonsCouleursMenu.forEach((bouton, i)=> {
        bouton.style.backgroundColor= samples[i].couleurDossier
    })
}

function deepClone (obj) {
    if (obj === null) return null;
    let clone = Object.assign({}, obj);
    Object.keys(clone).forEach(
      key =>
        (clone[key] =
          typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
    );
    if (Array.isArray(obj)) {
      clone.length = obj.length;
      return Array.from(clone);
    }
    return clone;
};


