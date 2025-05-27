"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submit-button";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import React, { useActionState, useRef, useState } from "react";
import { loginAction, signupAction } from "./actions";

type AuthFormProps = {
  mode: "login" | "signup";
};

const TEST_USER = {
  email: "user@example.com",
  password: "user1234",
};

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const action = mode === "signup" ? signupAction : loginAction;
  const [state, authFormAction, isPending] = useActionState(action, {
    fieldErrors: {},
    serverSideError: undefined,
  });

  const handleTestLogin = () => {
    if (emailRef.current) emailRef.current.value = TEST_USER.email;
    if (passwordRef.current) passwordRef.current.value = TEST_USER.password;

    submitButtonRef.current?.click();
  };

  return (
    <form action={authFormAction} className="space-y-6">
      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required />
          {state?.fieldErrors?.name && (
            <p className="text-sm text-red-500">{state?.fieldErrors?.name}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        {state?.fieldErrors?.email && (
          <p className="text-sm text-red-500">{state?.fieldErrors?.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            ref={passwordRef}
            id="password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            required
          />
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2"
            onClick={() => setPasswordVisible((prev) => !prev)}
            type="button"
            aria-label={
              passwordVisible ? "Hide password" : "Show password as plain text"
            }
          >
            <Eye weight="fill" />
          </button>
        </div>
        {mode === "signup" && (
          <p className="text-preset-5 text-right">
            Password must be at least 8 characters long.
          </p>
        )}
        {state?.fieldErrors?.password && (
          <p className="text-sm text-red-500">{state?.fieldErrors?.password}</p>
        )}
      </div>

      {state.serverSideError && (
        <p className="text-red-500">{state.serverSideError}</p>
      )}

      <SubmitButton
        isSubmitting={isPending}
        text={mode === "signup" ? "Sign Up" : "Log In"}
        submittingText={mode === "signup" ? "Signing Up..." : "Logging In..."}
        ref={submitButtonRef}
      />

      {mode === "login" && !isPending && (
        <Button className="w-full p-6" type="button" onClick={handleTestLogin}>
          Log In With Test User
        </Button>
      )}
    </form>
  );
};

export default AuthForm;
