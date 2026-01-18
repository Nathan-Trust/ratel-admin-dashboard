"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import CustomHeader from "@/components/shared/CustomHeader";

const formSchema = z.object({
  platformName: z.string().min(1, "Platform name is required"),
  emailAddress: z.string().email("Invalid email address"),
  contactAddress: z.string().min(1, "Contact address is required"),
  currency: z.string().min(1, "Please select a currency"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Settings() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platformName: "",
      emailAddress: "",
      contactAddress: "",
      currency: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    console.log("Logo file:", logoFile);
    toast.success("Settings updated successfully!");
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        toast.error("Only PNG or JPG files are allowed");
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    form.reset();
    setLogoFile(null);
    setLogoPreview(null);
  };

  return (
    <main className="flex-1">
      <CustomHeader
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M10.96 21C10.7273 21 10.5257 20.9237 10.355 20.771C10.1837 20.6183 10.0773 20.428 10.036 20.2L9.773 18.108C9.45366 18.0113 9.10833 17.86 8.737 17.654C8.36633 17.4473 8.05066 17.226 7.79 16.99L5.875 17.814C5.66367 17.9073 5.449 17.9173 5.231 17.844C5.013 17.7707 4.845 17.6323 4.727 17.429L3.648 15.57C3.53 15.3667 3.49533 15.154 3.544 14.932C3.59266 14.71 3.70866 14.528 3.892 14.386L5.564 13.136C5.534 12.9547 5.50967 12.7683 5.491 12.577C5.471 12.385 5.461 12.1987 5.461 12.018C5.461 11.85 5.471 11.6733 5.491 11.488C5.50967 11.3027 5.534 11.094 5.564 10.862L3.892 9.612C3.70866 9.47 3.596 9.285 3.554 9.057C3.512 8.829 3.54966 8.613 3.667 8.409L4.727 6.609C4.845 6.41767 5.013 6.28234 5.231 6.203C5.449 6.12367 5.66367 6.13067 5.875 6.224L7.771 7.028C8.06966 6.77934 8.393 6.555 8.741 6.355C9.08767 6.155 9.42533 6.00034 9.754 5.891L10.037 3.799C10.0777 3.571 10.1837 3.38067 10.355 3.228C10.5263 3.07534 10.728 2.99934 10.96 3H13.04C13.2727 3 13.4743 3.07634 13.645 3.229C13.8163 3.38167 13.9227 3.572 13.964 3.8L14.227 5.912C14.6103 6.04667 14.949 6.201 15.243 6.375C15.537 6.549 15.84 6.767 16.152 7.029L18.144 6.225C18.356 6.13167 18.571 6.12467 18.789 6.204C19.007 6.28334 19.1747 6.41867 19.292 6.61L20.352 8.429C20.47 8.633 20.5047 8.84567 20.456 9.067C20.4073 9.28834 20.2913 9.47067 20.108 9.614L18.36 10.92C18.4147 11.1267 18.4453 11.3163 18.452 11.489C18.4587 11.6617 18.462 11.8317 18.462 11.999C18.462 12.1543 18.4553 12.318 18.442 12.49C18.4293 12.6627 18.4 12.8713 18.354 13.116L20.044 14.386C20.2273 14.528 20.3467 14.71 20.402 14.932C20.4573 15.154 20.426 15.3667 20.308 15.57L19.242 17.409C19.1247 17.613 18.9537 17.7513 18.729 17.824C18.5043 17.8973 18.2863 17.8873 18.075 17.794L16.152 16.97C15.8407 17.232 15.5273 17.4563 15.212 17.643C14.8967 17.8297 14.5683 17.978 14.227 18.088L13.963 20.199C13.9223 20.427 13.8163 20.6173 13.645 20.77C13.4737 20.9227 13.272 20.9993 13.04 21H10.96ZM11 20H12.956L13.325 17.292C13.829 17.1587 14.2823 16.9757 14.685 16.743C15.089 16.5103 15.4997 16.1917 15.917 15.787L18.412 16.85L19.406 15.15L17.217 13.506C17.3003 13.2213 17.3557 12.9593 17.383 12.72C17.4097 12.4813 17.423 12.2413 17.423 12C17.423 11.7467 17.4097 11.5067 17.383 11.28C17.3563 11.0533 17.301 10.8043 17.217 10.533L19.444 8.85L18.45 7.15L15.898 8.22C15.5953 7.88734 15.1977 7.57567 14.705 7.285C14.2117 6.995 13.745 6.80267 13.305 6.708L13 4H11.006L10.694 6.689C10.19 6.79634 9.72666 6.96967 9.304 7.209C8.882 7.44767 8.462 7.776 8.044 8.194L5.55 7.15L4.556 8.85L6.725 10.47C6.64166 10.694 6.58333 10.9373 6.55 11.2C6.51667 11.4627 6.5 11.736 6.5 12.02C6.5 12.2733 6.51667 12.525 6.55 12.775C6.58333 13.025 6.63533 13.2683 6.706 13.505L4.556 15.15L5.55 16.85L8.025 15.8C8.41766 16.196 8.825 16.5137 9.247 16.753C9.66966 16.9923 10.1457 17.1787 10.675 17.312L11 20ZM11.973 14.5C12.6703 14.5 13.2613 14.2577 13.746 13.773C14.2307 13.2883 14.473 12.6973 14.473 12C14.473 11.3027 14.2307 10.7117 13.746 10.227C13.2613 9.74234 12.6703 9.5 11.973 9.5C11.2717 9.5 10.6797 9.74234 10.197 10.227C9.71433 10.7117 9.473 11.3027 9.473 12C9.473 12.6973 9.71433 13.2883 10.197 13.773C10.6797 14.2577 11.2717 14.5 11.973 14.5Z"
              fill="black"
            />
          </svg>
        }
        header="Settings"
      />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[34px]">
        <div className="bg-white rounded-lg p-6 flex-1 max-w-[507px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="p-6 rounded-lg border border-black/20 space-y-[14px]">
                <FormField
                  control={form.control}
                  name="platformName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-xl font-medium text-[#262626]"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        Platform Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter here"
                          {...field}
                          className="h-[50px] border-[#555] border-[0.5px] rounded"
                          style={{ fontFamily: "Montserrat" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-xl font-medium text-[#262626]"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter here"
                          {...field}
                          className="h-[50px] border-[#555] border-[0.5px] rounded"
                          style={{ fontFamily: "Montserrat" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-xl font-medium text-[#262626]"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        Contact Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter here"
                          {...field}
                          className="h-[50px] border-[#555] border-[0.5px] rounded"
                          style={{ fontFamily: "Montserrat" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-xl font-medium text-[#262626]"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        Currency
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className="h-[50px] border-[#555] border-[0.5px] rounded"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="usd">USD - US Dollar</SelectItem>
                          <SelectItem value="eur">EUR - Euro</SelectItem>
                          <SelectItem value="gbp">
                            GBP - British Pound
                          </SelectItem>
                          <SelectItem value="ngn">
                            NGN - Nigerian Naira
                          </SelectItem>
                          <SelectItem value="jpy">
                            JPY - Japanese Yen
                          </SelectItem>
                          <SelectItem value="cad">
                            CAD - Canadian Dollar
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <div className="bg-white rounded-lg p-6 flex-1 max-w-[481px]">
          <div className="space-y-[18px]">
            <h2
              className="text-xl font-medium text-[#262626]"
              style={{ fontFamily: "Montserrat" }}
            >
              Logo Upload
            </h2>

            <div className="relative h-[381px] rounded-lg border border-black/20 flex flex-col items-center justify-center p-8">
              <input
                type="file"
                id="logo-upload"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleLogoChange}
                className="hidden"
              />

              {logoPreview ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="max-w-full max-h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setLogoFile(null);
                      setLogoPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M12 4L4 12M4 4L12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <svg
                    width="98"
                    height="80"
                    viewBox="0 0 98 80"
                    fill="none"
                    className="mb-2"
                  >
                    <path
                      d="M51.276 1.30225V7.51352C51.276 8.3547 51.611 9.16306 52.209 9.75897C52.808 10.3555 53.619 10.6903 54.464 10.69H61.589"
                      stroke="black"
                      strokeWidth="2.59091"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M61.75 11.3464V26.1457C61.716 27.1137 61.49 28.0654 61.086 28.9458C60.683 29.8263 60.109 30.6181 59.397 31.2757C58.686 31.9363 57.851 32.4503 56.94 32.7881C56.03 33.126 55.062 33.2812 54.091 33.2448H40.9813C40.0049 33.2894 39.0293 33.1409 38.1105 32.8077C37.1917 32.4746 36.3476 31.9633 35.6267 31.3033C34.9086 30.6439 34.3288 29.8484 33.9207 28.963C33.5127 28.0776 33.2847 27.12 33.25 26.1457V8.39969C33.2843 7.43168 33.5098 6.48003 33.9136 5.59958C34.3173 4.71913 34.8914 3.92729 35.6025 3.26969C36.3143 2.60905 37.1493 2.09511 38.0597 1.75725C38.9702 1.41939 39.9383 1.26422 40.9087 1.3006H50.778C52.285 1.29528 53.739 1.85275 54.856 2.86378L59.969 7.56542C60.515 8.03537 60.955 8.61491 61.262 9.26635C61.569 9.91778 61.735 10.6265 61.75 11.3464Z"
                      stroke="black"
                      strokeWidth="2.59091"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M47.5 14.6816V26.3822"
                      stroke="black"
                      strokeWidth="2.59091"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M52.865 19.6064L48.2618 15.0032C48.1622 14.9024 48.0435 14.8224 47.9128 14.7678C47.782 14.7132 47.6417 14.6851 47.5 14.6851C47.3583 14.6851 47.218 14.7132 47.0873 14.7678C46.9565 14.8224 46.8379 14.9024 46.7383 15.0032L42.1351 19.6081"
                      stroke="black"
                      strokeWidth="2.59091"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p
                    className="text-base font-medium text-[#19887F] underline tracking-[-0.3px]"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    Click to upload
                  </p>
                  <p
                    className="text-base font-medium text-black tracking-[-0.3px] text-center"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    or drag and drop
                    <br />
                    PNG or JPG Max. 5 MB
                  </p>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-6 mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="w-[200px] h-[36px] border-black opacity-60 text-xl font-normal tracking-[-0.3px]"
          style={{ fontFamily: "Montserrat" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="w-[200px] h-[36px] bg-[#19887F] hover:bg-[#19887F]/90 text-xl font-normal tracking-[-0.3px]"
          style={{ fontFamily: "Montserrat" }}
        >
          Update
        </Button>
      </div>
    </main>
  );
}
