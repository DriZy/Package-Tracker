declare module 'bcrypt' {
    import { Hash } from 'crypto';
    export function hash(data: string | Buffer, salt: string | number): Promise<string>;
    export function compare(data: string | Buffer, encrypted: string): Promise<boolean>;
    export function genSalt(rounds?: number, seed_length?: number): Promise<string>;
}