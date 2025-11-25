import { Fragment, ReactNode } from 'react';
import { SavingsProduct } from 'types';

type Props = {
  renderSavingsProduct: (savingsProduct: SavingsProduct) => ReactNode;
  savingsProductList: SavingsProduct[];
};

export default function SavingsProductList({ renderSavingsProduct, savingsProductList }: Props) {
  if (savingsProductList.length === 0) {
    return <div>불러올 적금 상품이 없습니다.</div>;
  }

  return savingsProductList.map(savings => <Fragment key={savings.id}>{renderSavingsProduct(savings)}</Fragment>);
}
