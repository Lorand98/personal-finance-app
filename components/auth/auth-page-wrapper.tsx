import Link from 'next/link';

interface AuthPageWrapperProps {
  mode: 'login' | 'signup';
  children: React.ReactNode;
}

const AuthPageWrapper = ({ mode, children }: AuthPageWrapperProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </h1>
      {children}
      <div className="text-center mt-4">
        <p className="text-preset-4">
          {mode === 'login' ? (
            <>
              <span className="text-grey-500">Need to create an account? </span>
              <Link href="/signup" className="font-bold underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              <span className="text-grey-500">Already have an account? </span>
              <Link href="/login" className="font-bold underline">
                Login
              </Link>
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default AuthPageWrapper;