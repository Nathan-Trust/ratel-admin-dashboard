"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const giftCardSchema = z.object({
  country: z.string().min(1, "Country is required"),
  giftCardName: z.string().min(1, "Gift card name is required"),
  price: z.string().min(1, "Price is required"),
});

type GiftCardFormValues = z.infer<typeof giftCardSchema>;

interface GiftCardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GiftCardFormValues) => void;
  mode: "add" | "edit";
  initialData?: {
    country: string;
    giftCardName: string;
    price: string;
  } | null;
}

export function GiftCardForm({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialData,
}: GiftCardFormProps) {
  const form = useForm<GiftCardFormValues>({
    resolver: zodResolver(giftCardSchema),
    defaultValues: {
      country: initialData?.country || "",
      giftCardName: initialData?.giftCardName || "",
      price: initialData?.price || "",
    },
  });

  const handleSubmit = (data: GiftCardFormValues) => {
    onSubmit(data);
    form.reset();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold font-montserrat text-[#1F1F1F]">
            {mode === "add" ? "Add Gift Card" : "Edit Gift Card"}
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter country"
                      {...field}
                      className="w-full px-4 py-2 rounded-lg border border-grey-border focus:outline-none focus:ring-2 focus:ring-teal/20 text-sm font-montserrat"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-failed" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="giftCardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                    Gift Card Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter gift card name"
                      {...field}
                      className="w-full px-4 py-2 rounded-lg border border-grey-border focus:outline-none focus:ring-2 focus:ring-teal/20 text-sm font-montserrat"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-failed" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium font-montserrat text-[#1F1F1F]">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter price"
                      {...field}
                      className="w-full px-4 py-2 rounded-lg border border-grey-border focus:outline-none focus:ring-2 focus:ring-teal/20 text-sm font-montserrat"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-failed" />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-teal text-white text-sm font-semibold font-montserrat hover:bg-teal/90 transition-colors mt-6"
            >
              {mode === "add" ? "Add Gift Card" : "Save Changes"}
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
