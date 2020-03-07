export default {
  bind(el) {
    let item = el.innerHTML;
    let res = '';
    let length = 25;

    if(el.innerHTML.length > length){
      res =  item.substr(0, length) + ' ...';
      el.innerHTML = res;
    }
  }
}
