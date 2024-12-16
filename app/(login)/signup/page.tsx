import AuthForm from "../auth-form";
import AuthPageWrapper from "@/components/auth/auth-page-wrapper";

const Signup = () => {
  return (
    <AuthPageWrapper mode="signup">
      <AuthForm mode="signup" />
    </AuthPageWrapper>
  );
};

export default Signup;
