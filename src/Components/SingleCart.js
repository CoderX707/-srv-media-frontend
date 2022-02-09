import React, { useState } from "react";
import { base_img_url } from "../Helpers/Constant";

export default function SingleCart({ channel, removeCallback }) {
  const [fromDate, setfromDate] = useState(0);
  const [endDate, setendDate] = useState(0);
  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <img
          src={base_img_url + channel.channel_image}
          alt={channel.channel_image}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a>{channel.channel_title}</a>
            </h3>
            <p className="ml-4">
              {" "}
              {
                (channel.total =
                  (parseInt(channel.subscription_price) *
                    (new Date(endDate).getTime() -
                      new Date(fromDate).getTime())) /
                  (1000 * 60 * 60 * 24))
              }
            </p>
          </div>

          <input
            value={fromDate}
            onChange={(e) => {
              setfromDate(e.target.value);
              channel.fromDate = e.target.value;
            }}
            type="date"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          <input
            value={endDate}
            onChange={(e) => {
              setendDate(e.target.value);
              channel.endDate = e.target.value;
            }}
            type="date"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <p className="text-gray-500 mt-2">
            <span>
              {
                (channel.days =
                  channel.subscription_price +
                  " * " +
                  (new Date(endDate).getTime() - new Date(fromDate).getTime()) /
                    (1000 * 60 * 60 * 24))
              }
            </span>
          </p>
          <div className="flex">
            <button
              onClick={(e) => removeCallback(channel)}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
