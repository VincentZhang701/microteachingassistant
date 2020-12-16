const myApi = {
  logIn: {
    method: 'post',
    url: '/Teacher/findOne'
  },
  reG: {
    method: 'post',
    url: '/Teacher/createTeacher'
  },
  createVote: {
    method: 'post',
    url: '/Vote/createVoteWithOptions'
  },
  createSignIn: {
    method: 'post',
    url: '/CheckIn_Release/createCheckIn_Release'
  },
  stuSign: {
    method: 'post',
    url: '/CheckIn/createCheckIn'
  },
  stuVote: {
    method: 'post',
    url: '/Vote_Student/createVoteOptions'
  },
  stuMsg: {
    method: 'post',
    url: '/Email/createEmail'
  },
  getSignDetail: {
    method: 'post',
    url: '/CheckIn/findOneListResult'
  },
  getSignList: {
    method: 'post',
    url: '/CheckIn_Release/findCheckInByTeacher'
  },
  getTeacherMsg: {
    method: 'post',
    url: '/Email/findEmailByTeacher'
  },
  getVoteDetail: {
    method: 'post',
    url: '/Vote/findOne'
  },
  getVoteList: {
    method: 'post',
    url: '/Vote/findVoteByTID'
  }
}
export default myApi
