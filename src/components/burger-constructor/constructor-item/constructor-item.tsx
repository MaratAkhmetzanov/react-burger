import React, { FC, useRef } from 'react';
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styleConstructorItem from './constructor-item.module.scss';
import clsx from 'clsx';

import { deleteIngredient } from '../../../services/reducers/constructor-reducer';
import { TConstructorItem } from '../../../utils/types';
import { useDispatch } from '../../../utils/hooks';

type TProps = {
  constructorIngredient: TConstructorItem;
  index: number;
  moveItemHandler: (dragIndex: number, hoverIndex: number) => void;
};

const ConstructorItem: FC<TProps> = ({ constructorIngredient, index, moveItemHandler }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructorItem',
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(ingredient: any, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = ingredient.index;
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
      moveItemHandler(dragIndex, hoverIndex);
      ingredient.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorItem',
    item: () => {
      return { index };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const deleteIngredientHandler = (position: string): void => {
    dispatch(deleteIngredient(position));
  };

  return (
    <div
      className={clsx(
        styleConstructorItem.drag_element,
        isDragging ? styleConstructorItem.hide : ''
      )}
      ref={ref}
      data-handler-id={handlerId}
    >
      <div className={styleConstructorItem.drag_icon}>
        <DragIcon type='primary' />
      </div>
      <ConstructorElement
        text={constructorIngredient.name}
        price={constructorIngredient.price}
        thumbnail={constructorIngredient.image}
        handleClose={() => deleteIngredientHandler(constructorIngredient.position)}
      />
    </div>
  );
};

export default ConstructorItem;
