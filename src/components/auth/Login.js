import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Login = ({user, setUser}) => {
	let navigate = useNavigate()
	const inputLoginRef = useRef('')
	const inputPassRef = useRef('')
	const sign = () => {
		signInWithEmailAndPassword(getAuth(), inputLoginRef.current.value, inputPassRef.current.value)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			setUser(user)
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage)
		});
	}
	useEffect(() => {
		if (user) {
			navigate('/user')
		}
	}, [user])
  return (
    <div>
			<h2>Вход</h2>
			<div>
				<label>Телефон или Email</label>
				<input type='text' className='input' ref={inputLoginRef} />
			</div>
			<div>
				<label>Пароль</label>
				<input type='password' className='input' ref={inputPassRef} />
			</div>
			<button type='button' className='btn' onClick={() => sign()}>Продолжить</button>
			<hr />
			<div>
			<button type='button' className='btn'>FB</button>
			<button type='button' className='btn'>VK</button>
			<button type='button' className='btn'>OK</button>
			<button type='button' className='btn'>Google</button>
			</div>
			<p>Авторизуясь на сайте, вы принимаете условия <Link to="/privacy">пользовательского соглашения</Link></p>
			<p>Еще не зарегистрированы?</p>
			<Link to="/sign"><button type='button' className='btn'>Создать аккаунт</button></Link>
    </div>
  );
};

export default Login