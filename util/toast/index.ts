import { toast } from "sonner";
import { capitalize } from "@/util/text";

interface ToastParams {
  title?: string;  // Made optional
  message: string;
}

type ToastInput = string | ToastParams;

const normalizeParams = (input: ToastInput): ToastParams => {
  if (typeof input === 'string') {
    return {
      title: undefined, // Will use default in the toast function
      message: input
    };
  }
  return input;
};

export const successToast = (input: ToastInput) => {
  const { title, message } = normalizeParams(input);
  
  toast.success(title ? capitalize(title.split("_").join(" ")) : "Success", {
    description: message,
    closeButton: true,
    duration: 2000,
  });
};

export const errorToast = (input: ToastInput) => {
  const { title, message } = normalizeParams(input);
  
  toast.error(title ? capitalize(title.split("_").join(" ")) : "Error", {
    description: message,
    closeButton: true,
    duration: 2000,
  });
};
