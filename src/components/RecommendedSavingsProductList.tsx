import { useQuery } from '@tanstack/react-query';
import { savingsProductCalculatorPolicy } from 'policies';
import { Fragment, ReactNode } from 'react';
import { getSavingsProductList } from 'services';
import { ListHeader, Spacing } from 'tosslib';
import { SavingsProduct, SavingsProductCalculatorParameters } from 'types';

// TODO: SavingsProductList 컴포넌트랑 필터 조건 빼고는 거의 겹치는 문제 고민
type Props = {
  renderSavingsProduct: (savingsProduct: SavingsProduct) => ReactNode;
  // TODO: 리스트 컴포넌트가 왜 이 Prop을 알아야 하는가? 고민 => savingsProductCalculatorParameters 관련 처리는 밖에서?
  savingsProductCalculatorParameters: Partial<SavingsProductCalculatorParameters>;
};

export default function RecommendedSavingsProductList({
  renderSavingsProduct,
  savingsProductCalculatorParameters,
}: Props) {
  const savingsProductListQuery = useQuery({ queryKey: ['savingsProductList'], queryFn: getSavingsProductList });

  if (!savingsProductCalculatorPolicy.validateParameters(savingsProductCalculatorParameters)) {
    return <div>적금 계산기에 입력한 값을 확인해주세요.</div>;
  }

  if (savingsProductListQuery.isLoading || savingsProductListQuery.data === undefined) {
    return <div>적금 상품을 불러오는 중입니다.</div>;
  }

  const filteredSavingsProductList = savingsProductCalculatorPolicy.filterRecommendedSavingsProduct(
    savingsProductListQuery.data
  );

  if (filteredSavingsProductList.length === 0) {
    return <div>계산기에 입력한 값과 매치되는 적금 상품이 없습니다.</div>;
  }

  return (
    <>
      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />
      {filteredSavingsProductList.map(savings => (
        <Fragment key={savings.id}>{renderSavingsProduct(savings)}</Fragment>
      ))}
    </>
  );
}
