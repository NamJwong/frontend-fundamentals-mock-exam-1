import SavingsProduct from 'components/SavingsProduct';
import { savingsProductCalculatorPolicy } from 'policies';
import { Fragment, ReactNode } from 'react';
import { ListHeader, Spacing } from 'tosslib';
import { SavingsProduct as SavingsProductType, SavingsProductCalculatorParameters } from 'types';

type Props = {
  savingsProductList: SavingsProductType[];
  savingsProductCalculatorParameters: Partial<SavingsProductCalculatorParameters>;
  renderCalculatedSavingsProduct: (savingsProduct: SavingsProductType) => ReactNode;
};

export default function ProductsTab({
  savingsProductList,
  renderCalculatedSavingsProduct,
  savingsProductCalculatorParameters,
}: Props) {
  if (!savingsProductCalculatorPolicy.validateParameters(savingsProductCalculatorParameters)) {
    return (
      <>
        <div>적금 계산기에 입력한 값을 확인해주세요.</div>
        <Spacing size={8} />
        <ListHeader
          title={<ListHeader.TitleParagraph fontWeight="bold">모든 적금 상품 둘러보기</ListHeader.TitleParagraph>}
        />
        <Spacing size={12} />
        {savingsProductList.map(savingsProduct => (
          <SavingsProduct key={savingsProduct.id} savingsProduct={savingsProduct} />
        ))}
      </>
    );
  }

  const calculatedSavingsProductList = savingsProductCalculatorPolicy.getCalculatedSavingsProduct(
    savingsProductList,
    savingsProductCalculatorParameters
  );
  if (calculatedSavingsProductList.length === 0) {
    return <div>해당하는 적금 상품이 없습니다.</div>;
  }

  return calculatedSavingsProductList.map(savings => (
    <Fragment key={savings.id}>{renderCalculatedSavingsProduct(savings)}</Fragment>
  ));
}
