import AuthForm from '../auth-form';
import AuthPageWrapper from '@/components/auth/auth-page-wrapper';

const Login = () => {
  return (
    <AuthPageWrapper mode="login">
      <AuthForm mode="login" />
    </AuthPageWrapper>
  );
};

export default Login;