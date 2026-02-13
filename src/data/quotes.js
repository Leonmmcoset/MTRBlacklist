export const quotes = [
  '心血皆辛苦，盗来不算功。',
  '原创一寸心，莫做窃珠人。',
  '盗来千般景，不是自家春。',
  '偷得他人作，难偷真匠心。',
  '君子爱物，取之有道；创作者心，不可轻盗。',
  '一盗失风骨，再盗失人心。',
  '尊重原创，方得长久；干净分享，才是圈子。',
  '莫以窃取换虚名，圈子干净路才明。'
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
