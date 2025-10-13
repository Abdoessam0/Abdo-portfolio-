type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
  name: string;
};

export function ContactFormEmail({ message, senderEmail, name }: ContactFormEmailProps) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif', color: '#111', lineHeight: 1.5 }}>
      <div style={{ background: '#fff', margin: '16px auto', padding: '16px', maxWidth: 600, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <h1 style={{ fontSize: 20, margin: 0 }}>New message from your portfolio site</h1>
        <p style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>{message}</p>
        <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid #e5e7eb' }} />
        <p style={{ margin: 0 }}>From: {name} &lt;{senderEmail}&gt;</p>
      </div>
    </div>
  );
}


