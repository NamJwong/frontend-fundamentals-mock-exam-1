import { useQuery } from '@tanstack/react-query';
import { savingsProductCalculatorPolicy } from 'policies';
import { Fragment, ReactNode } from 'react';
import { getSavingsProductList as getSavingsProductList } from 'services';
import { Assets, colors, ListRow } from 'tosslib';
import { SavingsProduct, SavingsProductCalculatorParameters } from 'types';

type Props = {
  renderSavingsProduct: (savingsProduct: SavingsProduct) => ReactNode;
  // TODO: 리스트 컴포넌트가 왜 이 Prop을 알아야 하는가? 고민
  savingsProductCalculatorParameters: Partial<SavingsProductCalculatorParameters>;
};

export default function SavingsProductList({ renderSavingsProduct, savingsProductCalculatorParameters }: Props) {
  const savingsProductListQuery = useQuery({ queryKey: ['savingsProductList'], queryFn: getSavingsProductList });

  if (!savingsProductCalculatorPolicy.validateParameters(savingsProductCalculatorParameters)) {
    return <div>적금 계산기에 입력한 값을 확인해주세요.</div>;
  }

  if (savingsProductListQuery.isLoading || savingsProductListQuery.data === undefined) {
    return <div>적금 상품을 불러오는 중입니다.</div>;
  }

  const filteredSavingsProductList = savingsProductCalculatorPolicy.filterSavingsProduct(
    savingsProductListQuery.data,
    savingsProductCalculatorParameters
  );

  if (filteredSavingsProductList.length === 0) {
    return <div>계산기에 입력한 값과 매치되는 적금 상품이 없습니다.</div>;
  }

  return filteredSavingsProductList.map(savings => (
    <Fragment key={savings.id}>{renderSavingsProduct(savings)}</Fragment>
  ));

  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={'기본 정기적금'}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={'연 이자율: 3.2%'}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={'100,000원 ~ 500,000원 | 12개월'}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        right={<Assets.Icon name="icon-check-circle-green" />}
        onClick={() => {}}
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={'고급 정기적금'}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={'연 이자율: 2.8%'}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={'50,000원 ~ 1,000,000원 | 24개월'}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        onClick={() => {}}
      />
    </>
  );
}
