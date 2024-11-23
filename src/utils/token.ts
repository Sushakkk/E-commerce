interface JWTHeader {
    alg: string;
    typ: string;
  }
  
  interface JWTPayload {
    email: string;
    password: string;
    iat: number;
  }
  
  export const generateJWT = (email: string, password: string): string => {
    const header: JWTHeader = { alg: "HS256", typ: "JWT" };
    const payload: JWTPayload = {
      email: email,
      password: password,
      iat: Math.floor(Date.now() / 1000),
    };
    const secretKey: string = "my_secret_key";
  
    const encodedHeader: string = base64UrlEncode(header);
    const encodedPayload: string = base64UrlEncode(payload);
    const signature: string = generateSignature(encodedHeader, encodedPayload, secretKey);
  
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  };
  
  export const base64UrlEncode = (obj: object): string => {
    return btoa(JSON.stringify(obj))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };
  
  export const generateSignature = (header: string, payload: string, secretKey: string): string => {
    const data: string = `${header}.${payload}`;
    const signature: string = btoa(data + secretKey)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return signature;
  };
  
  export const base64UrlDecode = (base64Url: string): string => {
    return atob(base64Url.replace(/-/g, '+').replace(/_/g, '/'));
  };
  
  export const decodeJWT = (token: string): { header: JWTHeader; payload: JWTPayload } => {
    const [encodedHeader, encodedPayload] = token.split('.');
    const decodedHeader = base64UrlDecode(encodedHeader);
    const decodedPayload = base64UrlDecode(encodedPayload);
    const header: JWTHeader = JSON.parse(decodedHeader);
    const payload: JWTPayload = JSON.parse(decodedPayload);
    return { header, payload };
  };
  