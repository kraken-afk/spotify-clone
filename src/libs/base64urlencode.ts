export default function base64urlencode(a: ArrayBuffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a) as any)
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));
}
