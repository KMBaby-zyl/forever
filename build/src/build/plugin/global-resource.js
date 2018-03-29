export const js = {
  "Vue": process.env.NODE_ENV === 'development' ? 
  "https://cdn.bootcss.com/vue/2.5.16/vue.js" : "https://cdn.bootcss.com/vue/2.5.16/vue.min.js"
}

export const externals = {
  'vue': 'Vue',
};

export const css = {
}
