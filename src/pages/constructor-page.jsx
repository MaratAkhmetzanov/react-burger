import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppWrapper from '../components/app-wrapper/app-wrapper';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';

const ConstructorPage = () => {
  return (
    <AppWrapper>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </AppWrapper>
  );
};

export default ConstructorPage;
