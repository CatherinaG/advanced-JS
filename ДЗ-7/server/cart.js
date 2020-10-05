const add = (cart, req) => {
  cart.contents.push(req.body);
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};
const delete = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  if (item !== -1 && quantity <= 0) {
    cart.items.splice(item, 1);
    if (cart.items.length == 0) {
      cart.subTotal = 0;
    } else {
      cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
      // find.quantity -= req.body.quantity;
      // return JSON.stringify(cart, null, 4);

    };

    //   deleteFromBasket(id) {
    //     let getIdElemen;
    //     this.basketGoods.forEach(function (item, i) {
    //         let thisId = item.id;
    //         if (id == thisId) {
    //             getIdElemen = i;
    //         }

    //     });
    //     this.basketGoods.splice(getIdElemen, 1);
    //     this.calcAllGoods();

    //     this.makePOSTRequest('/updateCart', this.basketGoods);
    // },

    module.exports = {
      add,
      change,
      delete
    };
  }