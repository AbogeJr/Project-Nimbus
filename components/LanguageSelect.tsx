import { Language, LanguageSelectProps } from "@/types/language";

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "sw", name: "Swahili" },
  { code: "ar", name: "Arabic" },
  { code: "ha", name: "Hausa" },
  { code: "om", name: "Oromo" },
  { code: "ig", name: "Igbo" },
  { code: "am", name: "Amharic" },
  { code: "pt", name: "Portuguese" },
  { code: "so", name: "Somali" },
  { code: "sn", name: "Shona" },
  { code: "ber", name: "Berber" },
  { code: "yo", name: "Yoruba" },
  { code: "ff", name: "Fulani" },
  { code: "zu", name: "Zulu" },
  { code: "pcm", name: "Pidgin English" },
  //more
];

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  selectedLanguage,
  onSelect,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-sm md:text-base text-gray-500 mb-6 md:mb-8 text-center">
        Select Your Preferred Language
      </h2>
      <select
        className="w-full p-2 input input-bordered focus:outline-none focus:ring-2 focus:ring-primary"
        value={selectedLanguage?.code || ""}
        onChange={(e) => {
          const selected = languages.find(
            (lang) => lang.code === e.target.value
          );
          if (selected) onSelect(selected);
        }}
      >
        <option value="">Select a language</option>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};
