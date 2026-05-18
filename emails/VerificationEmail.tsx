import {
  Html,
  Head,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Container,
  Hr,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head />

      <Preview>Your verification code is: {otp}</Preview>

      <Section
        style={{
          backgroundColor: "#f4f4f5",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <Heading
            as="h2"
            style={{
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            Hello {username},
          </Heading>

          <Text
            style={{
              fontSize: "16px",
              color: "#374151",
              lineHeight: "24px",
            }}
          >
            Thank you for registering. Please use the verification code
            below to complete your registration.
          </Text>

          <Row>
            <Section
              style={{
                backgroundColor: "#f3f4f6",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
                margin: "25px 0",
              }}
            >
              <Text
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  letterSpacing: "6px",
                  color: "#111827",
                  margin: "0",
                }}
              >
                {otp}
              </Text>
            </Section>
          </Row>

          <Text
            style={{
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: "22px",
            }}
          >
            This verification code is valid for a limited time.
          </Text>

          <Hr style={{ margin: "25px 0" }} />

          <Text
            style={{
              fontSize: "13px",
              color: "#9ca3af",
              lineHeight: "20px",
            }}
          >
            If you did not request this code, you can safely ignore this
            email.
          </Text>
        </Container>
      </Section>
    </Html>
  );
}