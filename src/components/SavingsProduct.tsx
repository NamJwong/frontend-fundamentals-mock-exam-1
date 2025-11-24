import { Assets, colors, ListRow } from 'tosslib';
import { SavingsProduct as SavingsProductType } from 'types';
import { formatNumberToWon } from 'utils';

type Props = { savingsProduct: SavingsProductType; onClick?: () => void; isSelected?: boolean };

export default function SavingsProduct({
  savingsProduct: { id, name, annualRate, availableTerms, maxMonthlyAmount, minMonthlyAmount },
  onClick,
  isSelected,
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
          bottom={`${formatNumberToWon(minMonthlyAmount)}원 ~ ${formatNumberToWon(maxMonthlyAmount)}원 | ${availableTerms}개월`}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      right={isSelected ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
      onClick={onClick}
    />
  );
}
