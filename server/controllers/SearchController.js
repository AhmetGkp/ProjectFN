const mongoose = require('mongoose');

productSearch = (req,res) => {
    let input = req.query.q;
    var annoncesDb = mongoose.connection.useDb("announcements");
    console.log(input)
    annoncesDb.collection("annonces").find({}, {})
      .toArray()
      .then(items => {
          const result = items.filter(item => item.annonce.title.includes(input));
          let itemArr = result.slice(0,2)
          return res.json({items: result});
      })
      .catch(err => {
        console.log(err);
        return res.json({error: err});
      })
}

applyFilterToSearch = (req,res) => {
  let input = req.query.q;
  var annoncesDb = mongoose.connection.useDb("announcements");
    console.log(input)
    annoncesDb.collection("annonces").find({title: 'ford kuga'}, {})
      .toArray()
      .then(items => {
          console.log(items)
          return res.json({items: items});
      })
      .catch(err => {
        console.log(err);
        return res.json({error: err});
      })
}

module.exports = {productSearch, applyFilterToSearch}