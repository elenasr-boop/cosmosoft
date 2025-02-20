const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BASE_DIR = path.join(__dirname, 'phrases');

async function fetchPhrase() {
    try {
        const response = await axios.get('https://api.kanye.rest/');
        return typeof response.data === 'string' ? response.data : response.data.quote || 'No quote';
    } catch (error) {
        console.error(`Ошибка запроса: ${error.message}`);
        return null;
    }
}

async function savePhrase(index, phrase) {
    if (!phrase) return;

    const subDirIndex = Math.floor(index / 10);
    const subDirPath = path.join(BASE_DIR, `subdir_${subDirIndex}`);
    const filePath = path.join(subDirPath, 'index.json');

    try {
        if (!fs.existsSync(subDirPath)) {
            fs.mkdirSync(subDirPath, { recursive: true });
        }

        let phrasesArray = [];

        if (fs.existsSync(filePath)) {
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const parsedData = JSON.parse(fileContent);
                if (Array.isArray(parsedData)) {
                    phrasesArray = parsedData; // Если это массив, используем его
                } else {
                    console.warn(`Файл ${filePath} не содержит массив, перезаписываем.`);
                }
            } catch (error) {
                console.error(`Ошибка чтения JSON в ${filePath}: ${error.message}`);
            }
        }

        phrasesArray.push(phrase);
        phrasesArray = phrasesArray.slice(-10);

        fs.writeFileSync(filePath, JSON.stringify(phrasesArray, null, 2));

    } catch (error) {
        console.error(`Ошибка сохранения файла: ${error.message}`);
    }
}

async function createPhrases() {
    if (!fs.existsSync(BASE_DIR)) {
        fs.mkdirSync(BASE_DIR);
    }

    const requests = Array.from({ length: 100 }, (_, i) =>
        fetchPhrase().then((phrase) => savePhrase(i, phrase))
    );

    await Promise.all(requests);
    console.log('Все фразы сохранены.');
}

createPhrases();