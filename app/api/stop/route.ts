import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const stopName = searchParams.get("stopId");

    if (!stopName) {
      return NextResponse.json({ error: "stopId is required" }, { status: 400 });
    }

    const params = new URLSearchParams({
      outputFormat: "rapidJSON",
      type_sf: "stop",
      name_sf: stopName,
      coordOutputFormat: "EPSG:4326",
    });

    const response = await fetch(
      `https://api.transport.nsw.gov.au/v1/tp/stop_finder?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `apikey ${process.env.TFNSW_API_KEY}`,
          Accept: "application/json"    // ensure JSON response
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: "TfNSW API error", details: text }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
