/*==================================================
    FL1305
    APP.JS
==================================================*/


/*==================================================
    ESCENAS
==================================================*/

const scenes = {

    scene1: document.getElementById("scene1"),

    scene2: document.getElementById("scene2"),

    scene3: document.getElementById("scene3"),

    scene4: document.getElementById("scene4"),

    scene5: document.getElementById("scene5"),

    scene6: document.getElementById("scene6")

};


/*==================================================
    BOTONES
==================================================*/

const btnAccess = document.getElementById("btnAccess");

const btnStart = document.getElementById("btnStart");

const btnPrevious = document.getElementById("btnPrevious");

const btnNext = document.getElementById("btnNext");

const btnLetter = document.getElementById("btnLetter");

const btnFinal = document.getElementById("btnFinal");

const btnRestart = document.getElementById("btnRestart");


/*==================================================
    ESCENA 4
==================================================*/

const memoryVideo = document.getElementById("memoryVideo");

const syncPanel = document.getElementById("syncPanel");

const progressFill = document.getElementById("progressFill");

const progressPercent = document.getElementById("progressPercent");

const syncMessage = document.getElementById("syncMessage");

const videoWrapper = document.getElementById("videoWrapper");

const fileInfo = document.getElementById("fileInfo");

const fileOrigin = document.getElementById("fileOrigin");

const fileType = document.getElementById("fileType");

const fileTarget = document.getElementById("fileTarget");

const accessStatus = document.getElementById("accessStatus");


/*==================================================
    CARTA
==================================================*/

const letterContent = document.getElementById("letterContent");


/*==================================================
    SISTEMA
==================================================*/

const systemLog = document.getElementById("systemLog");

const identityCard = document.getElementById("identityCard");


/*==================================================
    MEMORIAS
==================================================*/

const memoryDate = document.getElementById("memoryDate");

const memoryTitle = document.getElementById("memoryTitle");

const memoryImage = document.getElementById("memoryImage");

const memoryText = document.getElementById("memoryText");

const memoryCounter = document.getElementById("memoryCounter");

/*==================================================
    AUDIO
==================================================*/

const backgroundMusic = document.getElementById("backgroundMusic");

let musicStarted = false;

let fadeInterval = null;


/*==================================================
    DATOS
==================================================*/

const memories = [

    {

        date: "05 · 05 · 2026",

        title: "PRIMER ENCUENTRO",

        image: "assets/img/memory1.jpg",

        text:
            "El día en que nuestras miradas se cruzaron por primera vez, dando inicio a la línea temporal donde comenzó a escribirse nuestra historia."

    },

    {

        date: "13 · 05 · 2026",

        title: "PRIMER EVENTO CANÓNICO",

        image: "assets/img/memory2.jpg",

        text:
            "Dejamos de imaginar un 'nosotros' para comenzar a escribirlo juntos."

    },

    {

        date: "05 · 07 · 2026",

        title: "EVENTO NEXUS DETECTADO",

        image: "assets/img/memory3.jpg",

        text:
            "Una acción improvisada terminó convirtiéndose en la promesa de un futuro que hoy seguimos construyendo."

    },

    {

        date: "∞",

        title: "CONTINUIDAD CONFIRMADA",

        image: "assets/img/memory4.jpg",

        text:
            "La línea temporal permanece estable.\n\nUn nuevo capítulo comienza a escribirse.\n\nPreparando el registro audiovisual..."

    }

];


/*==================================================
    VARIABLES
==================================================*/

let currentMemory = 0;

let systemReady = false;


/*==================================================
    FUNCIONES GENERALES
==================================================*/

function hideAllScenes(){

    Object.values(scenes).forEach(scene => {

        scene.classList.remove("active");

    });

}


function showScene(scene){

    const transition = document.getElementById("transition");

    transition.classList.add("show");

    setTimeout(() => {

        hideAllScenes();

        scene.classList.add("active");

        transition.classList.remove("show");

    },450);

}

/*==================================================
    EFECTO DE ESCRITURA
==================================================*/

async function typeLine(text){

    const line = document.createElement("p");

    systemLog.appendChild(line);

    const cursor = document.createElement("span");

    cursor.className = "cursor";

    cursor.textContent = "█";

    line.appendChild(cursor);

    for(let i = 0; i < text.length; i++){

        line.insertBefore(

            document.createTextNode(text[i]),

            cursor

        );

        await new Promise(resolve => setTimeout(resolve,32));

    }

    cursor.remove();

}


/*==================================================
    SISTEMA DE AUTENTICACIÓN
==================================================*/

