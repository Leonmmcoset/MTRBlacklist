export const blacklistData = [
  { qq: "123456789", reason: "恶意刷屏", date: "2024-01-15" },
  { qq: "987654321", reason: "广告骚扰", date: "2024-02-20" },
  { qq: "111222333", reason: "违规发言", date: "2024-03-10" },
  { qq: "444555666", reason: "恶意举报", date: "2024-04-05" },
  { qq: "777888999", reason: "刷屏干扰", date: "2024-05-12" },
];

export const isInBlacklist = (qq) => {
  return blacklistData.find(item => item.qq === qq);
};
