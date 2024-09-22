import { cn } from "@/lib/utils";
import { GRID_TRANSFORM } from "../Constants/layout_controlling";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black border-dotted dark:border-gray-900 bg-white border-[0.2px] border-[rgba(0, 0, 0, 0.1)] justify-between flex flex-col space-y-4",
                className
            )}
        >
            <div className="group-hover/bento:translate-x-2 transition duration-200">
         
                <div className=" tracking-tight font-medium text-black dark:text-white text-xl md:text-2xl md:leading-snug text-left">

                    <span className={GRID_TRANSFORM.STYLINGS.edge_header_flexed_text}>

                        {title}
                    </span>
                </div>
                <div className="text-sm text-muted font-normal dark:text-zinc-300 text-zinc-500 text-left max-w-sm mx-0 md:text-sm my-2">
                    <h2 className={GRID_TRANSFORM.STYLINGS.edge_header_flexed_text}>
                        {description}
                    </h2>
                </div>
            </div>
            {header}
        </div>
    );
};
