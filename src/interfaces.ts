export const SentimentValues = ["positive", "neutral", "negative"] as const;
export type Sentiment = (typeof SentimentValues)[number];
