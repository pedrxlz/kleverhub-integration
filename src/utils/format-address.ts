export const formatAddress = (address?: string | null) => {
  if (!address) return "";
  return address.replace(/(.{6})(.*)(.{4})/, "$1...$3");
};
