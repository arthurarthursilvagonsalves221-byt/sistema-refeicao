const form = document.getElementById('loginForm');
const user = document.getElementById('user');
const pass = document.getElementById('pass');
const remember = document.getElementById('remember');
const msg = document.getElementById('formMsg');
const forgot = document.getElementById('forgotLink');
const helpBtn = document.getElementById('helpBtn');

const savedUser = localStorage.getItem('sae:user');

if (savedUser) {
  user.value = savedUser;
  remember.checked = true;
}

forgot.addEventListener('click', (e) => {
  e.preventDefault();
  msg.style.color = '#a16207';
  msg.textContent =
    'Para redefinir a senha, procure a coordenação ou TI da escola.';
});

helpBtn.addEventListener('click', () => {
  msg.style.color = '#1e3a8a';
  msg.textContent =
    'Dica: seu usuário costuma ser nome.sobrenome. Senha diferencia maiúsculas e minúsculas.';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  msg.textContent = '';

  if (!user.value.trim()) {
    showError('Informe seu usuário.');
    user.focus();
    return;
  }

  if (!pass.value) {
    showError('Informe sua senha.');
    pass.focus();
    return;
  }

  if (pass.value.length < 4) {
    showError('A senha deve ter pelo menos 4 caracteres.');
    pass.focus();
    return;
  }

  if (remember.checked) {
    localStorage.setItem('sae:user', user.value.trim());
  } else {
    localStorage.removeItem('sae:user');
  }

  setLoading(true);

  setTimeout(() => {
    setLoading(false);

    msg.style.color = '#065f46';
    msg.textContent =
      'Login realizado com sucesso. Redirecionando...';

    setTimeout(() => {
      window.location.href = 'deshboard.html';
    }, 700);

  }, 650);
});

function showError(text) {
  msg.style.color = '#b91c1c';
  msg.textContent = text;
}

function setLoading(isLoading) {
  const btn = form.querySelector('button[type="submit"]');

  btn.disabled = isLoading;
  btn.style.opacity = isLoading ? .8 : 1;
  btn.textContent = isLoading ? 'Entrando...' : 'Entrar';
}