import type { ComponentContract } from "../../../types";
import { productCardContract } from "./product-card";
import { productListContract } from "./product-list";
import { productGalleryContract } from "./product-gallery";
import { priceTagContract } from "./price-tag";
import { quantityStepperContract } from "./quantity-stepper";
import { cartSummaryContract } from "./cart-summary";
import { checkoutSummaryContract } from "./checkout-summary";
import { promoCodeInputContract } from "./promo-code-input";
import { orderStatusCardContract } from "./order-status-card";
import { sellerCardContract } from "./seller-card";
import { ratingSummaryContract } from "./rating-summary";
import { reviewCardContract } from "./review-card";
import { addressSelectorContract } from "./address-selector";
import { addressFormContract } from "./address-form";
import { deliveryMethodSelectorContract } from "./delivery-method-selector";
import { filterBarContract } from "./filter-bar";

export const commerceContracts: readonly ComponentContract[] = [
  productCardContract,
  productListContract,
  productGalleryContract,
  priceTagContract,
  quantityStepperContract,
  cartSummaryContract,
  checkoutSummaryContract,
  promoCodeInputContract,
  orderStatusCardContract,
  sellerCardContract,
  ratingSummaryContract,
  reviewCardContract,
  addressSelectorContract,
  addressFormContract,
  deliveryMethodSelectorContract,
  filterBarContract
];
