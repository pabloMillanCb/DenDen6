import express, {Request, Response} from 'express';
import App from '../app';
import Session from '../session';
import User from '../user';

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
            .status(500)
            .json({ general: "It does not exist a session with id " + req.params.id}); 
            }
        
        App.delete(req.params.id)

        return res
        .status(201)
        .json({ general: "Session " + req.params.id.toString() + " deleted successfully"});  
            
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again. " + error});          
    }
}

exports.join_session = async (req: Request<{ idSession: string, idPlayer: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession)

        console.log(App)

        if (session == null) {
            return res
            .status(500)
            .json({ general: "It does not exist a session with id " + req.params.idSession}); 
        }

        const success = App.get(req.params.idSession)?.addPlayer(new User, req.params.idPlayer)

        if (success) {
            return res
        .status(201)
        .json({ general: "Player with id  " + req.params.idPlayer.toString() + " added to session successfully"}); 
        }
        else {
            return res
        .status(500)
        .json({ general: "Player with id  " + req.params.idPlayer.toString() + " already exists"}); 
        }

         
            
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.leave_session = async (req: Request<{ idSession: string, idPlayer: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession)

        if (session == null) {
            return res
            .status(500)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }

        const success = App.get(req.params.idSession)?.removePlayer(req.params.idPlayer)

        if (success) {
            return res
            .status(201)
            .json({ general: "Player with id  " + req.params.idPlayer.toString() + " leaved session successfully"});  
        }
        else {
            return res
            .status(500)
            .json({ general: "Player with id  " + req.params.idPlayer.toString() + " does not exists in session"});    
        }

        
            
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

//TODO: add_character

exports.remove_character = async (req: Request<{ idSession: string, idCharacter: number}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession)

        if (session == null) {
            return res
            .status(500)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }

        const character = App.get(req.params.idSession)?.getCharacter(req.params.idCharacter)?.character.name
        const success = App.get(req.params.idSession)?.removeCharacter(req.params.idCharacter)

        if (success) {
            return res
            .status(201)
            .json({ general: "Character  " + character + " removed from session session"});  
        }
        else {
            return res
            .status(500)
            .json({ general: "Character  " + req.params.idCharacter + " does not exist in session"});   
        }
        
            
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.roll_character = async (req: Request<{ idSession: string, idCharacter: number}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession)

        if (session == null) {
            return res
            .status(500)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }
        
        const success = App.get(req.params.idSession)?.roll(req.params.idCharacter)
        const character = App.get(req.params.idSession)?.getCharacter(req.params.idCharacter)?.character.name
        const roll = App.get(req.params.idSession)?.getCharacter(req.params.idCharacter)?.tirada

        if (success) {
            return res
            .status(201)
            .json({ general: "Character  " + character + " rolled " + roll});
        }
        else {
            return res
            .status(500)
            .json({ general: "Character  " + req.params.idCharacter + " does not exist in session"});   
        }
        
            
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.roll_character_with_stats = async (req: Request<{ idSession: string, idCharacter: number, atr: string, dom: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession)

        if (session == null) {
            return res
            .status(500)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }
        

        var character = session.getCharacter(req.params.idCharacter)

        if (character != undefined) {
            return res
            .status(500)
            .json({ general: "Character with id " + req.params.idCharacter + " does not exist in session"});   
        }

        const roll = session.rollWithStats(req.params.atr, req.params.dom, req.params.idCharacter)

        if (roll > 0) {
            return res
            .status(201)
            .json({ general: "Character  " + character!!.character.name + " rolled " + roll + " with " + req.params.atr + " + " +req.params.dom});
        }
        else {
            return res
            .status(500)
            .json({ general: "Character  " + character + " does not exist in session"});   
        }
        
            
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.roll_character_damage = async (req: Request<{ idSession: string, idCharacter: number}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession)

        if (session == null) {
            return res
            .status(500)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }
        
        const success = App.get(req.params.idSession)?.roll(req.params.idCharacter)

        const character = App.get(req.params.idSession)?.getCharacter(req.params.idCharacter)?.character.name
        if (character != undefined) {
            return res
            .status(500)
            .json({ general: "Character with id " + req.params.idCharacter + " does not exist in session"});   
        }

        const roll = session.rollDamage(req.params.idCharacter)

        if (roll > 0) {
            return res
            .status(201)
            .json({ general: "Character  " + character + " rolled in damage " + roll});
        }
        else {
            return res
            .status(500)
            .json({ general: "Something went wrong."});   
        }
        
            
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.heal_character = async (req: Request<{ idSession: string, idCharacter: number, heal: number}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession)

        if (session == null) {
            return res
            .status(500)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }
        
        var success = App.get(req.params.idSession)?.roll(req.params.idCharacter)

        const character = App.get(req.params.idSession)?.getCharacter(req.params.idCharacter)
        if (character != undefined) {
            return res
            .status(500)
            .json({ general: "Character with id " + req.params.idCharacter + " does not exist in session"});   
        }

        character!!.character.healDamage(req.params.heal)

        return res
        .status(201)
        .json({ general: "Character  " + character!!.character.name + " now has " + character!!.character.damage + " points of damage"});
        
            
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.damage_character = async (req: Request<{ idSession: string, idCharacter: number, damage: number}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession)

        if (session == null) {
            return res
            .status(500)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }
        
        var success = App.get(req.params.idSession)?.roll(req.params.idCharacter)

        const character = App.get(req.params.idSession)?.getCharacter(req.params.idCharacter)
        if (character != undefined) {
            return res
            .status(500)
            .json({ general: "Character with id " + req.params.idCharacter + " does not exist in session"});   
        }

        character!!.character.takeDamage(req.params.damage)

        return res
        .status(201)
        .json({ general: "Character  " + character!!.character.name + " now has " + character!!.character.damage + " points of damage"});
        
            
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}

exports.order_initiative = async (req: Request<{ idSession: string}>, res: Response) => {
   
    try{

        const session = App.get(req.params.idSession)

        if (session == null) {
            return res
            .status(500)
            .json({ general: "It does not exist a session with id " + req.params.idSession.toString()}); 
        }
        
        session.orderIniciative()

        var order = ""

        session.initiativeOrder.forEach(function (value) {
            order += " > " + value.character.name
          }); 

        return res
        .status(201)
        .json({ general: "The new turn order is " + order});
        
            
    } catch (error) {
        return res
        .status(500)
        .json({ general: "Something went wrong, please try again"});          
    }
}
