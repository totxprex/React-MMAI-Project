const popup = function (message) {
  document.querySelector('body').insertAdjacentHTML('beforebegin', `<div class="pop-up-cont">
  <div class="pop-up-notification">
  <img class="" title="Notifications" src="/images/notification.png" alt="logo">
  <p>${message}</p>
  </div>
  </div>
  `)

  setTimeout(function () {
    document.querySelector('.pop-up-cont').remove()
  }, 5000)
}


export default popup
