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
    tittle: string,
    text: string,
}

export default class Personaje
{
    private name = "";
    private level = 0;
    private bcat = 0; // Bono de Categoría
    private data = 0;

    private essences: string[] = [];

    private atributes: {[id: string]: number} = 
    {
        "FUE": 0,
        "DIN": 0,
        "VOL": 0,
        "INT": 0,
        "SUE": 0
    }

    private domains: {[id: string]: Dominio} = 
    {
        "DFIS": { points: 0, text: "" },
        "DBAT": { points: 0, text: "" },
        "DSOC": { points: 0, text: "" },
        "DAMB": { points: 0, text: "" },
        "DOCU": { points: 0, text: "" },
        "DCON": { points: 0, text: "" },
        "DTÉC": { points: 0, text: "" },
        "DREC": { points: 0, text: "" },
        "DDEN": { points: 0, text: "" },
        "DAUR": { points: 0, text: "" },
    }

    private pdc: {[id: string]: Parametro} = //Parámetros de combate
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
    private limitDamage = 0; //Límite de puntos de daño
    private damagePointsMental = 0; //Puntos de daño mental
    private limitDamageMental = 0; //Límite de puntos de daño mental

    private pep = 0; // Puntos de épica
    private aura = 0; // Activaciones de aura restantes
    private auraMax = 0; //Activacione de aura máximas


    private specialEfects: EfectoEspecial[] = []

    public rollDice (atr: string, dom: string): number
    {
        return 0;
    }

    public takeDamage (damage: number): void
    {
        
    }

    public healDamage (heal: number): void
    {

    }

    public setDamage (damagePoints: number): void
    {

    }

    public takeDamageMental (damage: number): void
    {

    }

    public healDamageMental (heal: number): void
    {

    }

    public setDamageMental (damagePoints: number): void
    {

    }

    public addToModifier(modifier: string, points: number)
    {
        
    }

    public resetModifiers(): void
    {

    }

    public addPEP()
    {

    }

    public spendPEP()
    {

    }

    public addAura()
    {

    }

    public spendAura()
    {

    }


}