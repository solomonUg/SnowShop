import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    deliveryPriceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    deliveryPriceCents: 499,
  },

  {
    id: "3",
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
// this function checks if the day is a weekend
function isWeekend(date) {
  const dayOfWeek = date.format("dddd");
  return dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
}

export function calculateDeliveryDate(deliveryOption) {
  let remainingDaysToDeliver = deliveryOption.deliveryDays; // get the number of days it will take to deliver
  let deliveryDate = dayjs(); // inital day to deliver which is today

  while (remainingDaysToDeliver > 0) {
    //add one day each time
    deliveryDate = deliveryDate.add(1, "days");

    if (isWeekend(deliveryDate) == false) {
      // decrement the number of days to deliver as long as it is not weekend
      remainingDaysToDeliver--;
    }
  }

  return deliveryDate;
}
