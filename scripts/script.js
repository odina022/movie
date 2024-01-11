// let tv = new Swiper(`.trend__tv-slider`, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: `.trend__tv-slider .swiper-button-next`,
//         prevEl: `.trend__tv-slider .swiper-button-prev`,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });

// let awaited = new Swiper(`.popular__actors-slider`, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: `.popular__actors-slider .swiper-button-next`,
//         prevEl: `.popular__actors-slider .swiper-button-prev`,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });


const   searchLink = document.querySelector(".search__link .icon-reg"),
        mainContent = document.querySelector(".main__content"),
        mainClose = document.querySelectorAll(".main__close"),
        mainBlock = document.querySelector(".main__block"),
        mainSolo = document.querySelector(".main__solo"),
        moviesLink = document.querySelectorAll(".movies__link"),
        formMain = document.querySelector(".form__main"),
        headerInput = document.querySelector(".header__input"),
        anime = document.querySelector('.anime'),
        pagination = document.querySelector(".pagination"),
        headerBtn = document.querySelector(".header__btn"),
        headerAbs = document.querySelector(".header__abs"),
        headerItems = document.querySelector(".header__items");


  /* menu bars */
  headerBtn.addEventListener("click",function (event) {
     event.preventDefault()
      headerAbs.classList.toggle('active')
      headerItems.classList.toggle('active')

  })

  headerAbs.addEventListener("click",function (e) {
    // console.log(e.currentTarget)
    if(e.target == e.currentTarget){
       
        headerAbs.classList.remove('active')
        headerItems.classList.remove('active')
  
    }
  })
  /* menu bars */

//   host

const host = "https://kinopoiskapiunofficial.tech";
const hostName = "X-API-KEY";
const hostValue = "daddca9c-526c-4e4f-8f2f-0f7163e89301";


class Kino { 

    constructor() {
        this.date = new  Date().getMonth();
        this.curYear = new Date().getFullYear();

        this.months = ['january','february','march','april','may','june','july','august','september','october','november','december']

        this.curMonth = this.months[this.date]
    }

    fOpen = async (url) => {
        let response = await fetch(url, {
            headers: {
                [hostName]: hostValue
            }
        })

        if(response.ok) return response.json()
        else throw new Error(`Ulanolmadim bazaga ${url}`)
    }

    getTopMovies = (page) => this.fOpen(`${host}/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`)

    getSoloFilm = (id) => this.fOpen(`${host}/api/v2.1/films/${id}`)

    getMostAwaited = (page = 1,year = this.curYear, month = this.curMonth) => this.fOpen(`${host}/api/v2.1/films/releases?year=${year}&month=${month}&page=${page}`)
 
    getReviews = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC
    `);

    getSearch = (page = 1,keyword) => this.fOpen(`${host}/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`)

    getFrames = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/images?type=STILL&page=1`)
    getPrimers = (year = this.curYear, month = this.curMonth) => this.fOpen(`${host}/api/v2.2/films/premieres?year=${year}&month=${month}`)



}

const db = new Kino();


db.getSoloFilm(435).then(data => {
    console.log(data)
})


// host

/* render Tren movies */

function renderTrendMovies (elem = [],fn = [],films = [],pages = []) {

    anime.classList.add('active')
    
    elem.forEach((item,i) => {
        
        let parent = document.querySelector(`${item} .swiper-wrapper`)

            db[fn[i]](pages[i]).then(data => {
                // console.log(data)
                data[films[i]].forEach(el => {
                    // console.log(el)
                    let slide = document.createElement('div')
                    slide.classList.add('swiper-slide')
                  
                    slide.innerHTML = `
                        <div class="movie__item">
                            <img src="${el.posterUrlPreview}" alt="" loading="lazy">
                        </div>
                    `
                    parent.append(slide)

              });
              anime.classList.remove('active')
             
            })

            .then(() => {
                elem.forEach(item => {
                    new Swiper(`${item}`, {
                        slidesPerView: 1,
                        spaceBetween: 27,
                        // slidesPerGroup: 3,
                        loop: true,
                        // loopFillGroupWithBlank: true,
                        navigation: {
                            nextEl: `${item} .swiper-button-next`,
                            prevEl: `${item} .swiper-button-prev`,
                        },
                        breakpoints: {
                            1440: {
                                slidesPerView: 6,
                            },
                            1200: {
                                slidesPerView: 5,
                            },
                            960: {
                                slidesPerView: 4,
                            },
                            720: {
                                slidesPerView: 3,
                            },
                            500: {
                                slidesPerView: 2,
                            },
                        }
                    });
                });
            })

            .catch(e => {
                console.error(e)
                
            })

    //    db.getTopMovies()

    });
}
renderTrendMovies([".trend__tv-slider",".popular__actors-slider"],["getTopMovies","getMostAwaited"],["films",'releases'],[1,1])
/* render Tren movies */

// rand

    function randMovies(num) {
        return Math.trunc(Math.random() * num + 1)
    }

// rand

// render header

