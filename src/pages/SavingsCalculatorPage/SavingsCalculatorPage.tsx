import { useQuery } from '@tanstack/react-query';
import SavingsProduct from 'components/SavingsProduct';
import SavingsProductCalculator from 'components/SavingsProductCalculator';
import ProductsTab from 'pages/SavingsCalculatorPage/ProductsTab';
import ResultsTab from 'pages/SavingsCalculatorPage/ResultsTab';
import { useState } from 'react';
import { getSavingsProductList } from 'services';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsProduct as SavingsProductType, SavingsProductCalculatorParameters } from 'types';

export function SavingsCalculatorPage() {
  const [selectedTab, setSelectedTab] = useState('products');
  const [savingsProductCalculatorParameters, setSavingsProductCalculatorParameters] = useState<
    Partial<SavingsProductCalculatorParameters>
  >({});
  const [selectedSavingsProduct, setSelectedSavingsProduct] = useState<SavingsProductType>();

  const savingsProductListQuery = useQuery({ queryKey: ['savingsProductList'], queryFn: getSavingsProductList });

  const handleSelectedSavingsProductChange = (value: SavingsProductType) => {
    setSelectedSavingsProduct(prev => {
      if (prev?.id === value.id) {
        return undefined;
      }
      return value;
    });
  };

  if (savingsProductListQuery.isLoading || !savingsProductListQuery.data) {
    return <div>로딩 중입니다.</div>;
  }

  return (
    <>
      <NavigationBar title="적금 계산기" />
      <Spacing size={16} />
      <SavingsProductCalculator
        parameters={savingsProductCalculatorParameters}
        onParametersChange={updater => setSavingsProductCalculatorParameters(updater)}
      />
      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />
      <Tab onChange={setSelectedTab}>
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {selectedTab === 'products' && (
        <ProductsTab
          savingsProductList={savingsProductListQuery.data}
          savingsProductCalculatorParameters={savingsProductCalculatorParameters}
          renderSavingsProduct={savingsProduct => (
            <SavingsProduct
              savingsProduct={savingsProduct}
              onClick={() => handleSelectedSavingsProductChange(savingsProduct)}
              isSelected={selectedSavingsProduct?.id === savingsProduct.id}
            />
          )}
        />
      )}

      {selectedTab === 'results' && (
        <ResultsTab
          savingsProductList={savingsProductListQuery.data}
          savingsProductCalculatorParameters={savingsProductCalculatorParameters}
          selectedSavingsProduct={selectedSavingsProduct}
        />
      )}
    </>
  );
}
