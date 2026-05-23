"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, CreditCard, Lock, MapPin, Package, Sparkles } from "lucide-react";
import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { createOrder } from "@/lib/actions/orders";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Step = "address" | "payment" | "confirmation";

type AddressForm = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
};

type PaymentForm = {
  cardHolder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

const EMPTY_ADDRESS: AddressForm = {
  firstName: "", lastName: "", email: "", address: "", city: "", postcode: "", country: "United Kingdom"
};

const EMPTY_PAYMENT: PaymentForm = { cardHolder: "", cardNumber: "", expiry: "", cvv: "" };

const STEPS: { id: Step; label: string }[] = [
  { id: "address", label: "Delivery" },
  { id: "payment", label: "Payment" },
  { id: "confirmation", label: "Confirmation" },
];

function generateOrderId() {
  return `AM-${Math.floor(1000 + Math.random() * 9000)}`;
}

export default function CheckoutPage() {
  const { items, total, remove } = useCart();
  const [step, setStep] = useState<Step>("address");
  const [address, setAddress] = useState<AddressForm>(EMPTY_ADDRESS);
  const [payment, setPayment] = useState<PaymentForm>(EMPTY_PAYMENT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderId] = useState(generateOrderId);
  const [confirmedItems] = useState(() => [...items]);
  const [confirmedTotal] = useState(total);
  const [isPending, startTransition] = useTransition();

  function validateAddress(): boolean {
    const next: Record<string, string> = {};
    if (!address.firstName.trim()) next.firstName = "Required";
    if (!address.lastName.trim()) next.lastName = "Required";
    if (!address.email.trim() || !address.email.includes("@")) next.email = "Valid email required";
    if (!address.address.trim()) next.address = "Required";
    if (!address.city.trim()) next.city = "Required";
    if (!address.postcode.trim()) next.postcode = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validatePayment(): boolean {
    const next: Record<string, string> = {};
    if (!payment.cardHolder.trim()) next.cardHolder = "Required";
    if (payment.cardNumber.replace(/\s/g, "").length < 16) next.cardNumber = "Enter a 16-digit card number";
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) next.expiry = "Format: MM/YY";
    if (payment.cvv.length < 3) next.cvv = "3–4 digits required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleAddressNext() {
    if (validateAddress()) { setStep("payment"); setErrors({}); }
  }

  function handlePaymentConfirm() {
    if (!validatePayment()) return;
    startTransition(async () => {
      try {
        await createOrder({
          orderRef: orderId,
          email: address.email,
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          city: address.city,
          postcode: address.postcode,
          country: address.country,
          total,
          items: items.map((i) => ({
            productSlug: i.product.slug,
            productName: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
        });
      } catch {
        // DB unavailable — still show confirmation
      }
      items.forEach((i) => remove(i.product.slug));
      setStep("confirmation");
      setErrors({});
    });
  }

  if (step === "confirmation") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
        <div className="rounded-2xl border border-sage-300/60 bg-sage-50 p-8 text-center shadow-inset">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
            <CheckCircle2 className="h-8 w-8 text-sage-700" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">Order confirmed</h1>
          <p className="mt-2 text-muted">Thank you, {address.firstName}. Your ritual is on its way.</p>
          <div className="mt-4 inline-block rounded-full border border-sage-300/60 bg-white px-5 py-2 text-sm font-semibold text-sage-700">
            Order {orderId}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
          <h2 className="font-semibold">Order summary</h2>
          <ul className="mt-4 divide-y divide-line">
            {confirmedItems.map(({ product, quantity }) => (
              <li key={product.slug} className="flex items-center gap-4 py-4">
                <div className="h-12 w-12 shrink-0 rounded-xl border border-line" style={{ background: product.image }} aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="text-xs text-muted">Qty {quantity}</p>
                </div>
                <p className="font-semibold text-sm">{formatCurrency(product.price * quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-line pt-4 font-semibold">
            <span>Total</span>
            <span>{formatCurrency(confirmedTotal)}</span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-white/78 p-5 shadow-inset">
          <div className="flex items-start gap-3">
            <Package className="mt-0.5 h-4 w-4 shrink-0 text-sage-700" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">Delivering to</p>
              <p className="mt-1 text-sm text-muted">
                {address.firstName} {address.lastName} · {address.address}, {address.city}, {address.postcode}, {address.country}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button href="/products" className="flex-1">Continue shopping</Button>
          <Button href="/account" variant="secondary" className="flex-1">View account</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="mb-8">
        <Button href="/basket" variant="ghost" className="px-0">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to basket
        </Button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div>
          <StepIndicator steps={STEPS} current={step} />

          {step === "address" && (
            <section className="mt-8">
              <div className="mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-sage-700" aria-hidden="true" />
                <h1 className="text-2xl font-semibold tracking-tight">Delivery address</h1>
              </div>
              <div className="rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name" error={errors.firstName}>
                    <input value={address.firstName} onChange={(e) => setAddress({ ...address, firstName: e.target.value })} placeholder="Skaiste" className={inputClass(errors.firstName)} />
                  </Field>
                  <Field label="Last name" error={errors.lastName}>
                    <input value={address.lastName} onChange={(e) => setAddress({ ...address, lastName: e.target.value })} placeholder="Savitri" className={inputClass(errors.lastName)} />
                  </Field>
                  <Field label="Email address" error={errors.email} className="sm:col-span-2">
                    <input type="email" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} placeholder="you@example.com" className={inputClass(errors.email)} />
                  </Field>
                  <Field label="Address" error={errors.address} className="sm:col-span-2">
                    <input value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} placeholder="12 Wellness Lane" className={inputClass(errors.address)} />
                  </Field>
                  <Field label="City" error={errors.city}>
                    <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="London" className={inputClass(errors.city)} />
                  </Field>
                  <Field label="Postcode" error={errors.postcode}>
                    <input value={address.postcode} onChange={(e) => setAddress({ ...address, postcode: e.target.value })} placeholder="W1A 1AA" className={inputClass(errors.postcode)} />
                  </Field>
                  <Field label="Country" error={errors.country} className="sm:col-span-2">
                    <select value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} className={inputClass()}>
                      {["United Kingdom", "France", "Germany", "Spain", "Italy", "Lithuania", "United States"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Button onClick={handleAddressNext} className="mt-6">
                  Continue to payment
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </section>
          )}

          {step === "payment" && (
            <section className="mt-8">
              <div className="mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-sage-700" aria-hidden="true" />
                <h1 className="text-2xl font-semibold tracking-tight">Payment details</h1>
              </div>
              <div className="rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-surface-strong px-4 py-3 text-xs text-muted">
                  <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  This is a portfolio demo — no real payment data is collected or stored.
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Cardholder name" error={errors.cardHolder} className="sm:col-span-2">
                    <input value={payment.cardHolder} onChange={(e) => setPayment({ ...payment, cardHolder: e.target.value })} placeholder="Skaiste Savitri" className={inputClass(errors.cardHolder)} />
                  </Field>
                  <Field label="Card number" error={errors.cardNumber} className="sm:col-span-2">
                    <input
                      value={payment.cardNumber}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                        const formatted = raw.match(/.{1,4}/g)?.join(" ") ?? raw;
                        setPayment({ ...payment, cardNumber: formatted });
                      }}
                      placeholder="0000 0000 0000 0000"
                      className={inputClass(errors.cardNumber)}
                    />
                  </Field>
                  <Field label="Expiry" error={errors.expiry}>
                    <input
                      value={payment.expiry}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                        const formatted = raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw;
                        setPayment({ ...payment, expiry: formatted });
                      }}
                      placeholder="MM/YY"
                      className={inputClass(errors.expiry)}
                    />
                  </Field>
                  <Field label="CVV" error={errors.cvv}>
                    <input
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                      placeholder="•••"
                      className={inputClass(errors.cvv)}
                    />
                  </Field>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="secondary" onClick={() => { setStep("address"); setErrors({}); }}>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back
                  </Button>
                  <Button onClick={handlePaymentConfirm} disabled={isPending}>
                    {isPending ? "Placing order…" : `Place order · ${formatCurrency(total)}`}
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-white/78 p-5 shadow-inset">
          <h2 className="font-semibold">Your basket</h2>
          {items.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Your basket is empty.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {items.map(({ product, quantity }) => (
                <li key={product.slug} className="flex items-center gap-3 py-3">
                  <div className="h-10 w-10 shrink-0 rounded-lg border border-line" style={{ background: product.image }} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{product.name}</p>
                    <p className="text-xs text-muted">Qty {quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatCurrency(product.price * quantity)}</p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex justify-between border-t border-line pt-4 text-sm font-semibold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <p className="mt-2 text-xs text-muted">Complimentary delivery · no surprises at checkout</p>
        </aside>
      </div>
    </div>
  );
}

function StepIndicator({ steps, current }: { steps: typeof STEPS; current: Step }) {
  const currentIndex = steps.findIndex((s) => s.id === current);
  return (
    <ol className="flex items-center gap-2" aria-label="Checkout steps">
      {steps.map((s, i) => {
        const done = i < currentIndex;
        const active = s.id === current;
        return (
          <li key={s.id} className="flex items-center gap-2">
            <span className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition",
              done ? "border-sage-600 bg-sage-600 text-white" : active ? "border-sage-400 bg-sage-50 text-sage-700" : "border-line bg-white text-muted"
            )}>
              {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </span>
            <span className={cn("text-sm font-semibold", active ? "text-ink" : "text-muted")}>{s.label}</span>
            {i < steps.length - 1 && <span className="mx-1 text-line">›</span>}
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-muted">{label}</label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-clay-700">{error}</p>}
    </div>
  );
}

function inputClass(error?: string) {
  return cn(
    "h-11 w-full rounded-xl border bg-white px-4 text-sm outline-none transition focus:ring-2",
    error ? "border-clay-300 focus:border-clay-400 focus:ring-clay-100" : "border-line focus:border-sage-400 focus:ring-sage-100"
  );
}
