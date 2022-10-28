const newsContainer = document.querySelector('.news')
const moreBtn = document.querySelector('#more-btn')
const pages = []
//initialize pages in a list
for (let i=0; i<=20; i++) {
    pages.push(i)
}

let covidNews = {

    options: {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1b7197f7a5msh77b06ed09b7fe0cp156c3bjsn6470e99d7eda',
            'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
        }
    },

    

    fetchNews: function (page) {
    
        fetch(`https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-coronavirus-news/${page}`, this.options)
        .then(response => response.json())
        .then(response => {
            this.displayNews(response)
        }) 
            
    },

    displayNews: function (news) {
        console.log(news)
         

        function displayLatestNews (news) {
            for (const n of news.news) {
                document.querySelector('.news').innerHTML += 
                `
                    <div class='new clickable'>
                        <p class="publ-date">Published ${n.imageFileName.slice(4,15)}</p>
                        <a href='${n.link}'> <img src=${n.urlToImage}></a>
                        <a href='${n.link}' class="new-title">${n.title}</a>
                    </div>
                `     
            }
            
        }

        displayLatestNews(news)
        
    }   
}

window.addEventListener('load', e => {
    covidNews.fetchNews(selectRandomPage(pages))
})

moreBtn.addEventListener('click', e => {
    covidNews.fetchNews(selectRandomPage(pages))
})

function selectRandomPage (pages) {
    let currentPage 
    if (pages.length > 1) {
        currentPage = pages[Math.round(Math.random() * pages.length)]
        console.log(pages)
        pages.pop(currentPage)
        console.log(pages)
    }

    else if (pages.length === 1) {
        moreBtn.style.display = 'none'
        currentPage = pages[0]
    }

    return currentPage
    
}


    