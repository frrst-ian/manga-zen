#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();

async function main() {
  console.log("seeding");
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
    console.log("done");
  }
}

main();