async function startSystem(){

    if(systemReady) return;

    systemReady = true;

    systemLog.innerHTML = "";

    identityCard.classList.remove("show");

    btnAccess.classList.remove("show");

    identityCard.style.display = "block";

    btnAccess.style.display = "inline-block";

    const messages = [

        "Inicializando acceso...",

        "Verificando credenciales...",

        "Buscando coincidencias...",

        "Coincidencia encontrada ✓"

    ];

    for(const message of messages){

        await typeLine(message);

        await new Promise(resolve => setTimeout(resolve,420));

    }

    await new Promise(resolve => setTimeout(resolve,500));

    identityCard.classList.add("show");

    await new Promise(resolve => setTimeout(resolve,500));

    btnAccess.classList.add("show");

}


/*==================================================
    CARGAR MEMORIA
==================================================*/

function loadMemory(index){

    const memory = memories[index];

    const polaroid = document.querySelector(".polaroid");

    if(!memory || !polaroid) return;

    memoryDate.textContent = memory.date;

    memoryTitle.textContent = memory.title;

    const rotations = [

        "-3deg",

        "2deg",

        "-1deg",

        "4deg"

    ];

    polaroid.style.setProperty(

        "--photoRotation",

        rotations[index]

    );

    polaroid.classList.remove("animate");

    void polaroid.offsetWidth;

    polaroid.classList.add("animate");

    memoryText.classList.add("hidden");

    memoryImage.src = memory.image;

    memoryImage.alt = memory.title;

    setTimeout(() => {

        memoryText.innerHTML = memory.text.replace(/\n/g,"<br>");

        memoryText.classList.remove("hidden");

    },200);

    memoryCounter.textContent =

        `${index + 1} / ${memories.length}`;

    btnPrevious.disabled = (index === 0);

    btnNext.textContent =

        index === memories.length - 1

            ? "CONTINUAR ▶"

            : "SIGUIENTE ⟶";

}

/*==================================================
    SECUENCIA CINEMATOGRÁFICA
==================================================*/

async function startVideoSequence(){

    syncPanel.classList.remove("hide");

    fileInfo.classList.remove("show");

    videoWrapper.classList.remove("show");

    btnLetter.classList.remove("show");

    progressFill.style.width = "0%";

    progressPercent.textContent = "0%";

    syncMessage.textContent = "Inicializando...";

    fileOrigin.textContent = "";

    fileType.textContent = "";

    fileTarget.textContent = "";

    accessStatus.textContent = "";

    const steps = [

        {

            value:15,

            message:"Localizando eventos canónicos..."

        },

        {

            value:38,

            message:"Verificando continuidad temporal..."

        },

        {

            value:63,

            message:"Analizando registros..."

        },

        {

            value:84,

            message:"Detectando anomalía..."

        },

        {

            value:100,

            message:"Archivo externo detectado."

        }

    ];

    for(const step of steps){

        await new Promise(resolve => setTimeout(resolve,900));

        progressFill.style.width = `${step.value}%`;

        progressPercent.textContent = `${step.value}%`;

        syncMessage.textContent = step.message;

    }

    await new Promise(resolve => setTimeout(resolve,1000));

    fileInfo.classList.add("show");

    await new Promise(resolve => setTimeout(resolve,700));

    fileOrigin.textContent = "LUZ";

    await new Promise(resolve => setTimeout(resolve,900));

    fileType.textContent = "MENSAJE PERSONAL";

    await new Promise(resolve => setTimeout(resolve,900));

    fileTarget.textContent = "FERNANDO";

    await new Promise(resolve => setTimeout(resolve,900));

    accessStatus.textContent = "ACCESO CONCEDIDO";

    await new Promise(resolve => setTimeout(resolve,1200));

    syncPanel.classList.add("hide");

await new Promise(resolve => setTimeout(resolve,600));

pauseMusic();

videoWrapper.classList.remove("hidden");

videoWrapper.classList.add("show");

memoryVideo.currentTime = 0;

memoryVideo.play();
}

/*==================================================
    MEMORIA SIGUIENTE
==================================================*/

function nextMemory(){

    if(currentMemory < memories.length - 1){

        currentMemory++;

        loadMemory(currentMemory);

        return;

    }

    showScene(scenes.scene4);

    setTimeout(() => {

        startVideoSequence();

    },700);

}


/*==================================================
    MEMORIA ANTERIOR
==================================================*/

function previousMemory(){

    if(currentMemory === 0) return;

    currentMemory--;

    loadMemory(currentMemory);

}

/*==================================================
    AUDIO MANAGER
==================================================*/

function startMusic(){

    if(musicStarted) return;

    musicStarted = true;

    backgroundMusic.volume = 0;

    backgroundMusic.play();

    clearInterval(fadeInterval);

    fadeInterval = setInterval(()=>{

        if(backgroundMusic.volume < 0.20){

            backgroundMusic.volume += 0.01;

        }else{

            clearInterval(fadeInterval);

        }

    },120);

}



