const mongoose = require("mongoose");
const Legends = mongoose.model("Legends");

module.exports.GET_LEGENDS = async (req, res) => {
  const { batch, branch, type, time, company } = req.query;

  const queries = {};

  if (batch != "" && batch != undefined) {
    queries.batch = batch;
  }
  if (branch != "" && branch != undefined) {
    queries.branch = branch;
  }
  if (type != "" && type != undefined) {
    queries.type = type;
  }
  if (time != "" && time != undefined) {
    queries.time = time;
  }

  if (company != "" && company != undefined) {
    queries.company = company;
  }

  Legends.find(queries)
    .sort({ register_date: -1 })
    .then((items) => {
      res.json(items);
    })
    .catch((err) => res.send(err));

  return;
};

module.exports.GET_LEGEND = async (req, res) => {
  Legends.findById(req.params.id, function (err, legend) {
    if (err) {
      return res.json({
        err,
      });
    } else {
      return res.json(legend);
    }
  });
};

module.exports.POST_LEGENDS = (req, res) => {
  const { name, package, pricing, batch, branch, type, time, company } =
    req.body;
  if (
    !name ||
    !package ||
    !pricing ||
    !batch ||
    !branch ||
    !type ||
    !time ||
    !company
  ) {
    return res.send({ error: "Fill the form" });
  }
  console.log(req.body);
  const data = req.body;

  const newLegends = new Legends(data);
  newLegends
    .save()
    .then((response) => {
      return res.send({ success: response });
    })
    .catch((err) => {
      return res.send({ error: err });
    });
};

module.exports.UPDATE_LEGENDS = (req, res) => {
  Legends.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).exec(
    function (err, Legend) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(Legend);
      }
    }
  );
};

module.exports.DELETE_LEGENDS = (req, res) => {
  Legends.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
    res.json({ success: true });
  });
};
