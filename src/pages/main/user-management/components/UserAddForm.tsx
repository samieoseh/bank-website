import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LucideUser } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import userSchema from "@/schemas/user-schema";
import { PhoneInput } from "@/components/ui/phone-input";
import axios, { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import useUserFetch from "../hooks/useUserFetch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoleType } from "@/types/role";
import { AccountType } from "@/types/account-type";

export default function UserAddForm() {
  const { getRoles, getAccountTypes } = useUserFetch();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      fullName: "",
      address: "",
      userRole: "",
      accountType: "",
    },
  });

  const { data: roles } = useQuery<RoleType[]>({
    queryKey: ["userRoles"],
    queryFn: getRoles,
  });

  const { data: accountTypes } = useQuery<AccountType[]>({
    queryKey: ["accountTypes"],
    queryFn: getAccountTypes,
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    // send token
    try {
      await axios.post("/api/admin/create-user", {
        ...values,
        accountNumber: values.phoneNumber.slice(4),
        emailVerified: false,
        phoneNumberVerified: false,
        balance: 0.0,
        accountType: {
          id: values.accountType,
        },
        userRole: {
          id: values.userRole,
        },
        active: true,
      });

      alert("User created successfully");
    } catch (error) {
      if (isAxiosError(error)) {
        // do some stuff
        console.error(error);
      }
    }
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex items-center gap-2">
            <LucideUser height={20} width={20} />
            Add new user
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[940px]">
          <SheetHeader>
            <SheetTitle>Add a new profile</SheetTitle>
            <SheetDescription className="text-[#111]">
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="py-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          placeholder="Phone Number"
                          {...field}
                          defaultCountry="NG"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="userRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a user role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles?.map((role) => (
                            <SelectItem value={role.id}>
                              {role.roleName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {accountTypes?.map((accountType) => (
                            <SelectItem value={accountType.id}>
                              {accountType.typeName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Save
                </Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
