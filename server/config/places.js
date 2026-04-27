const API_KEY = process.env.GOOGLE_PLACES_KEY;

const CATEGORIES = [
  "Food Bank",
  "Homeless Shelter",
  "Free Low-Cost Clinic",
  "Mental Health Support",
  "Job Training Center",
  "Community Event",
  "After-School Programs",
  "Immigration Legal Aid",
];

const searchPlaces = async (query, lat, lng) => {
  const location = lat && lng ? `&location=${lat},${lng}&radius=50000` : "";
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}${location}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.results;
};

const getPlaceDetails = async (placeId) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.result;
};

const transformPlace = (place) => {
  const address = place.formatted_address || "";
  const parts = address.split(",");

  return {
    id: place.place_id,
    name: place.name,
    street: parts[0] || "",
    city: parts[1]?.trim() || "",
    state: parts[2]?.trim().split(" ")[0] || "",
    zip_code: parseInt(parts[2]?.trim().split(" ")[1]) || null,
    description: place.editorial_summary?.overview || "",
    phone: place.formatted_phone_number || null,
    website: place.website || "",
    image: place.photos
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${API_KEY}`
      : "",
  };
};

export { searchPlaces, getPlaceDetails, transformPlace, CATEGORIES }