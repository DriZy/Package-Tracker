import { randomBytes, pbkdf2Sync, timingSafeEqual } from 'crypto';

const salt = process.env.BCRYPT_SALT || 'yourFixedSalt';

export const hashString = async (password: string): Promise<string> => {
    return pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
};

export const compareString = async (inputString: string, hashedString: string): Promise<boolean> => {
    const hashedInput = await hashString(inputString);
    const storedBuffer = Buffer.from(hashedString, 'hex');
    const inputBuffer = Buffer.from(hashedInput, 'hex');
    console.log(storedBuffer, inputBuffer);
    return timingSafeEqual(storedBuffer, inputBuffer);
};