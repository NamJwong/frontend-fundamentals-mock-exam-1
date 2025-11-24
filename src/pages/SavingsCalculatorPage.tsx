import CalculationResult from 'components/CalculationResult';
import RecommendedSavingsProductList from 'components/RecommendedSavingsProductList';
import SavingsProduct from 'components/SavingsProduct';
import SavingsProductCalculator from 'components/SavingsProductCalculator';
import SavingsProductList from 'components/SavingsProductList';
import { useState } from 'react';
import { Border, ListRow, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsProduct as SavingsProductType, SavingsProductCalculatorParameters } from 'types';

export function SavingsCalculatorPage() {
  const [selectedTab, setSelectedTab] = useState('products');
  const [savingsProductCalculatorParameters, setSavingsProductCalculatorParameters] = useState<
    Partial<SavingsProductCalculatorParameters>
  >({});
  const [selectedSavingsProduct, setSelectedSavingsProduct] = useState<SavingsProductType>();

  const handleSelectedSavingsProductChange = (value: SavingsProductType) => {
    setSelectedSavingsProduct(prev => {
      if (prev?.id === value.id) {
        return undefined;
      }
      return value;
    });
  };

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
        <SavingsProductList
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
          <RecommendedSavingsProductList
            savingsProductCalculatorParameters={savingsProductCalculatorParameters}
            renderSavingsProduct={savingsProduct => <SavingsProduct savingsProduct={savingsProduct} />}
          />
        </>
      )}
    </>
  );
}
