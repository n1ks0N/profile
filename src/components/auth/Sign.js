import { getAuth, createUserWithEmailAndPassword, signInWithPhoneNumber } from 'firebase/auth';
import { useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { doc, setDoc, getFirestore } from "firebase/firestore";
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
			createUserWithEmailAndPassword(getAuth(), login.value, pass.value)
				.then((userCredential) => {
					// Signed in 
					const user = userCredential.user;
					setDoc(doc(getFirestore(), "users", user.email), {
						mail: user.email,
						name: '',
						surname: '',
						city: '',
						phone: '',
						interests: [],
						about: '',
						videos: [],
						facts: [],
						id: user.uid.slice(0, 6),
						avatar: 'https://firebasestorage.googleapis.com/v0/b/profile-2e8aa.appspot.com/o/profile.svg?alt=media&token=c361b04d-62ea-4037-b820-204c37dd75aa'
					}).then(() => {
						setUser(user)
						navigate('/user/settings/profile')
					})
					document.cookie += 'account=true'
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorCode, errorMessage)
				})
		} else {
			createUserWithEmailAndPassword(getAuth(), `${login.value}@tel.com`, pass.value)
				.then((userCredential) => {
					// Signed in 
					const user = userCredential.user;
					setDoc(doc(getFirestore(), "users", user.email), {
						mail: user.email,
						name: '',
						surname: '',
						city: '',
						phone: '',
						interests: [],
						about: '',
						videos: [],
						facts: [],
						id: user.uid.slice(0, 6),
						avatar: 'https://firebasestorage.googleapis.com/v0/b/profile-2e8aa.appspot.com/o/profile.svg?alt=media&token=c361b04d-62ea-4037-b820-204c37dd75aa'
					}).then(() => {
						setUser(user)
						navigate('/user/settings/profile')
					})
					document.cookie += 'account=true'
				})
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
	return (
		<div className='modal-auth' ref={rootEl}>
			<h2 className='modal-auth__title'><img src={listIcon} />&nbsp;??????????????????????</h2>
			<form onSubmit={sign}>
				<Input type="text" placeholder="" label="?????????????? ?????? Email" id="login" defaultValue={''} required={true} />
				<Input type="password" placeholder="" label="????????????" id="pass" defaultValue={''} required={true} />
				<button type='submit' className='btn btn-app'>????????????????????</button>
			</form>
			<div className='modal-auth__hr'>
				<hr className='separator' />
				<p className='modal-auth__separator-text'>??????</p>
				<hr className='separator' />
			</div>
			<div className='modal-auth__btn-wrapper'>
				<button type='button' className='btn modal-auth__btn'><img src={fbIcon} /></button>
				<button type='button' className='btn modal-auth__btn'><img src={vkIcon} /></button>
				<button type='button' className='btn modal-auth__btn'><img src={okIcon} /></button>
				<button type='button' className='btn modal-auth__btn'><img src={googleIcon} /></button>
			</div>
			<p className='modal-auth__text'>?????????????????????? ???? ??????????, ???? ???????????????????? ??????????????<br /><Link to="/privacy">?????????????????????????????????? ????????????????????</Link></p>
			<div className='modal-auth__extra-wrapper'><h5>?????? ???????? ???????????????</h5>
				<div className='btn-app-wrap'>
					<Link to="/login"><button type='button' className='btn btn-app btn-width'>??????????</button></Link>
				</div>
			</div>
		</div>
	);
};

export default Login