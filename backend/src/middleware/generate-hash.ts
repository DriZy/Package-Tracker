import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Fetch salt rounds from .env
const saltRounds = parseInt(process.env.BCRYPT_SALT || '10', 10);

// Example function for generating a hash
const hashPassword = async (plainPassword: string) => {
    try {
        const hash = await bcrypt.hash(plainPassword, saltRounds);
        return hash;
    } catch (error) {
        console.error('Error generating hash:', error);
        throw error;
    }
};