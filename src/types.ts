import { SAVING_PERIOD } from 'constants';

export type SavingsProduct = {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
};

export type SavingPeriod = (typeof SAVING_PERIOD)[number];

export type SavingsProductCalculatorParameters = {
  targetSavingsAmount: number;
  desiredMonthlyDeposit: number;
  savingPeriod: SavingPeriod;
};
