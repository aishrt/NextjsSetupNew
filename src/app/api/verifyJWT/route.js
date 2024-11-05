import jwt from "jsonwebtoken";

export async function POST(request) {
    const { token } = await request.json();
    const jwtKey = process.env.JWT_SECRET_KEY;
    if (!token) {
        return new Response(JSON.stringify({ message: "Token is required" }), {
            status: 400,
        });
    }
    if (!jwtKey) {
        return new Response(
            JSON.stringify({
                message: "Server configuration error: JWT secret is not defined",
            }),
            {
                status: 500,
            }
        );
    }
    try {
        const decoded = jwt.verify(token, jwtKey);
        return new Response(JSON.stringify({ decoded }), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: `JWT verification error: ${error.message}` }),
            { status: 401 }
        );
    }
}