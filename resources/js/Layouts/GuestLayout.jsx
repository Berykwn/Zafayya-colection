import ApplicationLogo from "@/Components/Elements/ApplicationLogo";
import React from "react";

const Guest = React.memo(({ children }) => (
    <>
        <div className="min-h-screen flex flex-col sm:justify-center pt-6 sm:pt-0">
            <div className="flex gap-2 justify-center items-center">
                <ApplicationLogo className="w-16" />
                <span className="">
                    Zaffaya. <br /> Collection
                </span>
            </div>
            <main>{children}</main>
        </div>
    </>
));

export default Guest;
