import { Link } from 'react-router-dom';

const NotFound404 = () => {
  return (
    <div >
      <p className='text text_type_digits-large'>404</p>
      <p className='text text_type_main-default text_color_inactive'>Страница не найдена</p>
      <Link to='/'>На главную</Link>
    </div>
  );
};

export default NotFound404;
