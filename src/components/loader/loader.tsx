import { FC } from 'react';
import styleLoader from './loader.module.scss';

const Loader: FC = (): JSX.Element => {
  return (
    <div className={styleLoader.wrapper}>
      <div className={styleLoader.loader}>Loading...</div>
    </div>
  );
};

export default Loader;
