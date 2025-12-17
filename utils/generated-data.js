const {faker} = require("@faker-js/faker")

function generateRandomEmail(fullName) {
    let base = fullName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const domains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com", "aol.com", "protonmail.com"];

    const domain = domains[Math.floor(Math.random() * domains.length)]
    return `${base}@${domain}`
}

function generatePhoneNumber() {
    const phoneNumberArray = ["(954) 5695114", "(985) 4804759", "(773) 7848033", "(980) 7867291", "(512) 4442041", "(512) 4442041", "(407) 7810762", "(469) 7208507", "(424) 7066776", "(718) 7236151", "(770) 4547294", "(773) 3296180", "(972) 7365660"]
    return phoneNumberArray[Math.floor(Math.random() * phoneNumberArray.length)]
}

function getRandomUSStateAbbreviation() {
    const abbreviations = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

    return abbreviations[Math.floor(Math.random() * abbreviations.length)];
}

function getRandomUSZipCode() {
    return String(Math.floor(Math.random() * 90000) + 10000);
}

function getCountry() {
    return "United States";
}

function getRandomDOBAccurate() {
    const start = new Date(1954, 0, 1); // earliest DOB
    const end = new Date(2024, 11, 31); // latest DOB

    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const dob = new Date(randomTime);

    const month = String(dob.getMonth() + 1).padStart(2, "0");
    const day = String(dob.getDate()).padStart(2, "0");
    const year = dob.getFullYear();

    return `${month}-${day}-${year}`;
}

function getRandomGender() {
    const array = ["Male", "Female", "Transgender"];
    const gender = Math.floor(Math.random() * array.length);
    return array[gender];
}

export const customerInfo = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const addressFirstLine = faker.location.streetAddress();
    const addressSecondLine = faker.location.secondaryAddress()

    return {
        firstName,
        lastName,
        emailAddress: generateRandomEmail(`${firstName}${lastName}`),
        phoneNumber: generatePhoneNumber(),
        addressFirstLine,
        addressSecondLine,
        state: getRandomUSStateAbbreviation(),
        zipCode: getRandomUSZipCode(),
        country: getCountry(),
        dob: getRandomDOBAccurate(),
        gender: getRandomGender()
    };
};