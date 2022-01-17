import { fb } from '../utils/constants/firebase'
import avatarIcon from '../utils/img/avatar.svg'
import profileIcon from '../utils/img/profile.svg'
import locationIcon from '../utils/img/location.svg'
import './Main.css'

const Main = () => {
    return (
        <div className="main">
            <div className="main__info">
                <div>
                    <img src={avatarIcon} />
                </div>
                <div className='main__info__text'>
                    <h3>Виктор Иванов</h3>
                    <p><img src={locationIcon} />Екатеринбург</p>
                </div>
            </div>
            <div className="main__about">
                <h2>О себе</h2>
                <p>Двукратный олимпийский чемпион по бегу. Создал свою линию кроссовок abibas.</p>
                <div>

                </div>
            </div>
            <div className="main-interests">
                <h2>Интересы</h2>
                <div className="main-interests__wrapper">
                    <div className="main-interests__item">
                        <p className="main-interests__text">Спорт</p>
                    </div>
                    <div className="main-interests__item">
                        <p className="main-interests__text">Бег</p>
                    </div>
                    <div className="main-interests__item">
                        <p className="main-interests__text">100 м спринты</p>
                    </div>
                </div>
            </div>
            <div>
                <h2>Любопытные факты</h2>
                <div className='main-facts__wrapper'>
                    <div className='main-facts__item'>
                        <h5>Основной род деятельность</h5>
                        <p>Работаю маркетологом в крупной компании</p>
                        <button type="button" className="btn btn-link main-facts__btn">Подробнее</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main