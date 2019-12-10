export default function ({store, redirect, route}) {
  const userIsLoggedIn = store.getters['user_mgt/isLoggedIn'];
  const urlRequiresAuth = route.meta.filter(a=>a.requiresAuth==true).length>0
  const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath)
  if (!userIsLoggedIn && urlRequiresAuth) {
    return redirect('/?redirectTo='+route.fullPath)
  }
  
  return Promise.resolve()
}