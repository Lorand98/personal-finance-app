"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { loginAction, signupAction } from "@/app/(login)/actions";

import authSchema from "@/lib/auth/formValidationSchemas";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AuthFormProps = {
  mode: "login" | "signup";
};

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const router = useRouter();

  const formSchema = authSchema[mode];
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "signup"
        ? { name: "", email: "", password: "" }
        : { email: "", password: "" },
  });

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
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "signup" ? "Sign Up" : "Log In"}
      </h1>
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
                    <Input placeholder="Your Name" {...field} />
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
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {form.formState.errors.root && (
            <p className="text-red-500">{form.formState.errors.root.message}</p>
          )}

          {/* Submit Button */}
          <Button type="submit">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
