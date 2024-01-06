import React, { useMemo } from "react";

const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
};

export default function FormattedDate({ date }) {
    const formattedDate = useMemo(() => {
        return new Date(date).toLocaleDateString("id-ID", options);
    }, [date]);

    return <React.Fragment>{formattedDate}</React.Fragment>;
}
