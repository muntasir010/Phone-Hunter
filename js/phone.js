const loadPhone = async(searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    console.log('isShowAll', isShowAll);
    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    phones.forEach(phone =>{
        console.log(phone);
        // 2.create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl`;
        //3. set innnerhtml
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadinSpinner(false);
}

// show details for modal
const handleShowDetail = async (id) =>{
    console.log('clicked show details',id,);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/samsung_galaxy_s22_5g-11253`);
    const data = await res.json();
    console.log(data,);
}



// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadinSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}

// const handleSearch2 = () =>{
//     toggleLoadinSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadinSpinner = (isLoading) =>{
    const loadinSpinner = document.getElementById('loading-spinner');
    if(isLoading) {
        loadinSpinner.classList.remove('hidden');
    }
    else{
        loadinSpinner.classList.add('hidden');
    }
};

// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}
// loadPhone();