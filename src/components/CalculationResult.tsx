import { savingsProductCalculatorPolicy } from 'policies';
import { Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
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
  return (
    <>
      <Spacing size={8} />
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
      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />
      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />
      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={'기본 정기적금'}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={`연 이자율: 3.2%`}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={`100,000원 ~ 500,000원 | 12개월`}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        onClick={() => {}}
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={'고급 정기적금'}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={`연 이자율: 2.8%`}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={`50,000원 ~ 1,000,000원 | 24개월`}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        onClick={() => {}}
      />
      <Spacing size={40} />
    </>
  );
}
