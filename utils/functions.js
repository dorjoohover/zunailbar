export const globals = {
  PaymentMethodTypes: {
    CASH: 10,
    CARD: 20,
    ACCOUNT: 30,
  },

  PaymentMethodTypesDict: {},
};

// Populate the EstimateEnumsDict
globals.PaymentMethodTypesDict[globals.PaymentMethodTypes.ACCOUNT] = "Дансаар";
globals.PaymentMethodTypesDict[globals.PaymentMethodTypes.CARD] = "Картаар";
globals.PaymentMethodTypesDict[globals.PaymentMethodTypes.CASH] = "Бэлэн";
