const API_KEY = process.env.GOOGLE_PLACES_KEY;

const searchPlaces = async () => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=food+bank+in+maryland&key=${API_KEY}`;

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
    short_desc: place.types?.join(", "),
    long_desc: place.editorial_summary?.overview || "",
    phone: place.formatted_phone_number || null,
    website: place.website || "",
    image: place.photos
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${API_KEY}`
      : "",
  };
};

export { searchPlaces, getPlaceDetails, transformPlace }