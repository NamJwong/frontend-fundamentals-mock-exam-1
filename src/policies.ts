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

// eslint-disable-next-line @typescript-eslint/naming-convention
const calculate_예상_수익_금액 = (desiredMonthlyDeposit: number, savingPeriod: number, annualRate: number) => {
  return desiredMonthlyDeposit * savingPeriod * (1 + annualRate * 0.5);
};
// eslint-disable-next-line @typescript-eslint/naming-convention
const calculate_목표_금액과의_차이 = (targetSavingsAmount: number, savingPeriod: number, annualRate: number) => {
  const rawAmount = targetSavingsAmount / (savingPeriod * (1 + annualRate * 0.5));
  return Math.round(rawAmount / 1000) * 1000;
};
// eslint-disable-next-line @typescript-eslint/naming-convention
const calculate_추천_월_납입_금액 = (targetSavingsAmount: number, savingPeriod: number, annualRate: number) => {
  const rawAmount = targetSavingsAmount / (savingPeriod * (1 + annualRate * 0.5));
  return Math.round(rawAmount / 1000) * 1000;
};

const getRecommendedSavingsProduct = (savingsProductList: SavingsProduct[]) => {
  return savingsProductList.sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);
};

export const savingsProductCalculatorPolicy = {
  filterSavingsProduct,
  validateParameters,
  calculate_목표_금액과의_차이,
  calculate_예상_수익_금액,
  calculate_추천_월_납입_금액,
  getRecommendedSavingsProduct,
};
