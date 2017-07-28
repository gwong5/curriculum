require('../environment')
const HubspotClient = require('hubspot');
const hubspot = new HubspotClient();

hubspot.useKey(process.env.HUBSPOT_API_KEY, (error) => {
  if (error) throw error
});

const USER_PROPERTIES = [
  // "address",
  // "applicant_status",
  // "aptitude_fit",
  // "assigned_cohort",
  // "cell_phone_number",
  // "closedate",
  // "cohort_invited",
  // "comments",
  // "createdate",
  // "culture_fit",
  // "current_stage",
  // "currentlyinworkflow",
  // "date_milestone_10_interview_completed",
  // "date_ps_milestone_02_showed_up",
  // "date_ps_milestone_04_withdrew",
  // "days_to_close",
  "email",
  "firstname",
  "lastname",
  "gender",
  // "isa_signed",
  // "lastmodifieddate",
  // "lastname",
  // "learning_facilitator",
  // "left_at_exit_ramp",
  // "lifecyclestage",
  // "living_stipend_isa_signed",
  // "living_stipend_total",
  // "low_income",
  // "new_laptop_policy_increased_isa_",
  "nickname",
  // "pd_days_remaining",
  // "pd_days_used",
  // "personal_days",
  // "personal_days_remaining",
  "phase",
  "exit_phase",
  // "phone",
  // "race",
  // "re_committed",
  // "sept_ciiaaa_signed",
  // "should_this_candidate_move_on_to_an_enrollment_game_",
  // "showed_up_on_day_1",
  // "signed_up_for_founder_interview",
  // "signed_up_for_interivew",
  // "sorting_interview_artifact",
  // "sorting_interview_completeness",
  // "sorting_interview_date",
  // "sorting_interview_phase",
  // "sorting_interview_video",
  // "sorting_interviewer",
  // "sorting_iv_authenticity",
  // "sorting_iv_challenge_instructions",
  // "sorting_iv_commit_history",
  // "sorting_iv_comprehension",
  // "sorting_iv_feedback_to_learner",
  // "sorting_iv_internal_feedback",
  // "sorting_iv_self_reflection",
  // "sorting_iv_technical_language",
  // "start_date_assigned",
  // "this_aspirant_is_committed_to_becoming_a_software_developer_and_is_a_good_investment_for_lg",
  // "this_candidate_is_one_of_our_learners_",
]

const getAllUsers = (options={}, callback) => {
  options.count = options.count || 99999
  options.property = options.property || USER_PROPERTIES
  hubspot.contacts.get(options, callback)
}



const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    hubspot.contacts.getByEmail(email, (error, response) => {
      if (error) return reject(error)

      const user = {}
      user.hubspotVid = response.vid

      USER_PROPERTIES.forEach(propName => {
        const prop = response.properties[propName]
        if (prop) user[propName] = prop.value
      })

      if (typeof(user.exit_phase) === 'string'){
        user.exit_phase = Number.parseInt(user.exit_phase.replace('Phase ',''))
      }
      if (typeof(user.phase) === 'string'){
        user.phase = Number.parseInt(user.phase.replace('Phase ',''))
      }

      resolve(user)
    })
  })
}

// client.campaigns.get(function(err, res) {
//   if (err) { throw err; }
//   console.log(res);
// });

module.exports = {
  getAllUsers,
  getUserByEmail,
}
