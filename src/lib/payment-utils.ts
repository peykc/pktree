import type { PaymentMethod, PaymentQueryOptions } from "../types";

export const readPaymentQuery = (): {
  paymentId: string | null;
  options: PaymentQueryOptions;
} => {
  const search = new URLSearchParams(window.location.search);
  const amount = search.get("amount") ?? undefined;
  const note = search.get("note") ?? undefined;

  return {
    paymentId: search.get("pay"),
    options: { amount, note },
  };
};

export const buildPaymentUri = (
  method: PaymentMethod,
  options: PaymentQueryOptions,
): string | null => {
  if (method.uriBuilder) {
    return method.uriBuilder(options);
  }

  if (method.directUrl) {
    return method.directUrl;
  }

  return null;
};

export const getQrValue = (
  method: PaymentMethod,
  options: PaymentQueryOptions,
): string => {
  const uri = buildPaymentUri(method, options);
  return uri ?? method.address ?? method.username ?? "";
};

export const buildQrImageUrl = (value: string): string =>
  `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    value,
  )}`;
