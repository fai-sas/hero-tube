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
<button onclick=showContent('${item.category_id}') class="btn">${item.category}</button>
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
    const card = document.createElement('div')

    card.innerHTML = `
     <div class="shadow-xl card card-compact bg-base-100">
        <figure>
          <img
            src="${item?.thumbnail}"
          />
        </figure>
        <div class="card-body">
          <article class="flex items-center gap-4">
            <div class="">
              <img src="${
                item?.authors[0]?.profile_picture
              }" class="w-16 rounded-full" alt="" />
            </div>
            <p class="absolute bottom-[12rem] right-6 badge badge-neutral">
              3hrs 56 min ago
            </p>
            <main>
              <h2 class="card-title">
                ${item?.title}
              </h2>
              <div class="flex items-center gap-2 py-2">
                <p class="flex-grow-0">${item?.authors[0]?.profile_name}</p>
                 ${
                   verified
                     ? '<img src="./assets/fi_10629607.png" alt="" />'
                     : ''
                 }   
              </div>
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
