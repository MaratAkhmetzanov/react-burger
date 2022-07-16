import clsx from 'clsx';
import AppWrapper from '../../components/app-wrapper/app-wrapper';
import Profile from '../../components/profile/profile';
import ProfileNav from '../../components/profile/profile-nav/profile-nav';

import styleProfile from './profile.module.scss';

const ProfilePage = () => {
  return (
    <AppWrapper>
      <div className={clsx(styleProfile.wrapper, 'pt-20')}>
        <ProfileNav className='mr-15'>В этом разделе вы можете изменить свои персональные данные</ProfileNav>
        <Profile />
      </div>
    </AppWrapper>
  );
};

export default ProfilePage;
