import NewActivity from "./NewActivity";
import MyActivities from "./MyActivities";


export default function Home() {
    return (
        <div>
            <main>
                <h1 className="text-center font-bold text-gray-600 p-3">When was your last time?</h1>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                    <MyActivities/>
                </div>
            </main>
        </div>
    )
}
