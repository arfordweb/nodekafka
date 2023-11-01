export const sleep = async (ms: number = 1000): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, ms));
};
