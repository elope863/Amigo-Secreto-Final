let amigos = [];
let animationInterval;

// Color Management
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const updateColors = () => {
    const randomColor = getRandomColor();
    const textColor = getContrastColor(randomColor);
    
    document.body.style.backgroundColor = randomColor;
    document.body.style.color = textColor;
    
    document.querySelectorAll('.main-title, .section-title, button')
        .forEach(el => el.style.color = textColor);
};



// Friend Management
const agregarAmigo = () => {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (!/^[a-zA-Z0-9]+$/.test(nombre)) {
        alert("Nombre debe ser alfanumérico");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya existe");
        return;
    }

    amigos.push(nombre);
    input.value = "";
    renderizarAmigos();
    
    gsap.to(".input-wrapper", {
        duration: 0.3,
        scale: 1.05,
        yoyo: true,
        repeat: 1
    });
};

const renderizarAmigos = () => {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    amigos.forEach((amigo, index) => {
        const item = document.createElement("li");
        item.className = "friend-item";
        item.textContent = amigo;
        
        gsap.from(item, {
            duration: 0.5,
            opacity: 0,
            x: -50,
            delay: index * 0.1
        });

        if (index === amigos.length - 1) {
            item.classList.add("resaltado");
            setTimeout(() => item.classList.remove("resaltado"), 1000);
        }
        
        lista.appendChild(item);
    });
};

// Drawing Logic
const sortearAmigo = async () => {
    if (amigos.length < 2) {
        alert("Necesitas al menos 2 amigos");
        return;
    }

    showOverlay();
    
    gsap.to(".main-content", {
        duration: 0.3,
        filter: "blur(5px)",
        opacity: 0.7
    });

    const resultado = document.getElementById("resultado");
    let counter = 0;
    
    animationInterval = setInterval(() => {
        resultado.textContent = amigos[counter % amigos.length];
        counter++;
    }, 100);

    setTimeout(() => {
        clearInterval(animationInterval);
        const winner = amigos[Math.floor(Math.random() * amigos.length)];
        showResult(winner);
        animateConfetti();
        resetState();
    }, 3000);
};

// UI Helpers
const showOverlay = () => {
    gsap.to("#overlay", { duration: 0.3, opacity: 1, display: "flex" }); // Show overlay
    document.getElementById("overlay").style.display = "flex"; // Ensure overlay is displayed

};

const hideOverlay = () => {
    gsap.to("#overlay", { duration: 0.3, opacity: 0, display: "none" });
};

const showResult = (winner) => {
    const resultCard = document.getElementById("resultCard");
    document.getElementById("resultText").textContent = winner;
    
    gsap.from(resultCard, {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        ease: "back.out(1.7)"
    });
    
    resultCard.style.display = "block"; // Show result card
    document.getElementById("overlay").style.display = "flex"; // Ensure overlay is displayed

    document.getElementById("drawnImage").style.display = "block";
};

const closeResult = () => {
    gsap.to("#resultCard", { // Hide result card

        duration: 0.3,
        scale: 0,
        opacity: 0,
        onComplete: () => {
            document.getElementById("resultCard").style.display = "none";
            hideOverlay();
        }
    });
};

const resetState = () => {
    amigos = [];
    renderizarAmigos();
    gsap.to(".main-content", {
        duration: 0.3,
        filter: "none",
        opacity: 1
    });
};

// Confetti Animation
const animateConfetti = () => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    const fire = (ratio, opts) => {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * ratio)
        }));
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
};

// Event Listeners
document.querySelector('.button-add').addEventListener('click', agregarAmigo);
document.querySelector('.button-add').addEventListener('touchend', (e) => {
    e.preventDefault();
    agregarAmigo();
});

document.getElementById('amigo').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarAmigo();
});

window.addEventListener('load', () => {
    updateColors();
    gsap.from(".header-banner", { duration: 1, y: -100, opacity: 0 });
    gsap.from(".input-section", { duration: 1, y: 100, opacity: 0, delay: 0.2 });
});
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });

// Event Listeners
document.querySelector('.button-add').addEventListener('click', agregarAmigo);
document.querySelector('.button-add').addEventListener('touchend', (e) => {
    e.preventDefault();
    agregarAmigo();
});

document.getElementById('amigo').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarAmigo();
});

// Initialization
window.addEventListener('load', () => {
    updateColors();
    gsap.from(".header-banner", { duration: 1, y: -100, opacity: 0 });
    gsap.from(".input-section", { duration: 1, y: 100, opacity: 0, delay: 0.2 });
});

const showLoading = () => {
    const loader = document.getElementById('overlay');
    const spinner = loader.querySelector('.loading-spinner');
    spinner.className = 'loader progress-bar'; // Change class to progress bar

    
    // Use current text color for progress bar
    spinner.className = 'loader progress-bar';
    spinner.style.color = getContrastColor(document.body.style.backgroundColor);
    
    gsap.to("#overlay", { 
      duration: 0.3, 
      opacity: 1, 
      display: "flex",
      onStart: () => {
        gsap.from(".loader.progress-bar::after", {

          duration: 2,
          width: "0%",
          repeat: -1,
          ease: "power2.inOut"
        });
      }
    });
  };
