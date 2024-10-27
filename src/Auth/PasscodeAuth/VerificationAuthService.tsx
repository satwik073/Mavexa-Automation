"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTheme as useMUITheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useTheme } from "next-themes";
import { Button } from "@/Components/Images/External/UI/button";
import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/Components/Images/External/UI/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/Components/ui/input-otp";
import { MESSAGE_HANDLER, MessageConfiguration } from "@/Events/MessageDispatch";
import { ThemeSchema, ThemeProviderOptions } from "@/Global/GlobalSiteNavigators/NavigationState/Constants/structure";
import { RolesIdentifier, RoutesConfiguration } from "@/Constants/structure";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { remove_token, set_token } from "@/Store/authSlice";
import { OTP_VERIFICATION } from "@/Pipe/Auth/auth";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { MESSAGE_HANDLER_SONNER } from "@/Events/SonnerMessageDispatch";

const queryClient = new QueryClient();

interface ErrorResponse {
  Details?: string;
}

export interface OtpPayloads {
  otp_for_authentication: string;
}

// Updated PASSCODE_HANDLER to receive token as a parameter
const PASSCODE_HANDLER = async (payload: OtpPayloads, token: string) => {
  const extractedOTP = await OTP_VERIFICATION(payload);
  const responseGranted = await axios({
    ...extractedOTP,
    headers: {
      ...extractedOTP.headers,
      Authorization: `Bearer ${token} ${RolesIdentifier.USER}`,
    },
  });
  return responseGranted;
};

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const muiTheme = useMUITheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const { theme } = useTheme();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL);
  const [is_logged_in, setIsLoggedIn] = useState<boolean>(localStorage.getItem('User-Settings') ? true : false); 
  // Retrieve the token from Redux or localStorage
  const token = useSelector((state: any) => state.auth.token_for_authnetication) 
    || JSON.parse(localStorage.getItem("User-Settings") || '""');

  useEffect(() => {
    const isLightTheme = theme === ThemeProviderOptions.LIGHT_TH;
    setLogoColor(isLightTheme ? "" : ThemeSchema.BLK_CL);
  }, [theme]);

  const mutation = useMutation({
    mutationFn: (userProvidedOTP: OtpPayloads) => PASSCODE_HANDLER(userProvidedOTP, token),
    onMutate: () => {
      setLoadingScreen(true);
    },
    onSuccess: (data) => {
      const token = data.data.token;
      const userInfo = data.data.userInfo;

      // Store token and user info in local storage and Redux state
      dispatch(set_token({ token, user_info: userInfo }));
      localStorage.setItem("User-Settings", JSON.stringify(token));
      localStorage.setItem("User-Info", JSON.stringify(userInfo)); // Optionally store user info

      MESSAGE_HANDLER_SONNER(
        "Success Notification",
        "You have been logged in successfully",
        MessageConfiguration.SC_M
      );

      // Pass token in headers for future authenticated requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token} ${RolesIdentifier.USER}`;
      navigate(RoutesConfiguration.AUTH);
      setLoadingScreen(false);
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.log(axiosError.response?.data?.Details || "OTP Verification Failed");
      }
      setLoadingScreen(false);
    },
  });
  const handle_clear = () => {
    localStorage.removeItem('User-Settings');
    setIsLoggedIn(false);
    dispatch(remove_token());
    navigate(RoutesConfiguration.LOGIN);
    console.log("User logged out and navigated to home");
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate({ otp_for_authentication: data.pin });
    MESSAGE_HANDLER("You submitted the OTP", MessageConfiguration.SC_M, {
      hideProgressBar: true,
      autoClose: 1000,
      position: isSmallScreen ? "top-right" : "bottom-right",
      theme: logoColor ? ThemeProviderOptions.DARK_TH : ThemeProviderOptions.LIGHT_TH,
    });
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
                    {[...Array(6)].map((_, index) => (
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
          <Button onClick={handle_clear} variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function OTPApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <InputOTPForm /> {/* Wrapped component that uses react-query */}
    </QueryClientProvider>
  );
}
