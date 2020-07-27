const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  try {
    Card.create({ name, link, owner: req.user._id })
      .then((card) => res.send({ data: card }))
      .catch((err) => res.status(500).send({ error: err.message }));
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports.deleteCard = (req, res) => {
  try {
    Card.findByIdAndDelete(req.params.cardId).orFail(new Error(`Карточка c id: ${req.params.cardId} не найдена`))
      .then((card) => res.send({ data: card }))
      .catch((err) => res.status(500).send({ error: err.message }));
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};
