export const QuestionBank = [
    {
        prompt: (name) => `${name} — How would you describe your approach to life?`,
        type: "multiple-choice",
        key: "type2",
        options: [
            "I rise above challenges",
            "I keep things simple and balanced",
            "I value independence & reflection",
            "I challenge the norms and stir things up"
        ]
    },
    {
        prompt: (name) => `ooh, okay okay well ${name} — how would your friends describe you?`,
        type: "multiple-choice",
        key: "shape",
        options: [
            "Cute & Cuddly",
            "Strong & Fierce",
            "Mysterioso/a/x",
            "Weird and Silly"
        ]
    },
    {
        prompt: (name) => `excellent ${name} — where do you feel most at home or love to explore?`,
        type: "multiple-choice",
        key: "habitat",
        options: [
            "Forest",
            "Mountains",
            "Ocean",
            "City"
        ]
    },
    {
        prompt: (name) => `ok & finally here's an easy one ${name}, when is your birthday?`,
        type: "text",
        key: "birthday"
    }
];
