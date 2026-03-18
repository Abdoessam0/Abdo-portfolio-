import Link from "next/link";
import type { NextPageContext } from "next";

type ErrorProps = {
  statusCode?: number;
};

function Error({ statusCode }: ErrorProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "#060816",
      }}
    >
      <div
        style={{
          maxWidth: 560,
          textAlign: "center",
          color: "#f4f7ff",
          fontFamily: "Inter, system-ui, sans-serif",
          padding: "2rem",
          borderRadius: 28,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
        }}
      >
        <p
          style={{
            letterSpacing: "0.25em",
            fontSize: 12,
            textTransform: "uppercase",
            color: "#8ba4ff",
          }}
        >
          {statusCode || 500} Error
        </p>
        <h1 style={{ fontSize: 32, marginTop: 12, marginBottom: 12 }}>
          Something went wrong
        </h1>
        <p style={{ color: "#94a3c3", marginBottom: 20, lineHeight: 1.7 }}>
          We hit an unexpected issue while rendering this page. Please try again
          or return home.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 18px",
            borderRadius: 999,
            background: "#ffffff",
            color: "#060816",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return { statusCode };
};

export default Error;
