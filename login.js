const $ = selector => document.querySelector(selector);
const form = $("#loginForm");
const password = $("#loginPassword");

$("#togglePassword").addEventListener("click", () => {
  const showing = password.type === "text";
  password.type = showing ? "password" : "text";
  $("#togglePassword").textContent = showing ? "Mostrar" : "Ocultar";
});

form.addEventListener("submit", event => {
  event.preventDefault();
  const email = $("#loginEmail").value.trim();
  const pass = password.value;
  const feedback = $("#loginFeedback");
  if (!email || !pass) {
    feedback.textContent = "Preencha seu e-mail e sua senha.";
    return;
  }
  // Fluxo apenas demonstrativo: não confirma identidade nem autentica no servidor.
  const demoUser = { email, signedInAt: new Date().toISOString() };
  const storage = $("#rememberMe").checked ? localStorage : sessionStorage;
  storage.setItem("nexusDemoUser", JSON.stringify(demoUser));
  feedback.textContent = "Acesso demonstrativo realizado! Voltando para a loja...";
  setTimeout(() => { window.location.href = "index.html"; }, 1200);
});

$("#forgotPassword").addEventListener("click", () => {
  $("#loginFeedback").textContent = "recurso não disponível,tente novamente mais tarde.";
});

$("#createAccount").addEventListener("click", event => {
  event.preventDefault();
  $("#loginFeedback").textContent = "Orçamento acabou :P,recarregue seus créditos para fazer cadastro.";
});
