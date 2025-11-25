import { savingsProductCalculatorPolicy } from 'policies';
import { Fragment, ReactNode } from 'react';
import { SavingsProduct, SavingsProductCalculatorParameters } from 'types';

type Props = {
  savingsProductList: SavingsProduct[];
  savingsProductCalculatorParameters: Partial<SavingsProductCalculatorParameters>;
  renderSavingsProduct: (savingsProduct: SavingsProduct) => ReactNode;
};

export default function ProductsTab({
  savingsProductList,
  renderSavingsProduct,
  savingsProductCalculatorParameters,
}: Props) {
  if (!savingsProductCalculatorPolicy.validateParameters(savingsProductCalculatorParameters)) {
    // TODO: 모든 적금 상품 보기 추가
    return <div>적금 계산기에 입력한 값을 확인해주세요.</div>;
  }

  const filteredSavingsProductList = savingsProductCalculatorPolicy.filterSavingsProduct(
    savingsProductList,
    savingsProductCalculatorParameters
  );
  if (filteredSavingsProductList.length === 0) {
    return <div>해당하는 적금 상품이 없습니다.</div>;
  }

  return savingsProductList.map(savings => <Fragment key={savings.id}>{renderSavingsProduct(savings)}</Fragment>);
}
