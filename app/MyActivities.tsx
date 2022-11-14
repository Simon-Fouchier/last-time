"use client";

import {FC, useEffect, useState} from "react";
import NewActivity from "./NewActivity";
import {IActivity} from "../interface/activity.interface";
import Activity from "./Activity";

const MyActivities: FC<{ activities: IActivity[] }> = ({activities}) => {

    const [myActivities, setMyActivities] = useState<IActivity[]>(activities);

    const onRemove = (id: string) => {
        const activityToRemove: IActivity | undefined = myActivities.find((activity: { id: string; }) => activity.id === id);
        const newActivities = [...myActivities];
        if (activityToRemove) {
            newActivities.splice(newActivities.indexOf(activityToRemove), 1);
            setMyActivities(newActivities);
        }
    }

    return <>
        {myActivities.map((activity: any) =>
            <Activity
                onRemove={onRemove}
                key={activity.id}
                activity={activity}/>)}
        <NewActivity onCreate={(item) => setMyActivities(prev => [...prev, item])}/>
    </>

}

export default MyActivities;