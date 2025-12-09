import Link from "next/link";
import type { NextPageContext } from "next";

type ErrorProps = {
  statusCode?: number;
};

function Error({ statusCode }: ErrorProps) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", background: "#05070d" }}>
      <div style={{ maxWidth: 520, textAlign: "center", color: "#e5f4ec", fontFamily: "Inter, system-ui, sans-serif" }}>
        <p style={{ letterSpacing: "0.25em", fontSize: 12, textTransform: "uppercase", color: "#4ef19d" }}>
          {statusCode || 500} Error
        </p>
        <h1 style={{ fontSize: 32, marginTop: 12, marginBottom: 12 }}>Something went wrong</h1>
        <p style={{ color: "#98a4b3", marginBottom: 20 }}>
          We hit an unexpected issue while rendering this page. Please try again or return home.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 18px",
            borderRadius: 999,
            background: "#4ef19d",
            color: "#05070d",
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
