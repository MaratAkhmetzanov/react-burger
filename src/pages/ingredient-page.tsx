import AppWrapper from '../components/app-wrapper/app-wrapper';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

const IngredientPage = (): JSX.Element => {
  return (
    <AppWrapper>
      <IngredientDetails />
    </AppWrapper>
  );
};

export default IngredientPage;
