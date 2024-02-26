import bcrypt from "bcrypt";

const encryptPassword = async (password: string): Promise<string> => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log('error :>> ', error);
        throw error; // Optionally rethrow the error to propagate it further
    }
}

const verifyPassword = async (rawPassword: string, hashedPassword: string): Promise<boolean> => {
    const isPasswordCorrect = await bcrypt.compare(rawPassword, hashedPassword);
    return isPasswordCorrect;
}

export { encryptPassword, verifyPassword };
