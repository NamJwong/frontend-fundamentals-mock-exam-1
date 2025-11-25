import { useQuery } from '@tanstack/react-query';
import CalculationResult from 'components/CalculationResult';
import SavingsProduct from 'components/SavingsProduct';
import SavingsProductCalculator from 'components/SavingsProductCalculator';
import SavingsProductList from 'components/SavingsProductList';
import { savingsProductCalculatorPolicy } from 'policies';
import { useState } from 'react';
import { getSavingsProductList } from 'services';
import { Border, ListRow, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsProduct as SavingsProductType, SavingsProductCalculatorParameters } from 'types';

export function SavingsCalculatorPage() {
  const [selectedTab, setSelectedTab] = useState('products');
  console.log(selectedTab);
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

      {selectedTab === 'products' &&
        (savingsProductCalculatorPolicy.validateParameters(savingsProductCalculatorParameters) ? (
          savingsProductListQuery.isLoading || !savingsProductListQuery.data ? (
            <div>적금 상품을 불러오는 중입니다.</div>
          ) : (
            <SavingsProductList
              savingsProductList={savingsProductCalculatorPolicy.filterSavingsProduct(
                savingsProductListQuery.data,
                savingsProductCalculatorParameters
              )}
              renderSavingsProduct={savingsProduct => (
                <SavingsProduct
                  savingsProduct={savingsProduct}
                  onClick={() => handleSelectedSavingsProductChange(savingsProduct)}
                  isSelected={selectedSavingsProduct?.id === savingsProduct.id}
                />
              )}
            />
          )
        ) : (
          <div>적금 계산기에 입력한 값을 확인해주세요.</div>
        ))}

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
          {savingsProductCalculatorPolicy.validateParameters(savingsProductCalculatorParameters) ? (
            savingsProductListQuery.isLoading || !savingsProductListQuery.data ? (
              <div>적금 상품을 불러오는 중입니다.</div>
            ) : (
              <SavingsProductList
                savingsProductList={savingsProductCalculatorPolicy.filterRecommendedSavingsProduct(
                  savingsProductListQuery.data
                )}
                renderSavingsProduct={savingsProduct => <SavingsProduct savingsProduct={savingsProduct} />}
              />
            )
          ) : (
            <div>적금 계산기에 입력한 값을 확인해주세요.</div>
          )}
        </>
      )}
    </>
  );
}
