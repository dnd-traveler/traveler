import * as Chance from 'chance';
import { useCallback } from 'react';

const chance = new Chance.Chance();

interface EncounterMetadata {
    monsters: string[];
}

export interface Encounter {
    text: string;
    metadata: EncounterMetadata
}

export type GeneratorDie = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

type EncounterTable = {
    [key: number]: Encounter;
}

const weightedEncounterTypes = {
    hostile: 1,
    neutral: 4,
    feature: 1
};

const hostileEncounters: EncounterTable = {
    1: {
        text: 'A group of 1d6 bandits, lying concealed in wait to waylay travellers on the road.',
        metadata: {
            monsters: ['bandit']
        }
    },
    2: {
        text: 'A wagon train of 2d6 Duergar who are hostile to non-Dwarves (seeming merely irritable to their own kind), they have little interest in talking because they are carrying the body of a slain hero home. Attempts to delay or question them will be met with hostility and possibly an attack.',
        metadata: {
            monsters: ['duergar']
        }
    },
    3: {
        text: 'A group of 1d6 thieves who poses as traders or travelling bards to ingratiate themselves with the PCs but–given a chance–they will incapacitate and rob them, leaving them lying by the roadside bereft of possessions.',
        metadata: {
            monsters: ['bandit']
        }
    },
    4: {
        text: 'A group of 2d6 goblins who are starving, they are looking to scavenge from a local settlement, but are not above attacking an enemy they believe that they can defeat.',
        metadata: {
            monsters: ['goblin']
        }
    },
    5: {
        text: 'A pack of 1d4 Dire Wolves have been rampaging through the local area, menacing villages and causing a hazard to travel. How the animals got so big and why it is taking out it\'s aggression on the locals is up to the GM.',
        metadata: {
            monsters: ['dire-wolf']
        }
    },
    6: {
        text: 'A hostile group of 2d6 Elves who claim guardianship of a nearby natural feature, they take a dim view of outsiders, viewing them as despoilers and corruptors of nature.',
        metadata: {
            monsters: ['scout']
        }
    },
    7: {
        text: 'A group of 2d6 evil humanoids who are on a mission for their dark master, if the PCs defeat them then they will gain XP and random loot as normal. This is good opportunity for GMs to drop in items that hint at the identity of the humanoid\'s master and can serve as a way to introduce a new villainous mastermind to a campaign.',
        metadata: {
            monsters: ['cultist', 'thug', 'cult-fanatic']
        }
    },
    8: {
        text: 'A small pack of 1d6+2 dogs that escaped from their homes and have gone feral.',
        metadata: {
            monsters: ['wolf']
        }
    },
    9: {
        text: 'A huge troll that makes it\'s lair under a local bridge, it charges all those who pass 1d6 gold pieces as a toll, attacking those who refuse.',
        metadata: {
            monsters: ['troll']
        }
    },
    10: {
        text: 'A mob of 2d12 torch-wielding people from a local settlement are chasing a mutant, a suspected witch or just someone they don\'t like very much with the intent of burning them alive for some crime real or imagined (as determined by the GM).',
        metadata: {
            monsters: ['commoner']
        }
    },
    11: {
        text: 'A brutish, inbred Ogre who is part of a tribe inhabiting the hills or mountains nearby, previously they have herded goats and caused little trouble, but a strange blight has killed their herds and now they take to raiding the nearby lowland settlements for food and other items.',
        metadata: {
            monsters: ['ogre']
        }
    },
    12: {
        text: 'A group of 2d6 orcs lurking in nearby hills or forest, they are preparing to attack a nearby settlement once the sun goes down.',
        metadata: {
            monsters: ['orc']
        }
    }
};

