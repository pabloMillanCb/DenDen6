import Personaje from "./character";
import User from "./user";

export default class Session
{
    private players: User[] = []
    private masterId = 0 // ID del Director de Juego, siempre es 0
    private characters: CharacterEntry[] = [];
    private logs: string[] = [];
    nextId = 1

    public addCharacter(pj: Personaje): void
    {

    }

    public removeCharacter(pj: Personaje): void
    {
        
    }

    private makeEvent(action: string, idChatacter: string): void
    {
        
    }

    private throwEvent(text: string, idCharacter: string): void
    {

    }

    private orderIniciative(): void
    {

    }
    
}

class CharacterEntry
{
    public character: Personaje = new Personaje()
    public tirada = 0
    public id = 0
}