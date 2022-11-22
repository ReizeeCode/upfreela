// Este arquivo exporta uma função e após a exportação da mesma, é feita a conexão com banco de dados

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global é usado aqui para manter uma conexão em cache em recargas a quente em desenvolvimento.
 * Isso evita que as conexões cresçam exponencialmente durante o uso da API Route. */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        // authSource: "admin",
        // user: "admin",
        // pass: "senha",
      })
      .then((mongoose) => {
        console.log("Connected to database!");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