const neutralEncounters: EncounterTable = {
    1: {
        text: 'A troupe of wandering troubadours and bards who are travelling the land performing plays and looking for stories and legends to add to their repertoire. If the PCs make friendly contact with them there is a 50% chance that the troupe will have heard a legend about any noteworthy beast or location (as determined by the GM).',
        metadata: { monsters: [] }
    },
    2: {
        text: 'A woodsman returning from a nearby forest to his home in a local village, there is a 2-in-6 chance that he can point the player party in the direction of healing herbs or some such.',
        metadata: { monsters: [] }
    },
    3: {
        text: 'A small group of dodgy, scruffy looking geezers pushing a barely working wheelbarrow piled high with various ramshackle goods and items. There is a 50% chance that the PCs will find any basic equipment they want if they search the cart and they will get it half-price. However there is a 50% chance the first time that the item is used that it breaks due to poor construction or lack of care, there is also a 1-in-6 chance any item purchased is stolen.',
        metadata: { monsters: [] }
    },
    4: {
        text: 'A small group of children fishing in a creek, they have caught 1d4 rations worth of fish that they maybe willing to share with the PCs if they ingratiate themselves (as determined by the GM).',
        metadata: { monsters: [] }
    },
    5: {
        text: 'A group of merchants that have been beset by hostile forces (if you wish you can roll on Table 2 to determine the nature of the hostile forces) whilst moving along a local trade route, when they meet the PCs they are fleeing with their enemies close behind them. If the PCs help the merchants then they will receive a 25% discount on any wares that they purchase from them (what the traders have is determined by the GM).',
        metadata: { monsters: [] }
    },
    6: {
        text: 'A young couple from a nearby village engaged in a secret tryst, if approached by the PCs they are embarrassed and worried about what their parents will say. In return for the PCs silence they will be able to give them the low-down on important NPCs in their home village.',
        metadata: { monsters: [] }
    },
    7: {
        text: 'A wealthy trade caravan of merchants and exotic spice dealers with an entourage of guards and mercenaries to protect them. There is a 4-in-6 chance that the caravan will have any basic equipment that the PC requests, and a 2-in-6 chance that the caravan has an exotic items they request (final say on this rests with the GM), however any exotic items will cost 25% more than the listed price due to their fine quality of workmanship.',
        metadata: { monsters: [] }
    },
    8: {
        text: 'A farmer returning from his fields with a barrow full of fresh produce (1d6 rations worth), if the PCs are friendly then he may be willing to barter items for his produce (although he has little use for coin).',
        metadata: { monsters: [] }
    },
    9: {
        text: "A local farmer is taking their sheep, goats or cows (equal chance of either) to a nearby market, they are accompanied by 1d6 young girls and boys who help them manage the herd. The farmer will not be interested in selling his animals - since he knows he'll get a better price at market - but can supply the PCs with all the rumours from nearby villages (as determined by the GM).",
        metadata: { monsters: [] }
    },
    10: {
        text: "A group of local children mock-fighting each other with sticks, wearing old pans and bits of bark as make-shift armour. If the PCs are friendly to them then they'll be able to point them in the direction of the nearest village.",
        metadata: { monsters: [] }
    },
    11: {
        text: 'A group of 1d6 woodsmen and rangers who are on the trail of some sort of dangerous beast that has been menacing the nearby settlements. Some of their number were killed in a recent encounter with the beast, they will happily share any rewards and glory with PCs who help them bring the monster down.',
        metadata: { monsters: [] }
    },
    12: {
        text: "A noble caravan, it has become stuck in the mud and one of it's wheels has broken. If the PCs are able to repair the wagon or escort the nobles to their destination they will receive a reward of 2d6*10 gold pieces.",
        metadata: { monsters: [] }
    },
    13: {
        text: 'The party comes upon a long line of hooded figures. They move slowly, swaying side to side with their hand folded in front of them, and frequently looking skyward. If the party asks what is happening, the figures will respond that they are on a holy pilgrimage for a local deity. They will also describe miracles that they have witnessed personally, and try and convince the party to join them, at least until the next town where there is a renowned prophet who is expected to perform more miracles.',
        metadata: { monsters: [] }
    },
    14: {
        text: 'An old man shuffles down the road, followed a few paces back by about a dozen people eagerly watching his every move. As the party passes, the man collapses and begins convulsing, and the other travelers surge up and surround him. The party can hear through the excited whispers of the other travelers the old man chanting in Abyssal.',
        metadata: { monsters: [] }
    },
    15: {
        text: 'A minstrel and two flag bearers are stopped on the road up ahead, along with about a dozen soldiers. The party recognizes them as bearing the crest of a large, well-known kingdom. The minstrel will stop the party and ask them if they had considered joining the local military “for the defense of this fair land from her enemies”. If the party refuses, the soldiers will step forward and the minstrel will ask again, reminding them that all they need to do is sign this agreement that says they will serve in the future. Whatever the players do from this point, they will face consequences next time they return.',
        metadata: { monsters: [] }
    },
    16: {
        text: 'An overturned cart lies next to the road up ahead. As the players pass it, small rocks come flying out of various holes in the cart. The rocks are small enough that they don’t do any damage and are an annoyance at most. After a few seconds of the barrage, a young child’s voice yells out from under the cart “Give us all your stuff or we won’t stop!”',
        metadata: { monsters: [] }
    },
    17: {
        text: "A flock of crows clusters around something up ahead accompanied the shouts of a young woman. As the party approaches, the crows fly off to reveal the corpse of a woman, half-decayed, clutching a stone chest. The small engravings on the chest depict a beautiful woman's face with striking red hair. A green light animates from within the chest along with the voice of the young woman, who thanks the party for scaring off the crows. The voice will deny that anything is unusual and seems unaware that it has no body and can’t move, insisting instead that she’s just tired and needs to rest for a while before continuing her journey.",
        metadata: { monsters: [] }
    },
    18: {
        text: 'A calico cat comes wandering down the road. It stops as the party passes and meows/hisses at them loudly. It will follow them around, constantly trying to get the party’s attention; rubbing legs, climbing in backpacks, and scratching up valuable magic items. The cat is actually another traveler who has been polymorphed, who needs to be “killed” for the spell to end.',
        metadata: { monsters: [] }
    },
    19: {
        text: "A gnome saunters down the road ahead, carrying under his arm a cage with a chicken inside of it. The gnome appears to be chatting with the chicken until he notices the party, with whom he will engage in friendly conversation. The gnome will quickly turn the subject to his chicken if the party doesn't. According to the gnome “Old Dan’l” can match any animal in the fighting ring, and if the party has any familiars he will offer to set up a fight, with betting of course.",
        metadata: { monsters: [] }
    },
    20: {
        text: 'An awful smell wafts up from around a bend in the road. As the party follows it, they find a large, abhorrent corpse curled up on the road; something with black blood and too many limbs. The party also notices sickening sounds of gnawing and slurping coming from the corpse as they approach. Edging around the corpse, the party finds the noise is coming from what looks like a small girl, smeared with black visceral juices, and apparently eating the corpse. If the party confronts her, she will tell them that she won’t share with anyone, no matter how hungry they say they are.',
        metadata: { monsters: [] }
    },
    21: {
        text: 'A loud thumping is heard from up ahead, and the party can feel the earth rumble beneath their feet. Shortly after the party spots the source, a stone giant plodding down the path. The giant is oddly dressed though, clad in bright colors and flamboyant styles. If the party gets his attention, the giant will ask if they have seen Haakon (“a very loud small one like yourself”). The giant will look despondent when the party says they haven’t but will offer to show them his talent anyway. If the party says yes, the giant will look around briefly before picking up three of the party members and start juggling them.',
        metadata: { monsters: [] }
    },
    22: {
        text: 'The party come across a large river, too wide and swift to swim across safely. Fortunately, just downstream there are two ferrymen right next to each other, each with their own boat and willing to take the party across. As the party approaches, the ferrymen will both enthusiastically offer their services, but shortly begin arguing with one another. After a little bit, it becomes clear the ferrymen will do almost anything to win the party over to their side, as not many travelers come this way and they are both close to penniless due to the competition.',
        metadata: { monsters: [] }
    },
    23: {
        text: 'The party hears some low growls and snarls coming from off the road up ahead. Investigating the noise leads the party to an owlbear (or some other suitable animal) caught with its leg in a hunting trap. The owlbear will growl at the party, but it clearly has been here for a while and is in a weakened state. As the party is debating what to do, a man in outlander garb appears. He looks at the party in shock for a second, but then shouts “Thieves! Get out of here, this one’s mine!”',
        metadata: { monsters: [] }
    },
    24: {
        text: 'A small cart, piled high with stuff, moves down the road towards the party. As the party gets closer, the cart will stop and a merchant will rush out to greet the party. He eagerly offers his wares, but most of it is worthless junk (“combination hookah and coffee maker -- also makes julienne fries”) and horribly overpriced. The merchant will do everything in his power to get the party to stay and buy something, and even if they leave he will follow them, still trying to get a sale.',
        metadata: { monsters: [] }
    },
    25: {
        text: 'A rhythmic, grinding, sliding sound echoes from the path ahead. Moving toward the noise, the party finds a heavily damaged stone golem dragging itself along the road. The golem has been reduced to just a single arm but is determined to move ahead. It will answer the party’s questions with single-word answers, saying it’s been “called,” but it won’t stop even while talking.',
        metadata: { monsters: [] }
    },
    26: {
        text: "The party sees a lone villager walking down the road. He is carrying a large sack over his shoulder and is so preoccupied with nervously looking over his shoulder he doesn't notice the party until they are quite close. Once the party reaches him, he will anxiously try to get through them and deflects any questions, with varying degrees of success. The party does notice that there is a foul smell coming from his sack and the villager never stops looking over his shoulder.",
        metadata: { monsters: [] }
    },
    27: {
        text: 'The party hears the sound of someone singing up ahead, but can’t quite make out the words. Once the party gets closer, they see a brightly festooned bard skipping down the path, singing loudly to himself. After listening to a few verses, the party realizes that he is singing about them; their heroic deeds and other exploits. However, he is also singing about things that he has no right to know (a party member’s secret backstory, unsavory things the party did and tried to cover up, etc.).',
        metadata: { monsters: [] }
    },
    28: {
        text: 'Rounding a corner, the party finds that the narrow path has been completely blocked. A huge silver dragon is snoozing right in the middle of the path, it’s stomach clearly bloated with the dragon’s latest meal. If the dragon is woken by the party (intentionally or unintentionally), she will immediately apologize for the inconvenience, but reveals that she is too full to move.',
        metadata: { monsters: [] }
    },
    29: {
        text: 'Shouts come from up ahead on the road. The party runs to investigate and find themselves facing a tense standoff between two identical-looking young men. They both have their swords drawn and are slowly circling each other while a young woman clutching two small children watches nervously. One says he was returning from a business trip when he found his doppelganger leading his family away; the other says he returned early from that trip to save his family from the danger he discovered they were in.',
        metadata: { monsters: [] }
    },
    30: {
        text: 'As the party approaches a bend in the road, a carriage suddenly comes careening around the corner at tremendous speed. Spotting the party too late, the driver tries to swerve away but ends up losing traction and causing the carriage to topple over. Immediately after the crash, the driver gets up off the ground, draws his sword, and quickly runs to put himself between the shocked party and the downed carriage. “Stay back!” he says, “Don’t come any closer!” Between the shouts of the driver, the party can hear a multitude of whispers coming from the carriage.',
        metadata: { monsters: [] }
    }
};

