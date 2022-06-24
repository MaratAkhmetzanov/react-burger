import React, { useState } from 'react';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styleConstructor from './burger-constructor.module.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import dataIngredientsType from '../../utils/types';
import clsx from 'clsx';
import OrderDetails from '../order-details/order-details';

import Modal from '../modal/modal';

const Total = React.memo(() => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleOpenModal = () => {
    setModalVisibility(true);
  }

  const handleCloseModal = () => {
    setModalVisibility(false);
  }

  return (
    <div className={clsx(styleConstructor.total, 'pt-6')}>
      <div className={clsx(styleConstructor.total_price, 'mr-10')}>
        <span className='text text_type_digits-medium mr-2'>1256</span>
        <CurrencyIcon type='primary' />
      </div>
      <Button type='primary' size='large' onClick={handleOpenModal}>
        Оформить заказ
      </Button>
      {modalVisibility &&
        <Modal closeModal={handleCloseModal}><OrderDetails /></Modal>}
    </div>
  )
})

const BurgerConstructor = ({ data }) => {

  const ingretients = data.filter(({ type }) => type !== 'bun');
  const bun = data.find(({ type }) => type === 'bun');

  return (
    <section className={clsx(styleConstructor.content, 'pl-4')}>
      <div className={clsx(styleConstructor.wrapper, 'mt-25')}>
        <div className='pl-8 pr-4'>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={bun.name.concat(' (верх)')}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <Scrollbars
          autoHeight={true}
          thumbMinSize={120}
          autoHeightMin={window.innerHeight - 536}
          renderTrackVertical={props => <div className={styleConstructor.track_vertical} />}
          renderThumbVertical={props => <div className={styleConstructor.thumb_vertical} />}
        >
          <div className={clsx(styleConstructor.catalog, 'pr-4')}>
            {ingretients.map((ingretient) => (
              <div className={styleConstructor.drag_element} key={ingretient._id}>
                <DragIcon type='primary' />
                <ConstructorElement
                  text={ingretient.name}
                  price={ingretient.price}
                  thumbnail={ingretient.image}
                />
              </div>
            ))}
          </div>
        </Scrollbars>
        <div className='pl-8 pr-4'>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bun.name.concat(' (низ)')}
            price={bun.price}
            thumbnail={bun.image}
          /></div>
      </div >
      <Total />
    </section >
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataIngredientsType).isRequired
}

export default BurgerConstructor;