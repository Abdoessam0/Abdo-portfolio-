import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
  name: string;
};

export function ContactFormEmail({ message, senderEmail, name }: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your portfolio site</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white my-10 px-10 py-4 rounded-md border border-black/10">
              <Heading className="leading-tight">You received a new message from the contact form</Heading>
              <Text className="mt-2 whitespace-pre-wrap">{message}</Text>
              <Hr />
              <Text>From: {name} &lt;{senderEmail}&gt;</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}


