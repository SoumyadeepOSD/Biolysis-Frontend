import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const query = request.nextUrl.searchParams.get("query");
    const API_URI = process.env.NEXT_API_URL!;
    // const API_URI = "http://localhost:8000";
    try {
        const response = await axios.get(`${API_URI}/interface/v1/response/extract?query=${query}`);
        return NextResponse.json({data: response.data, status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch data", status: 400 });
    }
};
  

