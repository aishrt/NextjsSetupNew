import axios from "axios";

export async function GET(request) {
  
    const url = new URL(request.url); // Create a URL object from the request URL
    const ip = url.searchParams.get("ip");
    if (!ip) {
        return new Response(
          JSON.stringify({ message: "IP address is required" }),
          { status: 400 }
        );
      }
    const apiurl =
    `https://api.abuseipdb.com/api/v2/check-block?maxAgeInDays=15&network=${ip}`;
  const apiKey =
    "ca635b9b55856f6adcfe42b84834374dd38cf877e89dff20a356336e87426ae013c91cab691e7b79";

  try {
    const response = await axios.get(apiurl, {
      headers: {
        Key: apiKey,
        Accept: "application/json",
      },
    });
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.response?.status || 500,
    });
  }
}

