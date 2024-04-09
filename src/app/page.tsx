import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import { loginSchema } from "./loginSchema";
import { z } from "zod";

export default function Home() {
  const onDataAction = async (data: z.infer<typeof loginSchema>) => {
    "use server";
    const parse = loginSchema.safeParse(data);
    if (parse.success) {
      return { message: "User logged in successfully", user: parse.data };
    } else {
      return {
        message: "User login failed",
        issues: parse.error.issues.map((issue) => issue.message),
      };
    }
  };

  const formAction = async (
    prevState: {
      message: string;
      issues?: string[];
      user?: z.infer<typeof loginSchema>;
    },
    formData: FormData
  ): Promise<{
    message: string;
    issues?: string[];
    user?: z.infer<typeof loginSchema>;
  }> => {
    "use server";
    const data = Object.fromEntries(formData.entries());
    const parse = loginSchema.safeParse(data);
    if (parse.success) {
      return { message: "User logged in successfully", user: parse.data };
    } else {
      return {
        message: "User login failed",
        issues: parse.error.issues.map((issue) => issue.message),
      };
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <RegistrationForm />
      <LoginForm onDataAction={onDataAction} formAction={formAction} />
    </div>
  );
}
