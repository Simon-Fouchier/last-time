"use client"

import {BellIcon} from "@heroicons/react/24/outline"

import {FC, useEffect, useMemo, useState} from "react";
import {timeUtils} from "../utils/time.utils";

interface ActivityProps {
    date: string;
    name: string;
}

const Activity: FC<ActivityProps> = ({date, name}) => {

    const [today, setToday] = useState<Date | undefined>(undefined);

    useEffect(() => {
        const interval = setInterval(() => {
            setToday(new Date());
        }, 1000);
        return () => clearInterval(interval);
    });

    const formattedDate = useMemo(() => new Date(date), [date]);

    return (<div className="border rounded">
        <div className="px-3 p-2 border-b bg-gray-200 flex flex-row">
            <BellIcon className="h-6 w-6 mr-3"/>
            <span className="truncate">{name}</span>
        </div>
        <div className="grid gap-y-3 p-3 bg-gray-100">
            <div>
                <span className="bg-gray-600 px-2 p-1 mr-2 rounded text-white"> Date</span>
                <span>{formattedDate.toLocaleDateString() + " at " + formattedDate.toLocaleTimeString()}</span>
            </div>
            <div>
                <span className="bg-gray-600 px-2 p-1 mr-2 rounded text-white"> Last time</span>
                {today && <span>{timeUtils.formatTime(today.getTime() - formattedDate.getTime())}</span>}
            </div>
        </div>
    </div>)
}

export default Activity;
