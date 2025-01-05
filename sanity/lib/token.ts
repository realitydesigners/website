import "server-only";

export const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

// Ensure token is only used on the server
if (typeof window !== "undefined") {
  throw new Error("Sanity token should not be accessed on the client");
}

export default token;
