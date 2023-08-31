const categoryUrl = 'https://openapi.programming-hero.com/api/videos/categories'

const loadCategory = async () => {
  const response = await fetch(categoryUrl)
  const data = await response.json()
  const categories = data.data
  showCategory(categories)
}

const showCategory = (category) => {
  const btnContainer = document.getElementById('btn-container')
  category.forEach((item) => {
    const btn = document.createElement('button')
    btn.innerHTML = `
<button onclick=showContent('${item.category_id}') class="btn  bg-[#25252526]">${item.category}</button>
`
    btnContainer.appendChild(btn)
  })
}

const showContent = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  )
  const data = await response.json()
  const content = data.data

  const cardContainer = document.getElementById('card-container')
  cardContainer.innerHTML = ''

  content.forEach((item) => {
    const verified = item?.authors[0]?.verified
    const seconds = item?.others?.posted_date
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    const card = document.createElement('div')

    card.innerHTML = `
     <div class="shadow-xl card card-compact bg-base-100 mb-4 ">
        <figure>
          <img class='w-full h-48 object-cover'
            src="${item?.thumbnail}"
          />
        </figure>
        <div class="card-body">
          <article class="flex gap-4">
            <div class="">
              <img src="${
                item?.authors[0]?.profile_picture
              }" class=" w-10 h-10 rounded-full object-cover" alt="" />
            </div>
            <p class="absolute bottom-[9rem] right-4 badge badge-neutral">
             ${seconds ? `${hours}hrs ${minutes} min ago` : ''}
            </p>
            <main>
              <h2 class=" text-[#171717] font-bold card-title">
                ${item?.title}
              </h2>
              <div class="flex text-[#171717b2] items-center gap-2 py-2">
                <p class="flex-grow-0">${item?.authors[0]?.profile_name}</p>
                 ${
                   verified
                     ? '<img src="./assets/fi_10629607.png" alt="" />'
                     : ''
                 }   
              </div>
              <p class=' text-[#171717b2] pt-1'>${item?.others?.views} views</p>
            </main>
          </article>
        </div>
      </div>
    `
    cardContainer.appendChild(card)
  })
}

loadCategory()
showContent('1000')
