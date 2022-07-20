import AppHeader from '../app-header/app-header';
import PropTypes from 'prop-types';

import styleAppWrapper from './app-wrapper.module.scss';

const AppWrapper = ({ children }) => {
  return (
    <div className={styleAppWrapper.wrapper}>
      <AppHeader />
      <main className={styleAppWrapper.content}>{children}</main>
    </div>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
