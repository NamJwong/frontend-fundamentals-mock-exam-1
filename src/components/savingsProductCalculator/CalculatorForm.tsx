import { SAVING_PERIOD } from 'constants';
import { SelectBottomSheet, Spacing, TextField } from 'tosslib';
import { SavingsProductCalculatorParameters } from 'types';
import { formatNumberToWon, parseWonToNumber } from 'utils';

type Props = {
  parameters: Partial<SavingsProductCalculatorParameters>;
  onParametersChange: (
    updater: (prev: Partial<SavingsProductCalculatorParameters>) => Partial<SavingsProductCalculatorParameters>
  ) => void;
};

export default function SavingsProductCalculatorForm({ parameters, onParametersChange }: Props) {
  return (
    <>
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={parameters.targetSavingsAmount ? formatNumberToWon(parameters.targetSavingsAmount) : undefined}
        onChange={e =>
          onParametersChange(prev => ({
            ...prev,
            targetSavingsAmount: parseWonToNumber(e.target.value),
          }))
        }
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={parameters.desiredMonthlyDeposit ? formatNumberToWon(parameters.desiredMonthlyDeposit) : undefined}
        onChange={e =>
          onParametersChange(prev => ({
            ...prev,
            desiredMonthlyDeposit: parseWonToNumber(e.target.value),
          }))
        }
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={parameters.savingPeriod}
        onChange={value =>
          onParametersChange(prev => ({
            ...prev,
            savingPeriod: value,
          }))
        }
      >
        {SAVING_PERIOD.map(savingPeriod => (
          <SelectBottomSheet.Option key={savingPeriod} value={savingPeriod}>
            {savingPeriod}개월
          </SelectBottomSheet.Option>
        ))}
      </SelectBottomSheet>
    </>
  );
}
