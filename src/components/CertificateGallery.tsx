"use client";

import * as React from "react";
import type { Certificate } from "@/data/certificates";
import CertificateCard from "./CertificateCard";
import CertificateModal from "./CertificateModal";

type CertificateGalleryProps = {
  certificates: Certificate[];
};

const CertificateGallery = ({ certificates }: CertificateGalleryProps) => {
  const [active, setActive] = React.useState<Certificate | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <CertificateCard key={certificate.id} certificate={certificate} onSelect={setActive} />
        ))}
      </div>
      <CertificateModal certificate={active} onClose={() => setActive(null)} />
    </>
  );
};

export default CertificateGallery;

