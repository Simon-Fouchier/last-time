"use client"

import {BellIcon} from "@heroicons/react/24/outline"
import {FC, FormEvent, useRef, useState} from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {IActivity} from "../interface/activity.interface";


interface NewActivityProps {
    onCreate: (activity: IActivity) => void;
}

const NewActivity: FC<NewActivityProps> = ({onCreate}) => {

    const [date, setDate] = useState<Date | null>(null);
    const formRef = useRef<HTMLFormElement>(null)

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            name: { value: string };
        }
        const item: IActivity[] = JSON.parse(localStorage?.getItem("activities") ?? "[]") ?? [];
        const newItem = {date, name: target.name.value};
        localStorage?.setItem("activities", JSON.stringify([...item, newItem]));
        onReset();
        onCreate(newItem)
    }

    const onReset = () => {
        formRef?.current?.reset()
        setDate(null)
    }

    return (<div className="border rounded">
        <form onSubmit={onSubmit} id="add-activity" ref={formRef} className="h-full bg-gray-100">
            <div className="px-3 p-2 border-b bg-gray-200 flex flex-row ">
                <BellIcon className="h-6 w-6 mr-3"/>
                <input name="name" id="name"/>
            </div>
            <div className="grid gap-y-3 p-3">
                <div className="flex flex-row">
                    <span className="bg-gray-600 px-2 p-1 mr-2 rounded text-white"> Date</span>
                    <ReactDatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        locale={"en-GB"}
                        showTimeSelect
                        timeFormat="h:mm aa"
                        timeIntervals={5}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={15}
                        scrollableYearDropdown
                        maxDate={new Date()}
                        dateFormat=" dd-MM-yyyy h:mm aa"
                    />

                </div>
                <div className="flex justify-end">
                    <button type="button" onClick={onReset}
                            className="mr-2 px-2 p-1 bg-gray-100 text-white bg-red-400 hover:bg-red-600 rounded">Cancel
                    </button>
                    <button type="submit"
                            className="px-2 p-1 bg-green-600 hover:bg-green-800 rounded rounded text-white">Add
                    </button>
                </div>
            </div>
        </form>
    </div>)
}


export default NewActivity;
