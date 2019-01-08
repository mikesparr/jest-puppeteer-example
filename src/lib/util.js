module.exports = {
    timeout: async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
