export const QuestionBank = [
    {
        prompt: (name) => `ok ${name}, when is your birthday?`,
        type: "text",
        key: "birthday"
    },
    {
        prompt: (name) => `Question 2, tell me, ${name} — how would your friends describe you?`,
        type: "multiple-choice",
        key: "personality",
        options: [
            "Loud and dramatic (main character energy)",
            "Chill but secretly judging everyone",
            "Mysterious and deep (or just sleepy)",
            "Energetic and fun (a little too fun…)",
            "Smart, fast, and always ahead of the game"
        ]
    },
    {
        prompt: (name) => `ooh, okay okay well ${name} — how would your friends describe you?`,
        type: "multiple-choice",
        key: "habitat",
        options: [
            "Forest",
            "Mountains",
            "Ocean",
            "City"
        ]
    }
];
