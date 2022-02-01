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
	const VK = window.VK
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
			}).then(() => navigate('/user'))
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
			}).then(() => navigate('/user'))
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage)
			})
		}
	}
	useLayoutEffect(() => {
		if (user && user !== 'loading') {
			window.location = '/user'
		}
	}, [])
	useEffect(() => {
		const onClick = e => rootEl.current.contains(e.target) || navigate('/');
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, []);

	const vkAuth = () => {
		fetch('https://oauth.vk.com/authorize?client_id=9vjYxZSmwaueIFw0pZsV&redirect_uri=http://pprofile.ru/user&scope=4194304&display=page').then((res) => res.json()).then((result) => {
			console.log('fetch', result)
		})
		VK.Api.call("VKWebAppGetAuthToken", {"app_id": 8066128, "scope": "status"}, (res) => {
			console.log('api call', res)
		});
		VK.Auth.login((r) => {
      if (r.session) {
        let username = r.session.user.first_name;

        console.log('success: ', r.session)
      } else {
        console.log('error: ', r.session)
      }
    }, 4);
	}
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
				<button type='button' className='btn modal-auth__btn' onClick={vkAuth}><img src={vkIcon} /></button>
				<button type='button' className='btn modal-auth__btn'><img src={okIcon} /></button>
				<button type='button' className='btn modal-auth__btn'><img src={googleIcon} /></button>
			</div>
			<p className='modal-auth__text'>Авторизуясь на сайте, вы принимаете условия<br /><Link to="/privacy">пользовательского соглашения</Link></p>
			<div className='modal-auth__extra-wrapper'><h5>Еще не зарегистрированы?</h5>
				<div className='btn-app-wrap'><Link to="/sign"><button type='button' className='btn btn-app btn-width'>Создать аккаунт</button></Link>
				</div>
			</div>
		</div>
	);
};

export default Login