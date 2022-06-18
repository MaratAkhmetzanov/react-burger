import React from "react";
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styleIngredients from "./burger-ingredients.module.scss";
import classNames from "classnames";
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

const Tabs = () => {
  const [current, setCurrent] = React.useState("bun");
  return (
    <div style={{ display: "flex" }} className="mt-5 mb-10" >
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

const IngredientCard = ({ image, price, name, counter = false }) => {
  return (
    <div className={classNames(styleIngredients.card)}>
      <img src={image} alt={name} className="ml-4 mr-4" />
      <div className={classNames(styleIngredients.card_price, "mt-1 mb-1")}>
        <span className="text text_type_digits-default mr-2">{price}</span> <CurrencyIcon type="primary" />
      </div>
      <div>
        <p className={classNames(styleIngredients.card_name, "text text_type_main-default")}>{name}</p>
      </div>
      {counter &&
        <div className={styleIngredients.counter}>
          <Counter count={1} size="default" />
        </div>}
    </div>
  )
}

const CatalogGroup = (props) => {
  return (
    <>
      <h2 className="text text_type_main-medium mb-6">{props.title}</h2>
      <div className={classNames(styleIngredients.catalog, "pl-4 pr-4 mb-10")}>
        {props.data.filter(({ type }) => type === props.type).map((ingretient, index) => (
          <IngredientCard key={index} image={ingretient.image} price={ingretient.price} name={ingretient.name} counter={false} />
        ))}
      </div>
    </>
  )
}

class BurgerIngredients extends React.Component {
  render () {
    const data = this.props.data;
    return (
      <section className={styleIngredients.content}>
        <h1 className="text text_type_main-large mt-10" style={{ height: 40 }}>Соберите бургер</h1>
        <Tabs />
        <Scrollbars
          autoHeight={true}
          thumbMinSize={120}
          autoHeightMin={window.innerHeight - 285}
          renderTrackVertical={props => <div className={styleIngredients.track_vertical} />}
          renderThumbVertical={props => <div className={styleIngredients.thumb_vertical} />}
        >
          <CatalogGroup title="Булки" data={data} type="bun" />
          <CatalogGroup title="Соусы" data={data} type="sauce" />
          <CatalogGroup title="Начинка" data={data} type="main" />
        </Scrollbars>
      </section>
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

IngredientCard.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  counter: PropTypes.bool
}

CatalogGroup.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.arrayOf(dataIngredients)
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataIngredients)
};

export default BurgerIngredients;