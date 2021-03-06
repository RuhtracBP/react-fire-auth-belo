import { useContext, useState, useRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthContext from '../../contexts/AuthContext';
import { auth } from '../../utils/firebase';
import styles from './Auth.module.scss';

export default function Login() {
  const [isAuthenticated, setAuthentication] = useContext(AuthContext);
  const [isButtonDisabled, setButtonState] = useState(false);
  const emailRef = useRef('');
  const passwordRef = useRef('');

  async function login(event) {
    event.preventDefault();
    setButtonState(true);

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setAuthentication(true);
      toast.success('Logado com Sucesso');
    } catch (error) {
      let message = '';
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'Não há conta vinculada à esse Email';
          break;
        case 'auth/wrong-password':
          message = 'Senha incorreta';
          break;
        default:
          message = error.message;
      }
      passwordRef.current.value = '';
      setButtonState(false);
      toast.error(message);
    }
  }

  if (isAuthenticated === null) return null;
  if (isAuthenticated === true) return <Redirect to='/' />;
  return (
    <section className={styles.base}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h2>Entrar</h2>
          <form onSubmit={login}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoCapitalize="off"
              autoComplete="email"
              spellCheck="false"
              autoFocus
              required
              ref={emailRef}
            />
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              ref={passwordRef}
            />
            <button disabled={isButtonDisabled}>Logar</button>
          </form>
          <p>Não possui conta? <Link to="/signup">Cadastre-se</Link></p>
        </div>
      </div>
    </section>
  );
}
