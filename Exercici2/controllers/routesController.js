import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonFilePath = path.join(__dirname, '../data.json');

export const getmontanyes = (req, res) => {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const dadesJson = JSON.parse(data);

        let html = `
            <h2>Llista de montanyes</h2>
            <ul>
        `;

        dadesJson.forEach((muntanya, index) => {
            html += `<li style="list-style-type: none;"><a href="/mountain/${index}">${muntanya.nom}</a></li>`;
        });

        html += '</ul>';
        html += '<p><a href="/">Crear una nova montanya</a></p>';
        res.send(html);
    });
};

export const getdetallsMontanyes = (req, res) => {
    const mountainId = req.params.id;

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);
        const mountain = jsonData[mountainId];

        if (mountain) {
            const html = `
                <h1>Detalls de la Montanya</h1>
                <ul style="list-style-type:none;">
                    <li><b>Nom:</b> ${mountain.nom}</li>
                    <li><b>Te Neu:</b> ${mountain.teneu ? 'Sí' : 'No'}</li>
                    <li><b>Altura:</b> ${mountain.alcada} metres</li>
                    <li><b>Clima:</b> ${mountain.clima}</li>
                </ul>
                <img src="${mountain.imatge}" alt="${mountain.nom}" width="300">
                <p><a href="/mountain/list">Volver a la lista</a></p>
            `;
            res.send(html);
        } else {
            res.status(404).send('Montanya no es troba');
        }
    });
};

export const insertMountain = (req, res) => {
    const { nom, teneu, alcada, clima, imatge } = req.body;

    const novaMuntanya = {
        nom,
        teneu: teneu === 'on',
        alcada: Number(alcada),
        clima,
        imatge
    };

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) throw err;

        const dadesJson = Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
        dadesJson.push(novaMuntanya);

        fs.writeFile(jsonFilePath, JSON.stringify(dadesJson, null, 2), (err) => {
            if (err) throw err;
            res.redirect('/mountain/list');
        });
    });
};
