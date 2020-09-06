import { Monster } from '../../types/monster';

const adultGoldDragon: Monster = {
    "slug": "adult-gold-dragon",
    "name": "Adult Gold Dragon",
    "size": "Huge",
    "type": "dragon",
    "subtype": "",
    "group": "Gold Dragon",
    "alignment": "lawful good",
    "armor_class": 19,
    "armor_desc": "natural armor",
    "hit_points": 256,
    "hit_dice": "19d12+133",
    "speed": {
        "walk": 40,
        "fly": 80,
        "swim": 40
    },
    "strength": 27,
    "dexterity": 14,
    "constitution": 25,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 24,
    "strength_save": null,
    "dexterity_save": 8,
    "constitution_save": 13,
    "intelligence_save": null,
    "wisdom_save": 8,
    "charisma_save": 13,
    "perception": 14,
    "skills": {
        "insight": 8,
        "perception": 14,
        "persuasion": 13,
        "stealth": 8
    },
    "damage_vulnerabilities": "",
    "damage_resistances": "",
    "damage_immunities": "fire",
    "condition_immunities": "",
    "senses": "blindsight 60 ft., darkvision 120 ft., passive Perception 24",
    "languages": "Common, Draconic",
    "challenge_rating": "17",
    "actions": [
        {
            "name": "Multiattack",
            "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
        },
        {
            "name": "Bite",
            "desc": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage.",
            "attack_bonus": 14,
            "damage_dice": "2d10",
            "damage_bonus": 8
        },
        {
            "name": "Claw",
            "desc": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
            "attack_bonus": 14,
            "damage_dice": "2d6",
            "damage_bonus": 8
        },
        {
            "name": "Tail",
            "desc": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
            "attack_bonus": 14,
            "damage_dice": "2d8",
            "damage_bonus": 8
        },
        {
            "name": "Frightful Presence",
            "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
        },
        {
            "name": "Breath Weapons (Recharge 5-6)",
            "desc": "The dragon uses one of the following breath weapons.\n**Fire Breath.** The dragon exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 66 (12d10) fire damage on a failed save, or half as much damage on a successful one.\n**Weakening Breath.** The dragon exhales gas in a 60-foot cone. Each creature in that area must succeed on a DC 21 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
            "attack_bonus": 0,
            "damage_dice": "12d10"
        },
        {
            "name": "Change Shape",
            "desc": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).\nIn a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form."
        }
    ],
    "reactions": "",
    "legendary_desc": "The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.",
    "legendary_actions": [
        {
            "name": "Detect",
            "desc": "The dragon makes a Wisdom (Perception) check."
        },
        {
            "name": "Tail Attack",
            "desc": "The dragon makes a tail attack."
        },
        {
            "name": "Wing Attack (Costs 2 Actions)",
            "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
        }
    ],
    "special_abilities": [
        {
            "name": "Amphibious",
            "desc": "The dragon can breathe air and water."
        },
        {
            "name": "Legendary Resistance (3/Day)",
            "desc": "If the dragon fails a saving throw, it can choose to succeed instead."
        }
    ],
    "spell_list": [],
    "img_main": null,
    "document__slug": "wotc-srd",
    "document__title": "Systems Reference Document",
    "document__license_url": "http://open5e.com/legal"
};

const bandit: Monster = {
    "slug": "bandit",
    "name": "Bandit",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "group": null,
    "alignment": "any non-lawful alignment",
    "armor_class": 12,
    "armor_desc": "leather armor",
    "hit_points": 11,
    "hit_dice": "2d8",
    "speed": {
        "walk": 30
    },
    "strength": 11,
    "dexterity": 12,
    "constitution": 12,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 10,
    "strength_save": null,
    "dexterity_save": null,
    "constitution_save": null,
    "intelligence_save": null,
    "wisdom_save": null,
    "charisma_save": null,
    "perception": null,
    "skills": {},
    "damage_vulnerabilities": "",
    "damage_resistances": "",
    "damage_immunities": "",
    "condition_immunities": "",
    "senses": "passive Perception 10",
    "languages": "any one language (usually Common)",
    "challenge_rating": "1/8",
    "actions": [
        {
            "name": "Scimitar",
            "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage.",
            "attack_bonus": 3,
            "damage_dice": "1d6",
            "damage_bonus": 1
        },
        {
            "name": "Light Crossbow",
            "desc": "Ranged Weapon Attack: +3 to hit, range 80 ft./320 ft., one target. Hit: 5 (1d8 + 1) piercing damage.",
            "attack_bonus": 3,
            "damage_dice": "1d8",
            "damage_bonus": 1
        }
    ],
    "reactions": "",
    "legendary_desc": "",
    "legendary_actions": "",
    "special_abilities": "",
    "spell_list": [],
    "img_main": null,
    "document__slug": "wotc-srd",
    "document__title": "Systems Reference Document",
    "document__license_url": "http://open5e.com/legal"
};

export { adultGoldDragon, bandit }