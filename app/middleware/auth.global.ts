export default defineNuxtRouteMiddleware(to => {
  const { loggedIn } = useUserSession()
  if (to.meta.group === 'admin' && !loggedIn.value) {
    return navigateTo('/login')
  }
  if (to.meta.group === 'auth' && loggedIn.value) {
    return navigateTo('/')
  }
  if (to.path === '/') {
    return navigateTo('/dashboard')
  }
})
