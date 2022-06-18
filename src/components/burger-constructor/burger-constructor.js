import React from "react";
import { DragIcon, LockIcon, CurrencyIcon, DeleteIcon, Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styleBurgerConstructor from "./burger-constructor.module.scss";
import classNames from "classnames";
import { Scrollbars } from 'react-custom-scrollbars-2';


const ConstructorCard = ({ image, price, name, type, top = false, bottom = false }) => {
  let cardStyle = classNames(styleBurgerConstructor.card_wrapper_side, "pl-6 pr-8 pt-4 pb-4");

  if (top) { cardStyle = classNames(cardStyle, styleBurgerConstructor.bun_top) }
  else if (bottom) { cardStyle = classNames(cardStyle, styleBurgerConstructor.bun_bottom) }

  return (
    <div className={classNames(styleBurgerConstructor.card)}>
      <div className={styleBurgerConstructor.card_dragzone}>
        {(type !== "bun") && <DragIcon type="primary" />}
      </div>
      <div className={cardStyle}>
        <img src={image} alt={name} className={classNames(styleBurgerConstructor.card_image, "mr-5")} />
        <p className={classNames(styleBurgerConstructor.card_name, "text text_type_main-default")}>{name}{top ? " (верх)" : ""}{bottom ? " (низ)" : ""}</p>
        <div className={classNames(styleBurgerConstructor.card_price, "ml-5 mr-5")}>
          <span className="text text_type_digits-default mr-2">{price}</span> <CurrencyIcon type="primary" />
        </div>
        <div className={styleBurgerConstructor.card_icon}>
          {(type === "bun") ? <LockIcon type="secondary" /> : <DeleteIcon type="primary" />}
        </div>
      </div>
    </div>
  )
}

class BurgerConstructor extends React.Component {
  render () {
    const ingretients = this.props.data.filter(({ type }) => type !== "bun");
    const bun = this.props.data.find(({ type }) => type === "bun");

    return (
      <section className={styleBurgerConstructor.content}>
        {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={bun.image}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={bun.image}
          />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={bun.image}
            style={{ background: '#fff' }}
          />
        </div> */}
        <div className={classNames(styleBurgerConstructor.catalog, "mt-25")}>
          <ConstructorCard image={bun.image_mobile} price={bun.price} name={bun.name} type={bun.type} top={true} />
          <Scrollbars
            autoHeight={true}
            thumbMinSize={120}
            autoHeightMin={window.innerHeight - 180 - 156}
            renderTrackVertical={props => <div className={styleBurgerConstructor.track_vertical} />}
            renderThumbVertical={props => <div className={styleBurgerConstructor.thumb_vertical} />}
          >
            <div className="pl-4 pr-4">
              {ingretients.map((ingretient, index) => (
                <ConstructorCard key={index} image={ingretient.image_mobile} price={ingretient.price} name={ingretient.name} type={ingretient.type} />
              ))}
            </div>
          </Scrollbars>
          <ConstructorCard image={bun.image_mobile} price={bun.price} name={bun.name} type={bun.type} bottom={true} />
        </div>
        <div className={classNames(styleBurgerConstructor.total, "pt-6")}>
          <div className={classNames(styleBurgerConstructor.card_price, "mr-10")}>
            <span className="text text_type_digits-medium mr-2">12487124</span><CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

export default BurgerConstructor;