function pauseMusic(){

    clearInterval(fadeInterval);

    fadeInterval = setInterval(()=>{

        if(backgroundMusic.volume > 0.01){

            backgroundMusic.volume -= 0.01;

        }else{

            clearInterval(fadeInterval);

            backgroundMusic.pause();

        }

    },80);

}



function resumeMusic(){

    backgroundMusic.play();

    clearInterval(fadeInterval);

    fadeInterval = setInterval(()=>{

        if(backgroundMusic.volume < 0.20){

            backgroundMusic.volume += 0.01;

        }else{

            clearInterval(fadeInterval);

        }

    },120);

}



function stopMusic(){

    clearInterval(fadeInterval);

    fadeInterval = setInterval(()=>{

        if(backgroundMusic.volume > 0.01){

            backgroundMusic.volume -= 0.01;

        }else{

            clearInterval(fadeInterval);

            backgroundMusic.pause();

            backgroundMusic.currentTime = 0;

            musicStarted = false;

        }

    },80);

}

/*==================================================
    EVENTOS MEMORIAS
==================================================*/

btnNext.addEventListener("click",nextMemory);

btnPrevious.addEventListener("click",previousMemory);


/*==================================================
    ESCENA 1 → ESCENA 2
==================================================*/

btnAccess.addEventListener("click",() => {

    showScene(scenes.scene2);

});


/*==================================================
    ESCENA 2 → ESCENA 3
==================================================*/

btnStart.addEventListener("click",() => {

    startMusic();

    currentMemory = 0;

    loadMemory(currentMemory);

    showScene(scenes.scene3);

});


/*==================================================
    ESCENA 4 → ESCENA 5
==================================================*/

btnLetter.addEventListener("click",() => {

    memoryVideo.pause();

    showScene(scenes.scene5);

});


/*==================================================
    ESCENA 5 → ESCENA 6
==================================================*/

btnFinal.addEventListener("click",() => {

    showScene(scenes.scene6);

});


/*==================================================
    REINICIAR EXPERIENCIA
==================================================*/

btnRestart.addEventListener("click",() => {

    currentMemory = 0;

    loadMemory(currentMemory);

    stopMusic();
    
    memoryVideo.pause();

    memoryVideo.currentTime = 0;

    /* Reiniciar Escena 4 */

    syncPanel.classList.remove("hide");

    fileInfo.classList.remove("show");

    videoWrapper.classList.remove("show");

    videoWrapper.classList.add("hidden");

    btnLetter.classList.remove("show");

    progressFill.style.width = "0%";

    progressPercent.textContent = "0%";

    syncMessage.textContent = "Inicializando...";

    fileOrigin.textContent = "";

    fileType.textContent = "";

    fileTarget.textContent = "";

    accessStatus.textContent = "";

    systemReady = false;

    showScene(scenes.scene1);

    setTimeout(() => {

        startSystem();

    },500);

});


/*==================================================
    CARTA
==================================================*/

const letter = `

Hola, arañita.

Si descubriste este archivo significa que encontraste el secreto escondido en tu boleto.

Podría haberte invitado con un simple mensaje, pero quería que este momento fuera tan especial como tú. Quería regalarte una pequeña aventura, una que comenzara con curiosidad y terminara aquí, contigo leyendo estas palabras.

En solo unos meses llenaste mi vida de recuerdos que jamás imaginé vivir.

Todavía pienso en aquel 5 de julio, cuando una petición improvisada terminó convirtiéndose en una promesa que hoy seguimos construyendo. Ese día entendí que contigo incluso los momentos más sencillos pueden convertirse en recuerdos que quiero guardar para siempre.

Gracias por ser mi compañero de aventuras, por hacerme reír, por escucharme, por caminar a mi lado y por convertir los días comunes en días que vale la pena recordar.

Quiero que esta sea apenas una de muchas películas, muchos viajes, muchas fotografías, muchas conversaciones hasta la madrugada, muchos abrazos y muchos sueños compartidos.

Y quiero que, cuando algún día volvamos a ver este boleto, podamos sonreír recordando que todo comenzó con un pequeño secreto escondido para ti.

Te amo infinitamente.

Con todo mi amor,

Luz 

❤️

────────────────────────────

Registro almacenado correctamente.

Estado:
Historia en ejecución.

Este archivo permanecerá disponible durante toda nuestra historia.

∞

`;

letterContent.innerHTML = `

<p>${letter.replace(/\n/g, "<br>")}</p>

`;


/*==================================================
    INICIALIZACIÓN
==================================================*/

loadMemory(currentMemory);

showScene(scenes.scene1);

setTimeout(() => {

    startSystem();

},500);

/*==================================================
    EVENTOS DEL VIDEO
==================================================*/

memoryVideo.addEventListener("ended", () => {

    resumeMusic();

    btnLetter.classList.add("show");

});