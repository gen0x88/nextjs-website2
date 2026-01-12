// ===============================
// FULL NSW TRAIN PLANNER APP
// Frontend: React (Vite / CRA)
// Backend: Node + Express proxy
// Features:
// - Station autocomplete
// - Secure API key via backend
// - Live refresh every 30s
// - Disruptions & alerts
// - Platform number
// - Line & train type
// ===============================

"use client";

import CustomBackground from "@/components/background";
import { Select } from "@headlessui/react";
import { ArrowRightIcon, Button, ButtonGroup } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Journey, Leg, ResponseMessage, TripResponse } from "@/lib/types";
import { STOPS } from "@/data/stops";

const disassembledNames = [
  { id: 0, name: "T1", color: "#FBBF24" }, // yellow
  { id: 1, name: "T2", color: "#87CEEB" }, // light blue
  { id: 2, name: "T3", color: "#FB923C" }, // orange
  { id: 3, name: "T4", color: "#3B82F6" }, // blue
  { id: 4, name: "T5", color: "#EC4899" }, // pink
  { id: 5, name: "T6", color: "#92400E" }, // brown
  { id: 6, name: "T7", color: "#9CA3AF" }, // grey
  { id: 7, name: "T8", color: "#22C55E" }, // green
  { id: 8, name: "T9", color: "#EF4444" }, // red
  { id: 9, name: "BMT", color: "#FBBF24" }, // yellow
  { id: 10, name: "CCN", color: "#EF4444" }, // red
  { id: 11, name: "HUN", color: "#92400E" }, // brown
  { id: 12, name: "SCO", color: "#3B82F6" }, // blue
  { id: 13, name: "SHL", color: "#22C55E" }, // blue
  { id: 14, name: "M1", color: "#00b3ba" }, // blue
];

