#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script pour nettoyer les fichiers de test qui causent des problèmes de build Vercel
 * Supprime tous les fichiers .test.*, .spec.*, .bench.*, .tap.*, .helper.* des node_modules
 */

console.log('🧹 Nettoyage des fichiers de test problématiques...');

const testPatterns = [
  /\.test\./,
  /\.spec\./,
  /\.bench\./,
  /\.tap\./
];

// Also delete specific problematic files
const problematicFiles = [
  'helper.js',
  'helper.ts',
  'helper.mjs'
];

function shouldDeleteFile(filePath) {
  const fileName = path.basename(filePath);
  const isTestFile = testPatterns.some(pattern => pattern.test(fileName));
  const isProblematicFile = problematicFiles.includes(fileName);
  return isTestFile || isProblematicFile;
}

function cleanDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Récursif pour les sous-dossiers
        cleanDirectory(fullPath);
      } else if (stat.isFile() && shouldDeleteFile(fullPath)) {
        try {
          fs.unlinkSync(fullPath);
          console.log(`🗑️ Supprimé: ${fullPath}`);
        } catch (err) {
          console.warn(`⚠️ Impossible de supprimer: ${fullPath}`, err.message);
        }
      }
    }
  } catch (err) {
    // Ignore les erreurs de lecture de dossiers
  }
}

// Nettoyer les packages problématiques spécifiques
const problematicPackages = [
  'thread-stream',
  'pino',
  '@walletconnect/ethereum-provider',
  '@walletconnect/universal-provider'
];

const nodeModulesPath = path.join(__dirname, '..', 'node_modules');

console.log('🔍 Recherche des packages problématiques...');

for (const pkg of problematicPackages) {
  const pkgPath = path.join(nodeModulesPath, pkg);
  if (fs.existsSync(pkgPath)) {
    console.log(`🧹 Nettoyage de ${pkg}...`);
    cleanDirectory(pkgPath);
  }
}

// Nettoyage général de tous les node_modules (optionnel, mais efficace)
console.log('🧹 Nettoyage général de tous les fichiers de test dans node_modules...');
cleanDirectory(nodeModulesPath);

console.log('✅ Nettoyage terminé !');