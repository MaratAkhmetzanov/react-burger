import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styleBunElement from './bun-element.module.scss';
import clsx from 'clsx';

import { addIngredient } from '../../../services/reducers/constructor-reducer';

const BunElement = ({ isTop = true }) => {
  const constructorBun = useSelector((store) => store.burgerConstructor.constructorBun);

  const dispatch = useDispatch();

  const [{ bunDropHover }, bunDropTarget] = useDrop({
    accept: 'bun',
    collect: (monitor) => ({
      bunDropHover: monitor.isOver(),
    }),
    drop ({ item }) {
      dispatch(addIngredient(item));
    },
  });

  return (
    <div
      className={clsx(
        'ml-8 mr-4',
        bunDropHover ? styleBunElement.bun_dropzone_hover : styleBunElement.bun_dropzone,
        isTop ? styleBunElement.top : styleBunElement.bottom
      )}
      ref={bunDropTarget}
    >
      {constructorBun && (
        <ConstructorElement
          type={isTop ? 'top' : 'bottom'}
          isLocked={true}
          text={constructorBun.name.concat(isTop ? ' (верх)' : ' (низ)')}
          price={constructorBun.price}
          thumbnail={constructorBun.image}
        />
      )}
      {!constructorBun && (
        <div className={clsx(styleBunElement.empty_bun, isTop ? styleBunElement.top : styleBunElement.bottom)}>
          Добавьте булку
        </div>
      )}
    </div>
  );
};

BunElement.propTypes = {
  children: PropTypes.bool,
};

export default BunElement;
