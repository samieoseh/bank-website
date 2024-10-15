import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

interface AccountFormFieldProps extends InputProps {
  setValue: UseFormSetValue<{
    amount: number;
    transactionType: string;
    transactionDate: string;
    sender: string;
    receiver: string;
    description?: string | undefined;
  }>;
  label:
    | "amount"
    | "description"
    | "transactionType"
    | "transactionDate"
    | "sender"
    | "receiver";
}
const AccountFormField = React.forwardRef<
  HTMLInputElement,
  AccountFormFieldProps
>(({ className, setValue, label, ...props }, ref) => {
  const handleChange = (e) => {
    console.log("target: ", e.target.value);
    setValue(label, e.target.value);
  };

  return (
    <FormItem className={cn(className)}>
      <FormLabel>Sender</FormLabel>

      <FormControl>
        <Input
          placeholder="Account Number"
          {...props}
          ref={ref}
          //value={value}
          onChange={handleChange}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
});

AccountFormField.displayName = "AccountFormField";

export { AccountFormField };
