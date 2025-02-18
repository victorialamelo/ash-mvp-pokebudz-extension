export const zodiacData = {
    Aquarius: {
      description: "You're an Aquarius! Known for being independent, inventive, and humanitarian.",
      pokemonType: "Water",
    },
    Pisces: {
      description: "You're a Pisces! Intuitive, empathetic, and compassionate, you care deeply for others.",
      pokemonType: "Water",
    },
    Aries: {
      description: "You're an Aries! Brave, energetic, and a natural leader.",
      pokemonType: "Fire",
    },
    Taurus: {
      description: "You're a Taurus! Practical, determined, and loyal.",
      pokemonType: "Ground",
    },
    Gemini: {
      description: "You're a Gemini! Adaptable, curious, and expressive.",
      pokemonType: "Electric",
    },
    Cancer: {
      description: "You're a Cancer! Sensitive, nurturing, and protective.",
      pokemonType: "Water",
    },
    Leo: {
      description: "You're a Leo! Bold, confident, and a natural-born leader.",
      pokemonType: "Fire",
    },
    Virgo: {
      description: "You're a Virgo! Detail-oriented, hardworking, and methodical.",
      pokemonType: "Grass",
    },
    Libra: {
      description: "You're a Libra! Charming, social, and diplomatic.",
      pokemonType: "Fairy",
    },
    Scorpio: {
      description: "You're a Scorpio! Passionate, resourceful, and determined.",
      pokemonType: "Poison",
    },
    Sagittarius: {
      description: "You're a Sagittarius! Optimistic, adventurous, and always seeking truth.",
      pokemonType: "Fire",
    },
    Capricorn: {
      description: "You're a Capricorn! Practical, disciplined, and goal-oriented.",
      pokemonType: "Ground",
    },
  };

  export function getZodiacData(zodiac) {
    return zodiacData[zodiac] || { description: "Unknown Zodiac", pokemonType: "Normal" };
  }
