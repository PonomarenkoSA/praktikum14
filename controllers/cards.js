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
    Card.findById(req.params.cardId).orFail(new Error(`Карточка c id: ${req.params.cardId} не найдена`))
      .then((card) => {
        if (JSON.stringify(card.owner._id) !== JSON.stringify(req.user._id)) {
          return Promise.reject(new Error('Удаление карточек других пользователей запрещено'));
        }
        return Card.findByIdAndDelete(req.params.cardId)
          .then((cardDel) => res.send({ data: cardDel }))
          .catch((err) => res.status(500).send({ error: err.message }));
      })
      .catch((err) => res.status(403).send({ error: err.message }));
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};
