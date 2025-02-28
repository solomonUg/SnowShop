import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    deliveryPriceCents: 0,
  },
  {
    id: '2',
    deliveryDays: 3,
    deliveryPriceCents: 499,
  },

  {
    id: '3',
    deliveryDays: 1,
    deliveryPriceCents: 999,
  },
];


export function getDeliveryOption(deliveryOptionId) {
  let matchingDeliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingDeliveryOption = option;
    }
  });

  return matchingDeliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

  return deliveryDate;
}
