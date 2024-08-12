import {
    Body,
    Container,
    Heading,
    Hr,
    Img,
    Link,
    Preview,
    Tailwind,
    Text,
} from "@react-email/components";

const baseUrl = process.env.NEXT_PUBLIC_URL
  ? process.env.NEXT_PUBLIC_URL
  : "http://localhost:3000";

export default function SignInEmail({ code }: { code: string }) {
  return (
    <>
      <Preview>Your sign in code for Paperflow</Preview>
      <Tailwind>
        <Body className="mx-auto max-w-xl font-sans">
          <Img src={`${baseUrl}/static/Paperflow-logo.png`} alt="Paperflow" />
          <Heading className="text-3xl font-medium">
            Your sign in code has arrived
          </Heading>
          <Text className="mb-6 max-w-prose text-gray-950/70">
            This code will be valid for the next 10 minutes. If the code does
            not work, try requesting a new one.
          </Text>
          <Container className="mb-10 block rounded-lg bg-gray-950/10 px-12 py-8 font-mono text-3xl font-medium">
            <span>{code.split("").slice(0, 3).join("")} </span>
            <span>{code.split("").slice(3, 6).join("")} </span>
          </Container>
          <Hr className="mb-10 bg-gray-950/50" />
          <Link href={baseUrl}>Paperflow</Link>
        </Body>
      </Tailwind>
    </>
  );
}

SignInEmail.PreviewProps = {
  code: "292801",
};
