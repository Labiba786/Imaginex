"use client"

export function PromptSuggestions({ onSelect }) {
  const suggestions = [
    "A serene mountain landscape at sunset with aurora borealis",
    "Futuristic cyberpunk cityscape with flying cars and neon lights",
    "Magical forest with glowing mushrooms and fairy lights",
    "Abstract interpretation of human consciousness and dreams",
    "Steampunk airship floating above Victorian London",
    "Underwater city with bioluminescent coral and sea creatures",
    "Post-apocalyptic wasteland with overgrown ruins",
    "Ethereal dragon soaring through cosmic nebula",
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
        Prompt Suggestions
      </h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => onSelect(suggestion)}
            className="px-3 py-2 text-xs glass-card border-purple-400/30 text-gray-300 rounded-full hover:bg-purple-500/20 hover:text-white hover:border-purple-400/60 transition-all duration-300 hover:scale-105 line-clamp-1"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
