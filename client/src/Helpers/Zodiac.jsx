export const zodiacData = {
    Aquarius: {
      description: "You're known for being independent, inventive, and humanitarian.",
      pokemonType: "ice",
    },
    Pisces: {
      description: "You're intuitive, empathetic, and compassionate, you care deeply for others.",
      pokemonType: "water",
    },
    Aries: {
      description: "You're brave, energetic, and a natural leader.",
      pokemonType: "fighting",
    },
    Taurus: {
      description: "You're practical, determined, and loyal.",
      pokemonType: "grass",
    },
    Gemini: {
      description: "You're adaptable, curious, and expressive.",
      pokemonType: "electric",
    },
    Cancer: {
      description: "You're sensitive, nurturing, and protective.",
      pokemonType: "water",
    },
    Leo: {
      description: "You're bold, confident, and a natural-born leader.",
      pokemonType: "fire",
    },
    Virgo: {
      description: "You're detail-oriented, hardworking, and methodical.",
      pokemonType: "psychic",
    },
    Libra: {
      description: "You're charming, social, and diplomatic.",
      pokemonType: "fairy",
    },
    Scorpio: {
      description: "You're passionate, resourceful, and determined.",
      pokemonType: "dark",
    },
    Sagittarius: {
      description: "You're optimistic, adventurous, and always seeking truth.",
      pokemonType: "flying",
    },
    Capricorn: {
      description: "You're practical, disciplined, and goal-oriented.",
      pokemonType: "steel",
    },
  };

  export function getZodiacData(zodiac) {
    return zodiacData[zodiac] || { description: "Unknown Zodiac", pokemonType: "Normal" };
  }
