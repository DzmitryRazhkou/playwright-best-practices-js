const {test, request, expect} = require('@playwright/test')
const {customerInfo} = require('../utils/generated-data')
const body = require("../fixture/common.json")

let token;
let bookingId;

test.beforeAll(async () => {

    const authBody = await body.loginAuthBody
    const authURL = "https://restful-booker.herokuapp.com/auth"

    const apiContext = await request.newContext();
    const loginAuthResponse = await apiContext.post(authURL, {
        data: authBody, headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": `Bearer Token ${token}`
        }
    })

    await expect(loginAuthResponse.ok()).toBeTruthy()
    await expect(loginAuthResponse.statusText()).toBe("OK")
    await expect(loginAuthResponse.status()).toBe(200)

    const authJsonResponseBody = await loginAuthResponse.json()
    token = await authJsonResponseBody.token
    console.log(" =====> " + token + " <===== ");
})

//**
// **//
test(" =====> Create Book (POST API) <==== ", async ({request}) => {

    const {firstName, lastName, totalPrice, depositPaid, bookName} = customerInfo()
    const createBookBody = {
        firstname: firstName, lastname: lastName, totalprice: totalPrice, depositpaid: depositPaid, bookingdates: {
            checkin: body.createBookDate.start, checkout: body.createBookDate.end,
        }, additionalneeds: bookName,
    };

    console.log(createBookBody)

    const createBookURL = "https://restful-booker.herokuapp.com/booking"
    const createBookResponse = await request.post(createBookURL, {
        data: createBookBody, headers: {"Content-Type": "application/json"},
    });

    await expect(createBookResponse.statusText()).toBe("OK")
    await expect(createBookResponse.status()).toBe(200)

    const createBookJson = await createBookResponse.json();
    await expect(typeof createBookJson.bookingid).toBe("number")
    await expect(typeof createBookJson.booking).toBe("object")

    await expect(createBookJson.booking.firstname).toBe(firstName)
    await expect(createBookJson.booking.lastname).toBe(lastName)
    await expect(createBookJson.booking.totalprice).toBe(totalPrice)
    await expect(createBookJson.booking.depositpaid).toBe(depositPaid)
    await expect(typeof createBookJson.booking.bookingdates).toBe("object")
    await expect(createBookJson.booking.bookingdates).toHaveProperty("checkin")
    await expect(createBookJson.booking.bookingdates).toHaveProperty("checkout")
    await expect(createBookJson.booking.additionalneeds).toBe(bookName)

    bookingId = createBookJson.bookingid;

    expect(bookingId).toBeDefined();
    console.log(" =====> The Created 'bookingId' is: ", bookingId, " <===== ");
})
test(" =====> Get Book (GET API) <==== ", async ({request}) => {

    const getBookURL = `https://restful-booker.herokuapp.com/booking/${bookingId}`
    const getBookResponse = await request.get(getBookURL, {
        headers: {"Content-Type": "application/json"},
    });

    await expect(getBookResponse.statusText()).toBe("OK")
    await expect(getBookResponse.status()).toBe(200)

    const getBookJson = await getBookResponse.json();
    console.log(" Getting Shit!!! ")
    console.log(getBookJson)
})
test(" =====> Update Book (POST API) <==== ", async ({request}) => {

    const {updateFirstName, updateLastName, updateTotalPrice, updateDepositPaid, updateBookName} = customerInfo()
    const updateBookBody = {
        firstname: updateFirstName,
        lastname: updateLastName,
        totalprice: updateTotalPrice,
        depositpaid: updateDepositPaid,
        bookingdates: {
            checkin: body.createBookDate.start, checkout: body.createBookDate.end,
        },
        additionalneeds: updateBookName,
    };

    const updateBookURL = `https://restful-booker.herokuapp.com/booking/${bookingId}`
    const updateBookResponse = await request.put(updateBookURL, {
        data: updateBookBody,
        headers: {"Content-Type": "application/json", "Accept": "application/json", "Cookie": `token=${token}`},
    });

    await expect(updateBookResponse.statusText()).toBe("OK")
    await expect(updateBookResponse.status()).toBe(200)

    const updateBookJson = await updateBookResponse.json();

    console.log(updateBookJson)

    await expect(updateBookJson.firstname).toBe(updateFirstName)
    await expect(updateBookJson.lastname).toBe(updateLastName)
    await expect(updateBookJson.totalprice).toBe(updateTotalPrice)
    await expect(updateBookJson.depositpaid).toBe(updateDepositPaid)
    await expect(typeof updateBookJson.bookingdates).toBe("object")
    await expect(updateBookJson.bookingdates).toHaveProperty("checkin")
    await expect(updateBookJson.bookingdates).toHaveProperty("checkout")
    await expect(updateBookJson.additionalneeds).toBe(updateBookName)
})
test(" =====> Delete Book (GET API) <==== ", async ({request}) => {

    const deleteBookURL = `https://restful-booker.herokuapp.com/booking/${bookingId}`
    const deleteBookResponse = await request.delete(deleteBookURL, {
        headers: {"Content-Type": "application/json", "Cookie": `token=${token}`},
    });

    await expect(deleteBookResponse.statusText()).toBe("Created")
    await expect(deleteBookResponse.status()).toBe(201)

    const deleteBookJson = await deleteBookResponse.body()
    console.log(deleteBookJson)
})