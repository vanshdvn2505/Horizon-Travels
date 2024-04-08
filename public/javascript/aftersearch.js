let btn2 = document.querySelector('.btn2')
let geoID;

btn2.addEventListener('click', async ()=>{
    btn2.innerHTML = "Fetching...";
    let city = document.querySelector('.city').value;
    console.log(city);
    console.log("Done");
    const url1 = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=${city}`;
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '3807318e2bmsh28809f21f999f10p10cc21jsn0e3ff64dc9e2',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };
    try {
        console.log('Done');
        const response = await fetch(url1, options);
        const result = await response.json();
        geoID = result.data[0].geoId;
    } catch (error) {
        console.error(error);
    }
    let checkIn = document.querySelector('.checkIn').value;
    let checkOut = document.querySelector('.checkOut').value;



    const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=${geoID}&checkIn=${checkIn}&checkOut=${checkOut}&pageNumber=1&currencyCode=INR`;
    const options1 = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '3807318e2bmsh28809f21f999f10p10cc21jsn0e3ff64dc9e2',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };

    try {
        const response = await fetch(url, options1);
        const result1 = await response.json();
        console.log(result1);
        let conatiner = document.querySelector('.hotels-div');
        for (let i = 0; i < 5; i++) {

            let parent = document.createElement('div');
            let img = document.createElement('div');
            let data = document.createElement('div');

            let title = result1.data.data[i].title;
            let ratings = result1.data.data[i].bubbleRating.rating;
            let price = result1.data.data[i].priceForDisplay;
            let detail = result1.data.data[i].priceDetails;
            let photo = result1.data.data[i].cardPhotos[0].sizes.urlTemplate;
            let imgUrl = photo.replace('{width}', 300).replace('{height}', 300);


            parent.style.height = "15%";
            parent.style.width = "70%";
            parent.style.display = "flex";
            parent.style.backgroundColor = "rgba(135, 202, 192, 0.71)";
            parent.style.margin = "20px"
            parent.style.borderRadius = "10px";
            parent.style.padding = "7px";

            img.style.width = "45%";
            img.style.height = "90%";
            img.style.borderRadius = "20px";
            img.style.display = "flex";
            img.style.justifyContent = "center"
            img.style.alignItems = "center";
            img.style.padding = "7px"
        

            data.style.width = "65%";
            data.style.height = "90%";
            data.style.paddingLeft = "7px"
            data.style.paddingTop = "7px"

            data.style.display = "flex";
            data.style.flexDirection = "column";
            data.style.justifyContent = "left"
            data.style.alignItems = "start";
            data.style.fontSize = "20px";

            data.innerHTML = `<div style="font-size: 30px;">${title}</div><div>Raitngs: ${ratings}</div>
            <div>Price: ${price}</div><div>${detail}</div><br><br><br><button class = 'book${i}'>Book</button>`

            img.innerHTML = `<img src = ${imgUrl}">`;



            parent.appendChild(img);
            parent.appendChild(data);

            conatiner.appendChild(parent);

            let book = document.querySelector(`.book${i}`);
            book.addEventListener('click', ()=> {
                const obj = {
                    title,
                    ratings,
                    price,
                    detail,
                    photo
                }

                fetch('/myaccount', {
                    method: 'POST',
                    headers: {'content-type' : 'application/json'},
                    body: JSON.stringify(obj),
                })
                alert("Hotel Booked");
            })
            book.style.border = "1px solid black";
            book.style.padding = "3px";
            book.style.borderRadius = "10px";
        }
        btn2.innerHTML = "Show Results";
    } catch (error) {
        console.error(error);
    }
})
