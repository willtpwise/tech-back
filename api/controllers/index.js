'use strict';

const config = require('../../config.json')
const axios = require('axios')
const qs = require('qs')

exports.messagesCreate = function(req, res) {

  // SendGrid API
  function sendGrid () {
    var types = ['to', 'cc', 'bcc']
    var recipients = {}
    types.forEach((type) => {
      if (post[type] && post[type].length > 0) {
        recipients[type] = post[type].map((recipient) => {
          return {
            email: recipient
          }
        })
      }
    })

    return axios({
      method: 'post',
      url: 'https://api.sendgrid.com/v3/mail/send',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + config.SENDGRID_API_KEY
      },
      data: JSON.stringify({
        personalizations: [recipients],
        from: {
          email: 'will@williamwise.net'
        },
        subject: post.subject || '',
        content: [{
          type: 'text/plain',
          value: post.body
        }]
      })
    })
  }

  // MailGun API
  function mailGun() {
    var payload = {
      from: 'will@tech.williamwise.net',
      to: post.to.join(','),
      subject: post.subject,
      text: post.body
    }

    if (post.cc.length > 0) {
      payload.cc = post.cc.join(',')
    }

    if (post.bcc.length > 0) {
      payload.bcc = post.bcc.join(',')
    }

    payload = qs.stringify(payload)

    return axios({
      method: 'post',
      url: 'https://api.mailgun.net/v3/tech.williamwise.net/messages',
      headers: {
        'Authorization': 'Basic ' + new Buffer('api:' + config.MAILGUN_API_KEY).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(payload)
      },
      data: payload
    })
  }

  var post = Object.assign({
    cc: [],
    bcc: [],
    subject: ' ',
    body: ' '
  }, req.body)

  if (typeof post.subject !== 'string' || post.subject.length === 0) {
    post.subject = 'No subject'
  }

  if (typeof post.body !== 'string' || post.body.length === 0) {
    post.body = 'No body'
  }

  mailGun().then((response) => { // Success
    console.log('Email sent via Mail Gun')
    res.json({
      status: true
    })
  }).catch(() => {
    console.log('Mail Gun unavailable')
    sendGrid().then((response) => {
      console.log('Email sent via Send Grid')
      res.json({
        status: true
      })
    }).catch((err) => { // Error (Hard fail)
      console.log('Send Grid unavailable')
      res.json({
        status: false
      })
    })
  })
}

exports.health = function(req, res) {
  res.json({
    healthy: true,
    timestamp: Date.now()
  })
}
