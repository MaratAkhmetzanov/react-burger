import clsx from 'clsx';
import ProfileNav from '../../components/profile/profile-nav/profile-nav';
import ProfileOrders from '../../components/profile/profile-orders/profile-orders';

import styleProfile from './profile.module.scss';

const ProfileOrdersPage = () => {
  return (
    <div className={clsx(styleProfile.wrapper, 'pt-20')}>
      <ProfileNav className='mr-15'>В этом разделе вы можете просмотреть свою историю заказов</ProfileNav>
      <ProfileOrders />
    </div>
  );
};

export default ProfileOrdersPage;
