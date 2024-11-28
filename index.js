import dotenv from "dotenv"
dotenv.config()
import Server from "./server/server.js"
import colors from "colors"

const server = new Server()

server.listen()