export default function TrainsPage() {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<TripResponse>({
    journeys: [],
    version: "",
  });

  const getStopId = async (stopName: string) => {
    const res = await fetch("/api/stop?stopId=" + stopName, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data.locations[0]?.properties.stopId;
  };

  const searchTrips = async () => {
    if (from === 0 && to === 0) {
      alert("Please select both From and To stations.");
      return;
    } else if (!from) {
      alert(`Invalid Station selected for From`);
      return;
    } else if (!to) {
      alert(`Invalid Station selected for To`);
      return;
    } else if (from === to) {
      alert("From and To stations cannot be the same.");
      return;
    }
    if (loading) return;
    setLoading(true);
    const fromStopId = await getStopId(from.toString());
    const toStopId = await getStopId(to.toString());
    console.log("From Stop ID:", fromStopId);
    console.log("To Stop ID:", toStopId);
    const res = await fetch(
      `/api/search?fromId=${fromStopId}&toId=${toStopId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const journeys = await res.json();
    console.log("Journeys:", journeys);
    setResults(journeys);
    setLoading(false);
  };

  return (
    <CustomBackground>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <h1 className="text-2xl text-white font-bold mb-4">
          NSW Train Planner
        </h1>

        <Select
          name="status"
          className="border data-focus:bg-blue-100 data-hover:shadow text-white bg-gray-800 w-full p-2 rounded mb-4"
          aria-label="Project status"
          onChange={(e) => {
            setFrom(Number(e.currentTarget.value));
          }}
          value={from}
        >
          <option value={0} disabled>
            Select From Station
          </option>
          {STOPS.toSorted((a, b) => a.name.localeCompare(b.name)).map(
            (stop) => (
              <option key={stop.id} value={stop.id}>
                {stop.name}
              </option>
            )
          )}
        </Select>

        <Select
          name="status"
          className="border data-focus:bg-blue-100 data-hover:shadow text-white bg-gray-800 w-full p-2 rounded mb-4"
          aria-label="Project status"
          onChange={(e) => {
            setTo(Number(e.currentTarget.value));
          }}
          value={to}
        >
          <option value={0} disabled>
            Select To Station
          </option>
          {STOPS.toSorted((a, b) => a.name.localeCompare(b.name)).map(
            (stop) => (
              <option key={stop.id} value={stop.id}>
                {stop.name}
              </option>
            )
          )}
        </Select>
        <Button onClick={searchTrips} className="mb-4 w-full">
          {loading ? "Loading..." : "Search"}
        </Button>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : results.journeys && results.journeys.length > 0 ? (
          results.journeys.map((journey: Journey, index: number) => {
            if (!results.version) return null;
            if (journey.legs.length === 0) return null;
            if (
              journey.legs.find(
                (leg) =>
                  new Date(
                    leg.origin.departureTimePlanned
                      ? leg.origin.departureTimePlanned
                      : ""
                  ).getTime() < new Date().getTime()
              )
            )
              return null;
            return (
              <div
                key={index}
                className="border rounded p-4 mb-4 bg-white-500 text-white"
              >
                {journey.legs.map((leg: Leg, legIndex: number) => {
                  if (!leg.transportation) return null;
                  if (
                    !leg.origin.departureTimePlanned ||
                    !leg.destination.arrivalTimePlanned
                  )
                    return null;
                  // Calculate minutes away
                  const departureTime = new Date(
                    leg.origin.departureTimePlanned
                  );
                  const ArrivalTime = new Date(
                    leg.destination.arrivalTimePlanned
                  );
                  const currentTime =
                    legIndex < 1
                      ? new Date()
                      : new Date(
                          journey.legs[
                            legIndex - 1
                          ].destination.arrivalTimePlanned!
                        );
                  const minutesAway = Math.round(
                    (departureTime.getTime() - currentTime.getTime()) / 60000
                  );
                  // Calculate delay
                  const planned = new Date(
                    leg.origin.departureTimePlanned
                  ).getTime();

                  const estimated = new Date(
                    leg.origin.departureTimeEstimated ||
                      leg.origin.departureTimePlanned
                  ).getTime();

                  const delaySeconds = Math.round((estimated - planned) / 1000);

                  const isLate = delaySeconds > 0;

                  const disassembledNameColor =
                    disassembledNames.find(
                      (name) =>
                        name.name === leg.transportation?.disassembledName
                    )?.color || "black";
                  return (
                    <div key={legIndex} className={`mb-2`}>
                      <p
                        className={`font-semibold rounded px-2 py-1`}
                        style={{ backgroundColor: disassembledNameColor }}
                      >
                        {leg.transportation?.destination?.name} (
                        {leg.transportation?.disassembledName})
                      </p>
                      <div className="flex flex-row gap-3 justify-center items-center">
                        <p className="flex flex-col flex-grow">
                          {legIndex === 0 ? "Train Departs in" : "Wait"}{" "}
                          <span className="font-bold">
                            {!isLate ? (
                              <span className="text-green-500">
                                {" "}
                                {minutesAway}{" "}
                                {minutesAway === 1 ? "minute" : "minutes"}
                              </span>
                            ) : (
                              <span className="text-red-500">
                                {" "}
                                {minutesAway}{" "}
                                {minutesAway === 1 ? "minute" : "minutes"}
                                Running {delaySeconds} seconds late
                              </span>
                            )}
                          </span>
                        </p>
                        <div className="text-sm my-2 flex flex-row gap-2 flex-grow justify-center items-center">
                          <p className="flex flex-col">
                            {leg.origin.disassembledName}
                            <span className="flex flex-row justify-center items-center">
                              {departureTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </p>
                          <ArrowRightIcon className="mx-2 mt-1" />
                          <p className="flex flex-col">
                            {leg.destination.disassembledName}
                            <span className="flex flex-row justify-center items-center">
                              {ArrivalTime?.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <details>
                          <summary className="cursor-pointer underline">
                            View Stops
                          </summary>
                          <ul className="list-disc list-inside mt-2">
                            <li>
                              {leg.origin.name} (
                              {departureTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              )
                            </li>
                            {leg.stopSequence?.map((stop, stopIndex) => {
                              if (!stop.arrivalTimePlanned) return null;
                              return (
                                <li key={stopIndex}>
                                  {stop.name} (
                                  {stop.arrivalTimePlanned
                                    ? new Date(
                                        stop.arrivalTimePlanned
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })
                                    : "N/A"}
                                  )
                                </li>
                              );
                            })}
                          </ul>
                        </details>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : results.systemMessages ? (
          <div>
            <p className="text-white">
              Error:{" "}
              {results.systemMessages
                .map((msg: ResponseMessage) => msg.text)
                .join(", ")}
            </p>
          </div>
        ) : (
          <p className="text-white">No journeys found.</p>
        )}
      </div>
    </CustomBackground>
  );
}
