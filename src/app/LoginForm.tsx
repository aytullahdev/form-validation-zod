"use client";
import React, { useRef } from "react";
import { loginSchema } from "./loginSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";

// Why i am not getting error in onDataAction function?
// It's not a void function, it's returning an object
const LoginForm = ({
  onDataAction,
  formAction,
}: {
  onDataAction: (data: z.infer<typeof loginSchema>) => void;
  formAction: (
    prevState: {
      message: string;
      issues?: string[];
      user?: z.infer<typeof loginSchema>;
    },
    data: FormData
  ) => Promise<{
    message: string;
    user?: z.infer<typeof loginSchema>;
    issues?: string[];
  }>;
}) => {
  const [state, onFromAction] = useFormState(formAction, {
    message: "",
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    // onDataAction(data);
    // const formData = new FormData();
    // formData.append("email", data.email);
    // formData.append("password", data.password);
    // console.log(await formAction(state, formData));
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      {state.message && <div>{state.message}</div>}
      <form
        ref={formRef}
        action={onFromAction}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
        className="space-y-4"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
