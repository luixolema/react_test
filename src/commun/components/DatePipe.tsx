import {useMemo} from "react";

export const DatePipe = ({date}: { date: string }) => {
    const formated = useMemo(() => (
        new Date(date).toLocaleDateString()
    ), [date]);

    return (
        <>{formated}</>
    );
};