import {
  Body,
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

export default function PaperInviteEmail({
  inviteUrl,
  paperTitle,
}: {
  inviteUrl: string;
  paperTitle: string;
}) {
  return (
    <>
      <Preview>Paper collaboration invite for &quot;{paperTitle}&quot;</Preview>
      <Tailwind>
        <Body className="mx-auto max-w-xl font-sans">
          <Img src={`${baseUrl}/static/Paperflow-logo.png`} alt="Paperflow" />
          <Heading className="text-3xl font-medium">
            You received a paper collaboration invite
          </Heading>
          <Text className="mb-6 max-w-prose text-gray-950/70">
            An author of the paper &quot;{paperTitle}&quot; has invited you to
            collaborate on the paper. Click the button below to accept the
            invite.
          </Text>
          <Link
            className="mb-10 block rounded-lg bg-green-500 px-4 py-2 text-xl text-green-50 hover:bg-green-400 w-fit"
            href={inviteUrl}
          >
            Accept invite
          </Link>
          <Hr className="mb-10 bg-gray-950/50" />
          <Link href={baseUrl}>Paperflow</Link>
        </Body>
      </Tailwind>
    </>
  );
}

PaperInviteEmail.PreviewProps = {
  inviteUrl: `${baseUrl}/invite?token=as08d7a08d7a8sd6a0960976as0d0`,
  paperTitle: "Complete example name for the paper title",
};
