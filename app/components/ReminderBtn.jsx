"use client";
import React from "react";
import Swal from "sweetalert2";
import { CiAlarmOn, CiCircleInfo } from "react-icons/ci";
export default function ReminderBtn() {
  return (
    <button
      onClick={() => {
        Swal.fire({
          title: "Done!",
          text: "Alarm has been set successfully!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      }}
      className="cursor-pointer group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-200 text-white bg-gray-900 rounded-md group-hover:bg-opacity-0">
        <span className="flex items-center gap-2">
          Alarm <CiAlarmOn size={25} />
        </span>
      </span>
      <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all">
        <div className="ease-in-out duration-500 -translate-y-4 pointer-events-none transition-all group-hover:-translate-y-16 absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300 before:-top-2">
          <div className="rounded-sm bg-black py-1 px-2">
            <p className="whitespace-nowrap flex items-center gap-1">
              <CiCircleInfo size={17} />
              Remind Me When It's Available
            </p>
          </div>
          <div className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black" />
        </div>
      </div>
    </button>
  );
}
