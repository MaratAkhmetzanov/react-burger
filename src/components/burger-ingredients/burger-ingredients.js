import React from "react";
import { Tab, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styleBurgerIngredients from "./burger-ingredients.module.scss";
import classNames from "classnames";
import { Scrollbars } from 'react-custom-scrollbars-2';

const Tabs = () => {
  const [current, setCurrent] = React.useState("bun");
  return (
    <div style={{ display: "flex" }} className="mt-5 mb-8" >
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

const IngredientCard = ({ image, price, name }) => {
  return (
    <div className={classNames(styleBurgerIngredients.card, "mb-8")}>
      <img src={image} alt={name} className="ml-4 mr-4" />
      <div className={classNames(styleBurgerIngredients.card_price, "mt-1 mb-1")}>
        <span className="text text_type_digits-default mr-2">{price}</span> <CurrencyIcon type="primary" />
      </div>
      <div>
        <p className={classNames(styleBurgerIngredients.card_name, "text text_type_main-default")}>{name}</p>
      </div>
    </div>
  )
}

const GroupTitle = (props) => {
  return (
    <h2 className="text text_type_main-medium pt-2 mb-6">{props.title}</h2>
  )
}

class BurgerIngredients extends React.Component {

  render () {
    const data = this.props.data;

    return (
      <section className={styleBurgerIngredients.content}>
        <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
        <Tabs />
        <Scrollbars
          autoHeight={true}
          thumbMinSize={120}
          autoHeightMin={window.innerHeight - 196 - 88}
          renderTrackVertical={props => <div className={styleBurgerIngredients.track_vertical} />}
          renderThumbVertical={props => <div className={styleBurgerIngredients.thumb_vertical} />}
        >
          <GroupTitle title="Булки" />
          <div className={classNames(styleBurgerIngredients.catalog, "pl-4 pr-4")}>
            {data.filter(({ type }) => type === "bun").map((ingretient, index) => (
              <IngredientCard key={index} image={ingretient.image} price={ingretient.price} name={ingretient.name} />
            ))}
          </div>
          <GroupTitle title="Соусы" />
          <div className={classNames(styleBurgerIngredients.catalog, "pl-4 pr-4")}>
            {data.filter(({ type }) => type === "sauce").map((ingretient, index) => (
              <IngredientCard key={index} image={ingretient.image} price={ingretient.price} name={ingretient.name} />
            ))}
          </div>
          <GroupTitle title="Начинка" />
          <div className={classNames(styleBurgerIngredients.catalog, "pl-4 pr-4")}>
            {data.filter(({ type }) => type === "main").map((ingretient, index) => (
              <IngredientCard key={index} image={ingretient.image} price={ingretient.price} name={ingretient.name} />
            ))}
          </div>

        </Scrollbars>
      </section>
    );
  }
}

export default BurgerIngredients;