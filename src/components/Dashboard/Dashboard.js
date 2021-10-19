/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { auth } from '../../utils/firebase';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  //console.log(auth.currentUser);
  const [isAuthenticated, setAuthentication] = useContext(AuthContext);
 

  async function deleteUser(event) {
      try {
        await auth.currentUser.delete();
        setAuthentication(false);
        toast.success('Usuário excluído');
      } catch (error) {
        toast.error('É preciso estar logado para excluir um usuário.');
      } finally {
        //do
      }
    
  
  }

  useEffect(() => {
    // Debug: press 0 to delete user
    window.addEventListener('keyup', deleteUser);

    // Create confetti effect
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return () => {
      // Clear confetti effect
      clearInterval(interval);
      confetti.reset();

      // Remove event listener
      window.removeEventListener('keyup', deleteUser);
    };
  }, [isAuthenticated])

  if (isAuthenticated === false) return <Redirect to='/' />
  return (
    <section className={styles.base}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Bem Vindo {auth.currentUser.displayName}!</h1>
        <div className={styles.buttonWrapper}>  
          <button><Link to="/UpdateProfile">Atualizar Perfil</Link></button>
          <button onClick={deleteUser}>Excluir Conta</button>
        </div>
        
      </div>
    </section>
  );
}
