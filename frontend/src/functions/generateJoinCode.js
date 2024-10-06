const generateJoinCode = () => {
    // Define the characters allowed in the join code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';
    let joinCode = '';

    // Loop to generate a random character for each position in the join code
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        joinCode += characters[randomIndex];
    }

    return joinCode;
}

module.exports = { generateJoinCode };