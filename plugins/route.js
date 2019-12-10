export default ({ app }) => {
  // Every time the route changes (fired on initialization too)
  app.router.beforeEach((to, from, next) => {
    // do something to validate
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires authentiication, check if logged in
      // if not, redirect to login page.
      const fmsg = 'Please login to access this page';
      if (!store.state.user_mgt.sub.isLoggedIn) {
        next({
          name: 'loginPage',
          query: { redirectUrl: to.fullPath },
        });
      } else {
        next();
      }
    } else {
      next(); // make sure to always call next()!
    }
  });
};
