import React, { FC } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styleBunElement from './bun-element.module.scss';
import clsx from 'clsx';

import { addIngredient } from '../../../services/reducers/constructor-reducer';
import { TIngredientItem } from '../../../utils/types';
import { useDispatch, useSelector } from '../../../utils/hooks';

type TProps = {
  isTop?: boolean;
};

const BunElement: FC<TProps> = ({ isTop = true }): JSX.Element => {
  const constructorBun = useSelector(
    (store) => store.burgerConstructor.constructorBun
  );

  const dispatch = useDispatch();

  const [{ bunDropHover }, bunDropTarget] = useDrop({
    accept: 'bun',
    collect: (monitor: DropTargetMonitor) => ({
      bunDropHover: monitor.isOver(),
    }),
    drop(ingredient: TIngredientItem) {
      dispatch(addIngredient(ingredient));
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
        <div
          className={clsx(
            styleBunElement.empty_bun,
            isTop ? styleBunElement.top : styleBunElement.bottom
          )}
        >
          Добавьте булку
        </div>
      )}
    </div>
  );
};

export default BunElement;
