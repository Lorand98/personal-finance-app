import AuthForm from "../auth-form";
import AuthPageWrapper from "@/components/auth/auth-page-wrapper";

const Login = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) => {
  const { status } = await searchParams;
  return (
    <AuthPageWrapper mode="login">
      {status === "verification_sent" && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
          Sign-up successful! Please check your email to confirm your account.
        </div>
      )}
      <AuthForm mode="login" />
    </AuthPageWrapper>
  );
};

export default Login;
