import NewActivity from "./NewActivity";
import MyActivities from "./MyActivities";
import {IActivity} from "../interface/activity.interface";
import {cookies, headers} from "next/headers";
import {prisma} from "../server/db/client";


const fetchActivities = async (): Promise<IActivity[]> => {
    const nextCookies = cookies();
    let sessionId;
    const cookieSession = nextCookies.get("session");

    if (cookieSession) {
        sessionId = cookieSession.value
    } else {
        return [];
    }

    const activities = await prisma.activity.findMany({
        where: {sessionId: sessionId},
        orderBy: {activityDate: "desc"}
    });
    return activities.map((activity) => ({
        activityDate: activity.activityDate.toISOString(),
        name: activity.name,
        id: activity.id,
    }));
}


export default async function Home() {

    const activities = await fetchActivities();

    return (
        <div>
            <main>
                <h1 className="text-center font-bold text-gray-600 p-3">When was your last time?</h1>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                    <MyActivities activities={activities}/>
                </div>
            </main>
        </div>
    )
}


