interface Tirada
{
    sum: number
    result: number[]
    stats: number[]
}

interface Dominio
{
    points: number,
    text: string
}

interface Parametro
{
    points: number,
    text: string
}

interface EfectoEspecial
{
    title: string,
    text: string,
}

interface DatosPersonaje
{
    name: string;
    level: number;
    bcat: number;
    data: string;
    fue: number;
    din: number;
    vol: number;
    int: number;
    sue: number;
    dfis: number;
    dbat: number;
    dsoc: number;
    docu: number;
    damb: number;
    dcon: number;
    dtec: number;
    drec: number;
    ddem: number;
    daur: number;
    saludf: number;
    resf: number;
    iniciativa: number;
    defensa: number;
    ataque: number;
    impacto: number;
    dmax: number;
}

const emptyCharacter = (): DatosPersonaje => ({
    name : "",
    level : 0,
    bcat : 0,
    data : "",
    fue : 0,
    din : 0,
    vol : 0,
    int : 0,
    sue : 0,
    dfis : 0,
    dbat : 0,
    dsoc : 0,
    docu : 0,
    damb : 0,
    dcon : 0,
    dtec : 0,
    drec : 0,
    ddem : 0,
    daur : 0,
    saludf : 0,
    resf : 0,
    iniciativa : 0,
    defensa : 0,
    ataque : 0,
    impacto : 0,
    dmax : 0
});

export default class Personaje
{
    public name = "";
    public level = 0;
    public bcat = 0; // Bono de Categoría
    public data = "";

    private essences: string[] = [];

    public attributes: {[id: string]: number} = 
    {
        "FUE": 0,
        "DIN": 0,
        "VOL": 0,
        "INT": 0,
        "SUE": 0
    }

    public domains: {[id: string]: Dominio} = 
    {
        "DFIS": { points: 0, text: "" },
        "DBAT": { points: 0, text: "" },
        "DSOC": { points: 0, text: "" },
        "DAMB": { points: 0, text: "" },
        "DOCU": { points: 0, text: "" },
        "DCON": { points: 0, text: "" },
        "DTÉC": { points: 0, text: "" },
        "DREC": { points: 0, text: "" },
        "DDEM": { points: 0, text: "" },
        "DAUR": { points: 0, text: "" },
    }

    public pdc: {[id: string]: Parametro} = //Parámetros de combate
    {
        "SaludF": { points: 0, text: "" },
        "ResF": { points: 0, text: "" },
        "SaludM": { points: 0, text: "" },
        "ResM": { points: 0, text: "" },
        "Iniciativa": { points: 0, text: "" },
        "Defensa": { points: 0, text: "" },
        "Ataque": { points: 0, text: "" },
        "Impacto": { points: 0, text: "" },
        "Dmax": { points: 0, text: "" },
    }

    private modifier: {[id: string]: number} = //Modificadores
    {
        "SaludF": 0,
        "ResF": 0,
        "SaludM": 0,
        "ResM": 0,
        "Iniciativa": 0,
        "Defensa": 0,
        "Ataque": 0,
        "Impacto": 0,
        "Dmax": 0,
    }

    private damagePoints = 0; //Puntos de daño
    private limitDamage = 0; //Límite de puntos de daprivateño
    private damagePointsMental = 0; //Puntos de daño mental
    private limitDamageMental = 0; //Límite de puntos de daño mental

    private pep = 0; // Puntos de épica
    private aura = 0; // Activaciones de aura restantes
    private auraMax = 0; //Activacione de aura máximas


    private specialEffects: EfectoEspecial[] = []


