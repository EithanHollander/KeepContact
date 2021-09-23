function isLegalPhoneNumber(text) {
  const startsWithAsterik = text.startsWith("*");
  const startsWithPlusButNotIsrael = text.startsWith("+") && !text.startsWith("+972");
  return !startsWithAsterik && !startsWithPlusButNotIsrael;
}
export {isLegalPhoneNumber}
