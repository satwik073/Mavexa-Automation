"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Box, useTheme as useMUITheme, useMediaQuery } from "@mui/material";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useTheme } from "next-themes";
import { Button } from "@/Components/Images/External/UI/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/Components/Images/External/UI/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/Components/ui/input-otp";
import { MESSAGE_HANDLER_SONNER, MessageConfiguration } from "@/Events/SonnerMessageDispatch";
import { ThemeSchema, ThemeProviderOptions } from "@/Global/GlobalSiteNavigators/NavigationState/Constants/structure";
import { RolesIdentifier, RoutesConfiguration } from "@/Constants/structure";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { remove_token, set_token } from "@/Store/authSlice";
import { OTP_VERIFICATION } from "@/Pipe/Auth/auth";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";

const queryClient = new QueryClient();

const createConfig = (extractedOTP: AxiosRequestConfig, token: string) => ({
  ...extractedOTP,
  headers: { ...extractedOTP.headers, Authorization: `Bearer ${token} ${RolesIdentifier.USER}` }
});

const getStoredData = (key: string) => localStorage.getItem(key) || '""';

const executeRequest = async (payload: any, token: string) => {
  const otpConfig = await OTP_VERIFICATION(payload);
  return axios(createConfig(otpConfig, token));
};

const FormSchema = z.object({
  pin: z.string().min(6, { message: "Your one-time password must be 6 characters." })
});

function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" }
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const muiTheme = useMUITheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const { theme } = useTheme();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL);

  const is_logged_in = useMemo(() => Boolean(getStoredData("User-Settings")), []);
  const token = useSelector((state: any) => state.auth.token_for_authnetication) || getStoredData("User-Settings");

  const handleClear = useCallback(() => {
    localStorage.removeItem("User-Settings");
    dispatch(remove_token());
    navigate(RoutesConfiguration.LOGIN);
  }, [dispatch, navigate]);

  const mutation = useMutation({
    mutationFn: (userProvidedOTP: any) => executeRequest(userProvidedOTP, token),
    onMutate: () => setLoadingScreen(true),
    onSuccess: (data) => {
      MESSAGE_HANDLER_SONNER(
        "Success Notification",
        data?.data?.message,
        MessageConfiguration.SC_M
      );

      const retrieveData = JSON.parse(getStoredData("User-Info"));
      const tokenCaptured = getStoredData("User-Settings");

      tokenCaptured &&
        dispatch(
          set_token({
            token: tokenCaptured,
            user_info: { ...retrieveData, is_user_verified: true }
          })
        );

      axios.defaults.headers.common["Authorization"] = `Bearer ${token} ${RolesIdentifier.USER}`;
      navigate(RoutesConfiguration.AUTH, { replace: true });
      setLoadingScreen(false);
    },
    onError: (error: any) => {
      MESSAGE_HANDLER_SONNER(
        "Error Notification",
        error.response?.data?.Details || "OTP Verification Failed",
        MessageConfiguration.ERR_M
      );
      setLoadingScreen(false);
    }
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => mutation.mutate({ otp_for_verification: data.pin }),
    [mutation]
  );

  useEffect(() => {
    setLogoColor(theme === ThemeProviderOptions.LIGHT_TH ? "" : ThemeSchema.BLK_CL);
  }, [theme]);

  return (
    <Box className="flex items-center justify-center min-h-screen">
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
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
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
            <Button type="submit" disabled={loadingScreen}>
              {loadingScreen ? "Verifying..." : "Submit"}
            </Button>
            <Button onClick={handleClear} variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </B>

  );
}

export default function OTPApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <InputOTPForm />
    </QueryClientProvider>
  );
}
