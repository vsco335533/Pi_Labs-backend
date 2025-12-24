// import pkg from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const { Pool } = pkg;

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is missing");
// }

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// pool.on("connect", () => {
//   console.log("✓ Supabase database connected");
// });

// pool.on("error", (err) => {
//   console.error("Database error:", err);
//   process.exit(1);
// });

// export const query = (text, params) => pool.query(text, params);
// export default pool;

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on("connect", () => {
  console.log("✅ Connected to Supabase PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ Database error:", err);
  process.exit(1);
});

export const query = (text, params) => pool.query(text, params);
export default pool;
