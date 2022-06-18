import React from "react";
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styleConstructor from "./burger-constructor.module.scss";
import "./constructor.css";
import classNames from "classnames";
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

const Total = () => {
  return (
    <div className={classNames(styleConstructor.total, "pt-6")}>
      <div className={classNames(styleConstructor.total_price, "mr-10")}>
        <span className="text text_type_digits-medium mr-2">1256</span><CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  )
}

class BurgerConstructor extends React.Component {
  render () {
    const data = this.props.data;
    const ingretients = data.filter(({ type }) => type !== "bun");
    const bun = data.find(({ type }) => type === "bun");

    return (
      <section className={classNames(styleConstructor.content, "pl-4")}>
        <div className={classNames(styleConstructor.wrapper, "mt-25")}>
          <div className="pl-8 pr-4">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name.concat(" (верх)")}
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
            <div className={classNames(styleConstructor.catalog, "pr-4")}>
              {ingretients.map((ingretient, index) => (
                <div className={styleConstructor.drag_element} key={index}>
                  <DragIcon type="primary" />
                  <ConstructorElement

                    text={ingretient.name}
                    price={ingretient.price}
                    thumbnail={ingretient.image}
                  />
                </div>
              ))}
            </div>
          </Scrollbars>
          <div className="pl-8 pr-4">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name.concat(" (низ)")}
              price={bun.price}
              thumbnail={bun.image}
            /></div>
        </div >
        <Total />
      </section >
    );
  }
}

const dataIngredients = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
})

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataIngredients)
}

export default BurgerConstructor;