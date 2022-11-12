"use client";

import {useEffect, useState} from "react";
import NewActivity from "./NewActivity";
import {IActivity} from "../interface/activity.interface";
import Activity from "./Activity";

const MyActivities = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);

    useEffect(() => {
        setActivities(JSON.parse(localStorage?.getItem("activities") ?? "[]") ?? []);
    }, [])

    const onRemove = (name: string) => {
        const parsedActivities: IActivity[] = JSON.parse(localStorage?.getItem("activities") ?? "[]");
        const activityToRemove: IActivity | undefined = parsedActivities.find((activity: { name: string; }) => activity.name === name);
        if (activityToRemove) {
            parsedActivities.splice(parsedActivities.indexOf(activityToRemove), 1);
            localStorage?.setItem("activities", JSON.stringify(parsedActivities));
            setActivities(parsedActivities);
        }
    }

    return <>
        {activities.map((activity: any) =>
            <Activity
                onRemove={onRemove}
                key={activity.name}
                date={activity.date}
                name={activity.name}/>)}
        <NewActivity onCreate={(item) => setActivities(prev => [...prev, item])}/>
    </>

}

export default MyActivities;