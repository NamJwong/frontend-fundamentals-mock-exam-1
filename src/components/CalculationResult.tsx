import { savingsProductCalculatorPolicy } from 'policies';
import { colors, ListRow } from 'tosslib';
import { SavingsProduct, SavingsProductCalculatorParameters } from 'types';
import { formatNumberToWon } from 'utils';

type Props = {
  savingsProductCalculatorParameters: Partial<SavingsProductCalculatorParameters>;
  savingsProduct: SavingsProduct;
};

export default function CalculationResult({
  savingsProductCalculatorParameters,
  savingsProduct: { annualRate },
}: Props) {
  if (!savingsProductCalculatorPolicy.validateParameters(savingsProductCalculatorParameters)) {
    return <div>적금 계산기에 입력한 값을 확인해주세요.</div>;
  }
  const { targetSavingsAmount, desiredMonthlyDeposit, savingPeriod } = savingsProductCalculatorParameters;
  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumberToWon(savingsProductCalculatorPolicy.calculate_예상_수익_금액(desiredMonthlyDeposit, savingPeriod, annualRate))}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumberToWon(savingsProductCalculatorPolicy.calculate_목표_금액과의_차이(targetSavingsAmount, savingPeriod, annualRate))}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumberToWon(savingsProductCalculatorPolicy.calculate_추천_월_납입_금액(targetSavingsAmount, savingPeriod, annualRate))}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
    </>
  );
}
