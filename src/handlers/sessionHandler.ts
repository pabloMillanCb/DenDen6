import express, {Request, Response} from 'express';
import App from '../app';
import Personaje from '../personaje';
import Session from '../session';
import User from '../user';
import { logger, loggerError } from '../logs';

function getRandomId() {
    return Math.floor(Math.random() * 10000);
  }

exports.new_session = async (req: Request, res: Response) => {
   
    try{

        let id = getRandomId()
        while (App.has(id.toString()))
        {
            id = getRandomId()
        }

        App.set(id.toString(), new Session(new User))

        return res
        .status(201)
        .json({ general: "Session created with id " + id.toString()});  
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 500,
            date: Date(),
          });

        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.delete_session = async (req: Request<{ id: string}>, res: Response) => {
   
    try{

        const app = App

        if (!app.has(req.params.id)) {
            return res
            .status(404)
            .json({ general: "It does not exist a session with id " + req.params.id}); 
            }
        
        App.delete(req.params.id)

        return res
        .status(200)
        .json({ general: "Session " + req.params.id.toString() + " deleted successfully"});  
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 500,
            date: Date(),
          });

        return res
        .status(500)
        .json({ general: "Something went wrong, please try again. " + error});          
    }
}

exports.join_session = async (req: Request<{ idSession: string, idPlayer: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession.toString())

        if (session == null) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }

        const success = App.get(req.params.idSession.toString())?.addPlayer(new User, req.params.idPlayer)

        if (success) {
            return res
        .status(201)
        .json({ general: "Player with id  " + req.params.idPlayer.toString() + " added to session successfully"}); 
        }
        else {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 406,
                date: Date(),
              });

            return res
        .status(406)
        .json({ general: "Player with id  " + req.params.idPlayer.toString() + " already exists"}); 
        }

         
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 500,
            date: Date(),
          });

        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.leave_session = async (req: Request<{ idSession: string, idPlayer: string}>, res: Response) => {
   
    try{

        if (req.params.idPlayer == "0") {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 403,
                date: Date(),
              });

            return res
            .status(403)
            .json({ general: "Game master cannot leave session" }); 
        }

        const session = App.get(req.params.idSession.toString())

        if (session == null) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }

        const success = App.get(req.params.idSession.toString())?.removePlayer(req.params.idPlayer)

        if (success) {
            return res
            .status(200)
            .json({ general: "Player with id  " + req.params.idPlayer.toString() + " leaved session successfully"});  
        }
        else {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "Player with id  " + req.params.idPlayer.toString() + " does not exists in session"});    
        }

        
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 500,
            date: Date(),
          });

        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.add_character = async (req: Request<{ idSession: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession.toString())

        if (session == null) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }

        const pj = new Personaje(JSON.parse(JSON.stringify(req.body)))

        const success = App.get(req.params.idSession.toString())?.addCharacter(new Personaje(JSON.parse(JSON.stringify(req.body))))
        

        if (success) {
            return res
            .status(201)
            .json({ general: "Character  " + pj.name + " added to session"});  
        }
        else {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 400,
                date: Date(),
              });

            return res
            .status(400)
            .json({ general: "Character format was incorrect"});   
        }
        
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 500,
            date: Date(),
          });

        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.remove_character = async (req: Request<{ idSession: string, idCharacter: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession.toString())

        if (session == null) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }

        const character = App.get(req.params.idSession.toString())?.getCharacter(parseInt(req.params.idCharacter))?.character.name
        const success = App.get(req.params.idSession.toString())?.removeCharacter(parseInt(req.params.idCharacter))

        if (success) {
            return res
            .status(200)
            .json({ general: "Character  " + character + " removed from session session"});  
        }
        else {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "Character  " + parseInt(req.params.idCharacter) + " does not exist in session"});   
        }
        
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 500,
            date: Date(),
          });

        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.roll_character = async (req: Request<{ idSession: string, idCharacter: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession.toString())

        if (session == null) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }
        
        const success = App.get(req.params.idSession.toString())?.roll(parseInt(req.params.idCharacter))
        const character = App.get(req.params.idSession.toString())?.getCharacter(parseInt(req.params.idCharacter))?.character.name
        const roll = App.get(req.params.idSession.toString())?.getCharacter(parseInt(req.params.idCharacter))?.tirada

        if (success) {
            return res
            .status(200)
            .json({ general: "Character  " + character + " rolled " + roll});
        }
        else {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "Character  " + parseInt(req.params.idCharacter) + " does not exist in session"});   
        }
        
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 500,
            date: Date(),
          });

        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.roll_character_with_stats = async (req: Request<{ idSession: string, idCharacter: string, atr: string, dom: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession.toString())

        if (session == null) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }
        

        var character = session.getCharacter(parseInt(req.params.idCharacter))

        if (character == undefined) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "Character with id " + parseInt(req.params.idCharacter) + " does not exist in session"});   
        }

        const roll = session.rollWithStats(req.params.atr, req.params.dom, parseInt(req.params.idCharacter))

        if (roll > 0) {
            return res
            .status(200)
            .json({ general: "Character  " + character!!.character.name + " rolled " + roll + " with " + req.params.atr + " + " +req.params.dom});
        }
        else {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "Character  " + character + " does not exist in session"});   
        }
        
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 500,
            date: Date(),
          });

        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.roll_character_damage = async (req: Request<{ idSession: string, idCharacter: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession.toString())

        if (session == null) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }
        
        const success = App.get(req.params.idSession.toString())?.roll(parseInt(req.params.idCharacter))

        const character = App.get(req.params.idSession.toString())?.getCharacter(parseInt(req.params.idCharacter))?.character.name
        if (character == undefined) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "Character with id " + parseInt(req.params.idCharacter) + " does not exist in session"});   
        }

        const roll = session.rollDamage(parseInt(req.params.idCharacter))

        if (roll > 0) {
            return res
            .status(200)
            .json({ general: "Character  " + character + " rolled in damage " + roll});
        }
        else {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 400,
                date: Date(),
              });

            return res
            .status(400)
            .json({ general: "Something went wrong."});   
        }
        
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 500,
            date: Date(),
          });

        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.heal_character = async (req: Request<{ idSession: string, idCharacter: string, heal: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession.toString())

        if (session == null) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }

        const character = App.get(req.params.idSession.toString())?.getCharacter(parseInt(req.params.idCharacter))
        if (character == undefined) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "Character with id " + parseInt(req.params.idCharacter) + " does not exist in session"});   
        }

        character!!.character.healDamage(parseInt(req.params.heal))

        return res
        .status(200)
        .json({ general: "Character  " + character!!.character.name + " now has " + character!!.character.damage + " points of damage"});
        
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 500,
            date: Date(),
          });

        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.damage_character = async (req: Request<{ idSession: string, idCharacter: string, damage: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession.toString())

        if (session == null) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }

        const character = App.get(req.params.idSession.toString())?.getCharacter(parseInt(req.params.idCharacter))
        if (character == undefined) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "Character with id " + parseInt(req.params.idCharacter) + " does not exist in session"});   
        }

        character!!.character.takeDamage(parseInt(req.params.damage))

        return res
        .status(200)
        .json({ general: "Character  " + character!!.character.name + " now has " + character!!.character.damage + " points of damage"});
        
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 404,
            date: Date(),
          });

        return res
        .status(404)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.order_initiative = async (req: Request<{ idSession: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession.toString())

        if (session == null) {

            loggerError.info({
                method: req.method,
                url: req.url,
                statusCode: 404,
                date: Date(),
              });

            return res
            .status(404)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }
        
        session.orderIniciative()

        var order = ""

        session.initiativeOrder.forEach(function (value) {
            order += " > " + value.character.name
          }); 

        return res
        .status(200)
        .json({ general: "The new turn order is " + order});
        
            
    } catch (error) {

        loggerError.info({
            method: req.method,
            url: req.url,
            statusCode: 404,
            date: Date(),
          });

        return res
        .status(404)
        .json({ general: "Something went wrong, please try again"});          
    }
}
