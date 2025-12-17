import { NextResponse } from "next/server";

export async function GET() {
  try {
    const agentId = process.env.NEXT_PUBLIC_AGENT_ID;
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!agentId || !apiKey) {
      return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
    }

    const r = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
      { headers: { "xi-api-key": apiKey } }
    );

    if (!r.ok) {
        throw new Error("Failed to get signed URL");
    }

    const data = await r.json();
    return NextResponse.json({ signedUrl: data.signed_url });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate signed URL" }, { status: 500 });
  }
}
