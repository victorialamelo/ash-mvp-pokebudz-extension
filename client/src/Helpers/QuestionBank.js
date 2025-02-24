export const QuestionBank = [
    {   // TYPE https://pokeapi.co/api/v2/type/
        prompt: (name) => `<p>Alright, ${name}, let’s start strong—what’s your life philosophy?</p>`,
        type: "multiple-choice",
        key: "type2",
        options: [
            { answer: "Lone wolf vibes", pokemonType: ["ghost", "dark"] },
            { answer: "Boss battle energy", pokemonType: ["dragon", "stellar"] },
            { answer: "Keep it chill", pokemonType: ["normal", "ground"] },
            { answer: "Agent of chaos", pokemonType: ["poison", "ghost"] }
        ]
    },
    {   // SHAPE https://pokeapi.co/api/v2/pokemon-shape
        prompt: (name) => `Excellente, thats a great approach to life. Next question ${name}  <p>How would your friends describe you?</p>`,
        type: "multiple-choice",
        key: "shape",
        options: [
            { answer: "Cute and Cuddly", pokemonShape: ["ball", "blob", "squiggle"]},
            { answer: "Strong and Fierce", pokemonShape: ["arms", "upright", "quadruped", "armor", "wings"]},
            { answer: "Mysterioso/a/x", pokemonShape: ["legs", "tentacles", "heads", "humanoid"]},
            { answer: "Weird and Silly", pokemonShape: ["fish", "bug-wings", "wings", "blob", "squiggle"]},
        ]
    },
    {   // HABITAT https://pokeapi.co/api/v2/pokemon-habitat
        prompt: (name) => `Yea that tracks. <p>Next question ${name},</p><p>Where do you feel most at home or love to explore?</p>`,
        type: "multiple-choice",
        key: "habitat",
        options: [
            { answer: "Forest", pokemonHabitat: ["forest", "grassland"]},
            { answer: "Mountains", pokemonHabitat: ["mountain", "cave", "grassland", "rough-terrain"]},
            { answer: "Ocean", pokemonHabitat: ["sea","waters-edge", "cave"]},
            { answer: "City", pokemonHabitat: ["rare", "urban"]},
        ]
    },
    {   // ZODIAC TYPE https://pokeapi.co/api/v2/type/
        prompt: (name) => `WHUT! That's also my favorite place! <p>Last question,</p> here's an easy one ${name}, when is your birthday?`,
        type: "text",
        key: "birthday"
    }
];
