import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../elements/Input';
import listIcon from '../../utils/img/list.svg'
import fbIcon from '../../utils/img/fb.svg'
import vkIcon from '../../utils/img/vk.svg'
import googleIcon from '../../utils/img/google.svg'
import okIcon from '../../utils/img/ok.svg'

const Login = ({ user, setUser }) => {
	let navigate = useNavigate()
	const rootEl = useRef(null);
	const sign = (e) => {
		e.preventDefault()
		const { login, pass } = e.target.elements
		if (login.value.includes('@')) {
		signInWithEmailAndPassword(getAuth(), login.value, pass.value)
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
		} else {
			signInWithEmailAndPassword(getAuth(), `${login.value}@tel.com`, pass.value)
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
	}
	// useLayoutEffect(() => {
	// 	if (user) {
	// 		navigate('/user')
	// 	}
	// }, [user])
	useEffect(() => {
		const onClick = e => rootEl.current.contains(e.target) || navigate('/');
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, []);
	return (
		<div className='modal-auth' ref={rootEl}>
			<h2 className='modal-auth__title'><img src={listIcon} />&nbsp;Вход</h2>
			<form onSubmit={sign}>
				<Input type="text" placeholder="" label="Телефон или Email" id="login" defaultValue={''} required={true} />
				<Input type="password" placeholder="" label="Пароль" id="pass" defaultValue={''} required={true} />
				<button type='submit' className='btn btn-app'>Продолжить</button>
			</form>
			<div className='modal-auth__hr'>
				<hr className='separator' />
				<p className='modal-auth__separator-text'>Или</p>
				<hr className='separator' />
			</div>
			<div className='modal-auth__btn-wrapper'>
				<button type='button' className='btn modal-auth__btn'><img src={fbIcon} /></button>
				<button type='button' className='btn modal-auth__btn'><img src={vkIcon} /></button>
				<button type='button' className='btn modal-auth__btn'><img src={okIcon} /></button>
				<button type='button' className='btn modal-auth__btn'><img src={googleIcon} /></button>
			</div>
			<p className='modal-auth__text'>Авторизуясь на сайте, вы принимаете условия<br /><Link to="/privacy">пользовательского соглашения</Link></p>
			<div className='modal-auth__extra-wrapper'><h5>Еще не зарегистрированы?</h5>
				<Link to="/sign"><button type='button' className='btn btn-app btn-width'>Создать аккаунт</button></Link>
			</div>
		</div>
	);
};

export default Login