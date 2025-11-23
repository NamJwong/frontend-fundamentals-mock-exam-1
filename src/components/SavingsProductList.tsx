import { useQuery } from '@tanstack/react-query';
import { savingsProductCalculatorPolicy } from 'policies';
import { Fragment, ReactNode } from 'react';
import { getSavingsProductList as getSavingsProductList } from 'services';
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
}
