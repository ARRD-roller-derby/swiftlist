export function convertTxtToBase64(txt: string): string {
  const buff = Buffer.from(txt, 'utf-8')
  return buff.toString('base64')
}

export function convertBase64ToTxt(base64: string): string {
  const buff = Buffer.from(base64, 'base64')
  return buff.toString('utf-8')
}
