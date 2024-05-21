const formatPhoneNumber = (phoneNumber: number) => {
  // Assuming phoneNumber is a string of 10 digits, like "7780000000"
  if (!phoneNumber) return "";

  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `+1-${match[1]}-${match[2]}-${match[3]}`;
  }

  return phoneNumber; // Return the original if not a valid number
};

export default formatPhoneNumber;