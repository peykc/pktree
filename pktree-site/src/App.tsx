import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import LinkList from "./components/LinkList";
import ProfileHeader from "./components/ProfileHeader";
import ValueWaysCarousel from "./components/ValueWaysCarousel";
import { profileLinks } from "./data/links";
import { paymentMethods } from "./data/payments";
import { buildPaymentUri, readPaymentQuery } from "./lib/payment-utils";
import type { PaymentMethod, PaymentQueryOptions } from "./types";

const PaymentModal = lazy(() => import("./components/PaymentModal"));

const App = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [queryOptions, setQueryOptions] = useState<PaymentQueryOptions>({});

  const selectedId = selectedMethod?.id ?? null;

  useEffect(() => {
    document.body.className = "theme-avant-garde";
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedMethod(null);
  }, []);

  const launchMethod = useCallback(
    (method: PaymentMethod, options: PaymentQueryOptions, shouldOpenModal = true) => {
      setSelectedMethod(method);
      setCopied(false);
      setQueryOptions(options);

      if (method.mode === "direct") {
        const target = buildPaymentUri(method, options) ?? method.fallbackUrl;
        if (target) {
          window.location.assign(target);
        }
        return;
      }

      if (shouldOpenModal) {
        setShowModal(true);
      }
    },
    [],
  );

  const onSelectMethod = useCallback(
    (method: PaymentMethod) => {
      launchMethod(method, {}, true);
    },
    [launchMethod],
  );

  useEffect(() => {
    const { paymentId, options } = readPaymentQuery();
    if (!paymentId) return;

    const method = paymentMethods.find((entry) => entry.id === paymentId);
    if (!method) return;

    launchMethod(method, options, true);
  }, [launchMethod]);

  const copyValue = useCallback(async (value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <main className="page-shell">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <ProfileHeader
        avatarUrl={`${import.meta.env.BASE_URL}avatar.png`}
        name="PeyKc"
        tagline=""
        bio={<i>What We Owe to Each Other</i>}
      />

      <ValueWaysCarousel
        methods={paymentMethods}
        selectedId={selectedId}
        onSelect={onSelectMethod}
      />

      <LinkList links={profileLinks} />

      <Suspense fallback={null}>
        {showModal && selectedMethod && (
          <PaymentModal
            method={selectedMethod}
            queryOptions={queryOptions}
            copied={copied}
            onClose={closeModal}
            onCopy={copyValue}
          />
        )}
      </Suspense>
    </main>
  );
};

export default App;
