import {
  SiBitcoin,
  SiCashapp,
  SiEthereum,
  SiMonero,
  SiPaypal,
  SiZelle,
} from "react-icons/si";
import { IoLogoVenmo } from "react-icons/io5";
import type { PaymentMethod } from "../types";

const moneroAddress = "8BuFrF3pnaFDXZLkzNX3NKG7hdMr1YqZaAvasSyfSbJnLadCUgXuJQQVigeBBAZdL5NTRiUcPYNVTV2gUWa7zuhuMRVNwt9";
const bitcoinAddress = "bc1quxdtgcf8r2w7kkrj46thmxm0fugxh2sc64xa69";
const ethereumAddress = "0x3750b5F0cf586E3eeD276b4B915CA28110FcDf4C";
const cashAppHandle = "$peykLLC";
const venmoUsername = "peykLLC";

// Order requested: cashapp, venmo, zelle, monero, paypal, bitcoin, ethereum
export const paymentMethods: PaymentMethod[] = [
  {
    id: "cashapp",
    label: "Cash App",
    summary: "Direct send page",
    icon: SiCashapp,
    accent: "#00d64f",
    mode: "modal",
    username: cashAppHandle,
    qrImage: `${import.meta.env.BASE_URL}qr-cashapp.png`,
    fallbackUrl: `https://cash.app/${cashAppHandle.replace("$", "")}`,
  },
  {
    id: "venmo",
    label: "Venmo",
    summary: "Send via Venmo",
    icon: IoLogoVenmo,
    accent: "#008CFF",
    mode: "modal",
    username: venmoUsername,
    qrImage: `${import.meta.env.BASE_URL}qr-venmo.png`,
    fallbackUrl: `https://venmo.com/${venmoUsername}`,
  },
  {
    id: "zelle",
    label: "Zelle",
    summary: "Bank-to-bank transfer",
    icon: SiZelle,
    accent: "#741EE8",
    mode: "modal",
    qrImage: `${import.meta.env.BASE_URL}qr-zelle.png`,
    // Address removed for OPSEC (no phone number/email displayed)
  },
  {
    id: "monero",
    label: "Monero",
    summary: "Private donations for open-source work",
    icon: SiMonero,
    accent: "#ff6b00",
    mode: "modal",
    featured: true,
    qrImage: `${import.meta.env.BASE_URL}qr-xmr.png`,
    address: moneroAddress,
    uriBuilder: ({ amount, note }) => {
      const params = new URLSearchParams();
      if (amount) params.set("tx_amount", amount);
      if (note) params.set("tx_description", note);
      const suffix = params.toString() ? `?${params.toString()}` : "";
      return `monero:${moneroAddress}${suffix}`;
    },
  },
  {
    id: "paypal",
    label: "PayPal",
    summary: "Send via PayPal",
    icon: SiPaypal,
    accent: "#00457C",
    mode: "modal",
    qrImage: `${import.meta.env.BASE_URL}qr-paypal.png`,
    fallbackUrl: "https://www.paypal.com/donate/?hosted_button_id=ZPXWLLLBXJM34",
  },
  {
    id: "bitcoin",
    label: "Bitcoin",
    summary: "On-chain BTC support",
    icon: SiBitcoin,
    accent: "#f7931a",
    mode: "modal",
    qrImage: `${import.meta.env.BASE_URL}qr-btc.png`,
    address: bitcoinAddress,
    uriBuilder: ({ amount, note }) => {
      const params = new URLSearchParams();
      if (amount) params.set("amount", amount);
      if (note) params.set("message", note);
      const suffix = params.toString() ? `?${params.toString()}` : "";
      return `bitcoin:${bitcoinAddress}${suffix}`;
    },
  },
  {
    id: "ethereum",
    label: "Ethereum",
    summary: "ETH on mainnet",
    icon: SiEthereum,
    accent: "#627eea",
    mode: "modal",
    qrImage: `${import.meta.env.BASE_URL}qr-eth.png`,
    address: ethereumAddress,
    uriBuilder: ({ amount }) =>
      `ethereum:${ethereumAddress}${amount ? `?value=${amount}` : ""}`,
  },
];
