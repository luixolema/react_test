import {useMemo} from "react";

export const DatePipe = ({date}: { date?: string }) => {
    const formated = useMemo(() => (
        date ? new Date(date).toLocaleDateString() : null
    ), [date]);

    return (
        <>{formated}</>
    );
};