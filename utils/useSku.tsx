import useStore from './store';

/**
 * function to help generate SKU
 * with prefix OBT- + latest number
 * @returns {string}
 */
const useSku = (): string | null => {
  const data = useStore((state) => state.data);

  return (
    data
      ?.filter((item) => item.sku.startsWith('OBT-')) //filter prefix
      .sort((a, b) => {
        return Number(b.sku.split('-')[1]) - Number(a.sku.split('-')[1]);
      })[0] //find the highest number
      .sku.split('-')
      .map((val, i) => (i ? +val + 1 : val))
      .join('-') ?? null //return highest OBT-(num + 1) or null
  );
};

export default useSku;
