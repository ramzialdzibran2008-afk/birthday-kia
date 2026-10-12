
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const instruction = document.getElementById("instruction");

const surpriseBtn = document.getElementById("surpriseBtn");
const extraMessage = document.getElementById("extraMessage");

const heartsContainer = document.getElementById("hearts");

let isOpen = false;

// Buka dan tutup amplop
envelope.addEventListener("click", () => {
  isOpen = !isOpen;

  envelope.classList.toggle("open", isOpen);
  letter.classList.toggle("hidden", !isOpen);

  envelope.setAttribute("aria-expanded", String(isOpen));
  letter.setAttribute("aria-hidden", String(!isOpen));

  instruction.innerHTML = isOpen
    ? "Awww, suratnya terbuka! 💗<br><span>Semoga kamu suka kejutan kecil ini.</span>"
    : "Psstt... ada surat rahasia buat kamu!<br><span>Arahkan panahmu ke amplop, lalu klik yaa ↓</span>";

  if (isOpen) {
    setTimeout(() => {
      letter.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 350);
  } else {
    extraMessage.classList.add("hidden");

    surpriseBtn.textContent = "Ada satu hal lagi... 🤭";
  }
});

// Tombol pesan rahasia
surpriseBtn.addEventListener("click", () => {
  const isHidden = extraMessage.classList.contains("hidden");

  extraMessage.classList.toggle("hidden", !isHidden);

  surpriseBtn.textContent = isHidden
    ? "Ihh, aku jadi malu! 💗"
    : "Ada satu hal lagi... 🤭";

  if (isHidden) {
    extraMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

    // Hati tambahan saat kejutan dibuka
    for (let i = 0; i < 12; i++) {
      setTimeout(createHeart, i * 100);
    }
  }
});

// Hati beterbangan
const heartSymbols = ["♡", "♥", "💗", "💕", "💖", "✧"];
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function createHeart() {
  if (reduceMotion) return;

  const heart = document.createElement("span");

  heart.className = "heart-particle";
  heart.textContent =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (12 + Math.random() * 18) + "px";
  heart.style.animationDuration = (7 + Math.random() * 7) + "s";

  heartsContainer.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  }, { once: true });

  // Cadangan supaya elemen tidak menumpuk
  setTimeout(() => heart.remove(), 16000);
}

// Buat hati berkala
if (!reduceMotion) {
  setInterval(createHeart, 700);
}
