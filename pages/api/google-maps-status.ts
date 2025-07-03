export default async function handler(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=Sydney&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK') {
      res.status(200).json({ status: 'ok' });
    } else {
      res.status(500).json({ status: 'error', message: data.status });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
} 