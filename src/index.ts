import express, {Request, Response} from 'express';
import { json } from 'stream/consumers';
import { level } from 'winston';
import { logger } from './logs';
var bodyParser = require('body-parser')


var app = express();
const PORT = process.env.PORT || 5000

var jsonParser = bodyParser.json()

app.get('/', (req: any, res: any) => {
res.send('This is DenDen6 API')
})

app.listen(PORT, function () {
    console.log(`project at: ${PORT}!`); 
});

const { new_session, delete_session,join_session, leave_session,
remove_character, add_character, roll_character, roll_character_with_stats,
roll_character_damage, heal_character, damage_character,
order_initiative } = require("./handlers/sessionHandler")

const { responseLog } =  require("./logs")

// Log all requests using logger
app.use('/',(req: any, res, next) => {

    logger.info({
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      date: Date(),
    });
    next();
  });

app.post("/post/session", new_session)
app.delete("/delete/session/:id", delete_session)
app.put("/session/join/:idSession/:idPlayer", join_session)
app.delete("/session/leave/:idSession/:idPlayer", leave_session)
app.post("/session/add/character/:idSession", jsonParser, add_character)
app.delete("/session/delete/character/:idSession/:idCharacter", remove_character)
app.get("/session/roll/:idSession/:idCharacter", roll_character)
app.get("/session/rollstats/:idSession/:idCharacter/:atr/:dom", roll_character_with_stats)
app.get("/session/rolldamage/:idSession/:idCharacter", roll_character_damage)
app.put("/session/heal/:idSession/:idCharacter/:heal", heal_character)
app.put("/session/damage/:idSession/:idCharacter/:damage", damage_character)
app.get("/session/initiative/:idSession", order_initiative)

