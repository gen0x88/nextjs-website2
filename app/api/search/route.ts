import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fromId = searchParams.get("fromId");
    const toId = searchParams.get("toId");

    if (!fromId || !toId) {
      return NextResponse.json(
        { error: "Missing fromId or toId" },
        { status: 400 }
      );
    }

    const body = new URLSearchParams({
      outputFormat: "rapidJSON",
      coordOutputFormat: "EPSG:4326",
      depArrMacro: "dep",
      type_origin: "any",
      name_origin: fromId,
      type_destination: "any",
      name_destination: toId,
    });

    const response = await fetch(
      `https://api.transport.nsw.gov.au/v1/tp/trip?${body.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `apikey ${process.env.TFNSW_API_KEY}`,
          Accept: "application/json",
        },
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
