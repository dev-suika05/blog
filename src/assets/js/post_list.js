'use strict';

window.addEventListener('load',()=> {
  post_list.init();
});

const post_list = {
  endPoint: 'blog',
  async get() {
    const url = new URL(location.href).searchParams;
    const categoryParam = url.get('category');
    const categoryFilter = categoryParam ? `?filters=category[equals]${categoryParam}` : '';

    console.log(categoryParam)
    let api = `https://suikanote.microcms.io/api/v1/${this.endPoint}${categoryFilter}`;
    
    const data = await fetch(api,{ 
      method: 'GET',
      headers: {
        'X-MICROCMS-API-KEY': 'zQCld3knQj3cRJKvnsGPr5JudGPHyCs49nBn',
      },
    })
    .then(response => response.json())
    .then(response => response.contents);

    console.log(data)

    const length = data.length;

    let template_html;
    let id;
    let title;
    let category;
    let date;

    for(let i = 0; i < length; i ++) {
      id = data[i].id;
      title = data[i].title;
      category = data[i].category;
      date = data[i].date;
      console.log(category)

      template_html = document.querySelectorAll('[data-post-item]')[0].content.cloneNode(true);
      template_html.querySelector('[data-post-item-title]').textContent = title;
      template_html.querySelector('[data-post-item-category-link]').textContent = category.name;
      template_html.querySelector('[data-post-item-category-link]').setAttribute('href',`?category=${category.id}`); 
      template_html.querySelector('[data-post-item-link]').setAttribute('href',`./detail/?id=${id}`);
      
      document.querySelectorAll('[data-post-list]')[0].appendChild(template_html);
    }
  },
  init() {
    this.get();
  }
}