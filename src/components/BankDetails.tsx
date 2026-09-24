import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { BankDetails as Bank } from "@/content/donate";

/** A bank detail with a copy button, so supporters can paste it straight into their banking app. */
function Row({ label, value, copy }: { label: string; value: string; copy?: boolean }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      // Sort codes are copied as six digits, the form most banking apps accept.
      await navigator.clipboard.writeText(label === "Sort code" ? value.replace(/-/g, "") : value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. an insecure context): the value is still on screen to copy by hand.
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line py-3 last:border-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="flex items-center gap-2 text-right">
        <span className="tabular font-semibold">{value}</span>
        {copy && (
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-pike-bright transition-colors hover:border-pike-bright hover:text-fg"
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            <span className="sr-only">{copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}</span>
          </button>
        )}
      </dd>
    </div>
  );
}

/** The club's bank details for donations by transfer (content/donate.ts). */
export function BankDetails({ bank }: { bank: Bank }) {
  return (
    <dl>
      <Row label="Account name" value={bank.accountName} />
      {bank.bankName && <Row label="Bank" value={bank.bankName} />}
      <Row label="Sort code" value={bank.sortCode} copy />
      <Row label="Account number" value={bank.accountNumber} copy />
      <Row label="Reference" value={bank.reference} copy />
    </dl>
  );
}
