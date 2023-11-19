import { expect, test } from 'vitest'

import  Personaje  from '../src/personaje'

test('six-sided die randomness', () => 
{
    let p = new Personaje();

    for (let i = 0; i < 100; i++)
    {
        let d6 = p.rollND6(1);
        expect(d6).toBeLessThanOrEqual(6);
        expect(d6).toBeGreaterThanOrEqual(1);
    }
})

test('attribute & domain modification & use in dice-roll', () => 
{
    let p = new Personaje();

    let atr = "DIN";
    let dom = "DBAT";

    p.attributes[atr] = 5;
    p.domains[dom].text = "Estilo de esgrima cucharil";
    p.domains[dom].points = 7;

    expect(p.attributes[atr]).toBe(5)
    expect(p.domains[dom].points).toBe(7)

    for (let i = 0; i < 100; i++)
    {
        let roll = p.rollDice(atr, dom);
        expect(roll).toBeLessThanOrEqual(24);
        expect(roll).toBeGreaterThanOrEqual(12);
    }
})

test('set, take and heal damage', () => 
{
    let p = new Personaje();

    p.pdc["SaludF"].points = 22;
    p.pdc["ResF"].points = 5;

    for (let i = 0; i < 100; i++)
    {
        // Resets hit points
        p.setDamage(0)

        // Takes damage
        let damage = p.rollND6(i%6+1);
        p.takeDamage(damage);
        expect(p.damage).toBe(Math.max(0, damage - p.pdc["ResF"].points));

        // Heañs damage
        let heal = p.rollND6(i%3+1);
        let currentHitPoints = p.damage;
        p.healDamage(heal);
        expect(p.damage).toBe(Math.max(0, currentHitPoints - heal));
    }
})

test('set, take and heal mental damage', () => 
{
    let p = new Personaje();

    p.pdc["SaludM"].points = 16;
    p.pdc["ResM"].points = 3;

    for (let i = 0; i < 100; i++)
    {
        // Resets hit points
        p.setDamageMental(0)

        // Takes damage
        let damage = p.rollND6(i%6+1);
        p.takeDamageMental(damage);
        expect(p.damageMental).toBe(Math.max(0, damage - p.pdc["ResM"].points));

        // Heañs damage
        let heal = p.rollND6(i%3+1);
        let currentHitPoints = p.damageMental;
        p.healDamageMental(heal);
        expect(p.damageMental).toBe(Math.max(0, currentHitPoints - heal));
    }
})

test('add and remove modifier', () => 
{
    let p = new Personaje();

    p.addToModifier("Ataque", 1)
    expect(p.getModifier("Ataque")).toBe(1)

    p.addToModifier("Ataque", 5)
    expect(p.getModifier("Ataque")).toBe(6)

    p.addToModifier("Ataque", -7)
    expect(p.getModifier("Ataque")).toBe(-1)

    expect(p.addToModifier("NOEXIST", 0)).toBe(false)

    p.resetModifiers()
    expect(p.getModifier("Ataque")).toBe(0)

})

test('pep manipulation', () => 
{
    let p = new Personaje();

    expect(p.epicPoints).toBe(0);
    p.addPEP();
    p.addPEP();
    expect(p.epicPoints).toBe(2);
    p.spendPEP();
    expect(p.epicPoints).toBe(1);

    for (let i = 0; i < 10; i++)
    {
        p.spendPEP();
    }
    expect(p.epicPoints).toBe(0);

    
})

test('aura manipulation', () => 
{
    let p = new Personaje();

    expect(p.auraPoints).toBe(0);
    p.addAura();
    p.addAura();
    expect(p.auraPoints).toBe(2);
    p.spendAura();
    expect(p.auraPoints).toBe(1);

    for (let i = 0; i < 10; i++)
    {
        p.spendAura();
    }
    expect(p.auraPoints).toBe(0);

    
})

test('special effects manipulation', () => 
{
    let p = new Personaje();

    p.addSpecialEffect("Efecto1", "Descripción efecto")
    p.addSpecialEffect("Efecto2", "Descripción efecto")

    expect(p.getSpecialEfects.length).toBe(2)
    expect(p.getSpecialEfects[0].title).toBe("Efecto1")

    p.removeSpecialEffect(3)
    expect(p.getSpecialEfects.length).toBe(2)

    p.removeSpecialEffect(0)
    expect(p.getSpecialEfects.length).toBe(1)
    expect(p.getSpecialEfects[0].title).toBe("Efecto2")

    
})