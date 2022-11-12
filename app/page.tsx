import Activity from "./Activity";
import {timeUtils} from "../utils/time.utils";

export default function Home() {
    return (
        <div >
            <main>
                <h1 className="text-center font-bold text-gray-600 p-3">When was your last time?</h1>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                <Activity date={new Date("2022-01-01").toDateString()} name="Cigarette"/>
                <Activity date={new Date("2021-02-01").toDateString()} name="Running"/>
                <Activity date={new Date("2022-05-08").toDateString()} name="Dancing"/>
                </div>
            </main>
        </div>
    )
}
