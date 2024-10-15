"use client"
import { Button } from "./button"
import { MESSAGE_HANDLER_SONNER, MessageConfiguration } from "@/Events/SonnerMessageDispatch"
import { BsCheck2Circle } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";

export function ToastDemo() {
    return (
        <Button
            variant="outline"
            onClick={() => {
                const title = (
                    <div className="flex items-center">
                        {/* <HiOutlineSparkles className="dark:text-white text-gray-500 font-thin ml-1" size={20} /> */}
                        <span className="mx-1 font-normal">Success Notification</span>
                    </div>
                );

                const description = (
                    <div className="mt-2 bg-slate-950 py-3 rounded-lg px-2">
                    <pre className="text-white text-xs w-full">
                      <code className=" whitespace-pre-wrap text-ellipsis text-xs text-justify">
                        {`"You have been logged in ccessfully "`}
                      </code>
                    </pre>
                  </div>
                );

                MESSAGE_HANDLER_SONNER(title, description, MessageConfiguration.SC_M);
            }}
        >
            Add to calendar
        </Button>
    );
}

