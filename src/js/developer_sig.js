const sigBaseURL = 'https://bots.tidb.io/ti-community-bot/sigs/'

function renderData(sigName, membership) {
  console.log('member', membership)


  $(
    '<div class="member-header" id="member-' + sigName + '">' + sigName + ' SIG </div>'
  ).appendTo('.developer-group-members')

  Object.keys(membership).forEach((member) =>
    $(
      '<div class="member-list">\
        <div class="member-type">' + member + '</div>\
        <div class="flex-lists members divider" id="member-' + member + '"></div>\
      </div>'
    ).appendTo('.developer-group-members')
  )

  Object.keys(membership).forEach((member) =>
    membership[member].forEach((m) =>
      $(
        '<div class="member flex-lists">\
          <a href="https://github.com/' + m.githubName + '">\
            <img class="lazy avatar" src="https://github.com/' + m.githubName + '.png" alt="avatar" />\
            <div class="member-info">\
              <p>' + m.githubName + '</p>\
              <div class="github-icon"><p>' + m.githubName + '</p></div>\
            </div>\
          </a>\
        </div>'
      ).appendTo('#member-' + member)
    )
  )
}

function getSig(sigName) {
  let url = sigBaseURL + sigName

  $.getJSON(url, data => {
    console.log(
      'data',
      data.data,
      data.data.membership,
      Object.keys(data.data.membership)
    )
    const membership = data.data.membership
    renderData(sigName, membership)
  })
}

$(document).ready(() => {
  const sigNameArr = window.location.pathname.split('/')
  const sigName = sigNameArr.pop() || sigNameArr.pop()
  getSig(sigName)
})
