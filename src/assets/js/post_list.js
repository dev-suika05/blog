'use strict';

window.addEventListener('load',()=> {
  post_list.init();
});

const post_list = {
  async get() {
    const data = await fetch('https://suikanote.microcms.io/api/v1/blog/',{ 
      method: 'GET',
      headers: {
        'X-MICROCMS-API-KEY': 'zQCld3knQj3cRJKvnsGPr5JudGPHyCs49nBn',
      },
    });
  },
  init() {
    this.get();
  }
}