
    const RESPONCE_PROPERTIES = ['name','capital','population','languages', 'flags'];
export default async function fetchCountries(name) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=${RESPONCE_PROPERTIES}`);
    return await response.json();
}