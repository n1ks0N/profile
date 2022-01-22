import avatarIcon from '../utils/img/avatar.svg'
import profileIcon from '../utils/img/profile.svg'
import locationIcon from '../utils/img/location.svg'
import './Main.css'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/pagination"

import SwiperCore, {
    FreeMode, Pagination
} from 'swiper';
SwiperCore.use([FreeMode, Pagination]);

const Main = () => {
    return (
        <div className="main">
            <div className="main__info">
                <div>
                    <img src={avatarIcon} alt='Avatar' />
                </div>
                <div className='main__info__text-wrapper'>
                    <h3 className='main__info__name'>Виктор Иванов</h3>
                    <p className='main__info__location'><img src={locationIcon} alt="Location" />&nbsp;Екатеринбург</p>
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
                <Swiper slidesPerView={'auto'} spaceBetween={20} freeMode={true} className="mySwiper">
                    <SwiperSlide>
                        <div className="main-interests__item">
                            <p className="main-interests__text">Спорт</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="main-interests__item">
                            <p className="main-interests__text">Бег</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="main-interests__item">
                            <p className="main-interests__text">100 м спринты</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className='main-facts'>
                <h2>Любопытные факты</h2>
                <Swiper slidesPerView={'auto'} spaceBetween={20} freeMode={true} className="mySwiper">
                    <SwiperSlide>
                    <div className='main-facts__item'>
                        <h5 className='main-facts__title'>Основной род деятельность</h5>
                        <p className='main-facts__text'>Работаю маркетологом в крупной компании</p>
                        <button type="button" className="btn btn-link main-facts__btn">Подробнее</button>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className='main-facts__item'>
                        <h5 className='main-facts__title'>Любимый цвет</h5>
                        <p className='main-facts__text'>Сейчас играю в филармонии.</p>
                        <button type="button" className="btn btn-link main-facts__btn"></button>
                    </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default Main