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
      className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-3 text-left shadow-card transition hover:-translate-y-1 hover:border-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
    >
      {hasThumbnail ? (
        <div className="relative overflow-hidden rounded-xl bg-zinc-50">
          <Image
            src={certificate.thumbnail!}
            alt={`${certificate.title} thumbnail`}
            width={480}
            height={360}
            className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="pointer-events-none absolute inset-x-3 bottom-3 inline-flex items-center justify-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur">
            View details
          </span>
        </div>
      ) : (
        <div className="flex h-36 flex-col items-start justify-between rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          <span>Certificate</span>
          <span>Tap to view</span>
        </div>
      )}
      <div className="mt-4 space-y-1">
        <p className="text-sm font-semibold text-zinc-900">{certificate.title}</p>
        <p className="text-xs text-zinc-600">
          {certificate.issuer} - {new Date(certificate.date).toLocaleDateString("en", { month: "short", year: "numeric" })}
        </p>
      </div>
    </button>
  );
};

export default CertificateCard;