const featureEncounters: EncounterTable = {
    1: {
        text: 'A huge cairn of stones carved with strange symbols rises from the nearby landscape, it is either a marker or the burial place of some forgotten hero (equal chance of each).',
        metadata: { monsters: [] }
    },
    2: {
        text: "A farmer's hut and a field groaning with produce, however the cabin seems to have been abandoned and all possessions–save the produce in the field–taken. PCs may freely take a total of 2d6 days worth of rations from the field, however there is a 50% chance that the produce is infected with a blight, consumption of blighted rations causes the PC to vomit for 1d4 damage.",
        metadata: { monsters: [] }
    },
    3: {
        text: "A single mighty tree rises from the ground here, it is many hundreds of years old and has millennia of carvings covering it's trunk. Some of these carvings may hint at local history or lore.",
        metadata: { monsters: [] }
    },
    4: {
        text: 'Large worn slabs of stone bearing faint markings attest to this area having once been used as a graveyard, however it is long abandoned and extremely overgrown, but their may be underground tombs and grave goods in the area (as determined by the GM).',
        metadata: { monsters: [] }
    },
    5: {
        text: 'The remnants of what must have once been a village cover this area, it seems as though it burnt down some time ago, although there may still be the odd item (or danger) lurking amidst the charred ruins.',
        metadata: { monsters: [] }
    },
    6: {
        text: "A mighty Oak whose trunk appears to have the pattern of a face visible in the lines and cracks of it's bark. Local legend says that when the whole land was once covered by a huge forest, great creatures, caretakers of the natural world moved across the land caring for the trees. With the coming of man they slept, but are best avoided lest they wake and be roused to furious anger.",
        metadata: { monsters: [] }
    },
    7: {
        text: 'A crooked stone tower rises at a jaunty angle into the sky, the barely-visible roof is missing a number of slates, their smashed remnants litter the ground around it. The tower belongs to an eccentric sage, reclusive hermit or tormented prophet (equal chance of each).',
        metadata: { monsters: [] }
    },
    8: {
        text: 'Pillars of rock rising from the ground, years ago primitive people carved homes in these huge pillars before some event caused them to abandon their rocky homes.',
        metadata: { monsters: [] }
    },
    9: {
        text: 'The remnants of what must have been an expensive cart lie just off the road here, there are 1d6 skeletons and the long-dead bodies of the horses scattered nearby. Examination of the cart results in finding 1d6 gold pieces and a miscellaneous lesser piece of equipment, along with clues that the cart was waylaid–and the occupants murdered–by bandits.',
        metadata: { monsters: [] }
    },
    10: {
        text: 'A tree with nooses hanging from the branches, local settlements use this tree to execute criminals who have committed capital crimes, when not in use the place has an evil reputation and is avoided.',
        metadata: { monsters: [] }
    },
    11: {
        text: 'A great stone circle has been erected here, whether as some sort of solar calendar or as a means of communing with the gods it is not clear, but locals either revered the place and worship there or whisper of it as haunted and avoid it entirely (equal chance of each).',
        metadata: { monsters: [] }
    },
    12: {
        text: 'A rocky outcropping that vaguely resembles a huge, sleeping humanoid. Local villagers say that it is a giant who once menaced these parts before he was forced into an eternal slumber by a great and powerful sorcerer.',
        metadata: { monsters: [] }
    }
};

