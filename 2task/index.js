const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function createPhrases() {
    const baseDir = path.join(__dirname, 'phrases');

    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
    }

    // Выполняем 100 запросов к API
    for (let i = 0; i < 100; i++) {
        try {
            const response = await axios.get('https://api.kanye.rest/');
            const phrase = response.data.content;

            const subDirIndex = Math.floor(i / 10);
            const subDirPath = path.join(baseDir, `subdir_${subDirIndex}`);

            if (!fs.existsSync(subDirPath)) {
                fs.mkdirSync(subDirPath);
            }

            const filePath = path.join(subDirPath, 'index.json');

            let phrasesArray = [];
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                phrasesArray = JSON.parse(fileContent);
            }

            phrasesArray.push(phrase);

            fs.writeFileSync(filePath, JSON.stringify(phrasesArray, null, 2));
        } catch (error) {
            console.error(`Ошибка при выполнении запроса: ${error.message}`);
        }
    }
}

// Запускаем функцию
createPhrases();