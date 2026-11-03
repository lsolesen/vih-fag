import { VIH_SETTINGS } from './settings.js';

let scannedPrototypes = [];

// Vite scanner automatisk mappen /prototypes for både .json og .js filer
try {
    if (typeof import.meta !== 'undefined' && import.meta.glob) {
        const modules = import.meta.glob('./prototypes/*.{json,js}', { eager: true });
        scannedPrototypes = Object.values(modules).map(mod => mod.default || mod);
        console.log(`[VIH Fag] Fandt ${scannedPrototypes.length} pakke(r) i /prototypes:`, scannedPrototypes.map(p => p.name));
    }
} catch (err) {
    console.warn('Kunne ikke scanne prototypes mappen automatisk:', err);
}

// Faste standarder fra settings.js som supplement/fallback
const defaultPrototypes = VIH_SETTINGS.prototypes || [];
export const allPrototypes = [...defaultPrototypes];

// Tilføj de scannede profiler fra mappen
scannedPrototypes.forEach(proto => {
    const existingIdx = allPrototypes.findIndex(p => p.name === proto.name || (p.id && p.id === proto.id));
    if (existingIdx !== -1) {
        allPrototypes[existingIdx] = proto;
    } else {
        allPrototypes.push(proto);
    }
});