import Vue from 'vue';
import store from './store';
import Index from './components/index.vue';
import {add} from '../../common/';


new Vue({
  el: '#app',
  store,

  render: function(createElement) {
    return createElement(
      Index
    )
  }
});
