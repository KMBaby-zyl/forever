import Vue from 'vue';
import store from './store';
import Index from './components/index.vue';
import {add} from '../../common/';
import {used} from '../../common/index.json';


add(1, 2);
new Vue({
  el: '#app',
  store,

  render: function(createElement) {
    return createElement(
      Index
    )
  }
});
