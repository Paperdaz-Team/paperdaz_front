export default function () {
  return [{
    title: 'Dashboard',
    to: '/super-user',
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: '',
  }, {
    title: 'Profile',
    to: '/super-user/profile',
    htmlBefore: '<i class="material-icons">assignment_ind</i>',
    htmlAfter: '',
  }, {
    title: 'Free Users',
    htmlBefore: '<i class="material-icons">person</i>',
    to: '/super-user/free-users',
  }, {
    title: 'Business Users',
    htmlBefore: '<i class="material-icons">verified_users</i>',
    to: '/super-user/business-users',
  }, {
    title: 'Promotions',
    htmlBefore: '<i class="material-icons">event_note</i>',
    to: '/super-user/promotions',
  }, {
    title: 'Package Features',
    htmlBefore: '<i class="material-icons">table_chart</i>',
    to: '/super-user/packages-features',
  }, {
    title: 'Packages List',
    htmlBefore: '<i class="material-icons">format_list_numbered</i>',
    to: '/super-user/packages',
  }, {
    title: 'FAQs',
    htmlBefore: '<i class="material-icons">info</i>',
    to: '/super-user/faqs',
  }];
}
