import { Link } from 'react-router-dom';
import style404 from './404.module.scss';

const NotFound404 = () => {
  return (
    <div className={style404.wrapper}>
      <p className='text text_type_digits-large'>404</p>
      <p className='text text_type_main-default text_color_inactive'>Страница не найдена</p>
      <Link to='/'>На главную</Link>
    </div>
  );
};

export default NotFound404;
