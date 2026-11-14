const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

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
