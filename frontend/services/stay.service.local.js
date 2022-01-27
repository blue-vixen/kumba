import { storageService } from '../services/async-storage.service.js'
import { utilService } from "../services/utils.service.js"
import { httpService } from './http.service.js'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
var gWatchedUser = null;

const STAY_URL = 'http://localhost:3030/api/stay/'

const KEY = 'stayDB'


export const stayService = {
    query,
    getById,
    remove,
    save
}

const gStays = [{
    "_id": "907978791",
    "name": "Charming House",
    "imgUrls": ["https://res.cloudinary.com/home-to-go/image/upload/v1622706975/ukus3nea6he6tezdwimp.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622706966/bc57trhwlnpv8vjfqdej.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622706972/pxyxznah0tcbi1ctbziz.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622706964/byggsp1gia2wwuhfcxdt.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622706969/ek6dw3ujrvknufheul40.jpg"
    ],
    "price": 120,
    "propertyType": "entire place",
    "summary": "Charming appartment with two bedrooms",
    "description": "Beautiful 2 bedroom architecturally designed villa, with infinity pool and floor to ceiling views in almost every room of the sea and Cap de Creus national park, in beautiful working fishing village in Northern Portogal. Beautiful 2 bedroom architecturally designed villa, with infinity pool and floor to ceiling views in almost every room of the sea and Cap de Creus national park, in beautiful working fishing village in Northern Portogal.",
    "capacity": 4,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Smoking Allowed",
        logo: "smoking_rooms"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "Israel",
        "countryCode": "IL",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2013",
        "txt": "Lovely house, but not as good as the pictures were. The house has not aged well or been maintained to bring it back to how it was originally built. Also, as per other reviews, agree that cleanliness was an issue. Although, once we complained to the agency, they quickly sent someone to clean areas we thought required more cleaning.",
        "rate": {

            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u102",
            "fullname": "Ross Geller",
            "imgUrl": "~@/assets/images/avatars/12.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "This villa is absolutely stunning with an incredible view. Check in and check out was very smooth and the host/agency are very well organized. Would absolutely recommend the place to anyone looking to have a relaxing time in costa brava amongst a very spectacular view directly from the house. The beach and town near the village are also very accessible to go during the day.",
        "rate": {
            cleanliness: 1,
            communication: 3,
            checkIn: 4,
            accuracy: 1,
            location: 1,
            accessibility: 2
        },
        "by": {
            "_id": "u103",
            "fullname": "Yami Kobin",
            "imgUrl": "~@/assets/images/avatars/2.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "24.8.2017",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u104",
            "fullname": "Ido Margalit",
            "imgUrl": "~@/assets/images/avatars/16.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2018",
        "txt": "Wonderfull house, great views, lovly neighbors, i love my life, thank you so much",
        "rate": {
            cleanliness: 1,
            communication: 3,
            checkIn: 4,
            accuracy: 1,
            location: 1,
            accessibility: 2
        },
        "by": {
            "_id": "u105",
            "fullname": "Mongo Shapira",
            "imgUrl": "~@/assets/images/avatars/20.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2020",
        "txt": "Lovely house, but as per other reviews, I agree that cleanliness was an issue. Although, once we complained to the agency, they quickly sent someone to clean areas we thought required more cleaning.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u107",
            "fullname": "Baten ainor",
            "imgUrl": "/img/img7.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "Great location but the communication with the host was problematic and the cleanliness was not up to par with my standarts.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u109",
            "fullname": "Monica Geller",
            "imgUrl": "~@/assets/images/avatars/1.png"
        }
    },
    {
        "id": "madeId",
        "date": "24.8.2020",
        "txt": "We loved our stay! Perfect location, everything was clean and tidy, was great to have the outdoor garden as well. The host was such a pleasure to communicate with and the apartment was so charming.",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "110",
            "fullname": "Jhon McLOVIN",
            "imgUrl": "~@/assets/images/avatars/17.png"
        }
    },
    ]
},
{
    "_id": "907978798",
    "name": "Nice House",
    "imgUrls": ["https://res.cloudinary.com/home-to-go/image/upload/v1622966649/poeo8sjxsiviipzrtpvu.jpg", "https://res.cloudinary.com/home-to-go/image/upload/v1622966634/ona0wsyqjedvtk0ozzvu.jpg", "https://res.cloudinary.com/home-to-go/image/upload/v1622966640/ewerdolnvxpnqdgvrmr5.jpg", "https://res.cloudinary.com/home-to-go/image/upload/v1622966632/b2rzokzx2vlssoqqitlt.jpg", "https://res.cloudinary.com/home-to-go/image/upload/v1622966637/ldpkwjusswysykk154n1.jpg"],
    "price": 100,
    "propertyType": "entire place",
    "summary": "Amazing house with four bedrooms",
    "description": "Beautiful 4 bedroom architecturally designed house, with infinity pool and floor to ceiling views in almost every room of the sea and Cap de Creus national park, in beautiful working fishing village in Northern Greece",
    "capacity": 6,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Smoking Allowed",
        logo: "smoking_rooms"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Erik Biton",
        "imgUrl": "2"
    },
    "loc": {
        "country": "Israel",
        "countryCode": "IL",
        "city": "Tel Aviv",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "This villa is absolutely stunning with an incredible view. Check in and check out was very smooth and the host/agency are very well organized. Would absolutely recommend the place to anyone looking to have a relaxing time in costa brava amongst a very spectacular view directly from the house. The beach and town near the village are also very accessible to go during the day.",
        "rate": {
            cleanliness: 1,
            communication: 3,
            checkIn: 4,
            accuracy: 1,
            location: 1,
            accessibility: 2
        },
        "by": {
            "_id": "u103",
            "fullname": "Yami Kobin",
            "imgUrl": "/img/img3.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "had a blast! but missed my cats..",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u104",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img4.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "24.8.2013",
        "txt": "Wonderfull house, great views, lovly neighbors, i love my life, thank you so much",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u105",
            "fullname": "Mongo Shapira",
            "imgUrl": "/img/img5.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "Lovely house, but not as good as the pictures were. The house has not aged well or been maintained to bring it back to how it was originally built. Also, as per other reviews, agree that cleanliness was an issue. Although, once we complained to the agency, they quickly sent someone to clean areas we thought required more cleaning.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u106",
            "fullname": "Bobby Biton",
            "imgUrl": "/img/img6.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "great house, not clean enough, had a problem with hot water, but enjoyed over all, lovley host",
        "rate": {
            cleanliness: 1,
            communication: 3,
            checkIn: 4,
            accuracy: 1,
            location: 1,
            accessibility: 2
        },
        "by": {
            "_id": "u107",
            "fullname": "Baten ainor",
            "imgUrl": "/img/img7.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "all good, great host, cosy bed, warm toilet, arrived with no underwear and the host lend me his.. oh i forgot to return it... sorry!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u108",
            "fullname": "Symon maymon",
            "imgUrl": "/img/img8.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 2,
            communication: 4,
            checkIn: 5,
            accuracy: 1,
            location: 3,
            accessibility: 3
        },
        "by": {
            "_id": "u109",
            "fullname": "Symon maymon",
            "imgUrl": "/img/img9.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "Lovely house, but not as good as the pictures were. The house has not aged well or been maintained to bring it back to how it was originally built.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "110",
            "fullname": "Jhon McLOVIN",
            "imgUrl": "/img/img10.jpg"
        }
    },
    ]
},
{
    "_id": "907978799",
    "name": "Dream House",
    "imgUrls": ["https://res.cloudinary.com/home-to-go/image/upload/v1622707080/spk8pdojdzlkcnoonbff.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622707071/qih5gap0k4ote3lp7te9.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622707069/bdo0v0eupyeageyxep4p.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622707073/rs3yi9mepqu466vpauzo.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622707076/fkbyicglofqxc20h31r5.jpg"
    ],
    "price": 150,
    "propertyType": "entire place",
    "summary": "Charming villa with three bedrooms",
    "description": "Beautiful 3 bedroom architecturally designed villa, with infinity pool and floor to ceiling views in almost every room of the sea and Cap de Creus national park, in beautiful working fishing village in Northern USA",
    "capacity": 6,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Smoking Allowed",
        logo: "smoking_rooms"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u102",
        "fullname": "Bentz Margalit",
        "imgUrl": "2"
    },
    "loc": {
        "country": "USA",
        "countryCode": "USA",
        "city": "New York",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "24.8.2013",
        "txt": "This villa is absolutely stunning with an incredible view. Check in and check out was very smooth and the host/agency are very well organized. Would absolutely recommend the place to anyone looking to have a relaxing time in costa brava amongst a very spectacular view directly from the house. The beach and town near the village are also very accessible to go during the day.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "What a house! So bright, airy and beautifully designed. Beds are good, as sheets and towels. Outside area for nice meals overlooking the sea. 5 min walking from a beautiful secluded beach and 10 min from the charming Port de la Selva, where you can find the freshest sea food. For a dream stay!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u103",
            "fullname": "Yami Kobin",
            "imgUrl": "/img/img3.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "Lovely house, but not as good as the pictures were. The house has not aged well or been maintained to bring it back to how it was originally built. Also, as per other reviews, agree that cleanliness was an issue. Although, once we complained to the agency, they quickly sent someone to clean areas we thought required more cleaning.",
        "rate": {
            cleanliness: 2,
            communication: 4,
            checkIn: 5,
            accuracy: 1,
            location: 3,
            accessibility: 3
        },
        "by": {
            "_id": "u105",
            "fullname": "Mongo Shapira",
            "imgUrl": "/img/img5.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "Absolutely incredible house. Truly amazing. The views are just mind-blowing, there is not one single moment where you don't think wow this house is incredible. From the inside and from the outside.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u106",
            "fullname": "Bobby Biton",
            "imgUrl": "/img/img6.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "great house, not clean enough, had a problem with hot water, but enjoyed over all, lovley host",
        "rate": {
            cleanliness: 1,
            communication: 3,
            checkIn: 4,
            accuracy: 1,
            location: 1,
            accessibility: 2
        },
        "by": {
            "_id": "u107",
            "fullname": "Baten ainor",
            "imgUrl": "/img/img7.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "all good, great host, cosy bed, warm toilet, arrived with no underwear and the host lend me his.. oh i forgot to return it... sorry!",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u108",
            "fullname": "Symon maymon",
            "imgUrl": "/img/img8.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "24.8.2013",
        "txt": "Our house is a very, very, very fine house With two cats in the yard Life used to be so hard Now everything is easy 'cause of you",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u109",
            "fullname": "Symon maymon",
            "imgUrl": "/img/img9.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "Lovely house, but not as good as the pictures were. The house has not aged well or been maintained to bring it back to how it was originally built.",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "110",
            "fullname": "Jhon McLOVIN",
            "imgUrl": "/img/img10.jpg"
        }
    },
    ]
},
{
    "_id": "907978795",
    "name": "Modern House",
    "imgUrls": ["https://res.cloudinary.com/home-to-go/image/upload/v1622706832/ebtmysskiuu16b21a6bd.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622706837/svky7mv5kyfndqsaa8rh.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622706846/kriwctfo00zlu9wyscaj.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622706964/byggsp1gia2wwuhfcxdt.jpg",
        "https://res.cloudinary.com/home-to-go/image/upload/v1622706842/pxu9pjyu1kbstaw142bu.jpg"
    ],
    "price": 85,
    "propertyType": "entire place",
    "summary": "Charming loft with two bedrooms",
    "description": "Beautiful 2 bedroom architecturally designed villa, with infinity pool and floor to ceiling views in almost every room of the sea and Cap de Creus national park, in beautiful working fishing village in Northern Tel Aviv",
    "capacity": 4,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    ],
    "host": {
        "_id": "u102",
        "fullname": "Bentz Margalit",
        "imgUrl": "2"
    },
    "loc": {
        "country": "Israel",
        "countryCode": "IL",
        "city": "Tel Aviv",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "24.8.2013",
        "txt": "Lovely house, but not as good as the pictures were. The house has not aged well or been maintained to bring it back to how it was originally built. Also, as per other reviews, agree that cleanliness was an issue. Although, once we complained to the agency, they quickly sent someone to clean areas we thought required more cleaning.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "Absolutely incredible house. Truly amazing. The views are just mind-blowing, there is not one single moment where you don't think wow this house is incredible. From the inside and from the outside.",
        "rate": {
            cleanliness: 2,
            communication: 4,
            checkIn: 5,
            accuracy: 1,
            location: 3,
            accessibility: 3
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907978790",
    "name": "Fly's House",
    "imgUrls": ["https://a0.muscache.com/im/pictures/miso/Hosting-50946161/original/0b736011-42e8-498c-84b7-a9f5301392a5.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-50946161/original/8a8d5043-790c-488a-a960-1d4f542873e5.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-50946161/original/27e3a327-767a-44f1-9172-49110e0c1af0.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-50946161/original/af1af2a0-2380-4b99-b60b-2edc202e6d6b.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-50946161/original/61864421-feed-4b88-bdfb-81a67887ecf4.jpeg?im_w=1440"
    ],
    "price": 15,
    "propertyType": "private room",
    "summary": "Charming loft with great smell",
    "description": "Beautiful 1 bedroom architecturally designed loft, in beautiful working fishing village in Northern Tel Aviv",
    "capacity": 2,
    "amenities": [{
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Smoking Allowed",
        logo: "smoking_rooms"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u102",
        "fullname": "Bentz Margalit",
        "imgUrl": "2"
    },
    "loc": {
        "country": "Israel",
        "countryCode": "IL",
        "city": "Tel Aviv",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "Geoff’s house is beautiful. Being in the house, you feel you are directly on top of the ocean. The views are incredible. The photos are a bit misleading though, since the house is surrounded by other houses which is something not noticeable in the pictures. This was not an issue though, specially these days since there was not lot of people in the area. And the house is 5 minutes walking from a beautiful little beach and many others close by. Great place. Geoff is also very helpful and communicative, quickly responding and trying to help. Thanks for everything!",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "24.8.2013",
        "txt": "The location and accommodation was superb. Spectacular scenery from both nice and rough weather. Cosy village nearby with all necessary services at hand. Perfect with a garage for our car, easy to park. With great experience from other top-AirBnB Villas, this house is definitely on our top-1 position.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "Lovely house, but not as good as the pictures were. The house has not aged well or been maintained to bring it back to how it was originally built. Also, as per other reviews, agree that cleanliness was an issue. Although, once we complained to the agency, they quickly sent someone to clean areas we thought required more cleaning.",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907971790",
    "name": "Feingold House Loft Apt",
    "imgUrls": ["https://a0.muscache.com/im/pictures/61071319/f2fb3639_original.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/61071368/ae3bfd40_original.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/61071294/720603fe_original.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/61071408/80442925_original.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/61071524/31bd9eae_original.jpg?im_w=1440"
    ],
    "price": 106,
    "propertyType": "entire place",
    "summary": "Amazing loft with great views",
    "description": "Beautiful 1 bedroom architecturally designed loft, in beautiful working fishing village in Northern Tel Aviv",
    "capacity": 4,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Smoking Allowed",
        logo: "smoking_rooms"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u102",
        "fullname": "Bentz Margalit",
        "imgUrl": "2"
    },
    "loc": {
        "country": "Israel",
        "countryCode": "IL",
        "city": "Jerusalem",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "The Sunflower House if beautiful! Views of the Sea from everywhere in the house, large common area and open kitchen, wonderful pool to swim, walking distance to a beautiful cove to swim in the Sea, and walking distance to the town. We will be back!",
        "rate": {
            cleanliness: 1,
            communication: 3,
            checkIn: 4,
            accuracy: 1,
            location: 1,
            accessibility: 2
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "24.8.2013",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "917931790",
    "name": "Sunny and Spacious West Village Gem",
    "imgUrls": ["https://a0.muscache.com/im/pictures/4532251c-e647-4334-a425-55a583bcba56.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/ffe8d8da-41e2-4e7d-bf2e-d35a8acd76dd.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/c8217ed0-aea4-41dd-b83d-23c9073fc482.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/262cdd83-7067-446a-ad91-d42e68a4fb3b.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/a9fa76d9-ef11-482b-986d-c28559b13473.jpg?im_w=1440"
    ],
    "price": 325,
    "propertyType": "entire place",
    "summary": "wonderfull loft near to all the sites",
    "description": "Hello, welcome to our sunny and spacious West Village gem! Our apartment has been designed with elegance and comfort in mind. Previously featured on Apartment Therapy, we've redone the interior but kept the layout readers loved.",
    "capacity": 2,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Smoking Allowed",
        logo: "smoking_rooms"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u102",
        "fullname": "Bentz Margalit",
        "imgUrl": "2"
    },
    "loc": {
        "country": "USA",
        "countryCode": "USA",
        "city": "New York",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "Lovely house, but not as good as the pictures were. The house has not aged well or been maintained to bring it back to how it was originally built. Also, as per other reviews, agree that cleanliness was an issue. Although, once we complained to the agency, they quickly sent someone to clean areas we thought required more cleaning.",
        "rate": {
            cleanliness: 2,
            communication: 4,
            checkIn: 5,
            accuracy: 1,
            location: 3,
            accessibility: 3
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A great house in fantastic surroundings with a stunning sea view! The house is not located as private as it looks in the pictures, but the road nearby wasn’t busy at all. The pool is quite small, but a nice stone beach with crystal clear water is located only a couple minutes walking from the house. We also enjoyed trail-walking in the beautiful nature nearby and nice meals in the calm village. If you would like a highly relaxing holiday, the sunflower house is the place for you!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931790",
    "name": "Santorini Sky The Lodge",
    "imgUrls": ["https://a0.muscache.com/im/pictures/miso/Hosting-51719483/original/deaca075-eb5e-4252-bb29-5badc7ccb9d1.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-51719483/original/08712ef1-b066-4aad-a896-e62aa54a462a.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-51719483/original/43b8f692-7a18-40d0-b380-181927656033.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-51719483/original/46da18e1-b672-4368-9610-17e8e889986e.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-51719483/original/23b9b64d-b62f-444c-83d9-7882fd8fd659.jpeg?im_w=1440"
    ],
    "price": 142,
    "propertyType": "hotel room",
    "summary": "Enjoy loft life in our small paradise",
    "description": "Heaven has a new address! In this sensational villa, rustic design is blended with modern comfort and luxury. From the private infinity jacuzzi, to marble counters, pillow-top king-size bed, and satellite TV – Every detail has been considered to make The Lodge is as stunning inside as the views are outside.",
    "capacity": 2,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Smoking Allowed",
        logo: "smoking_rooms"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u102",
        "fullname": "Bentz Margalit",
        "imgUrl": "2"
    },
    "loc": {
        "country": "Greece",
        "countryCode": "GRC",
        "city": "Santorini",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 2,
            communication: 4,
            checkIn: 5,
            accuracy: 1,
            location: 3,
            accessibility: 3
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931100",
    "name": "Big Blue villa with Hot Tub in Oia",
    "imgUrls": ["https://a0.muscache.com/im/pictures/5b8a5372-0126-4390-af17-5b92ef4c78a9.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/51214457-e35d-4bc8-b775-4c6eef8aac72.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/21d0ee87-c834-4cdb-8ccd-5c30735c54a4.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-13263102/original/c3152a34-14fa-4f6c-9998-a7c9caaa5eaa.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-13263102/original/6f457fc4-1bda-4a52-b11c-38e2997a43fb.jpeg?im_w=1440"
    ],
    "price": 283,
    "propertyType": "hotel room",
    "summary": "Enjoy loft life in our small paradise",
    "description": "This spacious little villa with Jacuzzi is located at the highest point of the village with stunning and unlimited views to the famous caldera and the volcano. The king size bed and and the views from two balconies will give unique moments of relaxation and enjoyment",
    "capacity": 4,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "Greece",
        "countryCode": "GRC",
        "city": "Santorini",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 1,
            location: 3,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931101",
    "name": "Lava Cave suite 1BR",
    "imgUrls": ["https://a0.muscache.com/im/pictures/81937246/d4fd7236_original.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/81936962/368a8003_original.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/81937415/bead5483_original.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/81937131/b944c99a_original.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/81867259/94d7745d_original.jpg?im_w=1440"
    ],
    "price": 396,
    "propertyType": "hotel room",
    "summary": "Enjoy loft life in our small paradise",
    "description": "",
    "capacity": 2,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "Greece",
        "countryCode": "GRC",
        "city": "Santorini",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 1,
            location: 3,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931103",
    "name": "FIRA WHITE RESIDENCE DELUXE VILLA",
    "imgUrls": ["https://a0.muscache.com/im/pictures/27cf1c90-17a1-4d8a-8ed9-f53d84e1ffdc.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/6bdf9c18-c8f2-46cf-ae77-ed35ea855554.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/f8a36eec-9656-412a-813f-c7d16bd35216.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/9ce9712d-3a97-436a-85d3-c20944a420e9.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/7fc4a2f9-64ba-43b7-8cce-2e21f97a1f14.jpg?im_w=1440"
    ],
    "price": 163,
    "propertyType": "entire place",
    "summary": "Enjoy loft life in our small paradise",
    "description": "A fully-equipped villa with an attic. With its wide veranda [40m²] and the irresistible combination of stone - exterior and modern - interior, it accomplishes the perfect mix & match of the local traditional architectural style with the most modern touches. It is made up of two bedrooms, the first one [14m²] being carved in the heart of a Santorinean rock, with a concrete bed, commodes and a TV set, and the second bedroom [12m²] featuring a black iron bed with commodes.",
    "capacity": 6,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "Greece",
        "countryCode": "GRC",
        "city": "Santorini",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 1,
            location: 3,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931104",
    "name": "Helianthus Honeymoon House",
    "imgUrls": ["https://a0.muscache.com/im/pictures/b4fae675-d675-480d-a741-69308c9a4e0f.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/e7b11e1e-cbc5-4525-bc01-e015248f5b22.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/f6a6ebb2-6659-40e1-bc76-d91e3079424d.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/6a54b7c5-ec7c-43dd-893e-410acf0657d4.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-42117534/original/8a6ca43b-7dd4-4a76-ad6a-d55e81b684f8.jpeg?im_w=1440"
    ],
    "price": 97,
    "propertyType": "entire place",
    "summary": "Enjoy loft life in our small paradise",
    "description": "Our Honeymoon House with Caldera View offers the perfect romantic escape in Santorini, with the graceful addition of a heated outdoor Jacuzzi (will be closed between 1/11-15/3) providing the ultimate sense of relaxation overlooking the majestic caldera and the infinite Aegean blue. In an ample space of 40m2 divided into two levels, it provides everything a couple may desire. It has been built in perfect alignment with the distinct Cycladic architecture and boasts unparalleled, absolute privacy",
    "capacity": 3,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "Greece",
        "countryCode": "GRC",
        "city": "Santorini",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 3,
            location: 5,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 4,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 4,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931105",
    "name": "Divine View Sun Home",
    "imgUrls": ["https://a0.muscache.com/im/pictures/606e08b5-7370-480f-8f9a-840d6227d99f.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-44892997/original/b7787b32-80ca-4a32-8768-b33a0e40b7a2.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/237fe658-8fb0-456a-b3c4-461e56e1b5b8.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/e3761356-08aa-4914-af78-3558e11db95a.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/eda51788-ef0e-407f-b5c3-13925051c975.jpg?im_w=1440"
    ],
    "price": 61,
    "propertyType": "entire place",
    "summary": "Enjoy loft life in our small paradise",
    "description": "Unwind and relax with a glass of wineadmiring the breathtaking views of the famous Santorinian sunset from this house's private veranda . Awake refreshed and ready for a day to explore the island via this clean, sunny house with impressive views to the caldera , volcano of Santorini Aegean Sea & the island of Thirassia . Head out and wander through the famous paths of Fira and explore the nearby little shops & cafe .",
    "capacity": 3,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "Greece",
        "countryCode": "GRC",
        "city": "Santorini",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 3,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 4,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931106",
    "name": "Super cute apt perfect for couples, Montmartre",
    "imgUrls": ["https://a0.muscache.com/im/pictures/miso/Hosting-45708053/original/ccf84df9-68b8-461b-8d32-6f163d31986d.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-45708053/original/1009ea71-f8b2-4ddd-b77f-f769029c26eb.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-45708053/original/92e3f241-36d2-485d-ba95-90d4f7069be0.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-45708053/original/4689937f-9014-4490-ad9b-e6ef511e6ad8.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-45708053/original/99d0c803-0697-4e3b-884f-8770d8da0239.jpeg?im_w=1440"
    ],
    "price": 85,
    "propertyType": "shared room",
    "summary": "Enjoy loft life in our small paradise",
    "description": "Located in the trendy and charming area of Montmartre (18th arrondissement) the apartment is perfect for couples travelling in Paris. Within walking distance you can enjoy must see touristic attractions such as Moulin Rouge and Montmartre. All other key attractions – Opera, Louvre, Eiffel Tower, Notre Dame, Le Marais – are just 20/25 minutes away by subway. You can also enjoy a more Parisian atmosphere by discovering the charming areas of Abesse, Rue des Martyrs and South Pigalle.",
    "capacity": 2,
    "amenities": [
        {
            name: "Wifi",
            logo: "wifi"
        },
        {
            name: "Kitchen",
            logo: "restaurant"
        },
        {
            name: "Pets Allowed",
            logo: "pets"
        },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "France",
        "countryCode": "FRA",
        "city": "Paris",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 1,
            location: 3,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931107",
    "name": "Luxurious, heart of Marais, balcony",
    "imgUrls": ["https://a0.muscache.com/im/pictures/7460c56a-1a95-4818-a62c-cea019662607.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/4ae35562-51aa-4c63-a17f-9b1da0f8d474.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/a96378f1-2e95-47ce-806c-402010b83f23.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/6e4d4ff3-a712-4ff3-b18f-215f302d7868.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/6c12e179-5367-4f63-9a03-b711cbaa8758.jpg?im_w=1440"
    ],
    "price": 209,
    "propertyType": "entire place",
    "summary": "Enjoy loft life in our small paradise",
    "description": "",
    "capacity": 2,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "France",
        "countryCode": "FRA",
        "city": "Paris",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 3,
            checkIn: 3,
            accuracy: 1,
            location: 3,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 2,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 3,
            checkIn: 2,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931108",
    "name": "Very center of Paris: Rue Montmartre - Montorgueil",
    "imgUrls": ["https://a0.muscache.com/im/pictures/miso/Hosting-51501310/original/ad757406-bc73-4af0-8414-bb8237347af6.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-51501310/original/a3cf20b6-ba6e-4cc2-a66f-ec69f6994326.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-51501310/original/be26b498-5db8-4dbb-9eb6-e19f317a7e04.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-51501310/original/96e53777-6618-4b84-aceb-7c08915f1dca.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-51501310/original/91ef0d5b-e2f8-4330-9245-466d67be9c80.jpeg?im_w=1440"
    ],
    "price": 81,
    "propertyType": "entire place",
    "summary": "Enjoy loft life in our small paradise",
    "description": "In the heart of the hyper center of Paris in the pedestrian district Montorgueil my apartment has been completely refurbished. All Châtelet Les Halles Metro lines are a 2-minute walk away. The neighborhood of Le Marais, the Louvre, the Palais Royal and the Seine are a few cables away.",
    "capacity": 3,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },

    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "France",
        "countryCode": "FRA",
        "city": "Paris",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 3,
            location: 3,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 4,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 4,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 3
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931111",
    "name": "Superb apartment- EIFFEL TOWER view - 2 people",
    "imgUrls": ["https://a0.muscache.com/im/pictures/47d23608-568e-4a1d-b2c0-5cd74a20bc22.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/9e8f3dcb-8877-4e08-973e-c961e8f8687c.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/9c00b371-e338-416c-b5cc-06576d2a98f9.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/1b3b2b52-c2e6-49bd-ba54-9f55e1e94dd8.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/9faff7b1-59c7-4c43-bffe-fd37fe2847f2.jpg?im_w=1440"
    ],
    "price": 113,
    "propertyType": "entire place",
    "summary": "Enjoy loft life in our small paradise",
    "description": "",
    "capacity": 2,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    }
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "France",
        "countryCode": "FRA",
        "city": "Paris",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 4,
            accuracy: 1,
            location: 3,
            accessibility: 3
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 4,
            checkIn: 4,
            accuracy: 5,
            location: 3,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931112",
    "name": "Magnifique Appart 1BR/4P - Montorgueil 7",
    "imgUrls": ["https://a0.muscache.com/im/pictures/miso/Hosting-43939043/original/c33d5851-a4a0-4426-b4a5-da2aac05584a.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-43939043/original/5ba756d5-4807-4bdd-9cac-ea17ac0a740c.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-43939043/original/727ae8b5-ce0a-4ab4-8167-3ff3a0dc88db.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-43939043/original/90a86ce9-878d-4c9a-900d-73d195750353.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-43939043/original/31110573-7f50-49c1-8698-bbc68c9e6ba8.jpeg?im_w=1440"
    ],
    "price": 181,
    "propertyType": "entire place",
    "summary": "Enjoy loft life in our small paradise",
    "description": "",
    "capacity": 4,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "France",
        "countryCode": "FRA",
        "city": "Paris",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 4,
            location: 5,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931113",
    "name": "Bograshov area - Modern&sunny 1 BD balcony&parking",
    "imgUrls": ["https://a0.muscache.com/im/pictures/580be920-c15d-4962-a4a3-37334bd03722.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/9fe9a9d6-1851-4f65-bd3c-53181e22baf4.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/3025b99b-cf06-43a7-befc-3bcd357aab4c.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/40df0ae9-b090-4040-835e-cf7d7152496a.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/32af070a-9113-4ee0-a1e8-29b89c9bde2b.jpg?im_w=1440"
    ],
    "price": 107,
    "propertyType": "entire place",
    "summary": "Enjoy loft life in our small paradise",
    "description": "Lovely one bedroom located in the heart of the city with an open view. Modern building with balcony, elevator, and parking only a few minutes walk to Bougrashov beach. Fully furnished and equipped to host you comfortably during your stay in TLV. The apartment has one main area, very sunny access to a balcony with an open view. The living room has a sofa, with TV ( Local and International channels) and an open-planned kitchen. In the kitchen, there are all the appliances you need to cook, make coffee and eat. The bedroom has a very comfortable double bed. The living room has an sofa bed to accommodate additionals guests. Our apartments are equipped and we make sure that there are all the necessary appliances you may need while you are away, so we provide: coffee, cleaning supplies,home appliances, cooking utensils and an iron. Fresh, clean sheets and towels are of course provided. It can accommodate up to 4 people.", "capacity": 4,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    {
        name: "Smoking Allowed",
        logo: "smoking_rooms"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "Israel",
        "countryCode": "IL",
        "city": "Tel Aviv",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 4,
            accuracy: 2,
            location: 2,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 3,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 3,
            checkIn: 3,
            accuracy: 5,
            location: 4,
            accessibility: 3
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931114",
    "name": "Gordon 2 bedroom + sea view + parking!!!",
    "imgUrls": ["https://a0.muscache.com/im/pictures/367725cd-d7aa-4732-8243-a0a0e65e1b19.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/e45d7f47-1949-41c5-941b-74e9b4e146aa.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/1dc8c3cd-824d-41c8-ab9b-c9bb5e94fb26.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/ab2f3919-f3c0-430f-8467-7f9f8d14c482.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/290cb9e9-c3b9-47d5-9c50-f218aee84578.jpg?im_w=1440"
    ],
    "price": 121,
    "propertyType": "entire place",
    "summary": "Enjoy loft life in our small paradise",
    "description": "A luxurious apartment, that contains 2 bedrooms, 1 shower room + guest toilet. large windows with lots of sunlight and full sea view. Balcony with a view to Gordon beach. all appliances are new.",
    "capacity": 4,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    {
        name: "Smoking Allowed",
        logo: "smoking_rooms"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "Israel",
        "countryCode": "IL",
        "city": "Tel Aviv",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 4,
            location: 4,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931115",
    "name": "Neve Tsedek area - Cosy&sunny 1 BDR amazing view",
    "imgUrls": ["https://a0.muscache.com/im/pictures/9400f9b5-a329-456e-a72d-8412b36577e6.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/903e4bfe-46c7-4de8-bc51-1e45ff4e6764.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/9fa4351f-be62-4e26-a1ab-cd1f80e59088.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/7ef02511-8800-47b2-a1ef-45a95081c5f7.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-26990290/original/1cac92b4-178d-4b70-93b1-c08f0a7a3c5e.jpeg?im_w=1440"
    ],
    "price": 141,
    "propertyType": "entire place",
    "summary": "Enjoy loft life in our small paradise",
    "description": "A cozy,well- designed luxurious apartment in the heart of New Tsedek, with a very sunny living room and a balcony offering an amazing view of the beach, Yaffo and Neve Tsedek, a trendy area of TLV. You will have access to a private carpark and for any stay of more than 2 weeks you will be able to use the pool and the gym. Situated on the 18th floor of a luxurious apartment building, in the main area you will find a living room and an open- spaced kitchen with a beautiful panoramic view and an access to the balcony. The Master bedroom has a double bed, a bathroom, and a balcony. There is a dining area and living room with international TV channels, movies and Netflix. The sofa can accommodate 2 additional guests. The kitchen is fully equipped and has all the necessary cooking appliances you may need. Your comfort is important to us so we make sure our apartments are equipped with all the necessary appliances you may need during your stay so we provide: coffee and cleaning supplies, cooking appliances and an iron. Fresh, clean sheets and towels are of course provided. Perfect for family and friends. Perfect for family and friends; The apartment can accommodate up to 4 people. We are happy to assist you with any further services you may need.",
    "capacity": 4,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    {
        name: "Smoking Allowed",
        logo: "smoking_rooms"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "Israel",
        "countryCode": "IL",
        "city": "Tel Aviv",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 3,
            location: 4,
            accessibility: 5
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931613",
    "name": "Luxurious Loft/2 Min Walk To The Beach/Netflix",
    "imgUrls": ["https://a0.muscache.com/im/pictures/ca01eeb8-3d66-456f-8fcf-94d2af9df2a2.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/b18307d2-4732-4e3b-8184-df49ab9052f7.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/35f937d0-c351-469e-afa2-ecf9661a7507.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/bad14c71-cdbe-4461-93b1-302354ffe1dc.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/8d039a16-6fef-4961-8eb0-e1c29c334e54.jpg?im_w=1440"
    ],
    "price": 103,
    "propertyType": "private room",
    "summary": "Enjoy loft life in our small paradise",
    "description": "The ultimate Tel Aviv experience is just a few clicks away. Imagine yourself at the heart of Tel Aviv, close to the trendiest spots in the city. Book this place and you won’t need to imagine anymore(: It’s a brand new Apt. with an equipped kitchen, high-speed wi-fi, living room, shared garden, and an indulging shower. You’ll be staying 4 min. walk from the beach and many other great Tel Avivian places. To make a long story short- this is the place you want to stay in(:",
    "capacity": 3,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    {
        name: "Smoking Allowed",
        logo: "smoking_rooms"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "Israel",
        "countryCode": "IL",
        "city": "Tel Aviv",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 2,
            location: 3,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 4,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 1,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931116",
    "name": "Beautiful pop-art studio near Times Square !",
    "imgUrls": ["https://a0.muscache.com/im/pictures/06080577-8b1b-4961-8b2f-8edde1555eaf.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/95708bd6-7a30-45b0-a9e1-db22f94cff0c.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/214ca5d6-2f11-4254-9e1b-f096a48ec3ca.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/ad0731d5-553f-4154-b34a-9c415b0202b8.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/b233ec8f-d3ae-4bca-a6aa-db7afe9ef519.jpg?im_w=1440"
    ],
    "price": 99,
    "propertyType": "private room",
    "summary": "Enjoy loft life in our small paradise",
    "description": "This studio-apt offers a Queen size bed, a full bathroom, and a kitchenette. It is comfortable with air conditioning, basic cable television with free Netflix, and free high speed internet! The bathroom is beautifully laid out with a tiled shower and a window. This peaceful 2nd floor walk-up apartment overlooks a scenic backyard with a table and bench for entertaining outside. A bounty of plants and flowers makes this garden a true haven of tranquility.",
    "capacity": 2,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },

    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "USA",
        "countryCode": "USA",
        "city": "New York",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 1,
            location: 3,
            accessibility: 4
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 3,
            communication: 3,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 5,
            checkIn: 5,
            accuracy: 5,
            location: 5,
            accessibility: 5
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "907931118",
    "name": "Hell's Kitchen Apartment",
    "imgUrls": ["https://a0.muscache.com/im/pictures/43161093-d80c-4470-8b64-6357764a13dc.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/970d41bc-2af7-4faa-b522-105c31c7528c.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/09afde2d-14ce-4132-97ff-8efeeab3e23a.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/f4585ca2-0fbe-4419-83e8-f1068f653950.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/d43b88ba-8df5-4dc3-87a9-b987dec4ac26.jpg?im_w=1440"
    ],
    "price": 150,
    "propertyType": "entire place",
    "summary": "Enjoy loft life in our small paradise",
    "description": "Superb Spacious One Bedroom Apartment - located in the hart of Midtown West and a mere 2 min walk from Time Square. This character filled apartment offers high ceilings, exposed brick walls and is tastefully furnished. The apartment is on the 1st (ground) floor and has a separate lounge and open plan kitchen / dining area. The bedroom is spacious and offers a Queen bed with windows on three sides making it light and airy.",
    "capacity": 2,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "USA",
        "countryCode": "USA",
        "city": "New York",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 4,
            location: 4,
            accessibility: 5
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 4,
            checkIn: 4,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
{
    "_id": "9079333119",
    "name": "Hell's Kitchen Enclave: a Diamond in the Rough",
    "imgUrls": ["https://a0.muscache.com/im/pictures/d8965a84-12cc-40e6-b51a-d5801d2e469d.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/2f78a14f-d7b8-468c-8274-b1ee2ad927b9.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-13169559/original/4585c191-a71a-4b1a-8d15-d9afc6cc1f9c.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-13169559/original/135c6a12-efcc-4aab-9be3-2a7278967ad8.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/2f0f2667-9033-4243-a135-e2237a6a921b.jpg?im_w=1440"
    ],
    "price": 69,
    "propertyType": "private room",
    "summary": "Enjoy loft life in our small paradise",
    "description": "The space, located in the heart of the City, is suitable for a range of guests - solo adventurers, and business travelers alike - situated on a block shared with a school and car dealership, there are 1/2 as many people and twice the privacy. Up to date amenities, in a rustic, turn of the century walk-up, you will find solace.",
    "capacity": 2,
    "amenities": [{
        name: "TV",
        logo: "live_tv"
    },
    {
        name: "Wifi",
        logo: "wifi"
    },
    {
        name: "Kitchen",
        logo: "restaurant"
    },
    {
        name: "Air conditioning",
        logo: "ac_unit"
    },
    {
        name: "Pets Allowed",
        logo: "pets"
    },
    ],
    "host": {
        "_id": "u101",
        "fullname": "Baner Aiton",
        // "imgUrl": "2"
        "imgUrl": "2"
    },
    "loc": {
        "country": "USA",
        "countryCode": "USA",
        "city": "New York",
        "lat": -8.61308,
        "lng": 41.1413
    },
    "reviews": [{
        "id": "madeId",
        "date": "04.3.2020",
        "txt": "This was a wonderful place to stay. It is a very large and comfortable space. The best part of the house are the spectacular ocean views. It is a stunning all-day treat. The view from most of the rooms really raised the bar of our stay. There were many interesting ocean trails nearby and the short walk into town was scenic. Our stay here was one of the highlights of the vacation. It was well worth the two-hour drive from Barcelona!",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 4,
            location: 4,
            accessibility: 5
        },
        // "rate": 7
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "07.1.2015",
        "txt": "A stunning property in a beautiful location. The local village is a short walk away and has some wonderful food shops and restaurants. The house has a lot of glass and in the middle of summer would benefit from air conditioning (something mentioned in previous reviews), but has large windows which can be opened. The coast line is incredible, and this property is perfectly located to maximise the views. Would recommend a visit to the local monastery if nothing else for the amazing drive from the property.",
        "rate": {
            cleanliness: 4,
            communication: 4,
            checkIn: 5,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u101",
            "fullname": "Arik Biton",
            "imgUrl": "/img/img1.jpg"
        }
    },
    {
        "id": "madeId",
        "date": "12.5.2012",
        "txt": "We had a very nice stay at the Villa. It was very quiet around it, but still possible to (carefully!) walk to the village. We had a couple of small problems (light went off) and Geoff's agency took care of them promptly and nicely -- they even turned on the heating before we arrived, which was highly appreciated.The villa is as cool as it looks, yet really functional  highly recommended!",
        "rate": {
            cleanliness: 5,
            communication: 4,
            checkIn: 4,
            accuracy: 5,
            location: 4,
            accessibility: 4
        },
        "by": {
            "_id": "u102",
            "fullname": "Bentz Margalit",
            "imgUrl": "/img/img2.jpg"
        }
    },
    ]
},
]


_createStays()

async function query(filterBy) {
    return httpService.get('stay')

}

function getById(id) {
    return storageService.get(KEY, id)
}

function remove(id) {
    return storageService.remove(KEY, id)
}


function save(stay) {
    const savedStay = stay._id ?
        storageService.put(KEY, stay) :
        storageService.post(KEY, stay)
    return savedStay
}

function _createStays() {
    var stays = JSON.parse(localStorage.getItem(KEY))
    if (!stays || !stays.length) {
        stays = gStays
    }
    localStorage.setItem(KEY, JSON.stringify(stays))
    return stays
}