import { expect, test } from 'vitest'
import Personaje from '../src/personaje'

import  Session  from '../src/session'
import User from '../src/user'

test('add or removing players', () => 
{
    const p1  = new User()
    const p2 = new User()

    const session = new Session(p1)

    session.addPlayer(p2)

    expect(session.getPlayers.length).toBe(2)
    expect(session.removePlayer(1)).toBe(true)
    expect(session.getPlayers.length).toBe(1)
    expect(session.removePlayer(0)).toBe(false)
})

test('add or removing characters', () => 
{
    const p1  = new User()
    const p2 = new User()

    const c1 = new Personaje()
    c1.name = "Brandy"
    const c2 = new Personaje()
    c2.name = "Django"

    const session = new Session(p1)

    session.addCharacter(c1)
    session.addCharacter(c2)

    expect(session.getCharacter(0)?.character.name).toBe("Brandy")
    expect(session.getCharacter(2)).toBe(undefined)

    expect(session.removeCharacter(2)).toBe(false)
    expect(session.removeCharacter(1)).toBe(true)
})

test('roll dice for characters', () => 
{
    const p1  = new User()
    const p2 = new User()

    const c1 = new Personaje()
    c1.name = "Brandy"
    c1.attributes["FUE"] = 7
    c1.domains["DFIS"].points = 6
    const c2 = new Personaje()
    c2.name = "Django"

    const session = new Session(p1)

    session.addCharacter(c1)
    session.addCharacter(c2)

    //expect(session.rollWithStats("invent", "invent", 0)).toBe(-1)
    expect(session.rollWithStats("FUE", "DFIS", 1)).toBe(true)
    expect(session.rollWithStats("FUE", "DFIS", 2)).toBe(false)
    expect(session.roll(0)).toBe(true)
    expect(session.roll(2)).toBe(false)
    expect(session.rollDamage(0)).toBe(true)
    expect(session.rollDamage(2)).toBe(false)


})

test('check number of damage dice', () => 
{

    const p1  = new User()
    const p2 = new User()

    const c1 = new Personaje()
    c1.name = "Brandy"
    c1.attributes["FUE"] = 7
    c1.domains["DFIS"].points = 6
    c1.pdc["Impacto"].points = 13
    const c2 = new Personaje()
    c2.name = "Django"

    const session = new Session(p1)

    session.addCharacter(c1)
    session.addCharacter(c2)


    expect(session.checkDamageDice(3)).toBe(-1)

    for (let i = 0; i < 100; i++)
    {
        session.roll(0)
        expect(session.checkDamageDice(0)).toBeGreaterThan(1)
        expect(session.checkDamageDice(0)).toBeLessThan(5)
    }

})

test('order initiative', () => 
{
    const p1  = new User()
    const p2 = new User()

    const c1 = new Personaje()
    c1.name = "Brandy"
    c1.attributes["FUE"] = 7
    c1.domains["DFIS"].points = 6
    c1.pdc["Impacto"].points = 13
    const c2 = new Personaje()
    c2.name = "Django"
    const c3 = new Personaje()
    const c4 = new Personaje()

    const session = new Session(p1)

    session.addCharacter(c1)
    session.addCharacter(c2)
    session.addCharacter(c3)
    session.addCharacter(c4)

    for (let i = 0; i < 100; i++)
    {
        session.roll(0)
        session.roll(1)
        session.roll(2)
        session.roll(3)
        
        session.orderIniciative()

        const initiative = session.getInitiative

        for (let j = 0; j < 3; j++)
        {
            expect(initiative[j].tirada + initiative[j].character.pdc["Iniciativa"].points).toBeGreaterThanOrEqual(initiative[j+1].tirada + initiative[j+1].character.pdc["Iniciativa"].points)
        }
    }
})