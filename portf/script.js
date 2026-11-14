const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

const siteHeader = document.querySelector(".site-header");
const headerNav = siteHeader.querySelector(".section-nav");
const lightSurfaces = document.querySelectorAll('[data-header-theme="dark"]');
let headerFrame = 0;

function updateHeaderTheme() {
  headerFrame = 0;
  const headerRect = siteHeader.getBoundingClientRect();
  const sampleY = headerRect.top + headerRect.height / 2;
  const sampleX = headerRect.left + headerRect.width / 4;
  const overLightSurface = Array.from(lightSurfaces).some((surface) => {
    const rect = surface.getBoundingClientRect();
    return sampleY >= rect.top && sampleY < rect.bottom &&
      sampleX >= rect.left && sampleX < rect.right;
  });
  headerNav.classList.toggle("section-nav--light", !overLightSurface);
}

function scheduleHeaderUpdate() {
  if (!headerFrame) headerFrame = requestAnimationFrame(updateHeaderTheme);
}

window.addEventListener("scroll", scheduleHeaderUpdate, { passive: true });
window.addEventListener("resize", scheduleHeaderUpdate);
window.addEventListener("pageshow", scheduleHeaderUpdate);
new ResizeObserver(scheduleHeaderUpdate).observe(document.body);
updateHeaderTheme();

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const subject = `Новый проект — ${formData.get("name")}`;
  const body = [
    `Имя: ${formData.get("name")}`,
    `E-mail: ${formData.get("email")}`,
    "",
    String(formData.get("message")),
  ].join("\n");

  formStatus.textContent = "Открываем почтовое приложение…";
  window.location.href = `mailto:luchikviki@yandex.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
