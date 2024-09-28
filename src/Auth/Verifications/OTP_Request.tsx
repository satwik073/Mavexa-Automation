"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTheme as useMUITheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/Components/Images/External/UI/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/Images/External/UI/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/Components/ui/input-otp";
import { MESSAGE_HANDLER, MessageConfiguration } from "@/Events/MessageDispatch";
import {
  ThemeSchema,
  ThemeProviderOptions,
} from "@/Global/GlobalSiteNavigators/NavigationState/Constants/structure";
import { RoutesConfiguration } from "@/Constants/structure";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set_token } from "@/Store/authSlice";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
export function InputOTPForm() {
  // Initialize form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  const [is_logged_in, setIsLoggedIn] = useState<boolean>(localStorage.getItem('User-Settings') ? true : false); // Check token presence
  const dispatch = useDispatch()
  const handle_clear = () => {
    localStorage.removeItem('User-Settings');
    setIsLoggedIn(false);
    dispatch(set_token(null))
    navigate('/');
    console.log("Clicked Logout");
  };
  const navigate = useNavigate()
  const muiTheme = useMUITheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const { theme } = useTheme();
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL);
  useEffect(() => {
    const isLightTheme = theme === ThemeProviderOptions.LIGHT_TH
    setLogoColor(isLightTheme ? '' : ThemeSchema.BLK_CL);
  }, [theme]);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    MESSAGE_HANDLER("You submitted the OTP", MessageConfiguration.SC_M, {
      hideProgressBar: true,
      autoClose: 1000,
      position: isSmallScreen ? "top-right" : "bottom-right",
      theme: logoColor ? ThemeProviderOptions.DARK_TH : ThemeProviderOptions.LIGHT_TH,
    });
    navigate(`${RoutesConfiguration.AUTH}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
<div className="flex gap-4">

        <Button type="submit">Submit</Button>
        <div>
          <Button onClick={handle_clear}>Logout</Button>
        </div>
</div>
      </form>
    </Form>
  );
}
