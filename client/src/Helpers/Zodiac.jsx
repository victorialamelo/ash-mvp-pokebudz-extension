export const zodiacData = {
    Aquarius: {
      description: "You're known for being independent, inventive, and humanitarian.",
      pokemonType: "Ice",
    },
    Pisces: {
      description: "You're intuitive, empathetic, and compassionate, you care deeply for others.",
      pokemonType: "Water",
    },
    Aries: {
      description: "You're brave, energetic, and a natural leader.",
      pokemonType: "Fighting",
    },
    Taurus: {
      description: "You're practical, determined, and loyal.",
      pokemonType: "Grass", 
    },
    Gemini: {
      description: "You're adaptable, curious, and expressive.",
      pokemonType: "Electric",
    },
    Cancer: {
      description: "You're sensitive, nurturing, and protective.",
      pokemonType: "Water",
    },
    Leo: {
      description: "You're bold, confident, and a natural-born leader.",
      pokemonType: "Fire",
    },
    Virgo: {
      description: "You're detail-oriented, hardworking, and methodical.",
      pokemonType: "Psychic",
    },
    Libra: {
      description: "You're charming, social, and diplomatic.",
      pokemonType: "Fairy",
    },
    Scorpio: {
      description: "You're passionate, resourceful, and determined.",
      pokemonType: "Dark",
    },
    Sagittarius: {
      description: "You're optimistic, adventurous, and always seeking truth.",
      pokemonType: "Flying",
    },
    Capricorn: {
      description: "You're practical, disciplined, and goal-oriented.",
      pokemonType: "Steel",
    },
  };

  export function getZodiacData(zodiac) {
    return zodiacData[zodiac] || { description: "Unknown Zodiac", pokemonType: "Normal" };
  }
