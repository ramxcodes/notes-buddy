const tierFeatures = {
  Free: [],
  "Tier 1": ["one-shots", "quiz"],
  "Tier 2": ["one-shots", "quiz", "pyq", "flashcards"],
  "Tier 3": [
    "one-shots",
    "quiz",
    "pyq",
    "flashcards",
    "video-material",
    "toppers-handwritten-notes",
    "ai-chatbot",
  ],
};

const featureLabels: Record<string, string> = {
  "one-shots": "Access to One Shots",
  quiz: "Access to Quizzes of all units",
  pyq: "Previous Year Questions with answers",
  flashcards: "Flashcards",
  "video-material": "Video Material",
  "toppers-handwritten-notes": "Toppers Handwritten Notes",
  "ai-chatbot": "AI Chatbot (Under Development)",
};

interface PlanBenefitsProps {
  planTier: string;
  subscriptionEndDate?: Date;
  semesters?: string[];
  degree?: string;
}

export const PlanBenefits = ({
  planTier,
  subscriptionEndDate,
  semesters,
  degree,
}: PlanBenefitsProps) => {
  const features = tierFeatures[planTier as keyof typeof tierFeatures] || [];

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="space-y-2">
        <p className="text-lg font-medium">Purchased Plan: {planTier}</p>
        <p className="text-lg font-medium">
          Plan Expiration:{" "}
          {subscriptionEndDate
            ? subscriptionEndDate.toLocaleDateString()
            : "N/A"}
        </p>
        <p className="text-lg font-medium">
          Degree: {degree ? degree : "Not specified"}
        </p>
        <p className="text-lg font-medium">
          Semester Access:{" "}
          {semesters && semesters.length > 0
            ? semesters.join(", ")
            : "No semester access"}
        </p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-3">Plan Benefits:</h2>
        <ul className="list-none pl-0 space-y-2">
          {features.map((featureKey, index) => (
            <li key={index} className="flex items-center text-lg space-x-2">
              <span>✅</span>
              <span>{featureLabels[featureKey] || featureKey}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
