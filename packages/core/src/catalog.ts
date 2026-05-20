export type NativesmartTier = "free" | "pro" | "enterprise";
export type KitPriority = 1 | 2;

export type KitDefinition = {
  id: string;
  name: string;
  tier: NativesmartTier;
  priority: KitPriority;
  status: "structured" | "preview" | "stable";
  domains: string[];
  components: string[];
  flows: string[];
};

export type StarterDefinition = {
  id: string;
  name: string;
  tier: Extract<NativesmartTier, "pro" | "enterprise">;
  status: "structured" | "preview" | "stable";
  target: "react-native" | "flutter" | "both";
  includes: string[];
  kits: string[];
};

export const kitDefinitions: KitDefinition[] = [
  {
    id: "fintech",
    name: "Fintech Kit",
    tier: "pro",
    priority: 1,
    status: "structured",
    domains: ["wallet", "transfer", "kyc", "transactions"],
    components: [
      "WalletBalanceCard",
      "TransactionList",
      "TransactionDetails",
      "TransferForm",
      "BeneficiarySelector",
      "FeeSummary",
      "PaymentConfirmation",
      "ReceiptShareView",
      "KycStatusCard"
    ],
    flows: [
      "onboarding",
      "login",
      "wallet-dashboard",
      "send-money",
      "receive-money",
      "transaction-details",
      "kyc-status",
      "receipt-sharing",
      "network-error-recovery"
    ]
  },
  {
    id: "mobile-money",
    name: "Mobile Money Kit",
    tier: "pro",
    priority: 1,
    status: "structured",
    domains: ["payments", "mobile-money", "receipts"],
    components: [
      "MobileMoneySelector",
      "PaymentMethodSelector",
      "ProviderSelector",
      "FeesBreakdown",
      "PaymentConfirmation",
      "PaymentStatus",
      "ReceiptView",
      "RetryPaymentState"
    ],
    flows: [
      "select-provider",
      "confirm-payment",
      "payment-status",
      "retry-payment",
      "render-receipt"
    ]
  },
  {
    id: "marketplace",
    name: "Marketplace Kit",
    tier: "pro",
    priority: 1,
    status: "structured",
    domains: ["catalog", "checkout", "orders", "seller"],
    components: [
      "ProductCard",
      "ProductList",
      "CartSummary",
      "CheckoutSummary",
      "OrderStatusCard",
      "SellerCard",
      "RatingSummary",
      "AddressSelector",
      "DeliveryMethodSelector"
    ],
    flows: [
      "catalog",
      "product-details",
      "cart",
      "checkout",
      "order-tracking",
      "seller-profile",
      "rating"
    ]
  },
  {
    id: "offline-first",
    name: "Offline-first Kit",
    tier: "pro",
    priority: 1,
    status: "structured",
    domains: ["offline", "sync", "retry", "conflicts"],
    components: [
      "OfflineBanner",
      "NetworkRetryState",
      "SyncStatusCard",
      "PendingQueueList",
      "ConflictState",
      "RetryAction"
    ],
    flows: ["offline-detection", "retry", "sync-queue", "conflict-warning", "degraded-mode"]
  },
  {
    id: "delivery",
    name: "Delivery Kit",
    tier: "pro",
    priority: 2,
    status: "structured",
    domains: ["logistics", "tracking", "fulfillment"],
    components: [
      "DeliveryTrackingCard",
      "CourierStatusCard",
      "AddressSelector",
      "ProofOfDeliveryState"
    ],
    flows: ["create-delivery", "assign-courier", "track-package", "confirm-delivery"]
  },
  {
    id: "saas",
    name: "SaaS Kit",
    tier: "pro",
    priority: 2,
    status: "structured",
    domains: ["workspace", "metrics", "subscription", "team"],
    components: [
      "MetricCard",
      "SubscriptionCard",
      "WorkspaceSwitcher",
      "ActivityFeed",
      "TeamMemberCard"
    ],
    flows: ["workspace-onboarding", "subscription-status", "team-overview", "notification-center"]
  },
  {
    id: "public-services",
    name: "Public Services Kit",
    tier: "enterprise",
    priority: 2,
    status: "structured",
    domains: ["civic", "case-management", "documents", "appointments"],
    components: [
      "ServiceRequestCard",
      "CaseStatusCard",
      "DocumentRequirementList",
      "AppointmentSummary",
      "PublicNoticeCard"
    ],
    flows: [
      "service-discovery",
      "request-submission",
      "document-upload",
      "appointment-booking",
      "case-tracking"
    ]
  },
  {
    id: "ecommerce",
    name: "Ecommerce Kit",
    tier: "pro",
    priority: 2,
    status: "structured",
    domains: ["catalog", "cart", "checkout", "orders"],
    components: [
      "ProductCard",
      "CartSummary",
      "CheckoutSummary",
      "PromoCodeInput",
      "OrderStatusCard"
    ],
    flows: ["product-catalog", "cart", "checkout", "payment", "order-tracking"]
  }
];

export const starterDefinitions: StarterDefinition[] = [
  {
    id: "fintech-mobile-app",
    name: "Fintech Mobile App Starter",
    tier: "pro",
    status: "structured",
    target: "both",
    kits: ["fintech", "mobile-money", "offline-first"],
    includes: [
      "navigation",
      "auth-placeholder",
      "onboarding",
      "theme",
      "mock-api",
      "offline-states",
      "customization-guide"
    ]
  },
  {
    id: "mobile-money-wallet",
    name: "Mobile Money Wallet Starter",
    tier: "pro",
    status: "structured",
    target: "both",
    kits: ["mobile-money", "offline-first"],
    includes: [
      "navigation",
      "phone-auth",
      "provider-selection",
      "payment-status",
      "receipt-flow",
      "customization-guide"
    ]
  },
  {
    id: "marketplace-buyer-seller",
    name: "Marketplace Buyer Seller Starter",
    tier: "pro",
    status: "structured",
    target: "both",
    kits: ["marketplace", "mobile-money"],
    includes: [
      "buyer-navigation",
      "seller-navigation",
      "catalog",
      "cart",
      "checkout",
      "order-tracking"
    ]
  },
  {
    id: "offline-field-agent",
    name: "Offline Field Agent Starter",
    tier: "enterprise",
    status: "structured",
    target: "both",
    kits: ["offline-first", "public-services"],
    includes: ["agent-auth", "sync-queue", "conflict-warning", "retry-policy", "degraded-mode"]
  },
  {
    id: "saas-companion-app",
    name: "SaaS Companion App Starter",
    tier: "pro",
    status: "structured",
    target: "both",
    kits: ["saas"],
    includes: [
      "workspace-switching",
      "metrics",
      "subscription-status",
      "team-overview",
      "activity-feed"
    ]
  }
];

export function getKitDefinition(id: string) {
  return kitDefinitions.find((kit) => kit.id === id) ?? null;
}

export function getStarterDefinition(id: string) {
  return starterDefinitions.find((starter) => starter.id === id) ?? null;
}
