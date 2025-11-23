import { SavingsProduct, SavingsProductCalculatorParameters } from 'types';

const filterSavingsProduct = (savingsProductList: SavingsProduct[], parameters: SavingsProductCalculatorParameters) =>
  savingsProductList.filter(savingsProduct => {
    const 월납입액이_범위_내에_있음 =
      savingsProduct.minMonthlyAmount < parameters.desiredMonthlyDeposit &&
      parameters.desiredMonthlyDeposit < savingsProduct.maxMonthlyAmount;

    const 저축기간이_일치함 = savingsProduct.availableTerms === parameters.savingPeriod;

    return 월납입액이_범위_내에_있음 && 저축기간이_일치함;
  });

// TODO: validate 조건 정확하도록 보완
const validateParameters = (
  parameters: Partial<SavingsProductCalculatorParameters>
): parameters is SavingsProductCalculatorParameters => {
  return (
    parameters.desiredMonthlyDeposit !== undefined &&
    parameters.savingPeriod !== undefined &&
    parameters.targetSavingsAmount !== undefined
  );
};

export const savingsProductCalculatorPolicy = {
  filterSavingsProduct,
  validateParameters,
};
