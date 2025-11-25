import CalculationResult from 'components/CalculationResult';
import SavingsProduct from 'components/SavingsProduct';
import { savingsProductCalculatorPolicy } from 'policies';
import { Border, ListHeader, ListRow, Spacing } from 'tosslib';
import { SavingsProduct as SavingsProductType, SavingsProductCalculatorParameters } from 'types';

type Props = {
  selectedSavingsProduct: SavingsProductType | undefined;
  savingsProductList: SavingsProductType[];
  savingsProductCalculatorParameters: Partial<SavingsProductCalculatorParameters>;
};

export default function ResultsTab({
  selectedSavingsProduct,
  savingsProductCalculatorParameters,
  savingsProductList,
}: Props) {
  if (!savingsProductCalculatorPolicy.validateParameters(savingsProductCalculatorParameters)) {
    return <div>적금 계산기에 입력한 값을 확인해주세요.</div>;
  }
  const recommendedSavingsProductList = savingsProductCalculatorPolicy.getRecommendedSavingsProduct(savingsProductList);
  return (
    <>
      <Spacing size={8} />
      {selectedSavingsProduct ? (
        <CalculationResult
          savingsProduct={selectedSavingsProduct}
          savingsProductCalculatorParameters={savingsProductCalculatorParameters}
        />
      ) : (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
      )}
      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />
      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />
      {recommendedSavingsProductList.length > 0 ? (
        recommendedSavingsProductList.map(savingsProduct => (
          <SavingsProduct key={savingsProduct.id} savingsProduct={savingsProduct} />
        ))
      ) : (
        <div>해당하는 적금 상품이 없습니다.</div>
      )}
      <Spacing size={40} />
    </>
  );
}
