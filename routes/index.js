const express = require('express');
const cors = require('cors');
const router = express.Router();

const ShortLink = require('../models/ShortLink');

router.get('/links/all', async (req, res) => {
  try {
    const allLinks = await ShortLink.find({});
    res.json(allLinks);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:sUrl', async (req, res) => {
  try {
    const { sUrl } = req.params;
    const sl = await ShortLink.find({ shortLink: sUrl });
    sl[0].clicks++;
    await sl[0].save();
    res.json(sl[0].fullLink);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.post('/new', async (req, res) => {
  try {
    const { fullLink } = req.body;
    const shortLink = await checkShorlLink(makeShortUrl(6));
    const newShortLink = new ShortLink({ fullLink, shortLink, clicks: 0 });
    await newShortLink.save();
    res.redirect('back');
  } catch (error) {
    res.json(error);
  }
});

async function checkShorlLink(link) {
  try {
    let shortLink = link;
    const ifLinkExist = await ShortLink.find({ link });
    if (ifLinkExist.length !== 0) {
      shortLink = makeShortUrl(6);
      checkShorlLink(shortLink);
    } else {
      return shortLink;
    }
  } catch (error) {
    return;
  }
}

function makeShortUrl(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = router;
