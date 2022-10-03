import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
import { ConvertHoursStringToMinutes } from "./utils/ConvertHoursStringToMinutes"
import { ConvertMinutesToHoursString } from "./utils/ConvertMinutesToHourString"

const prisma = new PrismaClient({
  log: ["query"]
})
const app = express()
app.use(express.json())
app.use(cors())

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })
  
  return response.json(games)
})

app.post("/games/:id/ads", async(request, response) => {
  const gameId = request.params.id
  const { name, yearsPlaying, discord, weekDays, hourStart, hourEnd, useVoiceChannel } = request.body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(","),
      hourStart: ConvertHoursStringToMinutes(hourStart),
      hourEnd: ConvertHoursStringToMinutes(hourEnd),
      useVoiceChannel,
    }
  })


  return response.status(201).json(ad)
})

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: "desc",
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: ConvertMinutesToHoursString(ad.hourStart),
      hourEnd: ConvertMinutesToHoursString(ad.hourEnd)
    }
  }))
})

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adId,
    }
  })

  return response.json({
    discord: ad.discord 
  })
})

app.listen(3333, () => console.log("<-- Server is running -->"))

//37:15