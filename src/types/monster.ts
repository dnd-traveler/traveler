export interface Action {
    name: string;
    desc: string;
    attack_bonus?: number;
    damage_dice?: string;
    damage_bonus?: number;
}

type Skills = {
    [key: string]: number;
}

export interface Monster {
    "slug": string;
    "name": string;
    "size": string;
    "type": string;
    "subtype": string;
    "group": string | null;
    "alignment": string;
    "armor_class": number;
    "armor_desc": string;
    "hit_points": number;
    "hit_dice": string;
    "speed": {
        walk: number;
        fly?: number;
        swim?: number;
    };
    "strength": number;
    "dexterity": number;
    "constitution": number;
    "intelligence": number;
    "wisdom": number;
    "charisma": number;
    "strength_save": number | null;
    "dexterity_save": number | null;
    "constitution_save": number | null;
    "intelligence_save": number | null;
    "wisdom_save": number | null;
    "charisma_save": number | null;
    "perception": number | null;
    "skills": Skills;
    "damage_vulnerabilities": string;
    "damage_resistances": string;
    "damage_immunities": string;
    "condition_immunities": string;
    "senses": string;
    "languages": string;
    "challenge_rating": string;
    "actions": Action[];
    "reactions": Action[] | string;
    "legendary_desc": string;
    "legendary_actions": Action[] | string;
    "special_abilities": Action[] | string;
    "spell_list": string[];
    "img_main": string | null;
    "document__slug": string;
    "document__title": string;
    "document__license_url": string;
}
