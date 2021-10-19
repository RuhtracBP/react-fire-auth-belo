import { useContext, useState, useRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthContext from '../../contexts/AuthContext';
import { auth, updateProfileName, updateUserEmail } from '../../utils/firebase';

import styles from './Auth.module.scss';

export default function UpdateProfile() {
  const [isAuthenticated, setAuthentication] = useContext(AuthContext);
  const [isButtonDisabled, setButtonState] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  
  if (isAuthenticated === false) return <Redirect to='/' />;
  const oldname = auth.currentUser.displayName;
  const oldemail = auth.currentUser.email;

  async function update(event) {
    event.preventDefault();
    setButtonState(true);

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    try {
      const user = auth.currentUser;
      //console.log(user.displayName);

        user.updateProfile({
            displayName: name ,
        }).then(() => {
            // Update successful
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });  
        user.updateEmail(email).then(() => {
            // Update successful
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
        user.updatePassword(password).then(() => {
            // Update successful.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
      
      //await auth.signInWithEmailAndPassword(email, password); // Force auth.currentUser to update
      setAuthentication(true);
      
      toast.success('Seu Perfil foi atualizado com sucesso.');
      setIsDone(true)
    } catch (error) {
      passwordRef.current.value = '';
      setButtonState(false);
      toast.error(error.message);
    }
  }

    
  if (isDone === true) return <Redirect to='/' />;
  if (isAuthenticated === null) return <Redirect to='/' />;
  return (
    <section className={styles.base}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h2>Atualizar Perfil</h2>
          <form onSubmit={update}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              maxLength="32"
              autoComplete="name"
              spellCheck="false"
              autoFocus
              required
              ref={nameRef}
              value={oldname}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoCapitalize="off"
              autoComplete="email"
              spellCheck="false"
              required
              ref={emailRef}
              value={oldemail}
            />
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="6+ caracteres"
              minLength="6"
              maxLength="100"
              autoComplete="new-password"
              required
              ref={passwordRef}
            />
            <button disabled={isButtonDisabled}>Atualizar Perfil</button>
          </form>
          
        </div>
      </div>
    </section>
  );
}
