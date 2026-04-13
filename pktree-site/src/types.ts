import type { IconType } from "react-icons";

export type PaymentInteractionMode = "modal" | "direct";

export interface PaymentQueryOptions {
  amount?: string;
  note?: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
  summary: string;
  icon: IconType;
  accent: string;
  mode: PaymentInteractionMode;
  featured?: boolean;
  address?: string;
  username?: string;
  directUrl?: string;
  fallbackUrl?: string;
  qrImage?: string;
  uriBuilder?: (options: PaymentQueryOptions) => string;
}

export interface ProfileLink {
  id: string;
  label: string;
  href: string;
  description: string;
  icon: IconType;
}
