"use client"

import {BellIcon} from "@heroicons/react/24/outline"
import {FC, useEffect, useMemo, useState} from "react";
import {timeUtils} from "../utils/time.utils";
import {dateUtils} from "../utils/date.utils";
import {IActivity} from "../interface/activity.interface";

interface ActivityProps {
    activity: IActivity;
    onRemove: (name: string) => void;
}

const Activity: FC<ActivityProps> = ({activity, onRemove}) => {

    const [today, setToday] = useState<Date | undefined>(undefined);
    const [currentDate, setCurrentDate] = useState<Date>(new Date(activity.activityDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setToday(new Date());
        }, 1000);
        return () => clearInterval(interval);
    });

    const onRefreshDate = () => {
        fetch(`/api/activities/${activity.id}`, {
            body: JSON.stringify({date: new Date()}),
            method: "PUT",
            credentials: "include"
        }).then((res: Response) => {
            res.json().then((item: IActivity) => setCurrentDate(new Date(item.activityDate)));
        })
    }

    return (<div className="border rounded">
        <div className="px-3 p-2 border-b bg-gray-200 flex flex-row">
            <BellIcon className="h-6 w-6 mr-3"/>
            <span className="truncate">{activity.name}</span>
        </div>
        <div className="grid gap-y-3 p-3 bg-gray-100">
            <div>
                <span className="bg-gray-600 px-2 p-1 mr-2 rounded text-white">Date</span>
                <span>{dateUtils.toString(currentDate)}</span>
            </div>
            <div>
                <span className="bg-gray-600 px-2 p-1 mr-2 rounded text-white"> Last time</span>
                {today && <span>{timeUtils.formatTime(today?.getTime() - currentDate?.getTime())}</span>}
            </div>
            <div className="flex justify-end">
                <button className="mr-2 px-2 p-1 bg-gray-100 text-white bg-red-400 hover:bg-red-600 rounded"
                        onClick={() => onRemove(activity.id)}>Remove
                </button>
                <button className="px-2 p-1 bg-green-600 hover:bg-green-800 rounded rounded text-white"
                        onClick={onRefreshDate}>I did it
                </button>
            </div>
        </div>
    </div>)
}

export default Activity;