export const nothingEvent: Encounter = {
    text: 'Nothing eventful happens.',
    metadata: {
        monsters: []
    }
};

export function useEncounters() {
    const getWeightedEncounterType = useCallback(() => {
        return chance.weighted(Object.keys(weightedEncounterTypes), Object.values(weightedEncounterTypes));
    }, []);

    const forceHostileEncounter = useCallback((): Encounter => {
        const encounterRoll = chance.natural({ min: 1, max: Object.keys(hostileEncounters).length });
        return hostileEncounters[encounterRoll];
    }, []);

    const forceNeutralEncounter = useCallback((): Encounter => {
        const encounterRoll = chance.natural({ min: 1, max: Object.keys(neutralEncounters).length });
        return neutralEncounters[encounterRoll];
    }, []);

    const forceFeatureEncounter = useCallback((): Encounter => {
        const encounterRoll = chance.natural({ min: 1, max: Object.keys(hostileEncounters).length });
        return featureEncounters[encounterRoll];
    }, [])

    const forceEncounter = useCallback((): Encounter => {
        switch (getWeightedEncounterType()) {
            case 'hostile':
                return forceHostileEncounter();
            case 'neutral':
                return forceNeutralEncounter();
            case 'feature':
                return forceFeatureEncounter();
            default:
                return nothingEvent;
        }
    }, [forceHostileEncounter, forceNeutralEncounter, forceFeatureEncounter, getWeightedEncounterType]);

    const generateNightEncounter = useCallback((): Encounter => {
        if (chance.d20() === 1) {
            return forceHostileEncounter();
        } else {
            return nothingEvent;
        }
    }, [forceHostileEncounter]);

    const generateEncounter = useCallback((generator: GeneratorDie): Encounter => {
        if (chance[generator]() === 1) {
            return forceEncounter();
        } else {
            return nothingEvent;
        }
    }, [forceEncounter]);

    return {
        generateEncounter,
        generateNightEncounter,
        forceEncounter,
        forceHostileEncounter,
        forceNeutralEncounter,
        forceFeatureEncounter
    };
}