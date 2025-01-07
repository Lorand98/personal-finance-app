"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, signupSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import SubmitButton from "@/components/ui/submit-button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginAction, signupAction } from "./actions";

type AuthFormProps = {
  mode: "login" | "signup";
};

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const formSchema = mode === "signup" ? signupSchema : loginSchema;
  type LoginValues = z.infer<typeof loginSchema>;
  type SignupValues = z.infer<typeof signupSchema>;
  type FormValues = LoginValues | SignupValues;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: (mode === "signup"
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" }) as FormValues,
  });

  const {
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    if (mode === "signup" && "name" in values) {
      formData.append("name", values.name);
    }
    formData.append("email", values.email);
    formData.append("password", values.password);

    const action = mode === "signup" ? signupAction : loginAction;
    const result = await action(formData);

    if (result.serverSideError) {
      form.setError("root", { message: result.serverSideError });
    } else if (result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([key, messages]) => {
        if (messages && messages.length > 0) {
          form.setError(key as keyof FormValues, {
            message: messages[0],
          });
        }
      });
    } else if (result.success) {
      router.push(mode === "signup" ? "/login" : "/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {mode === "signup" && (
          // Name Field
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {mode === "signup" ? "Create Password" : "Password"}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    {...field}
                  />
                  <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2"
                    onClick={() => setPasswordVisible((prev) => !prev)}
                    type="button"
                    aria-label={
                      passwordVisible
                        ? "Hide password"
                        : "Show password as plain text"
                    }
                  >
                    <Eye weight="fill" />
                  </button>
                </div>
              </FormControl>
              {
                // Password Requirements
                mode === "signup" && (
                  <FormDescription className="text-preset-5 text-right">
                    Password must be at least 8 characters long.
                  </FormDescription>
                )
              }
              <FormMessage />
            </FormItem>
          )}
        />

        {errors.root && <p className="text-red">{errors.root.message}</p>}

        <SubmitButton
          isSubmitting={isSubmitting}
          text={mode === "signup" ? "Sign Up" : "Log In"}
          submittingText={mode === "signup" ? "Signing Up..." : "Logging In..."}
        />
      </form>
    </Form>
  );
};

export default AuthForm;
