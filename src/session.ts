import Personaje from "./personaje";
import User from "./user";

type PlayerMap = { id: number; user: User };

export default class Session
{
    private players: Map<string, User> = new Map<string, User>;
    private masterId = "0" // ID del Director de Juego, siempre es 0
    private characters: CharacterEntry[] = [];
    public initiativeOrder: CharacterEntry[] = []
    public logs: string[] = [];

    constructor(master: User)
    {
        this.players.set('0', master)
        master.id = "0"
    }

    public addPlayer(player: User, id: string = '0'): Boolean
    {
        if (this.players.has(id))
        {
            return false
        }

        this.players.set(id, player)
        return true
    }

    public removePlayer(playerId: string): Boolean
    {
        if (playerId != this.masterId) {
            return this.players.delete(playerId)
        }
        else {
            return false
        }
        
    }

    public get getPlayers(): User[]
    {
        return Array.from(this.players.values())
    }

    public destroySession(playerId: string)
    {
        if (playerId == this.masterId)
        {
            return true
        }
        else
        {
            return false
        }
    }

    public addCharacter(pj: Personaje): boolean
    {
        try {
            var pjEntity = new CharacterEntry()
            pjEntity.character = pj

            this.characters.push(pjEntity);

            return true
        }

        catch {
            return false
        }   
    }

    public removeCharacter(index: number): boolean
    {
        if (index < this.characters.length)
        {
            this.characters.splice(index, 1)
            return true
        }

        else
        {
            return false
        }
    }

    getCharacter(index: number): CharacterEntry | undefined
    {
        if (index < this.characters.length)
        {
            return this.characters[index]
        }

        else
        {
            return undefined
        }
    }

    public roll(indexCharacter: number)
    {
        if (indexCharacter < this.characters.length) //check if atr, dom and characters exists
        {
            const character = this.characters[indexCharacter].character
            const roll = character.rollND6(2)
            this.characters[indexCharacter].tirada = roll
            this.throwEvent(character.name + " saca " + roll.toString() + " en una tirada de 2d6", indexCharacter)
            return true
        }
        else
        {
            return false
        }
    }

    public rollWithStats(atr: string, dom: string, indexCharacter: number): number
    {
        if (indexCharacter < this.characters.length) //check if atr, dom and characters exists
        {
            const character = this.characters[indexCharacter].character
            const roll = character.rollND6(2) + character.attributes[atr] + character.domains[dom].points
            this.throwEvent(character.name + " obtiene " + roll.toString() + " en una tirada de " + atr + " " + dom, indexCharacter)
            return roll
        }
        else
        {
            return -1
        }
    }

    public rollDamage(indexCharacter: number): number
    {
        const damageDice = this.checkDamageDice(indexCharacter);

        if (damageDice > 0)
        {   
            const character = this.characters[indexCharacter].character
            const roll = character.rollND6(damageDice)
            this.throwEvent(character.name + " realiza " + roll.toString() + " de daño", indexCharacter)
            return roll
        }
        else
        {
            return -1
        }
    }

    public checkDamageDice(idCharacter: number): number
    {
        if (idCharacter < this.characters.length)
        {
            const pj = this.characters[idCharacter]
            const impactoTotal = pj.tirada + pj.character.getModifier("Impacto") + pj.character.pdc["Impacto"].points

            if (impactoTotal < 10) { return 1 }
            else if (impactoTotal < 17) { return 2 }
            else if (impactoTotal < 23) { return 3 }
            else if (impactoTotal < 27) { return 4 }
            else if (impactoTotal < 31) { return 5 }
            else if (impactoTotal < 35) { return 6 }
            else if (impactoTotal < 38) { return 7 }
            else if (impactoTotal < 40) { return 8 }
            else { return 9 }
        }
        else
        {
            return -1
        }
    }

    public rollnD6(numberDice: number, indexCharacter: number): boolean
    {
        if (indexCharacter < this.characters.length)
        {
            const character = this.characters[indexCharacter].character
            const roll = character.rollND6(numberDice)

            this.throwEvent(character.name + " sacó " + roll + " lanzando " + numberDice + "d6", indexCharacter)

            return true
        }

        else 
        {
            return false
        }
    }

    private throwEvent(text: string, idCharacter: number): void
    {
        //console.log(text)
        this.logs.push(text)
    }

    public orderIniciative(): void
    {

        function compare( a: CharacterEntry, b: CharacterEntry ) {
            if ( a.tirada + a.character.pdc["Iniciativa"].points < b.tirada + b.character.pdc["Iniciativa"].points ){
              return 1;
            }
            if ( a.tirada + a.character.pdc["Iniciativa"].points > b.tirada + b.character.pdc["Iniciativa"].points ){
              return -1;
            }
            return 0;
          }

        this.initiativeOrder = []
        for (let i = 0; i < this.characters.length; i++)
        {
            this.initiativeOrder.push(this.characters[i])
        }

        this.initiativeOrder.sort( compare );
    }

    public get getInitiative()
    {
        return this.initiativeOrder
    }
    
}

class CharacterEntry
{
    public character: Personaje = new Personaje();
    public tirada = 0;
    public id = 0;
}