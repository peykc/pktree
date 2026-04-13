import { useMemo } from "react";
import { IoCopyOutline, IoOpenOutline, IoClose } from "react-icons/io5";
import { buildPaymentUri, buildQrImageUrl, getQrValue } from "../lib/payment-utils";
import type { PaymentMethod, PaymentQueryOptions } from "../types";

interface PaymentModalProps {
  method: PaymentMethod;
  queryOptions: PaymentQueryOptions;
  copied: boolean;
  onClose: () => void;
  onCopy: (value: string) => void;
}

const PaymentModal = ({
  method,
  queryOptions,
  copied,
  onClose,
  onCopy,
}: PaymentModalProps) => {
  const uri = useMemo(
    () => buildPaymentUri(method, queryOptions),
    [method, queryOptions],
  );
  const value = useMemo(
    () => method.address ?? method.username ?? uri ?? "",
    [method, uri],
  );
  const qrValue = useMemo(
    () => getQrValue(method, queryOptions),
    [method, queryOptions],
  );
  const qrUrl = useMemo(
    () => method.qrImage || buildQrImageUrl(qrValue),
    [method.qrImage, qrValue],
  );

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="payment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          aria-label="Close payment details"
          onClick={onClose}
        >
          <IoClose aria-hidden="true" />
        </button>

        <div className="modal-header">
          <method.icon aria-hidden="true" />
          <div>
            <h3 id="payment-modal-title">{method.label}</h3>
          </div>
        </div>

        <img className="qr-image" src={qrUrl} alt={`${method.label} payment QR`} />

        {value && (
          <>
            <label htmlFor="payment-value">Address or handle</label>
            <input id="payment-value" value={value} readOnly />
          </>
        )}

        <div className="modal-actions">
          {value && (
            <button type="button" onClick={() => onCopy(value)}>
              <IoCopyOutline aria-hidden="true" />
              {copied ? "Copied" : "Copy"}
            </button>
          )}
          {(uri ?? method.fallbackUrl) && (
            <a href={uri ?? method.fallbackUrl} target="_blank" rel="noreferrer">
              <IoOpenOutline aria-hidden="true" />
              {method.id === "cashapp" ? "Open Cashapp" : method.id === "venmo" ? "Open Venmo" : method.id === "paypal" ? "Open Paypal" : "Open wallet"}
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

export default PaymentModal;