function renderHeader() {
    db.getTopMovies(page).then(data => {

        // console.log(data)
        anime.classList.add('active')
        let max = randMovies(data.films.length);
        let filmId = data.films[max].filmId
        let filmRating = data.films[max].rating 
        // console.log(filmId)

        db.getSoloFilm(filmId).then(response => {
            // console.log(response)
            let info = response.data
            let headerText = document.querySelector(".header__text")
            headerText.innerHTML = `
                <h1 class="header__title">${info.nameEn || info.nameRu}</h1>
                <div class="header__balls">
                    <span class="header__year">${info.year}</span>
                    <span class="logo__span header__rating  header__year ">${info.ratingAgeLimits}+</span>
                    <div class="header__seasons header__year">0+</div>
                    <div class="header__stars header__year"><span class="icon-solid"></span><strong>${filmRating}</strong></div>
                </div>
                <p class="header__descr">
                    ${info.description}
                </p>
                <div class="header__buttons">
                    <a href="#" class="header__watch"><span class="icon-solid"></span>watch</a>
                    <a href="#" class="header__more header__watch movie__item">More information</a>
                </div>
            `
        })
        .then(() => {
            let headerMore = document.querySelector('.header__more')
            headerMore.addEventListener('click', function (e) {
                e.preventDefault()
                let attr = this.getAttribute('data-id')
                openSoloFilms(e)
             
            })
        })

        anime.classList.remove('active')
    })
}

let page = 13;
let rand = randMovies(page)


renderHeader(rand)
// render header

// current data 

const popularActorsTitle = document.querySelector(".popular__actors-title")
const comingSoonBlock = document.querySelector(".coming__soon-block")
const year = document.querySelector(".year")

popularActorsTitle.innerHTML = `${db.curMonth} ${db.curYear}`
year.innerHTML = `${db.curYear}`


db.getPrimers().then(res => {
    let rand = randMovies(res.total)

    comingSoonBlock.src = res.items[rand].posterUrlPreview
    
})
// open solo film


function openSoloFilms(e) {
    e.preventDefault()
    mainContent.classList.add('active')
    body.classList.add('active')
    
}

mainClose.forEach(closes => {
    closes.addEventListener('click',function (e) {
        e.preventDefault()
        mainContent.classList.remove('active')
        body.classList.remove('active')
    } )
});



async function renderSolo (id){
    mainBlock.innerHTML = ""
    mainSolo.innerHTML = ""
    // anime.classList.add('active')

    ;(async function () {
        const [ reviews, frames, solo ] = await Promise.all([
            db.getReviews(id),
            db.getFrames(id),
            db.getSoloFilm(id)
        ]);

        return { reviews,frames, solo };
    }) ()

    .then(res => {
            console.log(res)
            let solo = res.solo.data
            let genres = solo.genres.reduce((acc,item) => acc + `${item.genre}`, " ")
            let countries = solo.countries.reduce((acc,item) => acc + `${item.country}`, " ")

            let url = solo.webUrl.split("kinopoisk").join("kinopoiskk")

            let facts = ""
            let frames = ""
            let reviews = "";

            let fact = solo.facts.slice(0,5)
            // console.log(fact)


            fact.forEach((item,i) => {
                facts = facts + `   <li class="solo__facts">${i + 1}: ${item}</li>`
            });

            let frame = res.frames.items.slice(0,8)

            frame.forEach(item => {
                frames  = frames + `   <img src="${item.previewUrl}" alt="" loading="lazy">`
            });


            let review =  res.reviews.items.slice(0,10)

            review.forEach(item => {
                reviews += `
                
                <div class="review__item">
                    <span>${item.author}</span>
                    <p class="review__desc">${item.description}</p>
                </div>
                `
                });

                let div = `
                
                <div class="solo__img">
                <img src="${solo.posterUrlPreview}" alt="">
                <a href="" class="solo__link header__watch">Ko'rish</a>
                        </div>
                        <div class="solo__content">
                            <h3 class="solo__title trend__tv-title">${solo.nameEn || solo.nameRu}</h3>
                            <ul>
                                <li class="solo__countries">Davlati: ${solo.countries} </li>
                                <li class="solo__genres">Janr: ${genres}</li>
                                <li class="solo__dur">Vaqti: ${solo.filmLength}</li>
                                <li class="solo__year">Yili: ${solo.year}</li>
                                <li class="solo__primier">Dunyo primeriyasi: ${solo.premiereWorld}</li>
                                <li class="solo__rating">Yosh chegrasi: ${solo.ratingAgeLimits} </li>
                                <li class="solo__slogan">Mukofati: ${solo.slogan} </li>
                                <li class="solo__desc header__desc">Text: ${solo.description}</li>
                            </ul>
                        </div>

                        <div class="solo__facts">
                            <h3 class="trend__tv-title">Qiziqarli factlar</h3>
                        </div>
                        <h3 class="trend__tv-title">Kadrlar: ${frames} </h3>
                        <ul class="solo__images"></ul>
                        <div class="solo__reviews">
                            <h3 class="trend__tv-title">Izoh</h3>
                            ${reviews}
                        </div>
                
                `
                mainSolo.innerHTML = div
        })
}

// IIFE

// (function asd() {
//     console.log("Salom")
// }) ();

renderSolo(435)


// open solo film










