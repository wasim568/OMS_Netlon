fetch("data.json")
  .then(res => res.json())
  .then(data => init(data));

const selected = {};

function init(data) {
  createSection("Installation For", data.installationFor, "install");
  createSection("Mesh Type", data.meshTypes, "mesh");
  createSection("Frame Type", data.frameTypes, "frame");
}

function createSection(title, items, key) {
  const container = document.getElementById("steps");

  const section = document.createElement("div");
  section.className = "option-section";

  section.innerHTML = `<h3>${title}</h3><div class="option-grid"></div>`;
  const grid = section.querySelector(".option-grid");

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "option-card";
    card.innerHTML = `
      <img src="${item.image}">
      <h4>${item.name}</h4>
      <p>${item.description || ""}</p>
    `;

    card.onclick = () => {
      selected[key] = item;
      updateSummary();
      document.querySelectorAll(`.option-card`).forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    };

    grid.appendChild(card);
  });

  container.appendChild(section);
}

function updateSummary() {
  const list = document.getElementById("summaryList");
  list.innerHTML = "";

  Object.values(selected).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    list.appendChild(li);
  });
}
const slider = document.getElementById("gallerySlider");

/* BUTTON SCROLL */
function scrollGallery(direction){
  const width = slider.clientWidth;
  slider.scrollBy({
    left: direction * width,
    behavior: "smooth"
  });
}

/* SWIPE / DRAG SUPPORT */
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", e => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => isDown = false);
slider.addEventListener("mouseup", () => isDown = false);

slider.addEventListener("mousemove", e => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});

/* TOUCH (MOBILE) */
slider.addEventListener("touchstart", e => {
  startX = e.touches[0].pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", e => {
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});

/* CONTACT POPUP */
function openContact(){
  document.getElementById("contactPopup").classList.add("active");
}
function closeContact(){
  document.getElementById("contactPopup").classList.remove("active");
}

function openContact(){
  document.getElementById("contactPopup").classList.add("active");
}
function closeContact(){
  document.getElementById("contactPopup").classList.remove("active");
}