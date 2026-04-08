import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 86400 }); // 24h cache
export async function geocodeAddress(address) {
    const cached = cache.get(address);
    if (cached)
        return cached;
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey)
        throw new Error('GOOGLE_API_KEY not set');
    const url = `https://maps.googleapis.com/maps/api/geocode/json` +
        `?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status !== 'OK') {
        throw new Error(`Geocode failed: ${data.status} — ${data.error_message || 'unknown'}`);
    }
    const location = data.results[0].geometry.location;
    cache.set(address, location);
    return location;
}
