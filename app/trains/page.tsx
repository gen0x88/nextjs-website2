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
import { Button, Select } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { GTFSType } from "../api/gtfs/sydneytrains/route";
import { Journey, Leg, ResponseMessage, TripResponse } from "@/lib/types";
const STOPS = [
  { id: 2220361, name: "Hurstville" },
  { id: 2220351, name: "Allawah" },
  { id: 250020, name: "Wollongong" },
];
const disassembledNames = [
  { id: 0, name: "T1", color: "yellow" },
  { id: 1, name: "T2", color: "light blue" },
  { id: 2, name: "T3", color: "orange" },
  { id: 3, name: "T4", color: "blue" },
  { id: 4, name: "T5", color: "pink" },
  { id: 5, name: "T6", color: "brown" },
  { id: 6, name: "T7", color: "grey" },
  { id: 7, name: "T8", color: "green" },
  { id: 8, name: "T9", color: "red" },
];

export default function TrainsPage() {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const [fromOptions, setFromOptions] = useState<any[]>([]);
  const [toOptions, setToOptions] = useState<any[]>([]);
  const [fromId, setFromId] = useState<string | null>(null);
  const [toId, setToId] = useState<string | null>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [results, setResults] = useState<TripResponse>({
    journeys: [],
    version: "",
  });

  const testFetch = async () => {
    const r = await fetch("/api/gtfs/sydneytrains");
    const d = await r.json();
    console.log(d.entity);
    d.entity.forEach((entity: GTFSType) => {
      if (entity.tripUpdate) {
        entity.tripUpdate.stopTimeUpdate?.forEach((stu: any) => {
          if (
            stu.stopId === "2220361" ||
            stu.stopId === "2220362" ||
            stu.stopId === "2220363" ||
            stu.stopId === "2220364"
          ) {
            console.log("Trip Update:", entity.tripUpdate);
            console.log("Trip id:", entity.tripUpdate.trip?.tripId);
            console.log("Trip routeid:", entity.tripUpdate.trip?.routeId);
            console.log("Stop time updates:", entity.tripUpdate.stopTimeUpdate);
            console.log(`Arrival at stop ${stu.stopId} (Hurstville):`);
            setTrips((prev) => [...prev, entity]);
          }
        });
      }
    });
  };

  const fetchTrips = async () => {
    testFetch();
  };

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
    console.log("Searching trips from", from, "to", to);
    if (!from || !to) {
      alert(`Please select both From and To stations. ${from} - ${to}`);
      return;
    }
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
  };

  // useEffect(() => {
  //   testFetch();
  // }, []);
  useEffect(() => {
    console.log("To changed:", to);
  }, [to]);

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
            console.log("Selected from stop:", e.currentTarget.value);
            setFrom(Number(e.currentTarget.value));
          }}
          value={from}
        >
          <option value={0} disabled>
            Select From Station
          </option>
          {STOPS.map((stop) => (
            <option key={stop.id} value={stop.id}>
              {stop.name}
            </option>
          ))}
        </Select>

        <Select
          name="status"
          className="border data-focus:bg-blue-100 data-hover:shadow text-white bg-gray-800 w-full p-2 rounded mb-4"
          aria-label="Project status"
          onChange={(e) => {
            console.log("Selected to stop:", e.currentTarget.value);
            setTo(Number(e.currentTarget.value));
          }}
          value={to}
        >
          <option value={0} disabled>
            Select To Station
          </option>
          {STOPS.map((stop) => (
            <option key={stop.id} value={stop.id}>
              {stop.name}
            </option>
          ))}
        </Select>
        <Button
          onClick={searchTrips}
          className="w-full bg-blue-600 text-white p-2 rounded mt-4 mb-6"
        >
          Search
        </Button>
        {results.journeys && results.journeys.length > 0 ? (
          results.journeys.map((journey: Journey, index: number) => {
            if (!results.version) return null;
            return (
              <div
                key={index}
                className="border rounded p-4 mb-4 bg-black-50 text-white"
              >
                {journey.legs.map((leg: Leg, legIndex: number) => {
                  if (!leg.transportation) return null;
                  if (
                    !leg.origin.departureTimePlanned ||
                    !leg.destination.arrivalTimePlanned
                  )
                    return null;
                  const departureTime = new Date(
                    leg.origin.departureTimePlanned
                  );
                  const ArrivalTime = new Date(
                    leg.destination.arrivalTimePlanned
                  );
                  const currentTime = new Date();
                  const minutesAway = Math.round(
                    (departureTime.getTime() - currentTime.getTime()) / 60000
                  );
                  const disassembledNameColor =
                    disassembledNames.find(
                      (name) =>
                        name.name === leg.transportation?.disassembledName
                    )?.color || "black";
                  console.log(
                    "color",
                    disassembledNameColor,
                    departureTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  );

                  return (
                    <div
                      key={legIndex}
                      className={`bg-${disassembledNameColor}-100 mb-2`}
                    >
                      <p className="font-semibold">
                        {leg.transportation?.description} (
                        {leg.transportation?.disassembledName})
                      </p>
                      <div className="text-sm my-2">
                        <p>
                          Departure: {leg.origin.name} at{" "}
                          {departureTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p>
                          Arrival: {leg.destination.name} at{" "}
                          {ArrivalTime?.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p>Train Departs in: {minutesAway} minutes</p>
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
