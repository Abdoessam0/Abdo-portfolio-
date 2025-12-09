import Image from "next/image";
import type { Certificate } from "@/data/certificates";

type CertificateCardProps = {
  certificate: Certificate;
  onSelect: (certificate: Certificate) => void;
};

const CertificateCard = ({ certificate, onSelect }: CertificateCardProps) => {
  const hasThumbnail = Boolean(certificate.thumbnail);

  return (
    <button
      type="button"
      onClick={() => onSelect(certificate)}
      aria-label={`View ${certificate.title} certificate`}
      className="group flex h-full flex-col rounded-2xl border border-outline bg-panel/80 p-3 text-left shadow-card transition hover:-translate-y-1 hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {hasThumbnail ? (
        <div className="relative overflow-hidden rounded-xl border border-outline bg-surface">
          <Image
            src={certificate.thumbnail!}
            alt={`${certificate.title} thumbnail`}
            width={480}
            height={360}
            className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="pointer-events-none absolute inset-x-3 bottom-3 inline-flex items-center justify-center rounded-full bg-panel/80 px-3 py-1 text-xs font-semibold text-accent backdrop-blur">
            View details
          </span>
        </div>
      ) : (
        <div className="flex h-36 flex-col items-start justify-between rounded-xl border border-dashed border-outline bg-surface p-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          <span>Certificate</span>
          <span>Tap to view</span>
        </div>
      )}
      <div className="mt-4 space-y-1">
        <p className="text-sm font-semibold text-ink">{certificate.title}</p>
        <p className="text-xs text-muted">
          {certificate.issuer} - {new Date(certificate.date).toLocaleDateString("en", { month: "short", year: "numeric" })}
        </p>
      </div>
    </button>
  );
};

export default CertificateCard;
