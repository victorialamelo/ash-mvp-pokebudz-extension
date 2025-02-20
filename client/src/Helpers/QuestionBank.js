export const QuestionBank = [
    {   // TYPE https://pokeapi.co/api/v2/type/
        prompt: (name) => `<p>ok first question ${name} — How would you describe your approach to life?</p>`,
        type: "multiple-choice",
        key: "type2",
        options: [
            { answer: "I value independence and reflection.", pokemonType: ["ghost", "dark"] },
            { answer: "I rise above challenges.", pokemonType: ["dragon", "stellar"] },
            { answer: "I keep things simple and balanced.", pokemonType: ["normal", "ground"] },
            { answer: "I challenge norms and stir things up.", pokemonType: ["poison", "ghost"] }
        ],
        script: ( name, answer ) => `Hmmm, interesting choice ${name}. You see yourself as someone who values: ${answer}. I like that.`
    },
    {   // SHAPE https://pokeapi.co/api/v2/pokemon-shape
        prompt: (name) => `ooh, okay okay well ${name} — how would your friends describe you?`,
        type: "multiple-choice",
        key: "shape",
        options: [
            { answer: "Cute and Cuddly", pokemonShape: ["ball", "blob", "squiggle"]},
            { answer: "Strong and Fierce", pokemonShape: ["arms", "upright", "quadruped", "armor", "wings"]},
            { answer: "Mysterioso/a/x", pokemonShape: ["legs", "tentacles", "heads", "humanoid"]},
            { answer: "Weird and Silly", pokemonShape: ["fish", "bug-wings", "wings", "blob", "squiggle"]},
        ],
        script: ( answer ) => `Awww yay, ${answer}! That tracks.`
    },
    {   // HABITAT https://pokeapi.co/api/v2/pokemon-habitat
        prompt: (name) => `excellent ${name} — where do you feel most at home or love to explore?`,
        type: "multiple-choice",
        key: "habitat",
        options: [
            { answer: "Forest", pokemonHabitat: ["forest", "grassland"]},
            { answer: "Mountains", pokemonHabitat: ["mountain", "cave", "grassland", "rough-terrain"]},
            { answer: "Ocean", pokemonHabitat: ["sea","waters-edge", "cave"]},
            { answer: "City", pokemonHabitat: ["rare", "urban"]},
        ],
        script: ( name, answer ) => `${name}... SAME! I love the ${answer}`
    },
    {   // ZODIAC TYPE https://pokeapi.co/api/v2/type/
        prompt: (name) => `ok and finally here's an easy one ${name}, when is your birthday?`,
        type: "text",
        key: "birthday",
        script: (name, answer) => `Ooooh, ${name}, born on ${answer}? that was probably a great day`
    }
];
