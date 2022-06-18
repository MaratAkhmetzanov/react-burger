import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styleApp from "./app.module.scss";

import data from "../../utils/data";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={styleApp.content}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
