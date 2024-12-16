"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginAction, signupAction } from "./actions";

import authSchema from "@/lib/auth/formValidationSchemas";

import { Eye } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
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

type AuthFormProps = {
  mode: "login" | "signup";
};

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const formSchema = authSchema[mode];
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "signup"
        ? { name: "", email: "", password: "" }
        : { email: "", password: "" },
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
    const error = await action(formData);

    if (error) {
      // Handle server side errors
      if (error.serverSideError) {
        form.setError("root", { message: error.serverSideError });
      }

      // Handle field-level errors
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([key, messages]) => {
          if (messages && messages.length > 0) {
            form.setError(key as keyof FormValues, {
              message: messages[0],
            });
          }
        });
      }
    } else {
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

        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Error Message */}
        {errors.root && <p className="text-red">{errors.root.message}</p>}

        {/* Submit Button */}
        <Button type="submit" className="w-full p-6" disabled={isSubmitting}>
          {mode === "signup" ? "Sign Up" : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;