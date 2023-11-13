export const uuid = (length: number) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const lettersLength = letters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * lettersLength);
    result += letters.charAt(randomIndex);
  }

  return result;
};

export const getExtension = (filename: string) => {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}

export const verifyIfIsFile = (filename: string) => {
  const parts = filename.split('.');
  return parts.length > 1;
}


export const removeExtension = (filename: string) => {
  const parts = filename.split('.');
  parts.pop();
  return parts.join('.');
}

