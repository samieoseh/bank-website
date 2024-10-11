import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { AuthContextType } from "@/types/user";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth() as AuthContextType;
  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await login(data.username, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("An error occurred: ", { error });
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="w-full h-screen border border-red-500 flex">
      <div className="w-[60%] border border-blue-500">
        <div className="w-[80%] mx-auto py-32 space-y-8">
          <h1 className="text-4xl">Welcome!</h1>
          <p>
            Log in using your Admin Portal credentials.
            <br />
            Not yet enrolled in the Admin Portal? Click on Sign Up to begin your
            registration.
          </p>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Username"
                          {...field}
                          className="h-14 w-full text-[1.2rem]"
                        />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="flex w-full relative">
                          <Input
                            placeholder="Password"
                            {...field}
                            className="h-14 w-full text-[1.2rem] pr-12"
                            type={showPassword ? "text" : "password"}
                          />
                          {showPassword ? (
                            <EyeOff
                              stroke="#1b1a1f"
                              height={24}
                              width={24}
                              className=" absolute top-4 right-4 cursor-pointer"
                              onClick={() => setShowPassword((prev) => !prev)}
                            />
                          ) : (
                            <Eye
                              stroke="#1b1a1f"
                              height={24}
                              width={24}
                              className=" absolute top-4 right-4 cursor-pointer"
                              onClick={() => setShowPassword((prev) => !prev)}
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className={`text-[1.2rem] w-full h-14 ${
                    loading ? "opacity-50" : "opacity-100"
                  }`}
                  disabled={!form.formState.isValid}
                >
                  {loading ? "Please wait..." : "Sign in"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
