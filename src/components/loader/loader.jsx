import styleLoader from './loader.module.scss';

const Loader = () => {
  return (
    <div className={styleLoader.wrapper}>
      <div className={styleLoader.loader}>Loading...</div>
    </div>
  );
};

export default Loader;
