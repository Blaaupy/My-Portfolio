/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'dist', 'index.html');
const destination = path.join(__dirname, 'dist', '404.html');

fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error('Erreur lors de la copie du fichier 404.html:', err);
  } else {
    console.log('Fichier 404.html mis à jour avec succès.');
  }
});