    constructor(json: DatosPersonaje = emptyCharacter()) {

        this.name = json.name
        this.level = json.level
        this.bcat = json.bcat

        this.attributes["FUE"] = json.fue
        this.attributes["DIN"] = json.din
        this.attributes["VOL"] = json.vol
        this.attributes["INT"] = json.int
        this.attributes["SUE"] = json.sue

        this.domains["DFIS"].points = json.dfis;
        this.domains["DBAT"].points = json.dbat;
        this.domains["DSOC"].points = json.dsoc;
        this.domains["DAMB"].points = json.damb;
        this.domains["DOCU"].points = json.docu;
        this.domains["DCON"].points = json.dcon;
        this.domains["DTÉC"].points = json.dtec;
        this.domains["DREC"].points = json.drec;
        this.domains["DDEM"].points = json.ddem;
        this.domains["DAUR"].points = json.daur;

        this.pdc["SaludF"].points = json.saludf;
        this.pdc["ResF"].points = json.resf;
        this.pdc["Iniciativa"].points = json.iniciativa;
        this.pdc["Defensa"].points = json.defensa;
        this.pdc["Ataque"].points = json.ataque;
        this.pdc["Impacto"].points = json.impacto;
        this.pdc["Dmax"].points = json.dmax;
    }

    public rollND6(n: number): number
    {
        var result = 0

        for (let i = 0; i < n; i++) 
        { 
            const roll = Math.floor(Math.random() * (6)) + 1;
            result += roll
        }

        if (n > 0)
            return  result;
        else
            return -1;
    }

    public rollDice (atr: string, dom: string): number
    {
        return this.rollND6(2) + this.attributes[atr] + this.domains[dom].points;
    }

    public takeDamage (damage: number): void
    {
        if (damage > 0 && damage > this.pdc["ResF"].points)
        {
            this.damagePoints += (damage - this.pdc["ResF"].points);
        }
    }

    public healDamage (heal: number): void
    {
        if (heal >= 0)
        {
            this.damagePoints = Math.max(0, this.damagePoints - heal);
        }
    }

    public get damage() 
    {
        return this.damagePoints;
    }

    public setDamage (damagePoints: number): void
    {
        this.damagePoints = Math.max(damagePoints, 0);
    }

    public takeDamageMental (damage: number): void
    {
        if (damage > 0 && damage > this.pdc["ResM"].points)
        {
            this.damagePointsMental += (damage - this.pdc["ResM"].points);
        }
    }

    public healDamageMental (heal: number): void
    {
        if (heal > 0)
        {
            this.damagePointsMental = Math.max(0, this.damagePointsMental - heal);
        }
    }

    public get damageMental() 
    {
        return this.damagePointsMental;
    }

    public setDamageMental (damagePoints: number): void
    {
        this.damagePointsMental = Math.max(damagePoints, 0);
    }

    public addToModifier(mod: string, points: number): boolean
    {
        if (this.modifier[mod] != undefined)
        {
            this.modifier[mod] += points;
            
            return true;
        }
        else
        {
            return false;
        }
    }

    public resetModifiers(): void
    {
        this.modifier["SaludF"] = 0;
        this.modifier["ResF"] = 0;
        this.modifier["SaludM"] = 0;
        this.modifier["ResM"] = 0;
        this.modifier["Iniciativa"] = 0;
        this.modifier["Defensa"] = 0;
        this.modifier["Ataque"] = 0;
        this.modifier["Impacto"] = 0;
        this.modifier["Dmax"] = 0;
    }

    public getModifier(mod:string): number
    {
        return this.modifier[mod];
    }

    public get modifiers(): {[id: string]: number}
    {
        return this.modifiers;
    }

    public addPEP()
    {
        this.pep += 1;
    }

    public spendPEP()
    {
        this.pep -= 1;

        if (this.pep < 0)
        {
            this.pep = 0;
        }
    }

    public get epicPoints(): number
    {
        return this.pep;
    }

    public addAura()
    {
        this.aura += 1;
    }

    public spendAura()
    {
        this.aura -= 1;

        if (this.aura < 0)
        {
            this.aura = 0;
        }
    }

    public get auraPoints(): number
    {
        return this.aura;
    }

    public addSpecialEffect(title: string, text: string)
    {
        this.specialEffects.push({title: title, text: text})
    }

    public removeSpecialEffect(i: number): boolean
    {
        if (this.specialEffects.length > i)
        {
            this.specialEffects.splice(i, 1)
            return true
        }
        else
        {
            return false
        }
    }

    public get getSpecialEfects(): EfectoEspecial[]
    {
        return this.specialEffects
    }


}