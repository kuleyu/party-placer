import {Image, Link} from '@shopify/hydrogen';

import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';

/**
 * A shared component that displays a single product to allow buyers to quickly identify a particular item of interest
 */
export default function ProductCard({product}) {
  const selectedVariant = product.variants.edges[0].node;
  if (selectedVariant == null) {
    return null;
  }

  return (
    <div className="text-md mb-4 relative">
      <Link to={`/products/${product.handle}`}>
        <div className="rounded-lg border-2 border-gray-200 mb-2 relative flex items-center justify-center overflow-hidden object-cover h-96">
          {selectedVariant.image ? (
            <Image
              className="bg-gray-300/75 absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-center object-contain hover:scale-110"
              image={selectedVariant.image}
            />
          ) : null}
          {!selectedVariant?.availableForSale && (
            <div className="absolute top-3 left-3 rounded-3xl text-xs bg-black text-white py-3 px-4">
              Out of stock
            </div>
          )}
        </div>

        <span className="font-syncopate uppercase text-black font-semibold mb-0.5">
          {product.title}
        </span>

        {product.vendor && (
          <p className="text-gray-900 font-medium text-sm mb-0.5">
            {product.vendor}
          </p>
        )}

        <div className="flex ">
          {selectedVariant.compareAtPriceV2 && (
            <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
          )}
          <MoneyPrice money={selectedVariant.priceV2} />
        </div>
      </Link>
    </div>
  );
}
