document.addEventListener("DOMContentLoaded", () => {
  // Verificación visual de carga de script
  const body = document.body;
  if (body) {
    const scriptOk = document.createElement("div");
    scriptOk.id = "script-ok-msg";
    scriptOk.style.position = "fixed";
    scriptOk.style.bottom = "10px";
    scriptOk.style.right = "10px";
    scriptOk.style.background = "rgba(0,0,0,0.7)";
    scriptOk.style.color = "#fff";
    scriptOk.style.padding = "8px 16px";
    scriptOk.style.borderRadius = "8px";
    scriptOk.style.fontSize = "1rem";
    scriptOk.style.zIndex = "9999";
    scriptOk.innerText = "Script cargado correctamente";
    body.appendChild(scriptOk);
    setTimeout(() => scriptOk.remove(), 2500);
  }

  // Fecha objetivo: 03 de Marzo de 2026 (Formato ISO para mayor compatibilidad)
  const targetDate = new Date("2026-03-03T00:00:00").getTime();
  // Verificar si la fecha es válida
  if (isNaN(targetDate)) {
    alert("Error: Fecha objetivo inválida");
    console.error("Fecha objetivo inválida");
    return;
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
      alert("Error: No se encontraron los elementos del contador en el HTML");
      console.error("Elementos del contador no encontrados");
      return;
    }

    if (distance < 0) {
      daysElement.innerText = "00";
      hoursElement.innerText = "00";
      minutesElement.innerText = "00";
      secondsElement.innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysElement.innerText = days.toString().padStart(2, "0");
    hoursElement.innerText = hours.toString().padStart(2, "0");
    minutesElement.innerText = minutes.toString().padStart(2, "0");
    secondsElement.innerText = seconds.toString().padStart(2, "0");
  }

  // Actualizar cada segundo
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Generar globos animados
  const balloonsContainer = document.getElementById("balloons-container");
  if (balloonsContainer) {
    const colors = [
      "#ff5e5e",
      "#ffc107",
      "#00bcd4",
      "#e91e63",
      "#9c27b0",
      "#4caf50",
      "#ff9800",
    ];

    function createBalloon() {
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");

      // Posición aleatoria horizontal
      const left = Math.random() * 100;
      balloon.style.left = `${left}%`;

      // Color aleatorio
      const color = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.background = color;
      balloon.style.color = color; // Para el triangulo

      // Duración aleatoria
      const duration = 10 + Math.random() * 10;
      balloon.style.animationDuration = `${duration}s`;

      // Tamaño aleatorio
      const scale = 0.5 + Math.random() * 0.8;
      balloon.style.transform = `scale(${scale})`;

      balloonsContainer.appendChild(balloon);

      // Eliminar globo después de la animación para no saturar el DOM
      setTimeout(() => {
        balloon.remove();
      }, duration * 1000);
    }

    // Crear globos iniciales
    for (let i = 0; i < 15; i++) {
      setTimeout(createBalloon, i * 1000); // Escalonar la creación
    }

    // Crear globos continuamente
    setInterval(createBalloon, 2000);
  }

  // Confeti
  if (typeof confetti !== "undefined") {
    function launchConfetti() {
      var duration = 3 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          }),
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          }),
        );
      }, 250);
    }

    // Lanzar confeti al cargar
    launchConfetti();

    // Botón de celebrar
    const celebrateBtn = document.getElementById("celebrate-btn");
    if (!celebrateBtn) {
      alert("Error: No se encontró el botón de celebrar en el HTML");
      console.error("Botón de celebrar no encontrado");
    } else {
      celebrateBtn.addEventListener("click", () => {
        // Animar botón
        celebrateBtn.classList.add("bottle-pop");
        setTimeout(() => celebrateBtn.classList.remove("bottle-pop"), 500);

        // Disparar confeti explosivo
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        // Lluvia de emojis de celebración
        const celebrationEmojis = ["🍾", "🥂", "🎉", "🎈", "🎂", "🎁"];
        const emojiContainer = document.createElement("div");
        emojiContainer.style.position = "fixed";
        emojiContainer.style.top = "50%";
        emojiContainer.style.left = "50%";
        emojiContainer.style.transform = "translate(-50%, -50%)";
        emojiContainer.style.fontSize = "4rem";
        emojiContainer.style.pointerEvents = "none";
        emojiContainer.style.zIndex = "100";
        document.body.appendChild(emojiContainer);

        let counter = 0;
        const interval = setInterval(() => {
          const emoji = document.createElement("span");
          emoji.innerText =
            celebrationEmojis[
              Math.floor(Math.random() * celebrationEmojis.length)
            ];
          emoji.style.position = "absolute";
          emoji.style.left = `${(Math.random() - 0.5) * 500}px`;
          emoji.style.top = `${(Math.random() - 0.5) * 500}px`;
          emoji.style.opacity = "0";
          emoji.style.transition = "all 1s ease-out";

          emojiContainer.appendChild(emoji);

          // Animar entrada
          requestAnimationFrame(() => {
            emoji.style.opacity = "1";
            emoji.style.transform = `scale(1.5)`;
          });

          // Eliminar
          setTimeout(() => {
            emoji.style.opacity = "0";
            setTimeout(() => emoji.remove(), 1000);
          }, 1000);

          counter++;
          if (counter > 20) clearInterval(interval);
        }, 100);

        setTimeout(() => {
          emojiContainer.remove();
        }, 4000);
      });
    }
  }
});
