import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";

type StationStop = {
  id: number;
  name: string;
};

const STOPS_FILE = path.join(__dirname, "stops.txt");
const OUTPUT_FILE = path.join(__dirname, "stops.ts");

/**
 * Minimal CSV parser that supports quoted fields
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result.map(v => v.replace(/^"|"$/g, ""));
}

async function scanParentStations(): Promise<StationStop[]> {
  const stations: StationStop[] = [];

  const stream = fs.createReadStream(STOPS_FILE, { encoding: "utf8" });
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  let stopIdIndex = -1;
  let stopNameIndex = -1;
  let locationTypeIndex = -1;
  let parentStationIndex = -1;
  let isHeader = true;

  for await (const line of rl) {
    if (!line.trim()) continue;

    const cols = parseCSVLine(line.trim());

    if (isHeader) {
      stopIdIndex = cols.indexOf("stop_id");
      stopNameIndex = cols.indexOf("stop_name");
      locationTypeIndex = cols.indexOf("location_type");
      parentStationIndex = cols.indexOf("parent_station");

      if (
        stopIdIndex === -1 ||
        stopNameIndex === -1 ||
        locationTypeIndex === -1
      ) {
        throw new Error("stops.txt missing required GTFS columns");
      }

      isHeader = false;
      continue;
    }

    // Parent stations only
    if (cols[locationTypeIndex] !== "1") continue;

    if (
      parentStationIndex !== -1 &&
      cols[parentStationIndex] &&
      cols[parentStationIndex].trim() !== ""
    ) {
      continue;
    }

    const stopName = cols[stopNameIndex];
    if (!stopName || !stopName.toLowerCase().includes("station")) continue;

    const id = Number(cols[stopIdIndex]);
    if (!Number.isFinite(id)) continue;

    stations.push({ id, name: stopName });
  }

  return stations;
}

function writeStopsTs(stations: StationStop[]) {
  const content =
`// ⚠️ AUTO-GENERATED FILE — DO NOT EDIT
// Generated from stops.txt

export const STOPS = ${JSON.stringify(stations, null, 2)} as const;

export type Stop = typeof STOPS[number];
`;

  fs.writeFileSync(OUTPUT_FILE, content, "utf8");
}

// Run
(async () => {
  const stations = await scanParentStations();
  writeStopsTs(stations);
  console.log(`Wrote ${stations.length} parent stations to stops.ts`);
})();
