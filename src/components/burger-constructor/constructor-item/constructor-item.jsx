import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styleConstructorItem from './constructor-item.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import dataIngredientsType from '../../../utils/types';
import { deleteIngredient } from '../../../services/reducers/constructor-reducer';

const ConstructorItem = ({ ingredient, index, moveItem }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructorItem',
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover (item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorItem',
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const deleteIngredientHandler = (position) => {
    dispatch(deleteIngredient(position));
  };

  const dispatch = useDispatch();

  return (
    <div
      className={clsx(styleConstructorItem.drag_element, isDragging ? styleConstructorItem.hide : '')}
      ref={ref}
      data-handler-id={handlerId}
    >
      <div className={styleConstructorItem.drag_icon}>
        <DragIcon type='primary' />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => deleteIngredientHandler(ingredient.position)}
      />
    </div>
  );
};

ConstructorItem.propTypes = {
  ingredient: dataIngredientsType.isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
};

export default ConstructorItem;
