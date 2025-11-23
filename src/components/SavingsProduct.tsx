import { Assets, colors, ListRow } from 'tosslib';
import { SavingsProduct as SavingsProductType } from 'types';

type Props = SavingsProductType & { onClick: () => void };

export default function SavingsProduct({
  id,
  name,
  annualRate,
  availableTerms,
  maxMonthlyAmount,
  minMonthlyAmount,
  onClick,
}: Props) {
  return (
    <ListRow
      key={id}
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={name}
          topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
          middle={`연 이자율: ${annualRate}%`}
          middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
          bottom={`${minMonthlyAmount}원 ~ ${maxMonthlyAmount}원 | ${availableTerms}개월`}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      right={<Assets.Icon name="icon-check-circle-green" />}
      onClick={onClick}
    />
  );
}
