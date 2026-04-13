import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { IoSparklesOutline, IoMoonOutline } from "react-icons/io5";
import LinkList from "./components/LinkList";
import ProfileHeader from "./components/ProfileHeader";
import ValueWaysCarousel from "./components/ValueWaysCarousel";
import { profileLinks } from "./data/links";
import { paymentMethods } from "./data/payments";
import { buildPaymentUri, readPaymentQuery } from "./lib/payment-utils";
import type { PaymentMethod, PaymentQueryOptions } from "./types";

const PaymentModal = lazy(() => import("./components/PaymentModal"));

const App = () => {
  const [theme, setTheme] = useState<"minimal" | "avant-garde">(() => {
    return (localStorage.getItem("paytree-theme") as "minimal" | "avant-garde") || "minimal";
  });
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [queryOptions, setQueryOptions] = useState<PaymentQueryOptions>({});

  const selectedId = selectedMethod?.id ?? null;

  useEffect(() => {
    document.body.className = `theme-${theme}`;
    localStorage.setItem("paytree-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "minimal" ? "avant-garde" : "minimal"));
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
      <button 
        className="theme-toggle" 
        onClick={toggleTheme} 
        title={theme === "minimal" ? "Switch to Avant-Garde" : "Switch to Minimal"}
        aria-label="Toggle Theme"
      >
        {theme === "minimal" ? <IoSparklesOutline aria-hidden="true" /> : <IoMoonOutline aria-hidden="true" />}
      </button>

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
