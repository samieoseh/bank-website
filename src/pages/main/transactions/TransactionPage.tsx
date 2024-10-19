import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import withAuth from "@/withAuth";
import { SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import transactionSchema from "@/schemas/transaction-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DebouncedInput from "@/components/ui/debounced-input";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useTransactionFetch from "./hooks/useTransactionFetch";
import TransactionTable from "../transactions/components/TransactionTable";

interface UserData {
  fullName: string;
  id: string;
  username: string;
}

function TransactionPage() {
  const { getTransactions } = useTransactionFetch();
  const [senderUserData, setSenderUserData] = useState<UserData | null>(null);
  const [recieverUserData, setRecieverUserData] = useState<UserData | null>(
    null
  );

  const { data, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(e.target.value);
  };

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      description: "",
      transactionType: "",
      sender: "",
      reciever: "",
    },
  });

  const transactionType = form.watch("transactionType");

  const transactionTypes = ["DEPOSIT", "WITHDRAWAL", "TRANSFER"];
  console.log({
    values: form.getValues(),
    isValid: form.formState.isValid,
    errors: form.formState.errors,
  });

  async function onSubmit(values: z.infer<typeof transactionSchema>) {
    try {
      console.log({ values });
      await axios.post("/api/transactions", values);
      toast.success("Transaction completed successfully", {
        position: "top-center",
      });
      form.reset(form.formState.defaultValues);
      setSenderUserData(null);
      setRecieverUserData(null);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        toast.error(error.response?.data, {
          position: "top-center",
        });
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transaction</h1>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search transactions..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />

          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                Add new transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] h-[500px] overflow-scroll">
              <DialogHeader>
                <DialogTitle>Add transaction</DialogTitle>
                <DialogDescription className="text-[#111]">
                  Enter the transaction details below. Click "Submit" to add the
                  transaction.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className="flex space-y-4 flex-col">
                      <FormField
                        control={form.control}
                        name="transactionType"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Transaction Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a transaction type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {transactionTypes.map(
                                    (transactionType: string) => (
                                      <SelectItem value={transactionType}>
                                        {transactionType}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      {(transactionType === "TRANSFER" ||
                        transactionType === "") && (
                        <FormField
                          control={form.control}
                          name="sender"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel htmlFor="sender">Sender</FormLabel>
                              <FormControl>
                                <DebouncedInput
                                  placeholder="Account Number"
                                  setUserData={setSenderUserData}
                                  userData={senderUserData}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="reciever"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel htmlFor="reciever">Reciever</FormLabel>
                            <FormControl>
                              <DebouncedInput
                                placeholder="Account Number"
                                setUserData={setRecieverUserData}
                                userData={recieverUserData}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel htmlFor="amount">Amount</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Amount"
                                {...field}
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel htmlFor="description">
                              Description
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="py-8">
        <TransactionTable data={data} />
      </div>
    </div>
  );
}

const TransactionsWithAuth = withAuth(TransactionPage);

export default TransactionsWithAuth;
